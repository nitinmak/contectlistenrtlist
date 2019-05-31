// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    alert('fdfd');
     var options = new ContactFindOptions();
        options.filter = $("#searchTerm").val();
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;
        var fields = ["displayName", "name",];
        navigator.contacts.find(fields, onSuccess, onError, options);
         function onSuccess(contacts) {
        $("#contacts-list").empty();

        if (contacts.length == 0) {
            $("#contacts-list").append("<li>No results</li>").listview("refresh");
        } else {
            for (var i = 0; i < contacts.length; i++) {
                $("#contacts-list").append("<li>" + contacts[i].displayName + "</li>").listview("refresh");
            }
        }

        $.mobile.loading("hide");
    };

    function onError(contactError) {
        $.mobile.loading("hide");
        alert(contactError);
    };
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})