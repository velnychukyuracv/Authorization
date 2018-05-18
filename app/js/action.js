/**
 * events log in
 * use function request  sendLogin
 * */
$("#loginSubmit").on("click", function(e) {

    e.preventDefault();

    var accountLogin = $("#accountLogin");

    var loginInfo = {
        userName: $.trim(accountLogin.find("#loginEmail").val()),
        password: $.trim(accountLogin.find("#loginPWD").val()),
    };

    //validation
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if ((loginInfo. userName === '') && (loginInfo.password === '')) {
        $("#loginEmail").addClass("error ");
        $('#emailError').text("Email cannot be blank").show();
        $("#loginPWD").addClass("error ");
        $('#passwordError').text("Password cannot be blank").show();
    }  else if (loginInfo. userName === '') {
        $("#loginEmail").addClass("error ");
        $('#emailError').text("Email cannot be blank").show();
    } else if (!regexEmail.test(loginInfo. userName)) {
        $('#emailError').text("Please include a valid email address.").show();
        $("#loginEmail").addClass("error ");
    } else if ((loginInfo.password === '')|| (loginInfo.password .length != 8)) {
        $('#passwordError').text("Password cannot be blank or not equals 8 symbol").show();
        $("#loginPWD").addClass("error ");
        $("#loginEmail").addClass("success ");
        $('#emailError').hide();
    } else {
        sendLogin();
        $("#loginPWD").addClass("success ");
        $('#passwordError').hide();
        $("#loginEmail").addClass("success ");
        $('#emailError').hide();
    }

});

/**
 * events forgot password
 * use function request  sendEmail
 * */
$("#sendForgotPassword").on("click", function(e) {

    e.preventDefault();

    var forgotPassword = $("#blockForgotPassword");

    var emailInfo = {
        userEmail: $.trim(forgotPassword.find("#emailSendForgot").val())
    };
   /* console.log(emailInfo.userEmail);*/


    //validation
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (emailInfo.userEmail === '') {
        $("#emailSendForgot").addClass("error");
        $('#emailForgotError').text("Email cannot be blank").show();

    } else if (!regexEmail.test(emailInfo.userEmail)) {
        $("#emailSendForgot").addClass("error ");
        $('#emailForgotError').text("Please include a valid email address.").show();
    } else {
        sendEmail();
        $("#emailSendForgot").addClass("success ");
    }

});

/**
 * events reset password
 * use function request  requestResetPassword
 * */
$("#resetPassword").on("click", function(e) {

    e.preventDefault();

    var resetPassword = $("#blockResetPassword");

    var passwordInfo = {
        token: $.trim(resetPassword .find("#enterToken").val()),
        password: $.trim(resetPassword .find("#enterNewPassword").val()),
        re_password: $.trim(resetPassword .find("#re-enterNewPassword").val()),
    };

    /*console.log(passwordInfo);*/

    //validation
    if (passwordInfo.token === '') {
        $("#enterToken").addClass("error ");
        $('#tokenError').text("Token cannot be blank").show();

    }  else if (passwordInfo.password === '') {
        $("#enterNewPassword").addClass("error ");
        $('#passwordError').text("Password  cannot be blank").show();
        $('#tokenError').hide();
        $("#enterToken").addClass("success");
    }  else if (passwordInfo.re_password  === '') {
        $("#re-enterNewPassword").addClass("error ");
        $('#re-passwordError').text("Password  cannot be blank").show();
        $('#passwordError').hide();
        $("#enterNewPassword").addClass("success");
    }  else  if(passwordInfo.password != passwordInfo.re_password) {
        $('#re-passwordError').text("Password do not match").show();
        $("#re-enterNewPassword").addClass("error ");
    } else {
        requestResetPassword();
        $('#tokenError').hide();
        $("#enterToken").addClass("success");
        $('#passwordError').hide();
        $("#enterNewPassword").addClass("success");
        $("#re-enterNewPassword").addClass("success ");
        $('#re-passwordError').hide();

    }
});

/**
 * events create user
 * use function requestCreateAccount
 * */
$("#createAccount").on("click", function(e) {

    e.preventDefault();

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

    /*console.log(createAccountInfo);*/

    //validation
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var regexName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

    /*$.each(createAccountInfo, function (key, value) {

     switch (key) {
     case 'firstName':
     case 'lastName':
         //console.log(value);
         if (value === '' || !regexName.test(value) ) {
             $('#' + key).addClass("error ");
             $('#' + key + 'Error').text( key + " cannot be blank ").show();
         }
         break;

     case 'email':  // if (x === 'value1')
         console.log(value);
         if (value === '' || !regexEmail.test(value) ) {
             $('#' + key).addClass("error ");
             $('#' + key + 'Error').text( key + " cannot be blank ").show();
         }
         break;

     case 'password':  // if (x === 'value1')
         console.log(value);
         if (value === '' || value.length != 8 ) {
                 $('#' + key).addClass("error ");
                 $('#' + key + 'Error').text( key + " cannot be blank ").show();
             }
         break;

     default:
        console.log('key ' + key, 'value ' + value);
        requestCreateAccount();
        break;
     }


     });*/

    if ((createAccountInfo. firstName === '') || (!regexName.test(createAccountInfo. firstName)))  {
        $("#firstName").addClass("error ");
        $('#firstNameError').text("First name cannot be blank or First name not consist of latin letters").show();
    }else if ((createAccountInfo. lastName === '')||(!regexName.test(createAccountInfo. lastName))) {
        $("#lastName").addClass("error ");
        $('#lastNameError').text("Last name cannot be blank or Last name should consist of latin letters").show();
        $("#firstName").addClass("success ");
        $('#firstNameError').hide();
    } else if ((createAccountInfo. email === '') ||(!regexEmail.test(createAccountInfo. email)))  {
        $("#emailCreateAccount").addClass("error ");
        $('#emailCreateAccountError').text("Email cannot be blank or Email is not valid ").show();
        $("#firstName").addClass("success ");
        $('#firstNameError').hide();
        $("#lastName").addClass("success ");
        $('#lastNameError').hide();
    } else if ((createAccountInfo.password === '') || (createAccountInfo.password.length != 8))  {
        $('#pwdCreateAccountError').text("Password cannot be blank or not have 8 symbol").show();
        $("#pwdCreateAccount").addClass("error ");
        $("#firstName").addClass("success ");
        $('#firstNameError').hide();
        $("#lastName").addClass("success ");
        $('#lastNameError').hide();
        $("#emailCreateAccount").addClass("success ");
        $('#emailCreateAccountError').hide();
    } else {
        requestCreateAccount();
        $("#firstName").addClass("success ");
        $('#firstNameError').hide();
        $("#lastName").addClass("success ");
        $('#lastNameError').hide();
        $("#emailCreateAccount").addClass("success ");
        $('#emailCreateAccountError').hide();
        $("#pwdCreateAccount").addClass("success ");
        $('#pwdCreateAccountError').hide();
    }
});

/**
 * events change users at page
 * use function getUserList
 * */
$( "#pageUsers" ).change(function() {
    var chooseSort=$('#sortBy').val();
    if (chooseSort == null){
        chooseSort = 'id'
    }
    var choose = "";
    $( "#pageUsers" ).each(function() {
        choose += $( this ).val();
    });
    console.log(choose);
    getUserList(0, '', choose, chooseSort);
});

/**
 * events sort by id, first name, last name
 * use function getUserList
 * */
$( "#sortBy" ).change(function() {
    var chooseUser=$('#pageUsers').val();
    if (chooseUser == null){
        chooseUser = 7
    }
    var choose = "";
    $( "#sortBy" ).each(function() {
        choose += $( this ).val();
    });
    console.log(choose);
    getUserList(0, '', chooseUser,choose);
})

/**
 * events search
 * use function getUserList
 * */
$("#btnSearch").click(function(e) {
    e.preventDefault();

    var valueSearch = $('#filter').val();
    getUserList(0, valueSearch,'');
});

/**
 * events log out
 * use function logout
 * */
$("#userLogOut").click(function(e) {
    logout();
    window.location= "index.html"
});