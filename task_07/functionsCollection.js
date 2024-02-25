//Функции для выполнения
const getFirstFunction = () => {
    console.log("It's the first function")
}

const getSecondFunction = () => {
    console.log("It's the second function")
}

const getThirdFunction = () => {
    console.log("It's the third function")
}

//Создаем массив функций
const functionsArr = [getFirstFunction, getSecondFunction, getThirdFunction]

//Функция, которая вызовет каждую функцию в передаваемом ей массиве и выведет 
//ее порядковый номер.
const sortOutFunctionsArr = (arr) => {
    //Перебираем массив функций.
    arr.forEach((func, index) => {
        //Вызываем функцию в текущей итерации.
        func()
        //Выводим в консоль порядковый номер функции в ткущей итерации.
        console.log(`Порядковый номер вызванной функции в массиве: ${index + 1}`)
    })
}

//Проверяем работу функции sortOutFunctionsArr на примере массива functionsArr.
sortOutFunctionsArr(functionsArr)