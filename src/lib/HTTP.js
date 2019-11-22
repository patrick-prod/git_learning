import {config} from "../config/config"
import { Base64 } from 'js-base64';

class HTTP{
    async request({url,type="GET",dataType='json',data={}}){
        return new Promise((resolve,reject)=>{
            this._request(url,type,dataType,data,resolve,reject)
        }).catch(function(reason) {
            console.log('出问题啦：', reason);
        });
    }

    _request(url,type,dataType,data,resolve,reject){
        $.ajax({
            type: type,
            url: config.baseUrl + url,
            dataType: dataType,
            contentType:'application/x-www-form-urlencoded',
            timeout:10000,
            //这是表单提交的方式，如果服务器用解析json的格式就需要换成application/json
            data: data,
            complete(response){
                let statusCode = response.status
                if(statusCode == 200 || statusCode.toString().startsWith("3")){
                    resolve(response.responseText?response.responseText.data:{})
                }else{
                    if(statusCode == 401){
                        window.location = '/login.html'
                    }else{
                        window.location = `/tips.html?code=${Base64.encode(statusCode)}`
                    } 
                }
            }
        });
    }
}

export {HTTP}

                // console.log(response.status)
                // if(response.status == 200 || response.status.toString().startsWith("3")){
                //     resolve(response.responseText)
                // }else if(response.status == 403){
                //     reject("没有权限！")
                //     window.location = "/tips.html?header=权限等级不够&content=没有足够的权限来执行此操作"
                // }else if(response.status == 401){
                //     reject("登陆状态已过期！")
                //     window.location = '/login.html'
                // }else if(response.status == 404){
                //     reject("页面未找到")
                //     window.location = "/Page404.html"
                // }else if(response.status == 400){
                //     reject("参数错误")
                //     window.location = "/tips.html?header=请求参数错误&content=请求参数错误"              
                // }else{
                //     reject("服务器的问题")
                //     // window.location = "/tips.html?header=服务器出错&content=internal server error，服务器出错"
                // }