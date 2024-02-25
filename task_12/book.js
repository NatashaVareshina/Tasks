//Объект, представляющий собой книгу.
//Здесь есть следующие свойства: название книги, автор и год издания.
//Есть свойства-аксессоры, представленные такими методами, как «геттер» – для 
//чтения и «сеттер» – для записи. При литеральном объявлении объекта они 
//обозначаются get и set: get bookInformation и set bookInformation.
const book = {
    title: '"The Fellowship of the Ring"', 
    author: 'J.R.R. Tolkien', 
    publicationYear: 1954, 
    get bookInformation() {
        //Когда this используется внутри объекта, это ключевое слово ссылается 
        //на сам объект.
        return `${this.title} was written by ${this.author}. This book was published in ${this.publicationYear}.`
    },
    //Используется для перезаписи значений объекта.
    set bookInformation(value) {
        [this.title, this.author, this.publicationYear] = [value[0], value[1], value[2]]
    }
}

//Выводим в консоль информаию о первой книге.
console.log(book.bookInformation)

//Перезаписываем информацию, хранящуюся в объекте book.
//Это будет информаия о второй книге. В массиве нужно расположить элементыми 
//следующим образом: название книги, автор, год издания.
book.bookInformation = ['"The Two Towers"', 'J.R.R. Tolkien', 1954]

//Выводим в консоль информаию о второй книге.
console.log(book.bookInformation)