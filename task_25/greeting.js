//Набор стилей для элемента.
const elementStyles = {
    fontSize: '5rem', 
    color: '#3ba62f', 
    textAlign: 'center', 
}

//Функция для создания нового элемента, его стилизаии и добавления на страницу. 
//В качестве атрибутов функции передаются тег нового элемента и его содержание.
const createNewElement = (tagName, content) => {
    //Создаем новый элемент.
    const newElement = document.createElement(tagName)

    //Прописываем содержание нового элемента.
    newElement.innerHTML = content
    
    //Добавляем на страницу новый елемент.
    document.body.append(newElement)

    //Прописываем стили нового элемента.
    for (let key in elementStyles) {
        newElement.style[key] = elementStyles[key]
    }
}

createNewElement('p', 'Hello, World!')