/* ДЗ 2 - работа с массивами и объектами */

/*
Задание 1:
Напишите аналог встроенного метода forEach для работы с массивами
Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
*/
function forEach(array, fn) {
    for (let i = 0; i < array.length ; i++) {
        fn(array[i], i, array);
    }
}

/*
Задание 2:
Напишите аналог встроенного метода map для работы с массивами
Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
*/
function map(array, fn) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}

/*
Задание 3:
Напишите аналог встроенного метода reduce для работы с массивами
Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
*/
function reduce(array, fn, initial) {
    let prev;
    let index = 0;

    if (!initial) {
        prev = array[0];
        index = 1
    } else {
        prev = initial;
    }

    for ( index ; index < array.length ; index++) {
        prev = fn(prev, array[index], index, array);
    }

    return prev;
}

/*
Задание 4:
Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
Пример:
 upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
*/
function upperProps(obj) {
    let result = []
  
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key.toUpperCase());
        }
    }

    return result;
}

/*
Задание 5 *:
Напишите аналог встроенного метода slice для работы с массивами
Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
*/
function slice(array, from = 0, to ) {
    let res = [];

    if (to === undefined) {
        to = array.length
    }
    if ( to < 0 ) {
        to = array.length + to
    }
    if (to > array.length) {
        to = array.length
    }
    if ( from < 0 ) {
        from = 0
    }

    for ( let i = from; i < to; i++) {
        res.push(array[i])
    }

    return res;
}

/*
Задание 6 *:
Функция принимает объект и должна вернуть Proxy для этого объекта
Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
*/
function createProxy(obj) {
    return new Proxy (obj, {
        set(target, prop, val) { // для перехвата записи свойства
            if (typeof val == 'number') {
                target[prop] = val * val;
              
                return true;
            }
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
