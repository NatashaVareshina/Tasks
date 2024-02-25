//Виджет.
const widget = document.getElementById('widget')

//Список, в который мы будет добавлять посты, отображая их на странице.
const postsList = document.getElementById('posts__list')

//Массив для хранения информации о постах.
const postsArr = []

//Функция обновления списка постов, где offset - смещение, необходимое для 
//выборки определённого подмножества записей.
const updatePostsList = (offset = 0) => {
    //Идентификатор сообщества, со стены которого необходимо получить записи.
    const groupId = '-63899474'

    const accessToken = 'ca3e584bca3e584bca3e584ba6c9291e2dcca3eca3e584baff36984acb6d01820d5ecc0'

    //Короткий адрес сообщества.
    const domain = 'academicliterature'

    //Количество записей, которое необходимо получить.
    const count = '10'

    const v = '5.199'

    const script = document.createElement("SCRIPT");
    
    script.src = `https://api.vk.com/method/wall.get?owner_id=${
        groupId
    }&access_token=${
        accessToken
    }&domain=${
        domain
    }&offset=${
        offset
    }&count=${
        count
    }&v=${
        v
    }&p1=v1&callback=getPostsData`

    document.getElementsByTagName("head")[0].appendChild(script);
}

//Функция для получения информации о постах.
const getPostsData = (result) => {
    if (result.response.items) {
        result.response.items.forEach(item => {
            //Добавляем информацию о посте в массив.
            postsArr.push(item);
        })
    
        //Сохраняем полученную информацию.
        setItem()
        
        //Отображаем на странице посты, информацию о которых получили.
        createPost()
    }
}

//Функция сохранения информации о постах.
const setItem = () => {
    if (JSON.parse(localStorage.getItem ("posts")) 
        && (
            JSON.parse(
                localStorage.getItem ("posts")
            ).length > postsArr.length
        )
    ) {
        //Функция setItem заканчивает выполнение, поскольку все подгруженные 
        //данные уже сохранены. Эта проверка необходима для предотвращения 
        //потери информации в случае, если пользователь закрыл страницу, а потом 
        //снова открыл ее: виджет будет отображать все загруженные ранее данные, 
        //то есть новые будут подгружаться с учетом уже загруженных ранее.
        return
    }
    
    //Сохраняем данные и получаем информацию об объеме занятой памяти / максимальном 
    //размере хранилища.
    getCurrentSizeOfLocalStorage()
}

//Функция создания и отображения поста на странице.
const createPost = () => {
    //Получаем данные: чтобы получить объект в первозданном состоянии используется 
    //метод parse у JSON.
    JSON.parse(localStorage.getItem("posts")).forEach((element, index) => {
        if (index > postsArr.length - 11) {
            //Создаем элемент, который будет отображать пост.
            const postData = document.createElement('li')
    
            //Добаавляем созданный элемент в список постов.
            postsList.append(postData)
            
            //Создаем контейнер для текстовой информации.
            const firstContainer = document.createElement('div')

            //Добавляем его в качестве содержимого поста.
            postData.append(firstContainer)
            
            //Первый абзац.
            const postText = document.createElement('p')

            //Прописываем его содержание.
            postText.innerHTML = element.text

            //Добавляем этот абзац страницу.
            firstContainer.append(postText)
            
            //Второй абзац.
            const additionalInformation = document.createElement('p')
            
            //Частично прописываем его содержание.
            additionalInformation.innerHTML = 'Дополнительная информация:'

            //Добавляем этот абзац на страницу.
            firstContainer.append(additionalInformation)
            
            //Создаем список, который будет содержать дополнительную информацию 
            //о посте.
            const additionalInformationList = document.createElement('ul')

            //Добавляем созданный список во второй абзац.
            additionalInformation.append(additionalInformationList)
            
            //Количество комментариев.
            const postCommentsCount = document.createElement('li')

            postCommentsCount.innerHTML = `Количество комментариев: ${element.comments.count}.`
            
            //Количество лайков.
            const postLikesCount = document.createElement('li')

            postLikesCount.innerHTML = `Количество лайков: ${element.likes.count}.`
            
            //Количество репостов.
            const postRepostsCount = document.createElement('li')

            postRepostsCount.innerHTML = `Количество репостов: ${element.reposts.count}.`
            
            //Количество просмотров.
            const postViewsCount = document.createElement('li')
    
            postViewsCount.innerHTML = `Количество просмотров: ${element.views.count}.`
    
            //Добавляемв в созданный список additionalInformationList в качестве 
            //пунктов информацию о количестве комментариев, лайков, репостов и 
            //просмотров.
            additionalInformationList.append(
                postCommentsCount, 
                postViewsCount, 
                postLikesCount
            )
            
            //Добавляем на страницу фото, если есть.
            if (element.attachments) {
                const secondContainer = document.createElement('div')

                element.attachments.forEach(item => {
                    if (item.type === 'photo') {
                        const img = document.createElement('img')
                        
                        img.src = item.photo.sizes
                            .find(item => item.type === 'p').url

                        img.alt = item.photo.text
    
                        secondContainer.append(img)
                    }
                })

                postData.append(secondContainer)
            }
        }
    })

    //Если пользователь закрыл страницу, а потом снова открыл ее, заполняем 
    //массив данными, раннее сохраненными в локальном хранилище, начиная с 11 
    //элемента.
    if (
        JSON.parse(
            localStorage.getItem ("posts")
        ).length > postsArr.length
    ) {
        JSON.parse(localStorage.getItem("posts")).forEach((element, index) => {
            if (index > 9) {
                postsArr.push(element)
            }
        })
    }
}

//При прокрутке содержимого виджета до конца подгружаем новые посты.
widget.onscroll = function() {
    //Свойство scrollHeight возвращает всю высоту элемента в пикселях, включая 
    //отступы, но не границы, полосы прокрутки или поля.
    
    //Свойство clientHeight возвращает видимую высоту элемента в пикселях, 
    //включая отступы, но не границу, полосу прокрутки или поле.
    
    //Свойство scrollTop задает или возвращает количество пикселей, на которые 
    //содержимое элемента прокручивается по вертикали.
    
    //Метод Math.abs возвращает модуль числа, то есть из отрицательного числа 
    //делает положительное.

    //Чтобы определить, прокручивается ли область прокрутки до самого низа, нужно 
    //посмотреть, достаточно ли близка величина прокрутки к некоторому пороговому 
    //значению: к 1.
    if (
        Math.abs(
            widget.scrollHeight - widget.clientHeight - widget.scrollTop
        ) <= 1
    ) {
        debouncedHandle(
            updatePostsList(postsArr.length), 3000
        )
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
            func
        }, delay);
    };
};

const debouncedHandle = debounce()

updatePostsList()