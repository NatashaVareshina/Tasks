//Вызов document.write(html) записывает html на страницу «прямо здесь и сейчас».

//Счетчик для отражения количества вызова функции document.write().
let count = 1

const getOutputsNumber = () => {
    //Пишем сколько раз была вызвана функция document.write().
    document.write(`<p>Функция document.write() вызвана из функция document.write() ${count} раз(а)</p>`)

    count++

    //Вызываем функцию document.write() еще раз.
    document.write('<script>getOutputsNumber()<\/script>')
}

document.write('<script>getOutputsNumber()<\/script>')

//Яндекс
//Функция document.write() будет вызвана из функции document.write() 20 раз.