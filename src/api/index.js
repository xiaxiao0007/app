// 对当前这个模块的API进行统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax"

//三级联动接口
// /api/product/getBasecategoryList get 无参数

export const reqCategoryList = ()=>{
    // 发请求:axios发请求返回结果Promise对象
    return requests({url:'product/getBaseCategoryList',method:'get'})
}
// 跨域问题
// 什么是跨域问题:协议，域名，端口号不同,称之为跨域问题

// 获取banner(Home首页轮播图)
export const reqGetBannerList = () => {
    return mockRequests({url:'/banner',method:'get'})
}

// 获取floor数据(Home首页轮播图)
export const reqGetFloorList = () => {
    return mockRequests({url:'/floor',method:'get'})
}

// 获取搜索模块的数据 请求需要带参数
// 当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params)=>{
    // 发请求:axios发请求返回结果Promise对象
    return requests({
        url:'/list',
        method:'post',
        data:params,
    })
}

// 获取商品信息的接口
export const reqGoodInfo = (skuId)=>{
    // 发请求:axios发请求返回结果Promise对象
    return requests({
        url:`/item/${skuId}`,
        method:'get',
    })
}

// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    // 发请求:axios发请求返回结果Promise对象
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post',
    })
}

// 获取购物车列表的接口
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物产品的接口
export const reqDeleteCartById = (skuId) =>
    requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete",
    });

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
    requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });