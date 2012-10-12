// this identifies your website in the createToken call below
            Stripe.setPublishableKey('pk_t1W93WUJiPR1y3Zb106JBOr5bx9NG');

            function stripeResponseHandler(status, response) {

                if (response.error) {
					alert('error response');
                    // re-enable the submit button
                    $('#new_piggybak_order').find('input:submit').removeAttr("disabled");
                    // show the errors on the form
                    $(".payment-errors").html(response.error.message);
                } else {
                    var form$ = $("#new_piggybak_order");
                    // token contains id, last4, and card type
                    var token = response['id'];
                    // insert the token into the form so it gets submitted to the server
                    form$.append("<input type='hidden' name='piggybak_order[payments_attributes][0][stripe_token]' value='" + token + "' />");
                    // and submit
					
                    form$.get(0).submit();
                }
            }

            $(document).ready(function() {
                $("#new_piggybak_order").submit(function(event) {

                    // disable the submit button to prevent repeated clicks
                    $('#new_piggybak_order').find('input:submit').attr("disabled", "disabled");
                    // createToken returns immediately - the supplied callback submits the form if there are no errors

                    Stripe.createToken({
                        number: $('.card-number').val(),
                        cvc: $('.card-cvc').val(),
                        exp_month: $('.card-expiry-month').val(),
                        exp_year: $('.card-expiry-year').val()
                    }, stripeResponseHandler);
                    return false; // submit from callback
                });
            });