import vuex from 'vuex'
import Vue from 'vue'
import articles from './article'
import user from './user'
import msg from './msg'
Vue.use(vuex)
export default new vuex.Store({
    modules:{
        articles,
        user,
        msg
    }
})
