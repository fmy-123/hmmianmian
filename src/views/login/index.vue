<template>
  <div class="box-wrap">
    <div class="login">
        <div class="title-box">
            <img src="./images/logo.png" alt="" class="logo">
            <span class="left">黑马面面</span>
             <span class="line"></span>
              <span>用户登录</span>
        </div>
        <!-- 表单 -->
       <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="43px">
            <el-form-item  prop="name">
                <el-input v-model="ruleForm.name" prefix-icon="el-icon-user" placeholder="请输入您的手机号"></el-input>
            </el-form-item>
            <el-form-item prop='pass'>
                <el-input v-model="ruleForm.pass" prefix-icon="el-icon-lock" placeholder="请输入您的密码" show-password></el-input>
            </el-form-item>
              <el-form-item prop='code'>
                  <el-row >
                      <el-col :span='17'>
                          <el-input v-model="ruleForm.code" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
                      </el-col>
                      <el-col :span='7'>
                          <img :src="imgUrl" alt="" class="code" @click="getImg">
                      </el-col>
                  </el-row>

                
            </el-form-item>
            <el-form-item prop='agree'>
                 <el-checkbox v-model="ruleForm.agree" class='agree' >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" class="box-btn" @click="submitForm('ruleForm')">登录</el-button>
                 <el-button type="primary" class="box-btn" @click="showReg">注册</el-button>
            </el-form-item>
       </el-form>
       
       
    </div>
    <register ref="reg"></register>
    <img src="./images/login_banner_ele.png" alt class="img" />
  </div>
</template>
<script>
import { login } from '@/api/login.js'
import register from './components/register.vue'
import {setToken} from '@/utilis/token.js'
export default {
  components:{
        register
  },
    data() {
        return {
           imgUrl: process.env.VUE_APP_URL + "/captcha?type=login",
            ruleForm:{
                name:'18511111111',
                pass:'12345678',
                agree:true,
                code:''
            },
             rules: {
          name: [
             { required: true, message: '手机号不能为空', trigger: 'blur' },
            {pattern: /0?(13|14|15|18|17)[0-9]{9}/,message: '手机格式不对', trigger: 'change' }
          ],
           pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           code: [
            { min: 4, max: 4, required: true, message: '请输入4位验证码', trigger: 'blur' }
          ],
          agree: [
            { required: true, message: '', trigger: 'blur' },
             { pattern:/true/ ,required: true, message: '请勾选以阅读并同意', trigger: 'change' },
          ],
        }
    }
    },
   
    methods: {
    
      getImg(){
this.imgUrl=process.env.VUE_APP_URL + "/captcha?type=login&tt="+new Date();
      },
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            login({
              phone:this.ruleForm.name,
              password:this.ruleForm.pass,
              code:this.ruleForm.code

            }).then(res=>{
              console.log(res)
              if(res.data.code==200){
                //  window.localStorage.setItem('token',res.data.data.token)
                setToken(res.data.data.token)
              this.$message.success('登录成功')
              this.$router.push('/indes');
              // this.$router.push('/index');
              }else{
                 this.$message.error(res.data.message)
              }
            })
          }
        })
   },
    
    showReg(){
      this.$refs.reg.dialogFormVisible=true
    }
    }
};
</script>
<style lang="less">
.box-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
     padding-right:41px;
    .title-box{
    font-size: 21px;
    display: flex;
    padding-top:48px;
    align-items: center;
    margin-bottom:29px;
   
        .line{
            width:1px;
            height:28px;
            background:rgba(199,199,199,1);
            margin-left:14px;
            margin-right:12px;
        }
        .logo{
            width:22px;
            height:17px;
            margin-left:48px;
            margin-right:16px;
        }
    }
    .code{
        width:110px;
        height:42px;
       vertical-align: middle;
    }
    .box-btn{
        width:100%;
        margin-left:0;
        margin-bottom: 26px;
    }
    .agree{
        display: flex;
        .el-checkbox__label{
            display: flex;
            align-items:center;
            
        }
        .el-form-item__content{
      margin-top:32px;
        }
    }
  }
  .img {
    width: 633px;
    height: 435px;
  }
  
}
</style>