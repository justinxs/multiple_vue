import Vue from 'vue'
import VueRouter from 'vue-router'
import nofound from '@pages/404.vue'
import record from '../views/record.vue'
import index from '../views/index.vue'
Vue.use(VueRouter)
let routes = [
    { path: '/', component: index },
    { path: '/record', component: record },
    { path: '*', component: nofound, props: { app: false } }
]
export default new VueRouter({
    mode: 'hash',
    routes
});