//Метод getElementById() находит элемент на веб-странице по его 
//идентификатору. Возвращает Element или null, если ничего не нашлось.
const input = document.getElementById('address')

const ul = document.getElementById('result')

//Первая часть запроса, к которой мы в дальнейшем будет добавлять введенное 
//пользователем значение.
const requestFirstPart = "https://suggest-maps.yandex.ru/v1/suggest?apikey=7dc0e03d-a59e-4a74-ae98-ff8a731cab1a&results=10&highlight=1&text="

//Создаем переменную для хранения результатов поиска.
let resultsList = null

//Функция, с помощью которой будет осуществлять запрос данных.
async function getResultsList() {
    //Функция fetch() принимает дрес, по которому нужно сделать запрос.
    resultsList = await fetch(requestFirstPart + input.value)
        //Результатом вызова fetch() будет Promise, в котором будет содержаться 
        //специальный объект ответа Response. У этого объекта есть следующие 
        //поля:
        //1) ok — принимает состояние true или false и сообщает об успешности 
        //запроса;
        //2) json — метод, вызов которого, возвращает результат запроса в виде 
        //json.
        .then(response => {
            //Проверяем успешность запроса.
            if (!response.ok) {
                //Выкидываем ошибку.
                throw new Error('Error occurred!')
            }

            return response.json()
        })
        //Выполнится, если была выброшена ошибка.
        .catch((err) => {
            console.log(err)
        })
        
    getHints()
}

    

//Функция для создания списка, содержащего результаты поиска.
function getHints() {
    if (ul) {
        //Если список непустой, то удаляем данные.
        ul.innerHTML = ''
    }

    if (resultsList.results) {
        //С помощью results получаем результаты запроса в виде массива найденных 
        //объектов.
        resultsList.results
        //Перебираем значения массива.
        .map(element => {
            //Создаем новый элемент списка.
            const li = document.createElement('li')
            
            //Записываем значение элемента списка.
            li.innerHTML += element.title.text

            //Добавляем узел в конец элемента ul.
            ul.appendChild(li)
        })
    }
}

//Аргументы функции:
//-функция, выполнение которой нужно отложить;
//-время, на которое откладывается выполнение этой функции.
function debounce(func, delay) {
    //Объявляем переменную timeout, которая будет хранить timeoutID, возвращаемый 
    //при установке интервала через setTimeout.
    let timeout;
    
    //Возвращаем анонимную функцию, которая, используя замыкание, позволяет 
    //получить доступ к переменной timeout после того, как выполнение функции 
    //debounce закончится.
    return function(func, delay) {
        //При каждом вызове debounce будет сбрасываться timeout и отсчёт будет 
        //начинаться с нуля.
        clearTimeout(timeout);

        //setTimeout() позволяет исполнить функцию через указанный промежуток 
        //времени. Функция возвращает числовой идентификатор установленного 
        //таймера.
        timeout = setTimeout(() => {
            func();
        }, delay);
    };
};

const debouncedHandle = debounce()

//addEventListener() принимает событие для прослушивания и второй аргумент, 
//вызываемый всякий раз, когда запускается описанное событие.
input.addEventListener('input', function(e) {
        debouncedHandle(getResultsList, 1000)
    }
)