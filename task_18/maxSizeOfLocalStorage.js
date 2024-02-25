let maxSizeOfLocalStorage = null

//Для нахождения размера localStorage создаем массив, затем преобразовываем его 
//в строку, для которой в дальнейшем будем определять длину.
function getStr(num) {
	return new Array(num * 1024 + 1).join('a')
}

//Функция подсчета максимального объема данных, который можно записать 
//в localStorage браузера.
const getMaxSizeOfLocalStorage = () => {
	//Если данные еще не сохранены.
	if (!localStorage.getItem('maxSize')) {
		//Счетчик.
		let i = 0;
		
		try {
			//Цикл будет выполняться, пока не произойдет ошибка.
			for (; i < i + 1; i += 250) localStorage.setItem('test', getStr(i));
		} catch (e) {
			//Обрабатываем ошибку.
			try {
				for (
					i = i - 250; i < i + 1; i += 100
				) localStorage.setItem('test', getStr(i));
			} catch (e) {
				try {
					for (
						i = i - 100; i < i + 1; i += 50
					) localStorage.setItem('test', getStr(i));
				} catch (e) {
					try {
						for (
							i = i - 50; i < i + 1; i += 10
						) localStorage.setItem('test', getStr(i));
					} catch (e) {
						try {
							for (
								i = i - 10; i < i + 1; i++
							) localStorage.setItem('test', getStr(i))
						} catch (e) {
							//Object.keys() позволяет получить массив ключей, 
							//хранящихся в localStorage..
							const key = Object.keys(localStorage);

							//Получаем значение ключа.
							const value = localStorage.getItem(key);

							//Метод clear() позволяет полностью очистить весь 
							//localStorage.
							localStorage.clear()
							
							const size = JSON.stringify(key + value).length;
							
							//Вычисляем максимальный размер хранилища в Мегабайтах.
							maxSizeOfLocalStorage = (
								size * 2 / 1024 / 1024
							).toFixed(1) + 'MB'

							//Сохраняем максимальный размер хранилища.
							localStorage.setItem('maxSize', maxSizeOfLocalStorage);
						}
					}
				}
			}
		}
	}
}

getMaxSizeOfLocalStorage()