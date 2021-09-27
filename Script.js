//API variables
const Api_url='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a345d585df992fddaccfd0aad254bc24&page=1';
const img_path='https://image.tmdb.org/t/p/w1280';
const search_api='https://api.themoviedb.org/3/search/movie?api_key=a345d585df992fddaccfd0aad254bc24&language=en-US&page=1&include_adult=false&query="';

//Dom variables
let searchValue=document.getElementById("search");
let main=document.getElementById("main");
let form=document.getElementById("form");
getApiMovie(Api_url);
//Initial Dom from Api
async function getApiMovie(url){
   const res= await fetch(url);
   const data= await res.json();
   const movies=data.results;
   movies.forEach(movie => {
    const {title,poster_path,overview,vote_average}=movie;
    const movieEl=document.createElement("div");
    movieEl.classList.add('movie');
    movieEl.innerHTML=`
    <img src="${img_path + poster_path}" alt="${title}">
    <div class="movie-info">
        <h2>${title}</h2>
        <span class="${returnClass(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>   
    `
    main.appendChild(movieEl);
   });
}
//Search Result
form.addEventListener('submit',e=>{
    e.preventDefault();
    const input=searchValue.value;
    if(input!=''){
        main.innerHTML='';
        const serchKey=search_api + input;
        getApiMovie(serchKey);
        searchValue.value='';
    }else{
        window.location.reload();
    }
    
})
function returnClass(vote){
    if(vote>=8){
        return "green";
    }else if(vote>=5){
        return "orange";
    }
    else{
        return "red";
    }
}
