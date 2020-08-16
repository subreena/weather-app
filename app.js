const api = {
    key: "f0dfc0bba4b485e9f2451a12eb16d844" ,
    // proxy: "https://cors-anywhere.herokuapp.com/",
    base: "api.openweathermap.org/data/2.5/" 
}
let lat , long;
const city = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const feel = document.querySelector(".feel");
const weather = document.querySelector('.weather');
const weatherImg = document.querySelector('.img');
const hiLow= document.querySelector('.hilow');
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');

function getWeather(data){
    console.log(data);
   city.innerHTML = `${data.name} , ${data.sys.country}`;
   temperature.innerHTML = `${data.main.temp}`;
   feel.innerHTML = `Feels like ${data.main.feels_like}`;
   hiLow.innerHTML = `High ${data.main.temp_max} &deg;C / Low ${data.main.temp_min} &deg;C `;
   weather.innerHTML = `${data.weather[0].main} , ${data.weather[0].description}`;
   weatherImg.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}

window.addEventListener("load", function (){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            fetch(`https://${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
            .then(response => { return response.json();})
            .then(data =>{ getWeather(data)})
        })
    }
})


searchBtn.addEventListener("click", ()=>{
   const inputSearch = searchBox.value;
   fetch(`https://${api.base}weather?q=${inputSearch}&units=metric&appid=${api.key}`)
   .then(response => {return response.json();})
   .then(data => {getWeather(data)})
})