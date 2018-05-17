
/**
 * get token
 * get token from localStorage
 */
function getToken(){
    return localStorage.getItem("token");
}


/**
 * send email
 * send email for reset password (return get token)
 */
function sendEmail() {

    var forgotPassword = $("#blockForgotPassword");

    var emailInfo = {
        userEmail: $.trim(forgotPassword.find("#emailSendForgot").val())
    };
    var token = getToken();
    $.ajax({
        type: "POST",
        url:"https://report.inventorsoft.co/app/no-auth/forgetPassword?email=" + emailInfo.userEmail,
        headers: {"Authorization" : token},

        success: function () {
            //console.log('success');
            $('#sendTokenModal').modal('show');
            window.location = "reset_password.html"
        },
        error: function (error) {
            $('#errorModal').modal('show',
                $('#numberError').text(error.status),
                $('#statusError').text(error.statusText)
            );
        }
    });
};





