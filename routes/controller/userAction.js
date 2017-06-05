/**
 * Created by asus on 2017/6/2.
 */
var userModel=require('../model/userModel');
var userAction=function () {
    this.userPage=function (req,res) {
        console.info("balala");
        res.render("userList",{});
    }
    this.selectUser=function(req,res){
        userModel.selectUser(function(result){
            console.info(result);
            res.json({users:result});
        })
    }
    this.addUser=function (req,res) {
        res.render('addPage',{});
    }
    this.insertUser=function (req,res) {
        userModel.insertUser(req,res,function (result) {
                if(result==1){
                    res.redirect("/userAction/userPage");
                }else{
                    res.render("error");
                }
        })
    }
}
module.exports=new userAction();