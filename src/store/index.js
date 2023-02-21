import Vue from "vue";
import Vuex from "vuex";

// 需要使用插件一次
Vue.use(Vuex);

// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user"
import trade from "./trade";

export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules:{
        // 注册相应的小仓库
        home:home,
        search:search,
        detail:detail,
        shopcart,
        user,
        trade,
    }
})

// // state:仓库存储数据的地方
// const state ={};
// // mutation:修改state的唯一手段
// const mutations = {};
// // action:处理action,可以书写自己的业务逻辑,也可以处理异步
// const actions = {
//     // 这里可以书写业务逻辑,但是不能修改state
// };
// // getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加的方便 
// const getters ={};
// // 

// // 对外暴露
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })
