<template>
  <div class="register_page">
    <div class="login_box">
      <h3>注册页</h3> 
      <el-form>
        <el-form-item label="账号" label-width="40px" style="margin-bottom:10px">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名或邮箱"
            prefix-icon="el-icon-user-solid"
            clearable
            autosize
            @keyup.enter.native="register"
          />
        </el-form-item>
        <el-form-item label="密码" label-width="40px" style="margin-bottom:10px">
          <el-input
            v-model="registerForm.password"
            placeholder="密码"
            show-password
            prefix-icon="el-icon-s-goods"
            @keyup.enter.native="register"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="register">注 册</el-button>
        </el-form-item>
      </el-form>      
    </div>

  </div>
</template>

<script>
import { axios } from '../utils/request'
export default {
  name:"register",
  data(){
    return{
      registerForm:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    register(){
      const user = this.registerForm
      axios({
        url:'/register',
        method:'post',
        data:user
      }).then(res=>{
        alert(res.msg)
        if(res.code==200){
          this.$router.push('/login')
        }
      }).catch(err=>{
        alert(err)
      })
    }
  }
}
</script>

<style>

</style>