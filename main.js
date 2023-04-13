const NetFlix = 'http://localhost:3000/NetFlix'

function start() {
    getAPI(renderMovies);
    HandleCreateMovies();
}

start();

function getAPI(callback) {
    fetch(NetFlix)
        .then((response) => {
            return response.json();
        })
        .then(callback)
        .catch((error) => {
            console.log('Error' + error)
        })
        .finally(() => {
            console.log('Done!')
        })
}

function postAPI(data, callback){
    const options = {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    };
    fetch(NetFlix, options)
        .then((response) => {
            return response.json();
        })
        .then(callback)
        .catch((error) => {
            console.log('Error' + error)
        })
        .finally(() => {
            console.log('Done!')
        })
}

function HandleDeleteMovies(id){
    const options = {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    fetch(NetFlix + '/' + id, options)
        .then((response) => {
            return response.json();
        })
        .then(() => {
            // Delete khỏi UX không cân call lại API
            var getMovie = document.querySelector('.row-'+id)
            if(getMovie){
                getMovie.remove();
            }
        })
        .catch((error) => {
            console.log('Error' + error)
        })
        .finally(() => {
            console.log('Done!')
        })
}

function putAPI(callback){
    var title = document.querySelector('input[name="title"]').value
    var author= document.querySelector('input[name="author"]').value
    var data= {
        title: title,
        author: author,
    }
    const options = {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    };
    fetch(NetFlix + "/" + id, options)
        .then((response) => {
            return response.json();
        })
        .then(callback)
        .catch((error) => {
            console.log('Error' + error)
        })
        .finally(() => {
            console.log('Done!')
        })
}

function renderMovies(movies) {
    let getMovie = document.querySelector('.movie-list')
    const movie = movies.map((e) => {
        console.log(e);
        return `
                <div class="row-${e.id}">
                    <div class="col-md-3 movie-item">
                        <img src="${e.image}" alt="Movie Title">
                        <h4>${e.title}</h4>
                        <h5>${e.author}</h5>
                    </div>
                    <button onclick="HandleRepairMovies(${e.id})">Repair</button>
                    <button onclick="HandleDeleteMovies(${e.id})">Delete</button>
                </div>
                `
    })
    getMovie.innerHTML = movie.join('');
}

// Thêm Movies vào UX không cần call API
function addMoviesList(e){
    let getMovie = document.querySelector('.movie-list')
    const newMovie = `
                <div class="row-${e.id}">
                    <div class="col-md-3 movie-item">
                        <img src="${e.image}" alt="Movie Title">
                        <h4>${e.title}</h4>
                        <h5>${e.author}</h5>
                        <p>Movie Info</p>
                    </div>
                    <button onclick="HandleDeleteMovies(${e.id})">Delete</button>
                </div>
                `;
    getMovie.innerHTML+= newMovie;
}

function HandleCreateMovies(){
    let CreateMovie = document.querySelector('#button');
    CreateMovie.onclick = () => {
        let title = document.querySelector('input[name="title"]').value;
        let author = document.querySelector('input[name="author"]').value;
        // let img = document.querySelector('input[name="img"]');
        // let image = img.files[0];
        let formData = {
            title: title,
            author: author,
            // image: image
        }
        postAPI(formData, (data) => {
            addMoviesList(data) // Them phim moi vao danh sach
        });
    }
}

function HandleRepairMovies(id){
    console.log(id);
}