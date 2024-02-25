const user = [
    { 
        name: 'Sid', 
        birthday: new Date(), 
        age: 29, 
        isMan: true, 
        address: { 
            state: 'NY', 
            city: 'New york' 
        }, 
        expertise: [
            'html', 
            'css', 
            'react'
        ], 
        income: null, 
        hobby: undefined, 
        test: { 
            NaN: NaN, 
            function: () => console.log('Hello'), 
            symbol: Symbol('test'), 
            infinity: 1e999, 
        }
    }
]

//Функция конвертации JSON в строку.
function stringify(data) {
    //Функция для проверки, является ли переданное ей значение равным null.
    const isNull = (value) => value === null && typeof value === 'object';

    //Функция для проверки, является ли переданное ей значение массивом.
    //Статический метод Array.isArray() проверяет, является ли переданный 
    //аргумент массивом. Возвращает true, если является, и false — если нет
    const isArray = (value) => Array.isArray(value) && typeof value === 'object';

    //Функция для проверки, является ли переданное ей значение объектом.
    const isObject = (value) => typeof value === 'object' 
        && value !== null 
        && !Array.isArray(value);

    //Функция для проверки, является ли переданное ей значение строкой.
    const isString = (value) => typeof value === 'string';

    //Функция для проверки, является ли тип переданного ей значения равным 
    //boolean.
    const isBoolean = (value) => typeof value === 'boolean';
    
    //Функция для проверки, является ли переданное ей значение числом.
    const isNumber = (value) => typeof value === 'number';

    //Функция для проверки, является ли переданное ей значение NaN. Для этого 
    //используется метод Number.isNaN(), который вернёт true только в том случае, 
    //если переданное значение является NaN.
    const isNaN = (value) => Number.isNaN(value)
    
    //Функция для проверки, является ли переданное ей значение конечным числом.
    //Для этого применяется метод isFinite(), который возвращает true, если это 
    //так, в противном случае - false.
    const isInfiniteNumber = (value) => typeof value === 'number' && !isFinite(value);

    //Функция для проверки, является ли переданное ей значение датой. Для этого 
    //применяется метод Object.prototype.toString.call(), который возвращает 
    //строковое представление типа объекта: если объект является датой, строка 
    //будет раавна "[object Date]".
    const isDate = (value) => Object.prototype.toString.call(value) === "[object Date]";

    //Функция для проверки, является ли переданное ей значение равным undefined.
    const isUndefined = (value) => typeof value === 'undefined' && value === undefined;

    //Функция для проверки, является ли переданное ей значение функцией.
    const isFunction = (value) => typeof value === 'function';

    //Функция для проверки, является ли переданное ей значение символом.
    const isSymbol = (value) => typeof value === 'symbol';

    //Функция для удаления последней запятой в строке.
    const removeComma = (str) => {
        //Разбиваем строку на массив, используя в качестве разделителя пустое 
        //значение.
        const arr = str.split('')
        
        //Удаляем последний элемент из массива.
        arr.pop();
        
        //Функция removeComma возвращает строку, полученную из элементов массива. 
        //Поскольку разделитель - пустая строка, элементы массива ничем не будут 
        //разделяться.
        return arr.join('');
    };

    //Функция вернет undefined, если оператор «ИЛИ» вернёт true. Для этого 
    //хотя бы одна из функций должна вернуть true.
    if (isUndefined(data) || isFunction(data) || isSymbol(data)) {
        return undefined;
    }

    //Вызываем функцию isDate, чтобы определить, является ли передаваемое ей 
    //значение датой. Если это так, то функция вернет true.
    if (isDate(data)) {
        //Если значением data является дата, возвращаем строку, полученную 
        //в результате работы метода date.toISOString(), который используется 
        //для преобразования содержимого объекта данных в строку в формате ISO (ISO 8601), 
        //то есть в виде (ГГГГ-ММ-DDTHH:mm:ss.sssZ или ±ГГГГ-ММ-DDTHH:mm:ss.sssZ).
        return `"${data.toISOString()}"`;
    }

    //Функция вернет null, если оператор «ИЛИ» вернёт true. Для этого 
    //хотя бы одна из функций должна вернуть true.
    if(isNaN(data) || isInfiniteNumber(data) || isNull(data)) {
        return null
    }

    //Вызываем функцию isArray, чтобы определить, является ли передаваемое ей 
    //значение массивом. Если это так, то функция верннт true.
    if (isArray(data)) {
        //Создаем пустую строку, в которую будет записывать элементы массива.
        let arrElements = '';
        
        //Перебираем элементы массива.
        //Оператор «ИЛИ» вернёт true, если хотя бы одна из функций вернет true.
        data.forEach((value) => arrElements += isNaN(value) 
            || isInfiniteNumber(value) 
            || isNull(value) 
            || isUndefined(value) 
            || isFunction(value) 
            || isSymbol(value) 
                //Если оператор «ИЛИ» вернет true, делаем запись в строку 
                //arrElements, еще раз вызывая функцию stringify и передавая ей 
                //null. В конце строки добавляем запятую.
                ? `${stringify(null)},` 
                //Если оператор «ИЛИ» вернет false, делаем запись в строку 
                //arrElements, еще раз вызывая функцию stringify и передавая ей 
                //value. В конце строки добавляем запятую.
                : `${stringify(value)},`
        )
        
        //В строке arrElements удаляем последнюю запятую.
        //Возвращаем строку, в которой находится массив, содержащий arrElements.
        return `[${removeComma(arrElements)}]`;
    }
    
    //Если хотя бы одна из функций вернет true, то оператор «ИЛИ» тоже вернет 
    //true.
    if (isNumber(data) || isString(data) || isBoolean(data)) {
        return isString(data) 
            //Если data является строкой.
            ? `"${data}"` 
            //Или data является числом, или typeof data === 'boolean'.
            : data;
    }
    
    //Вызываем функцию isObject, чтобы определить, является ли передаваемое ей 
    //значение объектом. Если это так, то функция вернет true.
    if (isObject(data)) {
        //Создаем пустую строку, в которую будет записывать свойства объекта.
        let objElements = '';
    
        //Object.keys() возвращает массив, содержащий ключи объекта.
        const arrObjKeys = Object.keys(data);
        
        arrObjKeys.forEach(key => {
            //Получаем значение свойства.
            const value = data[key];
            
            objElements += !(isUndefined(value) 
                || isFunction(value) 
                || isSymbol(value)) 
                    //Если value - не undefined, не функция и не символ.

                    //Здесь key - имя свойства объекта, а чтобы записать его 
                    //значение, нужно еще раз вызвать функциию stringify и 
                    //передать ей в качестве аргумента value.
                    ? `"${key}":${stringify(value)},` 
                    //Если value - undefined, функция или символ.
                    : ''
        });
        
        //В строке objElements удаляем последнюю запятую.
        //Возвращаем строку, в которой находится объект, содержащий objElements.
        return `{${removeComma(objElements)}}`;
    }
}

//Проверяем правильность работы функции stringify.
console.log(stringify(user) === JSON.stringify(user))