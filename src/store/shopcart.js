import { reqCartList } from "@/api";
const state ={
    carList: [],
};
const mutations = {
    GETCARTLIST(state, carList) {
        state.carList = carList;
    },
};
const actions = {
    //获取购物车列表数据
    async getCartList(context){
        let result = await reqCartList();
        if (result.code == 200) {
            context.commit("GETCARTLIST", result.data);
            // console.log(result.data);
        }
    }
};
const getters ={
    carList(state) {
        return state.carList[0] || {};
    },
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}
