//Экспортируем класс Shape.
export class Shape {
    //constructor – специальный метод, который вызывается только при создании 
    //новых объектов. Здесь описываются свойства и методы, которые необходимо 
    //непосредственно добавить в создаваемый объект.
    constructor(name, sides = null) {
        //this - специальная переменная, которая ссылается на создаваемый 
        //объект: при создании нового экземпляра класса, this автоматически 
        //будет указывать на него.
        this.name = name
        this.sides = sides
        this.perimeter = 0
        this.square = 0
    }

    //Используется для расчета площади фигуры.
    calculateSquare() {
        //Выводим в консоль полученный результат, подставляя название фигуры 
        //и вычисленную площадь.
        console.log(`${this.name} имеет площадь, равную ${this.square} см²`)
        
        //Возвращаем полученную площадь фигуры.
        return this.square
    }

    //Используется для расчета периметра фигуры.
    calculatePerimeter() {
        //Получем периметр, используя метод массива reduce() для нахождения 
        //суммы сторон.
        this.perimeter = this.sides.reduce((acc, val) => acc + val)
        
        //Выводим в консоль полученный результат, подставляя название фигуры 
        //и вычисленный периметр.
        console.log(`${this.name} имеет периметр, равный ${this.perimeter} см`)
        
        //Возвращаем полученный периметр фигуры.
        return this.perimeter
    }
}