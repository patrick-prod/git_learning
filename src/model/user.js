import {HTTP} from "./../lib/HTTP"

class UserModel extends HTTP{
    constructor(){
        super()
        this.api = {
            insUser:{
                route:'/index.php/add',
                method:'post'
            },
            queryUsers:{
                route:'/index.php/inquary',
                method:'post'
            },
            delUser:{
                route:'/index.php/delete',
                method:'post'
            }
        }
    }

    async getUser(){
        const data = await this.request({
            url:this.api.queryUsers.route,
            type:this.api.queryUsers.method
        })
        console.log(data)
    }

    async insUser(data){
        const res = await this.request({
            url:this.api.insUser.route,
            type:this.api.insUser.method,
            data:data
        })
        return res
    }

    async delUser(id){
        const data = await this.request({
                url:this.api.delUser.route,
                type:this.api.delUser.method,
                data:{id}
            })
        console.log(data)
    }
}

export {UserModel}