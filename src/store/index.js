import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: []
    },
    mutations: {
        SET_LIST(state, obj) {
            state.list = obj
            console.log(state.list);
        },
        SET_FILTER(state, obj) {
            state.filter = obj
        },
    },
})