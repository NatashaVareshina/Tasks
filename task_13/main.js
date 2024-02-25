//Импортируем классы из соответствующих файлов.
import { Rectangle } from "./rectangle.js"
import { Circle } from "./circle.js"
import { Triangle } from "./triangle.js"

//Создаем экземпляры соответствующих классов.
const rectangle = new Rectangle('Прямоугольник', [8, 6, 8, 6])
const circle = new Circle('Круг', [8], 4)
const triangle = new Triangle('Треугольник', [5, 6, 8], 4)

//Функция для расчета периметра каждой фигуры: прямоугольника, круга, 
//треугольника.
const getShapesPerimeter = () => {
    rectangle.calculatePerimeter()
    circle.calculatePerimeter()
    triangle.calculatePerimeter()
}

//Функция для расчета площади каждой фигуры: прямоугольника, круга, 
//треугольника.
const getShapesSqure = () => {
    rectangle.calculateSquare()
    circle.calculateSquare()
    triangle.calculateSquare()
}

//Вызываем функцию, с помощью которой будет вычислять периметр каждой 
//фигуры.
getShapesPerimeter()

//Вызываем функцию, с помощью которой будет вычислять площадь каждой 
//фигуры.
getShapesSqure()