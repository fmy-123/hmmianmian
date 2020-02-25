<template>
   <el-container>
  <el-header>
      <div class="wrap">
          <div class="left">
          <i  @click="isCollapse = !isCollapse" :class="isCollapse ?  'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
          <img src="../../views/login/images/logo.png" alt="" class="img">
          <span class="hei">黑马面面</span>
      </div>
        <div class="right">
          <img :src="avatar" alt="" class="img">
          <span class="name">{{username}}你好！</span>
           <el-button type="primary"  size="small" class="btn" @click="propOut">退出</el-button>
      </div>
      </div>
  </el-header>
  <el-container class="nav">
    <el-aside width="auto">
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" >
     
         <el-menu-item index="/indes/chart">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">数据概览</span>
      </el-menu-item>
       <el-menu-item index="/indes/user" >
        <i class="el-icon-user"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
       <el-menu-item index="/indes/question">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>
       <el-menu-item index="/indes/business">
        <i class="el-icon-office-building"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
       <el-menu-item index="/indes/subject">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
        <!-- 子路由的出口 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import {info} from "@/api/index.js"
import {logout} from '@/api/index.js'
import {removeToken} from '@/utilis/token.js'
import {getToken} from '@/utilis/token.js'
export default {
    data() {
        return {
            isCollapse:false,
            username:'',
            avatar:'',
        }
    },
    methods: {
        propOut(){
            this.$confirm('此操作将退出系统?', '是否退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('退出成功')
          //发送ajax请求
        logout().then(res=>{
            window.console.log(res)
            removeToken();
            this.$router.push('/login')
        })
           
        }).catch(() => {
          this.$message.info('您已取消退出操作')
        });
        },
       
    },
    beforeCreate() {
      if(getToken()==null){
        this.$message.error('请登录')
        this.$router.push('/login')
      }
    },
    created() {
        info().then(res=>{
            console.log(res);
            if(res.data.code==200){
              this.username=res.data.data.username;
            this.avatar=process.env.VUE_APP_URL +'/'+res.data.data.avatar
            }else if(res.data.code==206){
               this.$message.error('登录异常请重新登录');
               removeToken();
               this.$router.push('/login')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    },
}
</script>
<style lang="less">
    .wrap{
        width:100%;
        height:60px;
            display: flex;
             background:rgba(255,255,255,1);
            justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            height:100%;
            i{
              font-size: 34px;
              margin-right: 22px;
            }
            .img{
                width:33px;
                height:28px;
                margin-right: 11px;
            }
            .hei{
                font-size:22px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(73,161,255,1);
            }
        }
        .right{
            display: flex;
            align-items: center;
          .btn{
              margin-right: 20px;
              margin-left:38px;
          }
          .img{
              width:43px;
              height:43px;
          }
          .name{
              margin-left:9px;
              font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(99,99,99,1);
          }
        }
    }
  .main{
      background:rgba(232,233,236,1);
      height:100%;
  }
   body > .el-container {
    height:100%;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>