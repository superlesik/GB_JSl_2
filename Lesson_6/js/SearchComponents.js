Vue.component('searchform', {
   props: ['value'],
   template: `<input type="text" :value="value" v-on:input="$emit('input', $event.target.value)">`
});