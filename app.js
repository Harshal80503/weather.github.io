const weatherApi = {
    key: "aade08d19021b793d388e1208fb66246",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

var coverimg = document.getElementById('img1');
var body_weather = document.getElementById('whb');
var sug = document.getElementById('sugs');


  

  
  
searchInputBox.addEventListener('keypress', (event) => {

    if (event.key == 'Enter') {
        console.log(searchInputBox.value);
        getweatherReport(searchInputBox.value)

        coverimg.style.display = 'none';
        body_weather.style.display = 'block';
        sug.style.display = 'none';
        
    }

});

function getweatherReport (city) {
        fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
          .then(weather => {
            return weather.json();
          }).then(showWeatherReport, convertIntoCel)
}

function showWeatherReport (weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}K`;

    let minMaxtemp = document.getElementById('min-max');
    minMaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}K (min)/ ${Math.ceil(weather.main.temp_max)}K (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('clear_1.jpg')";
    }

    if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('cloudy_1.jpg')";
    }

    if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('haze_2.jpg')";
    }

    if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url('mist_1.jpg')";
    }

    if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('rain_1.jpg')";
    }

    // else{
    //     document.body.style.backgroundImage = "url('bg_2.jpg')";
    // }
}

var i = 1;

function convertIntoCel(){
    let temperature = document.getElementById('temp');
    
    if(i==1){
    var currentStr = temperature.innerText;
    var currentT = parseInt(currentStr);
    var Cvalue = currentT-273.15;

    temperature.innerHTML = `${Math.round(Cvalue)}&deg;C`;
    i++;
    }    
}

var j = 1;

function convertIntoFar(){
    let temperature = document.getElementById('temp');

    if(j==1){
    var currentStr = temperature.innerText;
    var currentT2 = parseInt(currentStr);
    var Cvalue2 = (currentT2-273.15)*9/5 +32;

    temperature.innerHTML = `${Math.round(Cvalue2)}&deg;F`; 
    j++;
    }   
}

















function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}







const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  const searchInput = document.querySelector('.input-box');
  const suggestionsPanel = document.querySelector('.suggestions');
  
  searchInput.addEventListener('keyup', function() {
    const input = searchInput.value;
    suggestionsPanel.innerHTML = '';
    
    const suggestions = countries.filter(function(country) {
      return country.toLowerCase().startsWith(input);
    });
    suggestions.forEach(function(suggested) {
      const div = document.createElement('div');
      div.innerHTML = suggested;
      suggestionsPanel.appendChild(div);
    });
    if (input == '') {
      suggestionsPanel.innerHTML = '';  
    }

    searchInput.addEventListener('keypress', (event) => {

        if (event.key == 'Enter') {
            suggestionsPanel.innerHTML = '';
            suggestionsPanel.style.display = 'none';
            
        }
        if (event.key != 'Enter') {
            
            suggestionsPanel.style.display = 'block';
            
        }

    
    });


    
  });


 
