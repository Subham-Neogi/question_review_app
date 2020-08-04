window.addEventListener( "load", function () {
    function sendData() {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const FD = new FormData( form );
        //console.log(FD);

        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
        let response = JSON.parse( event.target.responseText );
        if ("message" in response) {
            alert(response["message"]);
        }
        else {
            alert("Question submitted successfully");
            form.reset();
        }
        } );

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
        } );

        // Set up our request
        XHR.open( "POST", "/api/v1/faqs" );

        //Use Content-Type JSON
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        let jsonObject = {};

        for (const [key, value]  of FD.entries()) {
            if (key === "video_url" && value.trim() === "") continue;
            jsonObject[key] = value;
        }
        console.log(jsonObject);
        // The data sent is what the user provided in the form
        XHR.send( JSON.stringify(jsonObject) );
    }
    
    // Access the form element...
    const form = document.getElementById( "myForm" );

    // ...and take over its submit event.
    form.addEventListener( "submit", function ( event ) {
        event.preventDefault();

        sendData();
    } );
} );