import { setInterval } from "timers"
import { url } from "./../../lib/url"
import { codes } from "./../../lib/code"
import { Base64 } from 'js-base64';

$(function(){
    const code = Base64.decode(decodeURIComponent(url.getQueryVariable("code")))
    const tip_header = codes[code].header
    const tip_content = codes[code].content

    $("#tip_header").html(tip_header?tip_header:"操作失败")
    $("#tip_content").html(tip_content?tip_content:"操作失败，还有5秒跳转回原页面")
    $("#tip_client").click(function(){
        window.history.back(1)
    })
    let time = 5;
    let tip_con = $("#tip_content").html()
    setInterval(function(){
        time--;
        let content = tip_con + `，还有${time}秒跳转回原页面。`
        $("#tip_content").html(content)
        if(time <= 0){
            window.history.back(1)
        }
    },1000)
})

