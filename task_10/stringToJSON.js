const user = `[
  {
    "name": "Sid", 
    "age": 29, 
    "isMan": true, 
    "address": {
      "state": "NY", 
      "city": "New york"
    }, 
    "expertise": [
      "html", 
      "css", 
      "react"
    ], 
    "income": null
  }
]`

//Функция конвертации строки в JSON.
const parseJSON = (data) => {
  //Инициализируем переменную, представляющую собой индекс, с помощью которого 
  //будем находить текущий символ строки.
  let i = 0;

  const parseValue = () => {
    //Переменная, в которой будет храниться результат работы функции parseValue.
    let value = null
    
    //Запускаем функцию, с помощью которой можно пропустить пробел.
    skipWhitespace();
    
    //Строка.
    if (data[i] === '"') {
      //Вызываем функцию parseStr и присваиваем полученное в результате ее 
      //работы значение переменной value.
      value = parseStr()
      
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
      
      return value
    }
    
    //Тип данных Number.
    if (data[i] === '-' || data[i] >= "0" && data[i] <= "9") {
      //Вызываем функцию parseNumber и присваиваем полученное в результате ее 
      //работы значение переменной value.
      value = parseNumber()
      
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
      
      return value
    }
    
    //Объект.
    if (data[i] === '{') {
      //Вызываем функцию parseObj и присваиваем полученное в результате ее 
      //работы значение переменной value.
      value = parseObj()
      
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
      
      return value
    }
    
    //Массив.
    if (data[i] === '[') {
      //Вызываем функцию parseArr и присваиваем полученное в результате ее 
      //работы значение переменной value.
      value = parseArr()
      
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
      
      return value
    }

    //true.
    if (
      data[i] === 't' 
      && parseKeyword("true", true)
    ) {
      value = true

      //Длина присвоенного value значения.
      i += 4

      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
      
      return value
    }

    //false.
    if (
      data[i] === 'f' 
      && parseKeyword("false", false)
    ) {
      value = false

      //Длина присвоенного value значения.
      i += 5

      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
        
      return value
    }

    //null.
    if (
      data[i] === 'n' 
      && parseKeyword("null", null)
    ) {
      value = null

      //Длина присвоенного value значения.
      i += 4

      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace()
        
      return value
    }
    
    //Оператор throw позволяет генерировать пользовательские ошибки.
    throw new Error(`Unexpected token: ${data[i]}`)
  }

  //Функцию, с помощью которой можно пропустить пробел.
  const skipWhitespace = () => {
    const whitespace = [" ", "\n", "\t", "\r"]

    //Проверяем, есть ли искомая подстрока в строке: пока получаем true, 
    //пропускаем символ строки, полученный с помощью data[i].
    while (whitespace.includes(data[i])) {
      i++;
    }
  }

  //Для строки.
  const parseStr = () => {
    i++;
      
    let str = "";
      
    //Будет выполняться, пока текущий символ строки не соответствует кавычке.
    while (data[i] !== '"') {
      //Получаем символ, который занимает позицию i в data, и добавляем его в 
      //конец строки str.
      str += data[i];

      i++;
    }
      
    i++;
    
    return str;
  }

  //Для объекта.
  const parseObj = () => {
    const obj = {};

    i++;
      
    //Запускаем функцию, с помощью которой можно пропустить пробел.
    skipWhitespace();
    
    //Будет выполняться, пока текущий символ строки не соответствует закрывающей 
    //фигурной скобке.
    while (data[i] !== "}") {
      //С помощью функции parseStr получаем ключ свойства объекта.
      const key = parseStr();
        
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace();
        
      //Запускаем функцию, с помощью которой можно пропустить двоеточие.
      skipColon();
        
      //Добавляем свойство со значением, полученным с пощью функции parseValue.
      obj[key] = parseValue();
        
      //Если текущий символ строки не соответствует закрывающей фигурной скобке, 
      //запускаем функции, с помощью которых можно пропустить запятую и пробел.
      if (data[i] !== "}") {
        skipComma();
        
        skipWhitespace()
      }
    }
      
    i++;

    return obj;
  }

  //Для массива.
  const parseArr = () => {
    if (data[i] === "[") {
      //Если текущий символ строки соответствует открывающей квадратной скобке, 
      //инициализируем массив arr, в который будем добавлять элементы.
      const arr = [];

      i++;
      
      //Запускаем функцию, с помощью которой можно пропустить пробел.
      skipWhitespace();
      
      //Будет выполняться, пока текущий символ строки не соответствует закрывающей 
      //квадратной скобке.
      while (data[i] !== "]") {
        //Добавляем в конец массива arr элемент, полученный с помощью функции 
        //parseValue.
        arr.push(
          parseValue()
        );
        
        //Если текущий символ строки не соответствует закрывающей квадратной скобке, 
        //запускаем функцию, с помощью которой можно пропустить запятую.
        if (data[i] !== ']') {
          skipComma();
        }
      }
      
      i++;
      
      return arr;
    }
  }
  
  //Для проверки true, false и null.
  //str.slice(start [, end]) возвращает часть строки от start до (не включая) 
  //end. Если это значение соответствует получаемому функцией parseKeyword 
  //значению name, мы получим true. В противном случае будет false.
  const parseKeyword = (name) => data.slice(i, i + name.length) === name 
    ? true 
    : false
    
  //Для типа данных Number.
  const parseNumber = () => {
    //Сохраняем значение индекса при запуске функции parseNumber.
    const start = i;
    
    //Метод regexp.test(str) ищет совпадение и возвращает true/false, в 
    //зависимости от того, находит ли он его.
    while (/[0-9\.\-\+eE]/.test(data[i])) i++
    
    if (i > start) {
      //Если индекс больше.
      //Number() позволяет преобразовать разные типы данных в тип данных Number.
      return Number(data.slice(start, i));
    }
  }

  //Для запятой.
  const skipComma = () => {
    if (data[i] === ",") {
      i++;

      //Если текущий символ строки является запятой, функция skipComma прекращает 
      //свое выполнение.
      return
    }
    
    //Оператор throw позволяет генерировать пользовательские ошибки.
    throw new Error('Expected ","');
  }

  //Для двоеточия.
  const skipColon = () => {
    if (data[i] === ":") {
      i++;

      //Если текущий символ строки является двоеточием, функция skipComma 
      //прекращает свое выполнение.
      return
    }

    //Оператор throw позволяет генерировать пользовательские ошибки.
    throw new Error('Expected ":"');
  }

  //Получаем результат работы функции parseJSON.
  return parseValue();
}

//Функция сравнения объектов.
const isObjectsEqual = (firstObj, secondObj) => {
  if (firstObj === secondObj) {
    return true
  };
 
  //Если один из них равен null или не является объектом, получим false.
  if (
    typeof firstObj !== 'object' 
    || firstObj === null 
    || typeof secondObj !== 'object' 
    || secondObj === null
  ) {
    return false;
  }
 
  //Object.keys() возвращает массив, содержащий ключи объекта.
  const keysFirstObj = Object.keys(firstObj);
  const keysSecondObj = Object.keys(secondObj);
 
  //Если keysFirstObj и keysSecondObj не равны по количеству 
  //содержащихя в них ключей, мы получаем false.
  if (keysFirstObj.length !== keysSecondObj.length) {
    return false
  };
 
  //Проверяем, совпадает ли каждая пара ключ-значение в firstObj с secondObj.
  for (let key of keysFirstObj) {
    if (
      !keysSecondObj.includes(key) 
      || !isObjectsEqual(firstObj[key], secondObj[key])
    ) {
      return false;
    }
  }
  
  return true;
}

//Получим true, если функция parseJSON работает корректно.
console.log(
  isObjectsEqual(
    parseJSON(user), JSON.parse(user)
  )
)