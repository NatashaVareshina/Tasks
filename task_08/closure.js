//Функции для выполнения
const getFirstFunction = () => {
    return "It's the first function"
}

const getSecondFunction = () => {
    return "It's the second function"
}

const getThirdFunction = () => {
    return "It's the third function"
}

//Создаем массив функций
const functionsArr = [getFirstFunction, getSecondFunction, getThirdFunction]

//Функция sortOutFunctionsArr получает массив и возвращает новую функцию, 
//вызывающую каждую функцию в полученном массиве и возвращающую 
//массив результатов вызова каждой функции.
const sortOutFunctionsArr = (arr) => {
    return function(arr) {
        //Создаем массив, в который будем сохранять результат работы каждой 
        //вызванной нами функции.
        const results = []
        
        //Перебираем массив, полученный функцией sortOutFunctionsArr.
        arr.forEach(func => {
            //Добавляем в конец массива результат работы функции в текущей 
            //итерации.
            results.push(func())
        });
        
        //Возвращаем массив
        return results
    }
}

//Сохраняем ссылку на функцию sortOutFunctionsArr в sortedOutFunctionsArr.
const sortedOutFunctionsArr = sortOutFunctionsArr()

//Выводим результат в консоль для проверки работы
console.log(sortedOutFunctionsArr(functionsArr))