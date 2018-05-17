
/**
 * get users and built table users, built pagination page
 */
$( document ).ready(function() {
    getUserList(0);
});

/**
 * get token
 * get token from localStorage
 */
function getToken(){
    return localStorage.getItem("token");
}

/**
 *
 * @param page - current page,
 * @param query - search value,
 * @param pageSize - users at page,
 * @param sortBy - methods sort users list,
 * get users, built user table, built pagination page
 */
function getUserList(page, query='', pageSize ='7', sortBy = 'id') {
    /*console.log('get list');*/
    var token = getToken();

    $.ajax({
        type: "GET",
        url:"https://report.inventorsoft.co/app/users?sortBy="+sortBy+"&pageSize="+pageSize+"&page="+page+"&query="+query,
        contentType: "application/json",
        headers: {"Authorization" : token},
        success: function (response) {
            buildUserList(response.content);
            buildPag(response.totalPages, response.number);
        },
        error: function (error) {
             $('#errorModal').modal('show',
                    $('#numberError').text(error.status),
                    $('#statusError').text(error.statusText)
             );

        }
    });
}

/**
 *
 * @param list - user list
 * built table users
 */
function buildUserList(list) {

    $('tbody').html('');

    list.forEach(function(user) {

        $('tbody').append('<tr>');
            for(var key in user){
                var value= (user[key]==null ? '': user[key]);
                $('tbody tr:last-child').append('<td>' + value + '</td>');
            }
            $('tbody tr:last-child')
                .append("<button class='btn btn-outline-primary ' onclick='onEdit("+user.id+")' data-toggle='modal' data-target='#modalEdit'> <i class='fas fa-edit'></i> </button>");

            $('tbody tr:last-child')
                .append("<button class='btn btn-outline-danger ' onclick='onRemove("+user.id+")' data-toggle='modal' data-target='#modalDelete'> <i class='fas fa-trash-alt'></i></button>");

        $('tbody').append('</tr>');
    });

}

/**
 *
 * @param totalPages - total pages
 * @param number - current pages,
 * built pagination
 */
function buildPag(totalPages, number) {
    /*console.log('totalPages = ', totalPages);*/
    var pagination = '<ul class="pagination d-flex justify-content-end">';

    var disabledPrevious = (number == 0 ? 'disabled' : '' );
    pagination += '<li class="page-item '+ disabledPrevious +'"><a href="#"  class="page-link" onclick="previous('+(number - 1)+')">&laquo;</a ></li>';

    for (var i = 0; i < totalPages; ++i) {
        var active = (number == i ? 'active' : '' );
        pagination += '<li class="page-item ' + active + '"><button class="page-link" onclick="getPage('+i+')">' + (i + 1) + '</button ></li>';
    }

    var disabledNext = (number == totalPages-1 ? 'disabled' : '' );
    pagination += '<li class="page-item '+ disabledNext +'"><a href="#" id="btnNextPage" class="page-link" onclick="next('+(number + 1)+','+totalPages+')">&raquo;</a></li>';

    pagination += '</ul>';
    $('#pagination').html(pagination);
}

/**
 *
 * @param page - current page,
 * get users list
 */
function getPage(page) {
    getUserList(page);
    /*console.log('get page = ', page);*/
}

/**
 *
 * @param page - current page,
 * get users list
 */
function previous(page) {
    getUserList(page);
    /*console.log('previus = ', page);*/
}

/**
 *
 * @param page - current page,
 * get users list
 */
function next(page) {
    getUserList(page);
    /*console.log('next = ', page);*/
}

/**
 *
 * @param user - current user,
 * delete user
 */
function onRemove(user) {
    /*console.log('on remove = ', user);*/

    /*event confirm delete user*/
    $("#confirmDelete").on("click", function(e) {
       /* console.log('confirm = ', user);*/

        var token = getToken();
         $.ajax({
         type: "DELETE",
         url:"https://report.inventorsoft.co/app/users/"+ user,
         contentType: "application/json",
         headers: {"Authorization" : token},
         success: function (response) {
              console.log('user' + user + 'delete', response);
             $('#successModal').modal('show',
                 $('#textAction').text('Deletion')
             );
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


    })
}

/**
 *
 * @param id - id current user,
 * edit first name and last name at user
 */
function onEdit(id) {
    getUser(id);
}

/**
 * get user data
 * @param id - user id
 */
function getUser(id) {

    var token = getToken();

    return $.ajax({
        type: "GET",
        url:"https://report.inventorsoft.co/app/users/"+id,
        contentType: "application/json",
        headers: {"Authorization" : token},
        success: function (user) {
            /*console.log(user);*/
            buildEditModal(user);
        },
        error: function (error) {
            $('#errorModal').modal('show',
                $('#numberError').text(error.status),
                $('#statusError').text(error.statusText)
            );

        }
    });
}

/**
 *
 * @param user - current user,
 * built edit modal window with name user
 */
function buildEditModal(user) {
    /*console.log('user' + user);*/
    var id=user.id;

    $("#editFirstName").attr("value", user.firstName);
    $("#editLastName").attr("value", user.lastName);

    $("#saveEdit").on("click", function(e) {

        var formEdit = $("#formEdit");

        var editFirstName = $(formEdit).find('input[name="firstName"]').val(),
            editLastName = $(formEdit).find('input[name="lastName"]').val();


        var formEditInfo = {
            firstName: editFirstName,
            lastName: editLastName,
        };

       /* console.log(formEditInfo);*/

        var regexName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

        if (formEditInfo.firstName === '')  {
            $("#editFirstName").addClass("error ");
            $('#editFirstNameError').text("First name cannot be blank ").show();

        } else if  (!regexName.test(formEditInfo. firstName)) {
            $("#editFirstName").addClass("error ");
            $('#editFirstNameError').text("First name should consist of latin letters").show();

        } else if (formEditInfo.lastName === '')  {
            $("#editLastName").addClass("error ");
            $('#editLastNameError').text("Last name cannot be blank ").show();
            $("#editFirstName").addClass("success ");
            $('#editFirstNameError').hide();

        } else if  (!regexName.test(formEditInfo. lastName)) {
            $("#editLastName").addClass("error ");
            $('#editLastNameError').text("First name should consist of latin letters").show();
        }
        else {
            editUser(id);
            $("#editFirstName").addClass("success ");
            $('#editFirstNameError').hide();
            $("#editLastName").addClass("success ");
            $('#editLastNameError').hide();
        }


    });
}

/**
 *
 * @param id - id current user,
 * request edit user
 */
function editUser(id){
   /* console.log('send edit user..'+ id);*/

    var formEdit = $("#formEdit");

    var editFirstName = $(formEdit).find('input[name="firstName"]').val(),
        editLastName = $(formEdit).find('input[name="lastName"]').val();


    var formEditInfo = {
        firstName: editFirstName,
        lastName: editLastName,
    };

    var info = JSON.stringify(formEditInfo);

    var token = getToken();
    $.ajax({
        type: "PATCH",
        url:"https://report.inventorsoft.co/app/users/" + id,
        data: info,
        contentType: "application/json",
        headers: {"Authorization" : token},
        success: function () {

            $('#editSuccess').html('');
            $('#editSuccess').append('<h3> </h3>');
            $('#editSuccess h3').text('successful');

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

/**
 * log out
 * remove token at localStorage
 */
function logout() {
    localStorage.removeItem("token");
}
























