
const deleteBtn = document.getElementById( "delete" );

deleteBtn.addEventListener( "click", function ( event ) {
    function deleteData() {
        let url = document.location.href;
        let params = url.split('?')[1].split('&')[0].split('=');
        const XHR = new XMLHttpRequest();

        // Define what happens on successful deletion
        XHR.addEventListener( "load", function(event) {
        alert("Question deleted successfully!");
        });

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
        } );

        // Set up our request
        XHR.open( "DELETE", "/api/v1/faqs/"+params[1] );

        //Use Content-Type JSON
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        XHR.send();
    }

    event.preventDefault();
    if(confirm("Are you sure you want to delete this question?")) {
        deleteData();
        window.location.href = "list.html";
    }
} );