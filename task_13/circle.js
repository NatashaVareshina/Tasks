//Импортируем класс Shape.
import { Shape } from './shape.js'

//Создаем и экспортируем класс Circle, который наследуется от Shape.
//Наследование классов – способ расширения одного класса другим классом.
export class Circle extends Shape {
    constructor(name, sides, radius, square) {
        //При переопределении конструктора родительского класса нужно 
        //сначала вызвать constructor родительского класса с помощью 
        //ключевого слова super и только потом обращаться к this.
        super(name, sides, square)
        //С помощью this добляем новое свойство.
        this.radius = radius
    }

    //Переопределяем метод для расчета периметра фигуры.
    calculatePerimeter() {
        //Для расчета периметра круга воспользуемся формулой C = 2πR.
        const perimeter = this.radius * 2 * 3.14
        
        //Выведем в консоль полученный результат.
        console.log(`${this.name} имеет периметр, равный ${perimeter} см`)
        
        return perimeter
    }

    //Переопределяем родительский метод calculateSquare, дописывая функционал, 
    //отсутствующий в нем.
    calculateSquare() {
        //Для расчета площади круга воспользуемся формулой S = 𝞹 * R ^ 2.
        this.square = 3.14 * Math.pow(this.radius, 2)
        
        //С помощью super вызываем родительский метод.
        super.calculateSquare()
    }
}