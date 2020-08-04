window.addEventListener( "load", function () {
    function getData() {
        const XHR = new XMLHttpRequest();

        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
        let items = JSON.parse( event.target.responseText );
        items = items.reverse();
        //console.log(items);
        function makeList() {
            // Get container element for the list
            let listContainer = document.getElementById('main');
            // Make the list
            let listElement = document.createElement('ul');
            listElement.setAttribute("class", "list-group");
            // Set up a loop that goes through the items in listItems one at a time
            let numberOfListItems = items.length,
            listItem,
            i;

            // Add it to the page
            listContainer.appendChild(listElement);

            for (i = 0; i < numberOfListItems; ++i) {
                // create an item for each one
                listItem = document.createElement('li');

                // Create the card
                let div = document.createElement('div');
                div.setAttribute("class", "card bg-light");
                let div_inner = document.createElement('div');
                div_inner.setAttribute("class", "card-body");
                let h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title");
                h5.innerText = items[i]["question"];
                div_inner.appendChild(h5);
                let h6 = document.createElement('h6');
                h6.setAttribute("class", "card-subtitle mb-2 text-muted");
                h6.innerText = items[i]["date"];
                div_inner.appendChild(h6);
                let p = document.createElement('p');
                p.setAttribute("class", "card-text");
                p.innerText = items[i]["answer"].substring(0,100)+"...";
                div_inner.appendChild(p);
                let a = document.createElement('a');
                a.setAttribute("class", "btn btn-primary");
                a.setAttribute("href", "question.html?id="+encodeURIComponent(items[i]["_id"].valueOf()));
                a.innerText = "Read more";
                div_inner.appendChild(a);

                div.appendChild(div_inner);
                listItem.setAttribute("class", "list-group-item");
                listItem.appendChild(div);
                // Add listItem to the listElement
                listElement.appendChild(listItem);
            }
        }

        // Usage
        makeList();
        } );

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
        } );

        // Set up our request
        XHR.open( "GET", "/api/v1/faqs", true);

        //Use Content-Type JSON
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        XHR.send();
    }
    
    getData();
} );