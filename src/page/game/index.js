import {GAME} from "./gameScript/gm_game"

window.onload = function(){  
    document.onkeydown =function(e){
       if(e.keyCode == 32){
            if(GAME._schedule) return
            let gm = new GAME()
            gm.init()
       }
    }
}


