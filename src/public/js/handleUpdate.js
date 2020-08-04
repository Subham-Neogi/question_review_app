
const updateBtn = document.getElementById( "update" );

updateBtn.addEventListener( "click", function ( event ) {
    event.preventDefault();
    let url = document.location.href;
    let params = url.split('?')[1].split('&')[0].split('=');
    if(confirm("Are you sure you want to update this question?")) {
        window.location.href = "update.html?id="+encodeURIComponent(params[1]);
    }
} );