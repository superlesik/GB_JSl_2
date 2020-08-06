const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
    {id: 5, title: 'Notebook', price: 2000},
    {id: 6, title: 'Mouse', price: 20},
    {id: 7, title: 'Keyboard', price: 200},
    {id: 8, title: 'Gamepad', price: 50},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>$${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

/*const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};*/

/*сокращаем функцию*/

const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
};

/* Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку, разделяющую элементы массива. В случае необходимости тип разделителя приводится к типу Строка. Если он не задан, элементы массива разделяются запятой ','. Если разделитель - пустая строка, элементы массива ничем не разделяются в возвращаемой строке. */

renderPage(products);