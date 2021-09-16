<template>
  <div :style="login_page" class="login_page">
      <div class="login_box">
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
                  @click="login"
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
import { mapState, mapGetters} from 'vuex'

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
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'hasError',
    ])
  },
  created(){
    window.addEventListener('resize', this.getWidthNHeight)
    this.getWidthNHeight()
  },
  destroyed(){
    window.removeEventListener('resize', this.getWidthNHeight)
  },
  methods:{
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    getWidthNHeight(){
      this.login_page.height = window.innerHeight + 'px';
      this.login_page.width = window.innerWidth + 'px';
    },
    login() {
      const params = new URLSearchParams()
      params.append('username', this.loginForm.username)
      params.append('password', this.loginForm.password)
      params.append('remember-me', this.loginForm.rememberMe)

      this.$axios.post('/login',this.loginForm)
        .then(res => {
          if (res.data.code === 401) {
            this.$message({ message: '用户名或密码错误!', type: 'warning' })
          }else if(res.data.code==200) {
            var rawToken = res.headers.token
            console.log(res.headers)
            // 缓存一天
            let expireDays = 60 * 60 * 24
            if (this.loginForm.rememberMe) {
              expireDays *= 7
            }
            this.$cookies.set('token', rawToken, expireDays)
            const user = res.data.user
            if (user.id) {
              this.$cookies.set('user', user.id, expireDays)
            }

            this.$router.push('/')
            // this.$store.commit('login', {
            //   user: user.id,
            //   remember: this.loginForm.rememberMe
            // })
            // this.$ws.send(rawToken)
            // this.$router.go(0)
          }
        })
        .catch((err) => {
          this.$message({ message: err, type: 'error' })
        })
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>