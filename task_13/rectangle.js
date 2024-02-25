//Импортируем класс Shape.
import { Shape } from "./shape.js"

//Создаем класс Rectangle, который наследуется от Shape.
export class Rectangle extends Shape {
    //Когда в дочернем классе отсутствует конструктор, используется конструктор 
    //родительского класса.
    
    //Переопределяем родительский метод calculateSquare, дописывая функционал, 
    //отсутствующий в нем.
    calculateSquare() {
        //Получаем массив из двуч смежных сторон прямоугольника.
        const twoRectangleSides = Array.from(new Set(this.sides))
        
        //Находим площадь прямоугольника, перемножая найденные смежные 
        //стороны прямоугольника.
        this.square = twoRectangleSides[0] * twoRectangleSides[1]
        
        //С помощью super вызываем родительский метод.
        super.calculateSquare()
    }
}