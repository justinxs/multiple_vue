import nofound from '@pages/404.vue';
import mine from '../views/mine.vue'
import wallet from '../views/wallet.vue'
import index from '../views/index.vue'
let routes = [
    { path: '/', component: index },
    { path: '/mine', component: mine },
    { path: '/wallet', component: wallet },
    { path: '*', component: nofound, props: { app: false } }
]
export default new VueRouter({
    mode: 'hash',
    routes
});