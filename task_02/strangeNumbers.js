//Задача о странных числах:
//Напишите функцию, которая принимает число и возвращает true, если это число 
//является странным, и false в противном случае. Странным числом считается 
//число, которое равно сумме всех своих делителей, кроме самого себя.

const isStrangeNumber = number => {
    //Вводим переменную для суммирования делителей number
    let sum = 0

    //Перебираем все натуральные числа от 1 до половины исследуемого натурального 
    //числа
    for (let i = 1; i <= number / 2; i++) {
        //Если исследуемое число делится на счетчик внутреннего цикла без остатка, 
        //добавляем его к переменной суммы делителей
        if (number % i === 0) {
            sum += i
        }
    }

    //Если сумма делителей равна исследуемому натуральному числу, возвращаем true: 
    //это число число является странным. В противном случае возвращаем false: то 
    //есть число не является странным.
    return number === sum
}

//Проверяем, является ли число странным
console.log(
    isStrangeNumber(2)
) //false

console.log(
    isStrangeNumber(6)
) //true

console.log(
    isStrangeNumber(10)
) //false

console.log(
    isStrangeNumber(28)
) //true