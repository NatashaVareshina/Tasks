//Метод getElementById() находит элемент на веб-странице по его 
//идентификатору. Возвращает Element или null, если ничего не нашлось.
const main = document.getElementById('main');

//Количество строк таблицы на каждой странице.
const elementsOnPage = 50;
    
//Переменная, которая отслеживает номер текущей страницы.
let currentPage = 0;

//DOMContentLoaded - браузер полностью загрузил HTML и завершил построение 
//DOM-дерева, однако он не загрузил внешние ресурсы.
document.addEventListener('DOMContentLoaded', function () {
  async function getUsers() {
    try {
      const response = await fetch(
        'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'
      );

      //Результатом вызова fetch() будет Promise, в котором будет содержаться 
      //специальный объект ответа Response. У этого объекта есть следующие 
      //поля:
      //1) ok — принимает состояние true или false и сообщает об успешности 
      //запроса;
      //2) json — метод, вызов которого, возвращает результат запроса в виде 
      //json.

      //Проверяем успешность запроса.
      if (!response.ok) {
        //Выкидываем ошибку.
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //Отобразить данные в HTML-коде.
  getUsers().then(data => {
    //Инициализируем table, но пока не используем закрывающий тег.
    let table = '<table style="border-collapse: collapse;">';

    //Добавляем thead элемент с названиями столбцов и прописываем открывающий 
    //тег tbody, пока не используя закрывающий.
    table += `
        <thead>
            <tr>
                <th 
                  id='btn__sorting__fname' 
                  onclick='clickSortingButtons(0, "btn__sorting__fname")'
                >
                  First name
                </th>
                <th 
                  id='btn__sorting__lname' 
                  onclick='clickSortingButtons(1, "btn__sorting__lname")'
                >
                  Last name
                </th>
                <th 
                  id='btn__sorting__tel' 
                  onclick='clickSortingButtons(2, "btn__sorting__tel")'
                >
                  Telephone
                </th>
                <th 
                  id='btn__sorting__address' 
                  onclick='clickSortingButtons(3, "btn__sorting__address")'
                >
                  Address
                </th>
                <th 
                  id='btn__sorting__city' 
                  onclick='clickSortingButtons(4, "btn__sorting__city")'
                >
                  City
                </th>
                <th 
                  id='btn__sorting__state' 
                  onclick='clickSortingButtons(5, "btn__sorting__state")'
                >
                  State
                </th>
                <th 
                  id='btn__sorting__zip' 
                  onclick='clickSortingButtons(6, "btn__sorting__zip")'
                >
                  ZIP
                </th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(user => {
        //На каждой итерации добавляем новые данные для всех колонок.
        table += `
          <tr>
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.tel}</td>
            <td>${user.address}</td>
            <td>${user.city}</td>
            <td>${user.state}</td>
            <td>${user.zip}</td>
          </tr>
        `;
    });
    
    //Прописываем закрывающие теги tbody и table.
    table += `
            </tbody>
        </table>
    `;
    
    //Добавляем таблицу на страницу.
    main.innerHTML += table;

    createButtons();
    
    createPage(currentPage);
  });
});

//Функция для показа элементов на странице.
const createPage = (page) => {
  //Выбрать все элементы с тегом <tr> внутри таблицы и, применяя метод slice(1), 
  //исключить первый, находящийся в заголовке, чтобы он оставался на месте при 
  //переключении страницы. Создать массив из оставшихся строк.
  const elements = Array.from(main.getElementsByTagName('tr')).slice(1);
  
  //Первый элемент, отображааемый на текущей странице.
  const firstElementOnCurrentPage = page * elementsOnPage;
  
  //Последний элемент, отображааемый на текущей странице.
  const lastElementOnCurrentPage = firstElementOnCurrentPage + elementsOnPage;
  
  //Цикл, перебирающий каждую строку и проверяющий, попадает ли её индекс в диапазон 
  //элементов, которые будут отображаться на текущей странице, т.е. в диапазон со 
  //startIndex до endIndex.
  elements.forEach((element, index) => {
    //Если индекс находится вне этого диапазона, добавляется класс "hidden", 
    //благодаря чему скрывается элемент. В противном случае класс "hidden" 
    //удаляется, что делает элемент видимым.
    //Второй аргумент - логическое значение, которое определяет, следует ли добавлять 
    //или удалять класс.
    element.classList.toggle(
      'hidden', 
      index < firstElementOnCurrentPage 
      || index >= lastElementOnCurrentPage
    );
  });

  //Вызываем функцию для стилизаии кнопки, соответствующей текущей странице.
  updateActiveButton();
}

//Функия для создания и добавления функиональности кнопок выбора страницы.
const createButtons = () => {
  //Выбрать все элементы с тегом <tr> внутри таблицы и, применяя метод slice(1), 
  //исключить первый, находящийся в заголовке, чтобы он оставался на месте при 
  //переключении страницы. Создать массив из оставшихся строк.
  const elements = Array.from(main.getElementsByTagName('tr')).slice(1);
  
  //Общее количество страниц, необходимых для отображения таблицы.
  const totalPages = Math.ceil(elements.length / elementsOnPage);
  
  //Создаём div для размещения динамически генерируемых кнопок страницы. 
  //Добавляем его в HTML-структуру.
  const containerForButtons = document.createElement('div');
  main.appendChild(containerForButtons);
  
  //Добавляем класс pagination к контейнеру для кнопок, чтобы можно было 
  //его стилизовать.
  containerForButtons.classList.add('pagination');

  for (let i = 0; i < totalPages; i++) {
    //Создаём отдельная кнопку для каждой страницы.
    const button = document.createElement('button');
    
    //Указываем номер страницы на кнопке.
    button.textContent = i + 1;
    
    button.addEventListener('click', () => {
      //Переменной currentPage присвается значение i, соответствующее индексу 
      //страницы, на которую кликнул пользователь.
      currentPage = i;
      
      //Функция вызывается с новым значением currentPage, что приводит к 
      //отображению содержимого страницы, на которую кликнул пользователь.
      createPage(currentPage);
      
      //Вызываем функцию для стилизаии кнопки, соответствующую текущей странице.
      updateActiveButton();
    });
    
    //Помещаем кнопки выбора страницы в контейнер для этих кнопок.
    containerForButtons.appendChild(button);
  }
}

//Функция для стилизации кнопки, соответствующей текущей странице.
const updateActiveButton = () => {
  //Извлекаем все кнопки выбора страницы.
  const buttons = document.querySelectorAll('.pagination button');
  
  //Перебираем эти кнопки и сравниваем их индексы со значением currentPage.
  buttons.forEach((button, index) => {
    //Если индекс кнопки совпадает, то добвляем к кнопке класс "active".
    if (index === currentPage) {
      button.classList.add('active');
    } else {
      //В противном случае класс active удаляем.
      button.classList.remove('active');
    }
  });
}

//Функция сортировки строк таблицы.
const sortRows = (i, direction) => {
  //Выбрать все элементы с тегом <tr> внутри таблицы и, применяя метод slice(1), 
  //исключить первый, находящийся в заголовке, чтобы он оставался на месте при 
  //переключении страницы. Создать массив из оставшихся строк.
  const elements = Array.from(main.getElementsByTagName('tr')).slice(1);

  let sortedRows = null

  //direction отражает тип сортировки: по возрастанию или убыванию.
  direction === 'increasing' 
  //Сортировка по возрастанию.
    ? sortedRows = elements.sort((x, y) => x.cells[i].innerHTML > y.cells[i].innerHTML 
      ? 1 
      : -1
    ) 
    //Сортировка по убыванию.
    : sortedRows = elements.sort((x, y) => x.cells[i].innerHTML < y.cells[i].innerHTML 
      ? 1 
      : -1
    )
    
  //Обновляем порядок отображения всех строк таблицы после их сортировки.
  document.getElementsByTagName('table')[0].children[1].append(...sortedRows);
  
  createPage(currentPage)
}

//Функция обработки нажатия на кнопку сортировки строк таблицы.
const clickSortingButtons = (i, id) => {
  //Если у кнопки есть атрибут, задающий тип сортировки по убыванию, то мы запускем 
  //функцию сортировки по убыванию и меняем атрибут на отражающий сортировку по 
  //возрстанию.
  if (document.getElementById(`${id}`).getAttribute('data-direction') === 'decreasing') {
    sortRows(i, 'decreasing');
    document.getElementById(`${id}`).setAttribute('data-direction', 'increasing');

  //Если у кнопки отсутствует атрибут, задающий тип сортировки, или есть, но отражающий 
  //сортировку по возрастанию, то мы запускем функцию сортировки по возрастанию и меняем 
  //атрибут на отражающий сортировку по убыванию.
  } else {
    sortRows(i, 'increasing');
    document.getElementById(`${id}`).setAttribute('data-direction', 'decreasing');
  }
}