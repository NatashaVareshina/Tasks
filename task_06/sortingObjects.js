const users = [
    { 
        name: 'John', 
        age: 20, 
    }, 
    { 
        name: 'Ann:', 
        age: 30, 
    }, 
    { 
        name: 'Pete', 
        age: 25, 
    }, 
    { 
        name: 'Ervin', 
        age: 25, 
    }, 
    { 
        name: 'Leanne', 
        age: 30, 
    }
]

//Функция, сортирующая массив, передаваемый ей в качестве аргумента, по возрастанию 
//возраста, а при равных возрастах - по алфавиту по полю name.
const sortArr = (arr) => {
    //Метод Array.sort() используется для сортировки массива на месте в заданном 
    //порядке в соответствии с прописанной в скобках функцией.
    
    return arr.sort((x, y) => x.age !== y.age 
        //Если возраст не равен, элементы упорядочиваютя в порядке возрастания:
        //а) если x.age - y.age < 0, значит, x.age идёт первым;
        //б) если x.age - y.age = 0, сортировка оставит x.age и y.age неизменными 
        //по отношению друг к другу, но отсортирует их по отношению ко всем другим 
        //элементам;
        //в) x.age - y.age > 0, сортировка поставит y.name по меньшему индексу, чем 
        //x.name.
        ? x.age - y.age 
        //Если возраст равен, то используем метод string.localeCompare(), в котором 
        //y.name - параметр, представляющий собой строку, с которой сравнивается 
        //эталонная строка x.name.
        //Выходные данные localeCompare() метода представляют собой целое число, 
        //указывающее порядок сравнения строк. Возвращаемое значение может быть 
        //одним из этих трех возможных значений:
        //а) -1: базовая строка сортируется перед строкой сравнения;
        //б) 0: базовая строка и строка сравнения эквивалентны;
        //в) 1: базовая строка сортируется после строки сравнения.
        : x.name.localeCompare(y.name)
    )
}

//Проверяем работу функции sortArr.
console.log(sortArr(users))