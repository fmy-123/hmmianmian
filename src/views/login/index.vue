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
                          <img src="./images/login_captcha.png" alt="" class="code">
                      </el-col>
                  </el-row>

                
            </el-form-item>
            <el-form-item prop='agree'>
                 <el-checkbox v-model="ruleForm.agree" class='agree' >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" class="box-btn" @click="submitForm('ruleForm')">登录</el-button>
                 <el-button type="primary" class="box-btn">注册</el-button>
            </el-form-item>
       </el-form>
       
    </div>
    <img src="./images/login_banner_ele.png" alt class="img" />
  </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm:{
                name:'',
                pass:'',
                agree:false,
                code:''
            },
             rules: {
          name: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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