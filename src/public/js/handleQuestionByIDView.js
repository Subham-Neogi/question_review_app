window.addEventListener( "load", function () {
    let url = document.location.href;
    let params = url.split('?')[1].split('&')[0].split('=');
    if (params[0] !== "id") {
        alert("Oops! URI is invalid.");
    }
    else {
        let id = params[1];
        function getData() {
            const XHR = new XMLHttpRequest();
    
            // Define what happens on successful data submission
            XHR.addEventListener( "load", function(event) {
            let item = JSON.parse( event.target.responseText );
            //console.log(item);
            let display = document.getElementById("display-4");
            display.innerText = item["question"];
            let lead = document.getElementById("lead");
            lead.innerText = item["date"];
            let p = document.getElementById("ans");
            p.innerText = item["answer"];
            if ("video_url" in item) {
                let url = document.getElementById("url");
                let a = document.createElement("a");
                a.setAttribute("class", "btn btn-outline-primary");
                a.setAttribute("href", item["video_url"]);
                a.innerText = "Reference URL";
                url.appendChild(a);
            }
            } );
    
            // Define what happens in case of error
            XHR.addEventListener( "error", function( event ) {
            alert( 'Oops! Something went wrong.' );
            } );
    
            // Set up our request
            XHR.open( "GET", "/api/v1/faqs/"+id, true);
    
            //Use Content-Type JSON
            XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
            XHR.send();
        }
        
        getData();
    }
} );