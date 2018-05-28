

/**
 * request Reset Password
 * reset password
 * use token from email, new password
 */
function requestResetPassword(){

    var resetPassword = $("#blockResetPassword");

        var resetInfo = {
            password: $.trim(resetPassword .find("#enterNewPassword").val()),
            token: $.trim(resetPassword .find("#enterToken").val()),
        };

        /*/!*var token = resetInfo.token;*!/
        console.log(resetInfo);
        console.log(token);*/

        var data = JSON.stringify(resetInfo);


        $.ajax({
            type: "POST",
            url:"https://report.inventorsoft.co/app/no-auth/forgetPassword/resetPassword",
            data: data,
            contentType: "application/json",
            success: function () {


                $('#successModal').modal('show');
                setTimeout(function(){
                    window.location= "index.html";
                }, 1500);

            },
            error: function (error) {
                $('#errorModal').modal('show',
                    $('#numberError').text(error.status),
                    $('#statusError').text(error.statusText)
                );

            }
        });
    };

