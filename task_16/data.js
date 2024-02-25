//Создаем и экспортируем функцию getFormatDates, позволяющую узнать, какой 
//сегодня день недели.
export const getFormatDates = () => {
    //Возвращаем сегодняшний день недели.
    return moment().format('dddd')
}

//Создаем и экспортируем функцию getRelativeTime, позволяющую узнать, какой 
//сегодня день недели.
export const getRelativeTime = () => {
    //Возвращаем информацию о том, сколько дней назад началась текущая неделя.
    return moment().startOf('week').fromNow();
}