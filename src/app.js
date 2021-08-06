import './styles/base.scss'
import './js/date';
import Vue from 'vue'
import {STATIC_SERVICE_ID, STATIC_THEME, changeTheme} from './theme';
import {getLocalLang} from './local';
import {getQueryString, uuid} from './js/helper'
import hybird from './js/hybird'
import App from './app.vue'
import { Toast } from 'vant'

Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.use(Toast)
Vue.prototype.hybird = hybird

function createApp(store, router) {
    const q_serviceId = getQueryString('serviceId'), q_theme = getQueryString('theme');
    const app = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })

    /**
     * STATIC_THEME           指定主题打包得到的默认 theme
     * STATIC_SERVICE_ID      由指定主题打包得到的默认 serviceId
     * THEME                  当前 theme
     * SERVICE_ID             当前 serviceId
     * ?serviceId=3000        由url参数方式重置 serviceId，若url存在 serviceId 则 theme 由其映射得到，无法通过url再修改 theme
     * ?theme=mallwin         由url参数方式重置 theme，若url中不存在 serviceId，则使用默认 serviceId，主题切换不影响 serviceId
     * 
     */

    window.UUID = uuid()
    window.STATIC_THEME = window.THEME = STATIC_THEME
    window.STATIC_SERVICE_ID = window.SERVICE_ID = STATIC_SERVICE_ID
    window.LANG_CODE = getQueryString('langCode') || 'zh-CN'

    if (q_serviceId) {
        app.$store.dispatch('changeServiceId', q_serviceId);
    } else {
        changeTheme({
            moduleName: app.$store.state.moduleName,
            theme: q_theme
        })
        app.$store.commit('setServiceId', window.SERVICE_ID);
    }
    app.$store.commit('setLang', getLocalLang(window.LANG_CODE));
    hybird.on('langCode', data => {
        window.LANG_CODE = data.langCode
        app.$store.commit('setLang', getLocalLang(data.langCode));
    })

    router.onReady(() => {
        app.$mount('#app');
    })

    if (window.eruda) {
        window.eruda.init();
    }

    return app
}

export default createApp