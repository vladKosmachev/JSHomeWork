/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации
 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено
 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
// const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
// const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let searchValue = '';

function handleSearch (searchValue) {
    let re = new RegExp(searchValue);

    let currentCookies = document.cookie.split('; ');
    let showCookies = currentCookies.reduce((prev, next) => { 
        let [name, value] = next.split('='); 

        if (re.test(name)) {
            prev[name] = value;
        }

        return prev;
    }, {});

    if (Object.getOwnPropertyNames(showCookies).length === 0) {
        showCookies = currentCookies.reduce((prev, next) => { 
            let [name, value] = next.split('='); 

            if (re.test(value)) {
                prev[name] = value;
            }

            return prev;
        }, {});
    }

    if (showCookies) {
        clearTable();
        renderCookies(showCookies);
    }
}

function clearTable() {
    let tableContent = document.querySelectorAll('#list-table tbody tr');

    tableContent.forEach(el => {
        el.remove();
    });
}

filterNameInput.addEventListener('keyup', function(evt) {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    evt.preventDefault();

    searchValue = evt.target.value;

    if (searchValue !== '') {
        handleSearch(searchValue);
    } else {
        clearTable();
        let currentCookies = parseCookies();

        renderCookies(currentCookies);
    }   
});

function createButton () {
    let button = document.createElement('button');

    button.textContent = 'Удалить';
    button.addEventListener('click', (evt) => {
        let key = evt.target.closest('tr').firstChild.textContent;

        document.cookie = `${key} = ''; max-age=0`;
        evt.target.closest('tbody').removeChild(evt.target.closest('tr'));
    })

    return button;
}

function createTableItem () {
    let tr = document.createElement('tr');

    [...arguments].forEach(arg => {
        let td = document.createElement('td');

        if (typeof arg === 'function') {
            td.appendChild(arg());
        } else {
            td.textContent = arg;
        }
        tr.appendChild(td);
    })

    listTable.appendChild(tr);
}

let cookies;

function parseCookies () {
    cookies = document.cookie.split('; ');
    cookies = cookies.reduce((prev, next) => { 
        let [name, value] = next.split('='); 

        prev[name] = value;

        return prev;
    }, {});
    
    return cookies;
}

function renderCookies (cookie) {
    for (let name in cookie) {
        if ({}.hasOwnProperty.call(cookie, name)) { 
            createTableItem(name, cookie[name], createButton);
        }
    }
}

if ((document.cookie.length !== 0) && (searchValue === '')) {
    let currentCookies = parseCookies();

    renderCookies(currentCookies)
}

addButton.addEventListener('click', (evt) => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    evt.preventDefault();
    let name = document.querySelector('#add-name-input');
    let value = document.querySelector('#add-value-input');

    document.cookie = `${name.value} = ${value.value}`;

    createTableItem(name.value, value.value, createButton);
    
    handleSearch(document.querySelector('#filter-name-input').value);
});
