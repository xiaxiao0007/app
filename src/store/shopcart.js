import { reqCartList } from "@/api";
import store from ".";
const state ={
    
};
const mutations = {

};
const actions = {
    async getCartList(context){
        let result = await reqCartList();
        console.log(result)
    }
};
const getters ={

};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}
