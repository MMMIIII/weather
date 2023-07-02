import { boot } from 'quasar/wrappers'
import axios from 'axios'

// получить погоду сейчас weather, получить погоду на 5 дней forecast.
async function getWeatherAPI(city: string ,metric: string,dayOrDays: string){
    try {
        const config = {
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/${dayOrDays}?q=${city}&appid=d7fa88800b7d3fd252c9dc71e0ce62e0&lang="ru"&units=${metric}`
        }
        let res = await axios(config)
        return res.data;
    } catch(er) {
        console.log(er)
    }
}
export default boot(() => {

})

export {getWeatherAPI }
