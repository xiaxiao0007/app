import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
// home模块的小仓库

const state ={
    // state中数据默认初始值别瞎写,服务器返回对象
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
        state.categoryList.length = 16
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用,向服务器发请求,获取服务器的数据
    async getCategoryList(context){
        let result = await reqCategoryList();
        if(result.code == 200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code == 200){
            context.commit('BANNERLIST',result.data)
        }
    },

    async getFloorList(context){
        let result = await reqGetFloorList();
        if(result.code == 200){
            context.commit('FLOORLIST',result.data)
        }
    },
    
};
const getters ={};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}