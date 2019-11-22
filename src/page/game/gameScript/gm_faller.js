const crasherApple = require('./../assets/img/crasherApple.jpg')
const Apple = require('./../assets/img/Apple.png')
const goldenApple = require("./../assets/img/goldenApple.jpg")
const fallerArray = [crasherApple,Apple,goldenApple]
import {GAME} from "./gm_game"


class Faller{
    constructor(width,height,top,speed){
        this.width = width || 40 
        this.height = height || 50 
        this.top = top || 0 
        this.speed = speed || 1 
        this.img = document.createElement("img") 
        this.type = 0 
        this.timer 
    }

    init(gm_box){
        let that = this 
        //暂存全局变量。
        this.type = Math.round(Math.random()*2) 
        let fallerImg = fallerArray[this.type] 
        //随机方块类型。
        let clientWidth = parseInt(window.getComputedStyle(gm_box).width) - 100 
        //随机方块位置。
        Object.defineProperties(this.img.style,{
            height:{
                value:this.height +"px"
            },
            width:{
                value:this.width +"px"
            },
            position:{
                value:"absolute",
            },
            top:{
                value:this.top +"px"
            },
            left:{
                value:Math.round(Math.random()*clientWidth+50) + "px",
            }
        })
        //初始化方块基础参数。
        this.img.src = fallerImg 
        //初始化方块图片地址
        this.img.ondragstart = function(){
            return false
        }
        //禁止图片被拖动
        gm_box.appendChild(this.img) 
        //添加方块
        this.img.onclick = function(){
            //绑定点击事件
            that.speed+= 0.2
            // 速度增加
            let gm = GAME.getInstance() 
            //获取游戏实例（单例），更新游戏数据
            if(that.type == 0){
                gm.subLife() 
            }else if(that.type == 1){
                gm.addScore() 
            }else{
                gm.addLife() 
            }
            if(gm.life == 0) return 
            //死亡，不再执行新的循环
            that._stop() 
            that.init(gm_box) 
            //停止并且开始新的循环。
        }
        this._fall(gm_box) 
        //开始掉落
    }

    _fall(gm_box){
        let that = this 
        //获取当前环境的this
        this.timer = setInterval(function(){
            let currentTop = that.img.offsetTop 
            //获取方块据上方的距离。
            if(currentTop >= parseInt(window.getComputedStyle(gm_box).height)-that.height){
                //递归结束条件
                that.speed += 0.2
                //速度增加。
                that._stop() 
                //停止运动
                that.init(gm_box) 
                //重置方块，其实这里还是会执行到fall函数内，但是fall函数是一个异步函数那么他就自己解决了这个问题。
                let gm = GAME.getInstance() 
                //获取游戏实例
                gm.subLife() 
                //扣血（判断游戏是否结束。）
                return 
            }
            let nextTop = currentTop + that.speed 
            that.img.style.top = nextTop + "px" 
            //移动方块
        },15)
    }

    _stop(){
        clearInterval(this.timer)
        this.timer = null
        //清除移动计时器
    }

    endFall(){
        this._stop()
        //停止移动
        let parent = this.img.parentElement 
        parent.removeChild(this.img) 
        // 删除方块
    }
}

export {Faller}