import conditions from "./condition.js";




const apiKey = 'a76acaa926aa49e0977192509243009';


const form = document.getElementById('form');
const input = document.getElementById('search_input');
const cardsHolder = document.querySelector('.weather_screen_items')
let globalData;
let globalForecast;

console.log(conditions)




//Отслеживаем отправку формы
form.onsubmit = async function (event) {
    //Отменяем отправку формы и перезагрузку страницы
    event.preventDefault();
    getWeather()
    getForecast()

}

async function getForecast() {
    let city = input.value.trim();

    const forecastQuey = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
    try {
        let foreCast7 = await fetch(forecastQuey);
        let dataFore = await foreCast7.json();
        console.log(dataFore.forecast.forecastday);
        globalForecast = dataFore;
        console.log('check forecast', globalForecast.forecast.forecastday[0].date)

    }
    catch (error) {
        console.error(error)
    }

}

async function getWeather() {
    let city = input.value.trim();
    const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    //Выполняем запрос
    try {

        let response = await fetch(query);
        let data = await response.json();
        globalData = data;

        if (globalData.error) {
            removeCard();
            errorCode();
        }
        else {
            removeCard();
            await getForecast();
            changeValue();


        }

    }
    catch (error) {
        console.error(error);

    }
}

function removeCard() {
    const prevCards = document.querySelectorAll('.weather_card');
    if (prevCards) prevCards.forEach(card => card.remove())

}


function errorCode() {

    if (globalData.error.message === 'Parameter q is missing.') {
        cardsHolder.insertAdjacentHTML('afterbegin', '<div class="weather_card"> Введите название города</div>')
    }

    else {
        const htmlError = `<div class='weather_card'>${globalData.error.message}</div>`
        cardsHolder.insertAdjacentHTML('afterbegin', htmlError)
    }

}


function changeValue() {



    //weather descr on Russian

    const info = conditions.find(function (obj) {
        if (obj.code === globalData.current.condition.code) return true;


    })
    const infoLang = info.languages[23].day_text




    const html = `<div class="weather_card">
                    <div class="weather_card_main">
                        <div class="weather_left">
                            <div class="weather_location">
                                <p class="cityName" id="cityName">${globalData.location.name}</p>
                                <div class="cityIndex">${globalData.location.country}</div>
                            </div>
                            <div class="weather_descr">
                                <p class="temperature">${globalData.current.temp_c} °C</p>
                                <p class="weather_state">${infoLang}</p>
                            </div>

                        </div>
                        <div class="weather_right">
                            <img class="weather_img" src="${globalData.current.condition.icon}" alt="">
                            <div>
                                <button class='forecast'> 7DAYS</button>
                            </div>
                        </div>
                    </div>
                    <div class="wheather_card_bottom hidden">
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[0].date}</p>
                            <img src="${globalForecast.forecast.forecastday[0].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[0].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[1].date}</p>
                            <img src="${globalForecast.forecast.forecastday[1].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[1].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[2].date}</p>
                            <img src="${globalForecast.forecast.forecastday[2].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[2].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[3].date}</p>
                            <img src="${globalForecast.forecast.forecastday[3].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[3].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[4].date}</p>
                            <img src="${globalForecast.forecast.forecastday[4].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[4].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[5].date}</p>
                            <img src="${globalForecast.forecast.forecastday[5].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[5].day.maxtemp_c} °C</p>
                        </div>
                        <div class="day">
                            <p class="data">${globalForecast.forecast.forecastday[6].date}</p>
                            <img src="${globalForecast.forecast.forecastday[6].day.condition.icon}" alt="">
                            <p class="temp_small">${globalForecast.forecast.forecastday[6].day.maxtemp_c} °C</p>
                        </div>
                        
                    </div>

                </div>`

    //отображаем карточку на странице

    cardsHolder.insertAdjacentHTML('afterbegin', html)

    console.log(globalData)

    const sevenDays = document.querySelector('.forecast');
    sevenDays.addEventListener('click', function () {
        const wheatherCardBottom = document.querySelector('.wheather_card_bottom');
        wheatherCardBottom.classList.toggle('hidden')
    })


}












