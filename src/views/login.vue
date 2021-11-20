<template>
  <div :style="login_page" class="login_page">
      <div class="login_box clear">
        <p>账号登录</p>
            <el-form :model="loginForm">
              <el-form-item label="账号" label-width="40px" style="margin-bottom:10px">
                <el-input
                  v-model="loginForm.username"
                  placeholder="用户名或邮箱"
                  prefix-icon="el-icon-user-solid"
                  clearable
                  autosize
                  @keyup.enter.native="handleKeyUp"
                />
              </el-form-item>
              <el-form-item label="密码" label-width="40px" style="margin-bottom:10px">
                <el-input
                  v-model="loginForm.password"
                  placeholder="密码"
                  show-password
                  prefix-icon="el-icon-s-goods"
                  @keyup.enter.native="handleKeyUp"
                  @keyup="handleKeyUp"
                />
              </el-form-item>
              <el-form-item style="margin-bottom:10px">
                <el-checkbox
                  v-model="loginForm.rememberMe"
                  style="float: left;"
                  name="remember-me"
                >记住密码</el-checkbox>
              </el-form-item>
              <el-form-item style="margin-bottom:10px">
                <el-button
                  style="float: left; width:200px"
                  size="medium"
                  type="success"
                  @click="submit"
                >登录</el-button>
              </el-form-item>
              <el-form-item style="margin-bottom:10px">
                <el-button
                  style="float: left; width:200px"
                  size="medium"
                  type="success"
                  @click="register"
                >注册</el-button>
              </el-form-item>
            </el-form>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions} from 'vuex'

export default {
  name:"login",
  data(){
    return{
      login_page:{
        width: window.innerWidth+'px',
        height: window.innerHeight+'px'
      },
      loginForm:{
        username: "",
        password: "",
        rememberMe: false
      }
    }
  },
  computed:{
    isValid:function(){
      const result = this.loginForm.username.length>2 
      return result? result:""
    },
  },
  created(){
    window.addEventListener('resize', this.getWidthNHeight)
    this.getWidthNHeight()
  },
  destroyed(){
    window.removeEventListener('resize', this.getWidthNHeight)
  },
  methods:{
    ...mapActions([
      'login'
    ]),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.login(this.loginForm)
      }
    },
    getWidthNHeight(){
      this.login_page.height = window.innerHeight + 'px';
      this.login_page.width = window.innerWidth + 'px';
    },
    submit(){
      this.login(this.loginForm)
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>