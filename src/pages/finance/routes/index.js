import nofound from '@pages/404.vue'
import record from '../views/record.vue'
import index from '../views/index.vue'
let routes = [
    { path: '/', component: index },
    { path: '/record', component: record },
    { path: '*', component: nofound, props: { app: false } }
]
export default new VueRouter({
    mode: 'hash',
    routes
});