import {HTTP} from "./../lib/HTTP"

class LoginModel extends HTTP{
    constructor(){
        super()
        this.api = {
            login:{
                route:'/index.php/login',
                method:'post'
            }
        }
    }
    async login(login_name,login_pass){
        let result = await super.request({
            url:this.api.login.route,
            type:this.api.login.method,
            data:{
                username:login_name,
                password:login_pass
            }
        })
        result = JSON.parse(result)
        if(result[0].status == 1){
            window.location = "/user.html"
        }else{
            window.location = `/tips.html?header=登陆失败&content=${result[0].msg}`
        }
    }
}

export {LoginModel}