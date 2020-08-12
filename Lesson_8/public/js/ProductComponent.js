Vue.component('products', {
    data(){
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            // imgCatalog: `https://placehold.it/200x150`,
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products">
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :product="product"
            :img="product.imgProduct"></product>
        </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item standart p-3" >
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3 class="price-name text-white pt-3">{{ product.product_name }}</h3>
                    <div class="price d-flex justify-content-center align-items-end"><p>{{ product.price }}$</p></div>
                    <div class="price-info text-white">{{ product.price_info }}</div>
                    <button class="buy-btn ml-3" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>`
})