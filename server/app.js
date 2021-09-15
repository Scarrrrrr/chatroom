const express = require('express')
const bodyParser = require('body-parser')
const { User } = require('./mongoose-db');
const cookieSession = require('cookie-session')
const jwt = require('jsonwebtoken')

const app = express()

//配置中间件
app.use(cookieSession({
    name: 'mycookie', //后端传给前端的cookie名称
    keys: ['aaa'], //加密层级
    maxAge:1000*3600*24 //一天后失效
}))

app.use(bodyParser.urlencoded({ extended:false }))

app.use(bodyParser.json())
//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type,token");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    //允许携带验证信息
    res.header("Access-Control-Allow-Credentials", "true")
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})
/**
 * 注册接口
*/
app.post('/register', (req,res)=>{
    const user = req.body
    console.log(user)
    const beta = new User(user)
    beta.save(function(err){
        if(err){
           res.send({code:400,msg:err}) 
        } 
        else{
            res.send({code:200,msg:'注册成功',user:user})
        }
    })
})

/**
 *  登录接口
 */
app.post('/login', (req,res)=>{
    const loginParam = req.body
    console.log(loginParam)
    User.findOne({
        username:loginParam.username,
        password:loginParam.password
    },function(err,userinfo){
        if(!userinfo){
            res.send({
                code:401,
                msg:"用户名或密码错误！"
            })
        }else{
            req.session.code = 'userId'
            let token = jwt.sign(loginParam,'aaa')
            res.header('token',token)
            res.send({
                code:200,
                msg:"登录成功！",
                user:userinfo
            })
        }
    })
})

/**
 * 判断是否登录 验证cookie和session
 */

app.get('/api/user', (req,res)=>{
    // let pass = req.session.code
    let token = req.query.token || req.body.token || req.headers.token
    // if(pass){
    //     res.send({
    //         code:200,
    //         data:'用户已登录'
    //     })
    // }else{
    //     res.send({
    //         code:401,
    //         data:'用户未登录或登录信息过期'
    //     })
    // }
    jwt.verify(token,'aaa',(err,decode)=>{
        if(!err){
            res.send({
                code:200,
                data:'登录成功'
            })
        }else{
            res.send({
                code:401,
                data:"登录失败,token错了"
            })
        }
    })
})

/**
 * 退出登录
 */
app.get('/api/loginout',(res,req)=>{
    delete req.session.code
    res.send({
        code:200,
        data:'退出登录成功'
    })
})

app.listen(8080,function(){
    console.log("app is running on port 8080.")
})