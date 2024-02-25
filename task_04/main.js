//Импортируем функцию, изменяющую окончание слов в зависимости от падежа
import { changeCasesEnding } from "./changingCasesEnding.js"

//Проверяем правильность работы функии hangeCasesEnding
console.log(changeCasesEnding(112, ['сообщение', 'сообщения', 'сообщений'])) //112 сообщений

console.log(changeCasesEnding(12, ['сообщение', 'сообщения', 'сообщений'])) //12 сообщений

console.log(changeCasesEnding(1, ['сообщение', 'сообщения', 'сообщений'])) //1 сообщение

console.log(changeCasesEnding(1024, ['пользователь', 'пользователя', 'пользователей'])) //1024 пользователя

console.log(changeCasesEnding(1026, ['пользователь', 'пользователя', 'пользователей'])) //1026 пользователей

console.log(changeCasesEnding(121, ['пользователь', 'пользователя', 'пользователей'])) //121 пользователь