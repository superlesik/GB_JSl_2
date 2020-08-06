const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = []; //массив товаров с версткой
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
        // this._fetchProducts();
        // this.render(); //вывод товаров на страницу
    }
    // _fetchProducts() {
    //     this.goods = [{
    //             id: 1,
    //             title: 'Notebook',
    //             price: 2000
    //         },
    //         {
    //             id: 2,
    //             title: 'Mouse',
    //             price: 20
    //         },
    //         {
    //             id: 3,
    //             title: 'Keyboard',
    //             price: 200
    //         },
    //         {
    //             id: 4,
    //             title: 'Gamepad',
    //             price: 50
    //         },
    //     ];
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
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
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
        // document.querySelector('.sum').innerHTML = `Сумма заказа: ${accum} рублей`;
    }

}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Product img">
                <div class="desc"> 
                    <h3>${this.title}</h3>
                    <p>${this.price} руб.</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class CartList {
    constructor() {
        this.countGoods = 0; //Общая стоимость товаров
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        this.container = '.cart-content'; // контейнер для корзины
        this.allProducts = [];
        this._getBasket()
            .then(() => {
                this.render();
            });
    }

    //метод получения товаров в корзине
    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.basketItems = data;
                this.countGoods = data.countGoods;
                this.totalPrice = data.totalPrice;
                this.amount = data.amount;
            })
            .catch(error => {
                console.log(error);
            })
    }

    //отрисовка корзины
    render() {
        document.querySelector(this.container).innerHTML = '';
        const block = document.querySelector(this.container);
        for (let product of this.basketItems.contents) {
            const prod = new CartItem(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
        let out = `<div class="out">Всего товаров в корзине: ${this.countGoods }<br> На сумму: ${this.amount} рублей</div> `;
        block.insertAdjacentHTML('beforeend', out);
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

    //изменить товары в корзине
    changeGoods() {

    }
}

class CartItem {
    constructor(product) {
        this.title = product.product_name;
        this.id = product.id_product;
        this.amount = product.amount;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="cart-item">
                    <div class="cart-desc">
                        <h3 class="cart-name">${ this.title }</h3>
                        <p>Количество: ${this.quantity} шт.</p>
                        <p class="cart-price">Цена: ${this.price } руб.</><br>
                        <p class="cart-price">Итого: ${this.price} руб.</p><br>
                  </div>
              </div>`
    }
    //удаляет один элемент из корзины
    deleteItem() {

    }
}

let list = new ProductList();
list.totalSum();
list.render();
let cart = new CartList();






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