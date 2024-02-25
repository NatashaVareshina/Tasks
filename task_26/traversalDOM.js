const printTagInformation = (element) => {
    //Выводим в консоль информацию о переданном в эту функцию элементе: назввание 
    //тега и индификатор, если он есть у данного элемента.
    console.log(`This tag name is ${element.tagName}${element.id 
        ? `, element id - ${element.id}` 
        : ''}`
    )
}

//Функция получает в качестве первого аргумента элемент, начиная с которого ей 
//нужно рекурсивно обойти дерево DOM, а в качстве второго - функцию, которая 
//должна быть вызвана для каждого узла.
function traversalDOM(tree, action) {
    if (!tree) return
    
    //Если отсутствуют дочерние узлы, функция прекращает выполнение.
    if (tree.children.length === 0) return
        
    //Обработка данных узла.
    //Последовательно справа налево обходим ветви, ведущие из текущего узла.
    for (let i = 0; i < tree.children.length; i++) {
        //Вызываем переданную функцию, которая получает в качестве аргумента 
        //текущий элемент.
        action(tree.children[i])
        //Рекурсия.
        traversalDOM(tree.children[i], action);
    }
}

traversalDOM(document.body, printTagInformation)