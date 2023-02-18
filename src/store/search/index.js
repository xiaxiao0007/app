import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state ={
    searchinfo:{}
};
const mutations = {
    SEARCHINFO(state,searchInfo){
        state.searchinfo = searchInfo
    }
};
const actions = {
    async getSearchInfo(context, params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            context.commit('SEARCHINFO',result.data)
        }
    }, 
};
// 计算属性，简化数据而生
// 
const getters ={
    goodsList(state){
        return state.searchinfo.goodsList || []; 
    },
    trademarkList(state){
        return state.searchinfo.trademarkList || [];
    },
    attrsList(state){
        return state.searchinfo.attrsList || [];
    }
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}