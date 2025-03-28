<!-- 本组件用于在main.vue中显示液压系统相关内容 -->

<template>
    <div class="total">
        <div class="title">
            <h1>液压系统故障诊断（故障树分析）</h1> 
        </div>
        <div>
            <el-tabs v-model="current_page" @tab-click="handleClick">
              <el-tab-pane label="油品诊断" name="first"></el-tab-pane>
              <el-tab-pane label="油泵油压诊断" name="second"></el-tab-pane>
              <el-tab-pane label="润滑(油路流量)诊断" name="third"></el-tab-pane>
              <el-tab-pane label="平滑补偿油路油压诊断" name="forth"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="analyse">
            <div class="analyse_parttwo">
                <div id="analyse_parttwo_pic" style="width: 100%; height: 700px"></div>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios'
import * as echarts from 'echarts'
import { instance1, instance2 } from '../axiosInstances'

export default {
  name: 'PersonalInfo',
  //1
  data() {
  return {
    right_data: 2, 
    current_page: "first",
    tree_data: {}
  };
},
  mounted:function(){
      
  },


  mounted:function(){
    this.get_tree_data()
    
  },

  methods:{
//4
    get_tree_data(){
        try{
          instance2.get("/hydraulic/treedata").then((response)=>{
              this.tree_data = response.data
              if(this.current_page=="first"){
                this.Drow_tree("analyse_parttwo_pic",response.data.tree_data_1,this.right_data)
              }else if(this.current_page=="second"){
                this.Drow_tree("analyse_parttwo_pic",response.data.tree_data_2,this.right_data)
              }else if(this.current_page=="third"){
                this.Drow_tree("analyse_parttwo_pic",response.data.tree_data_3,this.right_data)
              }else if(this.current_page=="forth"){
                this.Drow_tree("analyse_parttwo_pic",response.data.tree_data_4,this.right_data)
              }
          })
        }catch (error) {
            console.log("获取文件数据失败！请重新尝试")
        }
    },
//3
    Drow_tree(char_element,tree_data,right_data){
        //初始化实例
        echarts.dispose(document.getElementById(char_element))
        try {
          let Chart_1 = this.$echarts.init(document.getElementById(char_element))
          //绘制图表
          Chart_1.setOption(
              ({
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove'
                },
                series: [
                  {
                    type: 'tree',
                    data: [tree_data],
                    left: right_data,
                    right: right_data,
                    top: '8%',
                    bottom: '20%',
                    symbol: 'circle',
                    orient: 'vertical',
                    expandAndCollapse: true,
                    symbolSize: 30,
                    label: {
                      position: 'top',
                      rotate: 0,
                      verticalAlign: 'middle',
                      align: 'middle',
                      fontSize: 14,
                      backgroundColor: '#e9eef3',
                    //   formatter: (params) => {
                    //     let newName = ''
                    //       let len = params.data.name.length
                    //       let strLen = 5 //一行显示几个字
                    //       let rowNum = Math.ceil(len / strLen)
                    //       if (len > strLen) {
                    //         for (let p = 0; p < rowNum; p++) {
                    //           let tempStr = ''
                    //           let start = p * strLen
                    //           let end = start + strLen
                    //           if (p == rowNum - 1) {
                    //             tempStr = params.data.name.substring(start, len)
                    //           } else {
                    //             tempStr = params.data.name.substring(start, end) + '\n'
                    //           }
                    //           newName += tempStr
                    //         }
                    //       } else {
                    //         newName = params.data.name
                    //       }
                    //       let n = newName
                    //       if (n.length > 16) {
                    //         n = n.slice(0, 16) + '...'
                    //       }
                    //       let str = `${n}`
                    //       return str
                    //     },
                    },
                    leaves: {
                      label: {
                        position: 'top',
                        rotate: 0,
                        verticalAlign: 'middle',
                        align: 'middle',
                      }
                    },
                    animationDurationUpdate: 750
                  },
                ],
              })
            );
          
          } catch (error) {
            console.log(error)
          }
    },
//2
    handleClick(tab, event){
        if(tab.name=="first"){
            this.current_page = "first"
            this.right_data = 2,
            this.get_tree_data()
        }else if(tab.name=="second"){
            this.right_data = -50,
            this.current_page = "second"
            this.get_tree_data()
        }else if(tab.name=="third"){
            this.right_data = 2,
            this.current_page = "third"
            this.get_tree_data()
        }else if(tab.name=="forth"){
            this.right_data = 2,
            this.current_page = "forth"
            this.get_tree_data()
        }else{
            console.log("error")
        }
    },

    //用于写入json数据
    



  },


}


</script>


<style>





</style>

