const form = document.getElementById('form')

const userName = document.getElementById("name__user");

const userNameMessage = document.querySelector(".name__user_message");

const email = document.getElementById("email");

const emailMessage = document.querySelector(".email_message");

//Регулярные выражения для проверки входных данных.
const regularExpressions = { 
    REGEX_FOR_CHECK_NAME: /[A-Za-z\s]/, 
    REGEX_FOR_CHECK_EMAIL:
      /^([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, 
    REGEX_FOR_CHECK_EMPTY_VALUE: /^\s*$/, 
};

//Функция для обработки ошибки.
const handleError = (
    firstElement, 
    secondElement, 
    message
) => {
    //Задаем стиль видимой границы поля ввода.
    firstElement.style.border = "2px solid #f55123";

    //Выводим сообщение об ошибке.
    secondElement.style.display = "block";

    //Прописываем текст сообщения об ошибке.
    secondElement.innerHTML = message

    //Мы получим false, поскольку была найдена ошибка.
    return false
}

//Функция будет вызываться, когда данные, введенные пользователем, являются 
//корректными.
const handleCorrectData = (
    firstElement, 
    secondElement
) => {
    //Задаем цвет текста.
    firstElement.style.color = "#ffffff";
  
    //Задаем стиль видимой границы поля ввода.
    firstElement.style.border = "2px solid #ffffff";

    secondElement.style.display = "none";
}

const checkUserNameAccuracy = () => {
    //Проверяем, ввел ли пользователь данные: если поле ввода осталось незаполненным, 
    //вернется true, в противном случае мы получим false.
    if (
        regularExpressions.REGEX_FOR_CHECK_EMPTY_VALUE.test(userName.value)
    ) handleError(userName, userNameMessage, 'Не оставляйте поле пустым')
    
    //Метод test() проверяет, соответствует ли регулярное выражение заданной 
    //строке: если соответствует, вернется true, в противном случае мы получим 
    //false.
    //Если вернется true, значит, данные, введенные пользователь, проверку 
    //прошли.
    if (!regularExpressions.REGEX_FOR_CHECK_NAME.test(userName.value)) {
        //Обрабатываем ошибку.
        handleError(userName, userNameMessage, 'Проверьте правильность написания')

        userName.style.color = "#F55123";
    }
    
    //Мы получим true, если ошибок не было найдено.
    return true
};

const checkEmailAccuracy = () => {
    //Проверяем, ввел ли пользователь данные: если поле ввода осталось незаполненным, 
    //вернется true, в противном случае мы получим false.
    if (
        regularExpressions.REGEX_FOR_CHECK_EMPTY_VALUE.test(email.value)
    ) handleError(email, emailMessage, 'Не оставляйте поле пустым')
    
    //Если вернется true, значит, данные, введенные пользователь, проверку 
    //прошли.
    if (!regularExpressions.REGEX_FOR_CHECK_EMAIL.test(email.value)) {
        //Обрабатываем ошибку.
        handleError(email, emailMessage, 'Проверьте адрес электронной почты')
        
        email.style.color = "#F55123";
    }
    
    //Мы получим true, если ошибок не было найдено.
    return true
}

//Событие происходит сразу после изменения содержимого.
userName.oninput = function () {
    //Проверяем, было ли выведено на экран сообщение об ошибке.
    if (
        userNameMessage.style.display === "block"
    ) handleCorrectData(userName, userNameMessage)
}
  
//Событие происходит сразу после изменения содержимого.
email.oninput = function () {
    //Проверяем, было ли выведено на экран сообщение об ошибке.
    if (
        emailMessage.style.display === "block"
    ) handleCorrectData(email, emailMessage)
};

const printRegistrationResult = (e) => {
    //Проверяем, являются ли входные данные корректными.
    if (
        checkUserNameAccuracy() === true 
        && checkEmailAccuracy() === true
    ) {
        const { elements } = form
        
        const formElementsData = Array.from(elements)
            .map((element) => {
                return { name, value } = element
            })
            
        //Выводим на экран пользователя модальное окно с информацией.    
        alert(
            `${formElementsData
                .filter(
                    element => element.name === 'name'
                )[0]
                .value
            }, you are successfully registered!`
        )

        //Сбрасываем значения всех элементов формы.
        form.reset()
    }
}

form.addEventListener(
    'submit',
    (e) => {
        e.preventDefault()
        
        printRegistrationResult(e)
    }
)