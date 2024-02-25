//Функция подсчета объема памяти занимаемого данными в LocalStorage.
const getCurrentSizeOfLocalStorage = () => {
    //Элемент, показывающий пользователю, что данные загружаются.
    const loader = document.getElementById('loader')

    //Если данные о максимальном размере хранилища уже получены, значит, полностью 
    //скрываем элемент loader со страницы, не удаляя его при этом из HTML-разметки.
    if (localStorage.getItem('maxSize')) {
        loader.style.display = 'none'
    }

    //Отражаем объем занятой памяти в Мегабайтах.
    let currentSizeOfLocalStorage = '0 MB'
    
    //Используем конструкцию try...catch для сохранения данных о подгружаемых 
    //новых постах.
    try {
        //Сохраняем данные. Для того, чтобы записать объект в localStorage надо 
        //сделать его строкой: используется JSON.stringify.
        localStorage.setItem('posts', JSON.stringify(postsArr))

        //Получаем данные, находим длину строки, включая количество символов, 
        //в записи ключа.
        let strLength = localStorage.getItem('posts').length + 5;

        strLength += localStorage.getItem('maxSize').length + 7;
        
        //Увеличиваем объем занятой памяти.
        currentSizeOfLocalStorage = (strLength * 2 / 1024 / 1024).toFixed(1) + 'MB'
    } catch (e) {
        //При переполнении localStorage удаляем из массива, в котором хранится 
        //информация о постах, первый элемент, опять запускаем функцию 
        //getCurrentSizeOfLocalStorage. И так вплоть до того, пока не получится 
        //сохранить новые данные.
        postsArr.shift()
        
        getCurrentSizeOfLocalStorage()
    }

    //Выводим в консоль информацию об объеме занятой памяти / максимальном размере 
    //хранилища.
    console.log(
        'Объем занятой памяти ' 
        + currentSizeOfLocalStorage 
        + ' / максимальный размер хранилища ' 
        + localStorage.getItem('maxSize')
    );
}