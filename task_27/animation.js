//Метод getElementById() находит элемент на веб-странице по его 
//идентификатору. Возвращает Element или null, если ничего не нашлось.
const figure = document.getElementById("figure");

//Событие на HTML-элементе, которое происходит, когда пользователь передвигает 
//курсор на сам элемент или на вложенные элементы.
figure.onmouseover = function() {
    //Проверяем является ли фигура кругом
    if (figure.style.borderRadius ==='50%') {
        //Делаем из круга квадрат, увеличивая фигуру в размерах и поворачивая 
        //ее.
        figure.style.width = '30rem'

        figure.style.height = '30rem'
        
        figure.style.borderRadius = '0%'
        
        figure.style.transform = 'rotate(-360deg)'

        //Функция заканчивает работу.
        return
    }

    //В противном случае фигура является квадратом. Делаем из него круг, 
    //уменьшая фигуру в размерах и поворачивая ее.
    figure.style.width = '10rem',
    
    figure.style.height = '10rem'
    
    figure.style.borderRadius ='50%'

    figure.style.transform = 'rotate(360deg)'
}