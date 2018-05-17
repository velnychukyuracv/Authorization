/**
 * get token
 * get token from localStorage
 */
function getToken(){
    return localStorage.getItem("token");
}


/**
 * request create account
 * create new user, send email, firstName, lastName, password
 */
function requestCreateAccount(){

    var createAccount = $("#blockCreateAccount");

    var emailAccount = $(createAccount).find('input[name="email"]').val();
    var firstNameAccount = $(createAccount).find('input[name="firstName"]').val();
    var lastNameAccount = $(createAccount).find('input[name="lastName"]').val();
    var passwordAccount = $(createAccount).find('input[name="password"]').val();


    var createAccountInfo = {
        email: emailAccount,
        firstName: firstNameAccount,
        lastName: lastNameAccount,
        password: passwordAccount
    };

    var info = JSON.stringify(createAccountInfo);
    var token = getToken();

    $.ajax({
        type: "POST",
        url:"https://report.inventorsoft.co/app/users",
        data: info,
        contentType: "application/json",
        headers: {"Authorization" : token},
        success: function () {
            /*console.log('user ...');*/

            $('#successModal').modal('show');
            setTimeout(function(){
                window.location= "list.html"
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







