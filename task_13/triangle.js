//Импортируем класс Shape.
import { Shape } from "./shape.js"

//Создаем класс Triangle, который наследуется от Shape.
export class Triangle extends Shape {
    constructor(name, sides, radius) {
        super(name, sides)
        this.radius = radius
    }

    //Переопределяем родительский метод calculateSquare, дописывая функционал, 
    //отсутствующий в нем.
    calculateSquare() {
        //Для нахождения площади треугольника, нужно радиус вписанной в этот 
        //треугольник окружности умножить на полупериметр треугольника.
        this.square = this.radius * (
            //Если периметр треугольника уже известен, то подставляем это значение 
            //в формулу расчета площади.
            this.perimeter 
                ? this.perimeter 
                //В противном случае нужно найти это значение и подставить его 
                //в формулу расчета площади.
                : this.sides.reduce((acc, val) => acc + val)
        ) / 2
            
        //С помощью super вызываем родительский метод.
        super.calculateSquare()
    }
    
}