import {Faller} from "./gm_faller"

class GAME {    
    static _schedule = null

    static getInstance() {//获取单例
        if (GAME._schedule) {       
             // 判断是否已经有单例了
            return GAME._schedule
        }
        return GAME._schedule = new GAME()
    }

    constructor() {
        if (GAME._schedule) {        // 判断是否已经有单例了
            return GAME._schedule
        }
        GAME._schedule = this

        this.faller = new Faller() 
        //初始化掉落物。
        this.gm_box = document.getElementById("gm_box") 
        this.lifeShower = document.getElementById("gm_life")
        this.scoreShower = document.getElementById("gm_score")
        //初始化相关UI
        this.life = 3 
        this.score = 0 
        //初始化数值
    }

    _delInstance(){
        //获取新的实例（重新开始游戏用）
        GAME._schedule = null
    }

    _end(){
        //结束游戏
        this.faller.endFall(this.gm_box)
        this._delInstance()
        shake(this.gm_box,"left")
        document.getElementById("gm_title").innerHTML = "GAME OVER!!!"
        document.getElementById("gm_tip").innerHTML = `press "<span class="shake">space</span>" to continue`
        document.getElementById("gm_tip").style.display = "block"
    }

    init(){
        // 游戏初始化
        document.getElementById("gm_title").innerHTML = "CAREFULL!!!"
        document.getElementById("gm_tip").style.display = "none"
        this.faller.init(this.gm_box) 
        this.lifeShower.innerHTML = setLife(this.life)
        this.scoreShower.innerHTML = this.score
    }

    subScore(){
        //分数--
        this.score--
        this.scoreShower.innerHTML = this.score
    }

    addScore(){
        //分数++
        this.score++
        this.scoreShower.innerHTML = this.score
    }

    subLife(){
        // 生命值--
        this.life--
        this.lifeShower.innerHTML = setLife(this.life)
        if(this.life == 0){
            this._end()
        }
    }

    addLife(){
        // 生命值++
        if(this.life < 3){
            this.life++
        }
        this.lifeShower.innerHTML = setLife(this.life)
    }
}

function setLife(life){
    let content = ''
    let empty = `<li><img src="./../src/page/game/assets/img/emptyLife.png" alt="空"></li>`
    let full = `<li><img src="./../src/page/game/assets/img/life.png" alt="满"></li>` 
    switch(life){
        case 0 :
            content += (empty+empty+empty)
            break 
        case 1 :
            content += (full+empty+empty)
            break 
        case 2 :
            content += (full+full+empty)
            break 
        case 3 :
            content += (full+full+full)
            break 
    }
    return content 
}
//更改生命值UI显示
function shake(obj, dir) {
    let arr = [] 
    let pos = 0 
    let shacktimer = null 
    for (let i = 20; i > 0; i -= 2) {
        arr.push(i, -i) 
    } 
    arr.push = (0) 
    clearInterval(shacktimer) 
    let num = 0 
    shacktimer = setInterval(function () {
        pos = parseInt(getStyle(obj, dir)) 
        obj.style[dir] = pos + arr[num] + 'px' 
        num++ 
        if (num === arr.length + 1) {
            clearInterval(shacktimer) 
        }
    }, 20) 

} 
//抖动函数
function getStyle(obj, attr) {
    return getComputedStyle(obj)[attr] 
} 
//语法糖

export {GAME}   