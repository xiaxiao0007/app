<template>
  <div class="pagination">
    <!-- 上面部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNumber.start > 1" @click="$emit('getPageNo', 1)"
            :class="{active:pageNo == 1}">
            1</button>
    <button v-show="startNumAndEndNumber.start > 2">···</button>
    <!-- 中间部分 -->
    <button v-for="(page, index) in startNumAndEndNumber.end" :key="index" 
            v-show="page >= startNumAndEndNumber.start"
            @click="$emit('getPageNo', page)"
            :class="{active:pageNo == page}" >
      {{ page }}
    </button>
    <!-- 下面部分 -->
    <button v-show="startNumAndEndNumber.end < totalPage - 1">···</button>
    <button v-show="startNumAndEndNumber.end < totalPage" 
            @click="$emit('getPageNo', totalPage)"
            :class="{active:pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
// 我是分页器
export default {
    name:'Pagination',
    props:['pageNo','pageSize','total','continues'],
    computed:{
      // 计算总共有多少页
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      // 计算出连续的页码的起始数字与结束数字【连续页码的数字：至少是5】
      startNumAndEndNumber(){
        // 需要从this中解析出相应的值,解构后不用写this
        let {continues, pageNo, total, totalPage} = this
        let start = 0, end =0;
        // 连续页码数字5【就是至少五页】
        if(continues>total){
          start = 1
          end = totalPage
        }else{
          // 正常现象
          // 考虑bug的现象
          start = pageNo - parseInt(continues/2)
          end = pageNo + parseInt(continues/2)
           if(start < 1){
            start = 1
            end = continues
          }
          if(end > totalPage){
            start = totalPage - continues + 1
            end = totalPage
          }
        }
        return {start,end}
      },

    }
}
</script>

<style lang='less' scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>