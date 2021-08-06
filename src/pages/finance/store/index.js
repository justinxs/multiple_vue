import Vue from 'vue'
import Vuex from 'vuex'
import {changeTheme} from '@/theme'
import {setLocalLang} from '@/local'
import http from '@/js/http'

Vue.use(Vuex)
export default new Vuex.Store({
    devtools: process.env.NODE_ENV === 'development',
    state: {
        moduleName: 'finance',
        serviceId: '',
        langCode: 'zh-CN',
        lang: {},
        langCategory: [],
        userInfo: null,
    },
    actions: {
        changeServiceId({state, commit}, serviceId) {
            return new Promise((resolve, reject) => {
                changeTheme({
                    moduleName: state.moduleName, 
                    serviceId,
                    resolve,
                    reject
                })
                commit('setServiceId', serviceId);
            })
        },
        getLang({commit}, langCode) {
            return Promise.resolve().then(_ => {
                let lang = {'app_hybird_home': '首页'}
                commit('setLang', lang);
                setLocalLang(langCode, lang)
            })
        }
    },
    mutations: {
        setServiceId(state, id) {
            state.serviceId = id
        },
        updateGlobalConfig(state, data) {
            state.globalConfig = data;
        },
        setLangCode(state, langCode) {
            state.langCode = langCode;
        },
        updateUserInfo(state, data) {
            state.userInfo = data
        },
        setLang(state, lang) {
            state.lang = Object.assign({}, state.lang, lang)
        }
    },
    modules: {
        
    }
})