import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        number:0
    },
    mutations:{
        minus(state){
            state.number -= 1;
        },
        plus(state){
            state.number += 1;
        }
    }
})

// module.exports = store;