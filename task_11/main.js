//Замыкание – функция, которая запоминает свои внешние переменные и может получить 
//к ним доступ. Все функции в JavaScript являются замыканиями.
//Лексическое окружение - это скрытый объект, который связан с функцией и создаётся 
//при её запуске. В нём находятся все локальные переменные этой функции, ссылка на 
//внешнее лексическое окружение, а также некоторая другая информация.
//Не смотря на то, что функция getRequestsNumber уже выполнилась, ее лексическое 
//окружение нам доступно, поскольку у нас есть ссылка на него.

//Глобальное лексическое окружение (1) - функция getRequestsNumber и переменная result. 
//У глобального окружения нет внешнего окружения (ссылка на внешнее окружение равна 
//null).

//Первое внутреннее лексическое окружение (2) создано при вызове функции 
//getRequestsNumber, которая в качестве результата возвратит другую функцию, которая 
//сохраняется в константу result. В этом лексическом окружении будет находиться 
//переменная requestsNumber со значением 0, и ссылка на внешнее (глобальное) 
//окружение.

//Второе внутреннее лексическое окружение (3) соответствует вызову result(). 
//Здесь ссылка на внешнее лексическое окружение (2), т.к. в JavaScript функция 
//«запоминает» то место, в котором она была создана.

const getRequestsNumber = () => {
    //Создаем переменную, значение которой будем увеличивать
    let requestsNumber = 0

    //Возвращаем функцию, которая возвращает увеличенное на единицу значение 
    //переменной requestsNumber.
    return function() {
        return ++requestsNumber
    }
}

//Сохраняем ссылку на функцию getRequestsNumber в result.
const result = getRequestsNumber()

//Выводим результат в консоль для проверки работы
console.log(result())

//Выводим результат в консоль для проверки работы
console.log(result())

//Выводим результат в консоль для проверки работы
console.log(result())