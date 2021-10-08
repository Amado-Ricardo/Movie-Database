function getAllMovies() {
    $.ajax('http://localhost:8080/movies', {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    })
        .then(data => {
            $('#loader').hide();
            renderMovies(data);
        })

}

function postMovie() {

    let title = $('#add-title').val();
    let rating = $('#add-rating').val();

    // $.ajax('http://localhost:8080/movies', [{title, rating}], function (response) {
    $.ajax({

        type: "POST",
        url: 'http://localhost:8080/movies',

        function(response){
            console.log(response);
            console.log(title);
            console.log(rating);

            $('#add-title').val('');
            $('#add-rating').val('');
            getAllMovies();

        }

    })
}

function postEdit(e, id) {

    e.preventDefault();

    let title = $('#edit-title').val();
    let year = $('#edit-year').val();
    let genre = $('#edit-genre').val();
    let actors = $('#edit-actors').val();
    let director = $('#edit-director').val();
    let plot = $('#edit-plot').val();
    let rating = $('#edit-rating').val();
    let poster = $('#edit-poster').val();

    let obj = {
        title, genre, actors, director, plot, rating, year, poster, id
    }
    console.log(obj);

    let objArr = Object.entries(obj);
    let filter = objArr.filter(([k, v]) => !!v);
    obj = Object.fromEntries(filter)
    console.log(obj);

    $.ajax(`http://localhost:8080/movies`, {method: 'PUT', data: obj}).done(res => {
        $('#edit-container').empty();
        getAllMovies();
    })
}

function sendDelete(id) {


    $.ajax(`http://localhost:8080/movies`, {
        method: "DELETE",
        body: JSON.stringify(id)
    }).done(res => {
        getAllMovies()
    })
        .then(response => console.log(response))
        .catch(err => {
            console.log('error: ' + err);
        });
}
