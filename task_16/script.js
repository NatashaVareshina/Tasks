//Импортируем функции для работы с датами.
import { getFormatDates, getRelativeTime } from "./data.js";

const getThisDayInformation = () => {
    //Выводим в консоль информацию о сегодняшнем дне.
    console.log(`Today is ${getFormatDates()}. This week started ${getRelativeTime()}`)
}

//Проверяем работу функции getThisDayInformation.
getThisDayInformation()