
/**
 * send userName and password for log in
 */
function sendLogin(){

    var accountLogin = $("#accountLogin");

    var loginInfo = {
        userName: $.trim(accountLogin.find("#loginEmail").val()),
        password: $.trim(accountLogin.find("#loginPWD").val()),
    };

    var data = JSON.stringify(loginInfo);

    $.ajax({
        type: "POST",
        url:"https://report.inventorsoft.co/app/no-auth/login",
        data: data,
        contentType: "application/json",
        success: function (response) {
            /*console.log('success ...');*/
            setToken(response);
            window.location= "list.html"
        },
        error: function (error) {
            /*console.log('error ...');*/
            $('#errorModal').modal('show',
                $('#numberError').text(error.status),
                $('#statusError').text(error.statusText)
            );

        }
    });
};


/**
 * set token
 * @param - token
 */
function setToken(token) {
        localStorage.setItem("token", token);
    }


/**
 * checking localStorage on checked, userName
 * set checked, userName to localStorage
 */
 $(function() {

        if (localStorage.chkbx && localStorage.chkbx != '') {
            $('#rememberMe').attr('checked', 'checked');
            $('#loginEmail').val(localStorage.username);
        } else {
            $('#rememberMe').removeAttr('checked');
            $('#loginEmail').val('');
        }

        $('#rememberMe').click(function() {

            if ($('#rememberMe').is(':checked')) {
                localStorage.username = $('#loginEmail').val();
                localStorage.chkbx = $('#rememberMe').val();
            } else {
                localStorage.username = '';
                localStorage.chkbx = '';
            }
        });
    });





