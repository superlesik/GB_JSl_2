class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = []; //массив товаров с версткой
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [{
                id: 1,
                title: 'Notebook',
                price: 2000
            },
            {
                id: 2,
                title: 'Mouse',
                price: 20
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 200
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 50
            },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            this.allProducts.push(item);
            block.insertAdjacentHTML("beforeend", item.render());
            //block.innerHTML += item.render();
        }
    }

    totalSum() {
        let sum = 0;
        this.goods.forEach((product) => {
            sum += product.price;
        });
        //console.log('Сумма элементов: ' + sum);
        document.querySelector('.sum').innerHTML = `Сумма заказа: ${sum} рублей`;
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>$${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartList {
    constructor() {

    }
    // метод для очистки корзины
    clearAll() {

    }
    //метод подсчета суммы купленных товаров
    totalSum() {

    }
    //метод оплаты товаров
    pay() {

    }
}

class CartItem {
    constructor() {

    }
    //удаляет один элемент из корзины
    deleteItem() {

    }
}

let list = new ProductList();
list.totalSum();



// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
//     {id: 5, title: 'Notebook', price: 2000},
//     {id: 6, title: 'Mouse', price: 20},
//     {id: 7, title: 'Keyboard', price: 200},
//     {id: 8, title: 'Gamepad', price: 50},
// ];

// const renderProduct = (title, price) => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>$${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };

// /*const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.price));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };*/

// /*сокращаем функцию*/

// const renderPage = list => {
//     document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
// };

// /* Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку, разделяющую элементы массива. В случае необходимости тип разделителя приводится к типу Строка. Если он не задан, элементы массива разделяются запятой ','. Если разделитель - пустая строка, элементы массива ниче