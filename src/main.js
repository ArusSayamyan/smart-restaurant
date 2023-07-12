import { createApp,defineAsyncComponent } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import router from './router'
import BaseWrapper from "@/base/BaseWrapper.vue";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import eggBurger from "@/assets/eggBurger.png";
import beef from "@/assets/beef.png";
import cheese from "@/assets/cheese.png";
import creamy from "@/assets/creamy.png";
import chicken from "@/assets/chicken.png";
import barbeque from "@/assets/barbeque.png";
import melon from "@/assets/melon.png";
import apple from "@/assets/apple.png";
import velvet from "@/assets/velvet.png";
import fruit from "@/assets/fruit.png";
import fries from "@/assets/fries.png";
import nugget from "@/assets/nugget.png";
import sausage from "@/assets/sausage.png";
import chickenWings from "@/assets/chickenWings.png";
import lemonade from "@/assets/lemonade.png";
import softDrink from "@/assets/softDrink.png";
import lemonTea from "@/assets/lemonTea.png";
import milkShake from "@/assets/milkShake.png";
import orangeJuice from "@/assets/orangeJuice.png";
import appleJuice from "@/assets/appleJuice.png";
import berryFrappe from "@/assets/berryFrappe.png";
import ToastService from 'primevue/toastservice';


//MODAL COMPONENT
const SaveOrderModal = defineAsyncComponent(() =>
    import('@/components/SaveOrderModal.vue')
)


//store
const store = createStore({
    state() {
        return {
            selectedProducts: [],
            selectedTables: [],
            table: null,
            loginId: '',
            productList: [
                {
                    name: 'Egg burger',
                    price: '55',
                    img: eggBurger,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1000',
                    category: 'burger'

                },
                {
                    name: 'Beef burger',
                    price: '60',
                    img: beef,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1001',
                    category: 'burger'

                },
                {
                    name: 'Cheese burger',
                    price: '20',
                    img: cheese,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1002',
                    category: 'burger'

                },
                {
                    name: 'Creamy mushroom',
                    price: '55',
                    img: creamy,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1003',
                    category: 'burger'


                },
                {
                    name: 'Spicy chicken',
                    price: '60',
                    img: chicken,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1004',
                    category: 'burger'

                },
                {
                    name: 'Barbeque chicken',
                    price: '20',
                    img: barbeque,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1005',
                    category: 'burger'
                },
                {
                    name: 'Melon ice cream',
                    price: '55',
                    img: melon,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1006',
                    category: 'dessert'
                },
                {
                    name: 'Apple pie',
                    price: '60',
                    img: apple,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1007',
                    category: 'dessert'
                },
                {
                    name: 'Red velvet cake',
                    price: '20',
                    img: velvet,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1008',
                    category: 'dessert'

                },
                {
                    name: 'Fruit salad',
                    price: '55',
                    img: fruit,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1009',
                    category: 'dessert'

                },
                {
                    name: 'French fries',
                    price: '55',
                    img: fries,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1010',
                    category: 'appetizer'

                },
                {
                    name: 'Nugget',
                    price: '60',
                    img: nugget,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1011',
                    category: 'appetizer'


                },
                {
                    name: 'Sausage',
                    price: '20',
                    img: sausage,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1012',
                    category: 'appetizer'

                },
                {
                    name: 'Chicken wings',
                    price: '55',
                    img: chickenWings,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1013',
                    category: 'appetizer'

                },
                {
                    name: 'Lemonade',
                    price: '55',
                    img: lemonade,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1014',
                    category: 'beverages'

                },
                {
                    name: 'Soft drink',
                    price: '60',
                    img: softDrink,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1015',
                    category: 'beverages'

                },
                {
                    name: 'Lemon tea',
                    price: '20',
                    img: lemonTea,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1016',
                    category: 'beverages'

                },
                {
                    name: 'Milk shake',
                    price: '55',
                    img: milkShake,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1017',
                    category: 'beverages'

                },
                {
                    name: 'Orange juice',
                    price: '55',
                    img: orangeJuice,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1018',
                    category: 'beverages'

                },
                {
                    name: 'Apple juice',
                    price: '55',
                    img: appleJuice,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1019',
                    category: 'beverages'

                },
                {
                    name: 'Berry frappe',
                    price: '55',
                    img: berryFrappe,
                    count: 0,
                    table: '',
                    minCount: 'unlimited',
                    id: '1020',
                    category: 'beverages'

                }

            ]
        }
    },
    mutations: {
        updateSelectedProducts(state, payload) {
            if(state.selectedProducts.some((item) => item.id === payload.id)) {
                // let theSame = state.selectedProducts.find(item => item.id === payload.id)
                payload.count++
                if(payload.minCount > 0) {
                    payload.minCount--
                }

                const idx = state.selectedProducts.findIndex(item => item.id === payload.id)
                state.selectedProducts[idx] = payload
            }else {
                payload.count = 1;
                if(payload.minCount > 0) {
                    payload.minCount--
                }
                state.selectedProducts.push(payload)

            }

        },

        updateProducts(state, payload) {
            state.selectedProducts = payload
        },

        updateSelectedTables(state, payload) {
            state.selectedTables.push(payload)
        },

        updateTables(state, payload) {
            state.selectedTables.push = payload
        },

        changeLoginId(state, payload) {
            state.loginId = payload
        },

       selectTable(state, payload) {
            state.table = payload
        },
        updateProductList(state, payload) {
            state.productList = payload
        },
    },
    getters: {
        getSelectedProducts(state) {
            return state.selectedProducts
        },

        getLoginId(state) {
            return state.loginId
        },
        getSelectedTables(state) {
            return state.selectedTables
        },
        getTable(state) {
            return state.table
        },
        getProductList(state) {
            return state.productList
        }
    },
})

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.component('save-order', SaveOrderModal)

app.use(router)
app.use(PrimeVue)
app.use(store)
app.use(ToastService);

app.mount('#app')
