import { reqAddOrUpdateShopCart, reqGoodInfo } from "@/api";
// 封装游客身份模块uuid ---> 生成一个随机字符 (只能有一次，然后不能发生变化)
import {getUUID} from '@/utils/uuid_token'
const state ={
    goodInfo:{},
    // 游客的临时身份,使用uuid模拟临时客户身份
    uuid_token:getUUID()
};
const mutations = {
    GOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
    
};
const actions = {
    async getGoodInfo(context,skuid){
        let result = await reqGoodInfo(skuid);
        if(result.code == 200){
            context.commit('GOODINFO',result.data)
        }
    },
    
    // 将产品添加到购物车中
    async addOrUpdateShopCart(context,{skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }   
};
const getters ={
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}