const apiKey = 'c54984daa00a4835b07135758211209'
const row = document.querySelector('.row');
const myDate = new Date();
const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const findInput = document.getElementById('findInput');
let data = [];
let SearchData = [];
let col ='';


async function getData(city='cairo'){
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    let res = await fetch(url);
    data = await res.json();
    displayAll()

}

function displayCurrent(){
        
 col += `
 <div class="col-lg-4  mb-5">
<div class="card text-white shadow" >
    <div class="card-header main-color d-flex justify-content-between">
        <div> 
            ${day[myDate.getDay()]}
        </div>
        <div> 
            ${data.forecast.forecastday[0].date}

        </div>
        
    </div>
    <div class="card-body pt-5">
      <h5 class="card-title main-color">${data.location.name}</h5>
      <div class="d-flex justify-content-between pt-3 pb-5">
        <h2 class="card-text ">${data.current.feelslike_c}<sup>o</sup>C</h2>
        
        <img class="currentIcon" src="https:${data.current.condition.icon}">

      </div>
      <span>${data.current.condition.text}</span>
      <div class="weather-icons">
      <i class="fas fa-umbrella fa-1x me-3"> ${data.forecast.forecastday[0].day.daily_chance_of_rain}%</i>
      <i class="fas fa-wind fa-1x me-3"> ${data.current.wind_kph}km/h</i>
      <i class="fas fa-compass fa-1x me-3"> ${data.current.wind_dir}</i>
      
      </div>

    </div>
  </div>
</div>

 
 `

}

function displayDay(index){
    
    col += `
    
<div class="col-lg-4  mb-5 text-center">
<div class="card bg-dark text-white shadow pb-1" >
    <div class="card-header main-color d-flex justify-content-between ">
    
    <div> 
        ${day[myDate.getDay()+index]}
    </div>
    <div> 
     ${data.forecast.forecastday[index].date}

    </div>
    </div>
    <div class="card-body py-5">
        
      <img src="https:${data.forecast.forecastday[index].day.condition.icon}">
      <h3 class="card-text pt-3">${data.forecast.forecastday[index].day.maxtemp_c}<sup>o</sup>C</h3>
      <h6 class="card-text pb-5">${data.forecast.forecastday[index].day.mintemp_c}<sup>o</sup>C</h6>
      
      <span>${data.forecast.forecastday[index].day.condition.text}</span>

    </div>
  </div>
</div>

    `
    
}

function displayAll(){
displayCurrent();
displayDay(1);
displayDay(2);
row.innerHTML= col
}

async function searchReq(){
    let firstUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${findInput.value}&days=3`
    let res = await fetch(firstUrl);
    SearchData = await res.json();
    console.log(SearchData);
    getDataAfterSearch(SearchData)
    // displayAll()
}
async function getDataAfterSearch(dataAfterSearch){
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${dataAfterSearch[1].name}&days=3`
    let res = await fetch(url);
    data = await res.json();
    console.log(data);
    col=''
    displayAll()
}
 
getData();

findInput.addEventListener('keyup',searchReq)