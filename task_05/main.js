import users from "./users.json" assert {type: 'json'}
import { LinkedList } from "./linkedList.js";

//Создаем экземпляр класса.
const test = new LinkedList();

//Перебираем список объектов из файла json.
users.map(element => {
  //Создаем переменную, содержащую строку, которая будет выступать в качестве 
  //значения узла односвязного списка.
  let userDataStr = ''
  
  //С помощью цикла перебираем все пары ключ-значение текущего объекта и сохраняем 
  //их в строке userDataStr.
  for (let key in element) {
    userDataStr += `${key}: ${element[key]}, `
  }

  //Создаем и добавляем узел, содержащий в качестве значения строку userDataStr, 
  //в список.
  test.appendNode(userDataStr.slice(0, userDataStr.length - 2))
})

//Выводим в консоль полученный список.
test.printList()

//Удаляем узлы списка.
test.clear()

//Смотрим в консоли полученный результат.
test.printList()