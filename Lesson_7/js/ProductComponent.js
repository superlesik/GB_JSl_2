Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: '../img/goods/business.png'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products  d-flex flex-wrap align-items-end">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item standart p-3">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3 class="price-name text-white pt-3">{{product.product_name}}</h3>
                <div class="price d-flex justify-content-center align-items-end">
                    <p>{{ product.price }}$</p>
                </div>
                <div class="price-info text-white">
                    {{ product.price_info }}
                </div>
                <button class="btn-buy ml-3" @click="$emit('add-product', product)">Купить</button>
            </div>
        </div>`
})