<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" :center="true" width="603px">
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar"> 
        <el-upload
        v-model="form.avatar"
          class="avatar-uploader"
          name='image'
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="home">
        <el-input v-model="form.home" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
        <el-input v-model="form.pass" autocomplete="off" show-password></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" class="reg_code" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="reg-img" :offset="1">
            <img :src="picUrl" alt @click="newPicUrl" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="imgcod">
        <el-row>
          <el-col :span="16">
            <el-input autocomplete="off" v-model="form.imgcod"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              @click="getSecurityCode"
              :disabled="nums != 0"
            >{{nums!=0?'还有' + nums + '秒':'获取用户验证码'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

// import axios from 'axios'
// @符号代表/src目录
import { sendSMS, register } from "@/api/register.js";
// import { sendSMS } from "@/api/register.js";
export default {
  data() {
    return {
      //要上传土拍你的接口地址
      uploadUrl:process.env.VUE_APP_URL + "/uploads",

      //上传后的图片临时路径
      imageUrl: "",
      nums: 0,
      //图形验证码的接口地址
      picUrl: "http://127.0.0.1/heimamm/public/captcha?type=sendsms",

      dialogTableVisible: true,
      dialogFormVisible: false,
      form: {
        avatar:'',
        name: "",
        type: [],
        email: "",
        //手机号
        home: "",
        //密码
        pass: "",
        //图形验证码
        code: "",
        //手机验证码
        imgcod: ""
      },
      formLabelWidth: "65px",
      rules: {
        //头像不能为空
         avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],

        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不对",
            trigger: "change"
          }
        ],
        home: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号输入有误",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在5-10之间", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "长度在5-10之间", trigger: "change" }
        ],
        imgcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "长度在5-10之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    doRegister(){
      this.$refs.regForm.validate(v=>{
        if(v){
          register({
            username: this.form.name,
            phone: this.form.home,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.pass,
            rcode: this.form.rcode
          }).then(res => {
            
            if(res.data.code == 200){

              this.$message.success('注册成功！')
              // 重置表单,他只能重置表单元素
              // 而img不是表单元素，所以只要img绑定的url还在，他就一直在显示
              this.$refs.regForm.resetFields();
              this.imageUrl = "";

              //注册成功，关闭对话框
              this.dialogFormVisible = false;
            }else{

              //有问题，就把问题显示出来
              this.$message.error(res.data.message);
            }
          });
        }
      })
    },
    handleAvatarSuccess(res, file) {
      window.console.log(res)
      //把图片转成了临时路径给了imgUrl
      //所以此时img标签有值，但是avatar没有值
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar=res.data.file_path;
      //单独给图片做校验
      this.$refs.regForm.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"|| "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
 
    newPicUrl() {
      this.picUrl =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms&tt" +
        Math.round() * 999;
    },
    //   点击获取验证码
    getSecurityCode() {
      // 判断是否手机号和验证码都输入
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.home)) {
        return this.$message.error("手机号码格式不正确");
      }
      if (this.form.code.length != 4) {
        return this.$message.error("请输入4位验证码");
      }

      this.nums = 60;

      let timerID = setInterval(() => {
        this.nums--;

        // 如果倒计时为0，就要停止计时器了
        if (this.nums == 0) {
          clearInterval(timerID);
        }
      }, 1000);

      sendSMS({
        code: this.form.code,
        phone: this.form.home
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
    //点击验证倒计时
  }
};
</script>
<style >
.el-dialog__header {
  background: linear-gradient(to right, RGB(1, 197, 251), RGB(9, 196, 224));
}
.el-dialog__title {
  width: 73px;
  height: 17px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 254, 254, 1);
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
    text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


.el-col-7 img {
    width: 143px;
    height: 41px;
}
.el-icon-plus:before{
  line-height: 180px;
}
.avatar-uploader {
  text-align: center;
}
</style>