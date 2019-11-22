import {LoginModel} from "./../../model/login"
const loginModel = new LoginModel()

$(function(){
    $("#login_btn").click(function(){
        const login_name = $("#login_name").val()
        const login_pass = $("#login_pass").val()
        loginModel.login(login_name,login_pass)
    })
})