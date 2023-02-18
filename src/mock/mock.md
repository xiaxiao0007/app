## mock

1. mock的作用：生成随机数据，拦截Ajax请求
2. mock的使用步骤
   1. 在项目当中src文件夹中创建mock文件夹
   2. 准备json数据（mock文件夹创建相应的json文件）
   3. 把mock数据需要的图片放置到public文件夹中【会打包到dist文件下】
   4. 创建mockSerer.js通过mockjs插件实现模拟数据
   5. mockServe.js文件在入口文件中引入（至少需要执行一次,才能模拟数据）

