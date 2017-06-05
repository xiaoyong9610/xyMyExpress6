/**
 * Created by asus on 2017/6/2.
 */
var mysql=require('dao/dbConnect');
var multiparty=require('multiparty');
var path=require("path");
var fs=require("fs");
var userModel=function(){
    this.selectUser=function(callback){
        var client=mysql.createServer();
        mysql.selectUser(client,function(result){
            console.info(result);
            callback(result);
        })
    }
    this.insertUser=function(req,res,callback){
        var a=path.join(__dirname,"../../public/files/");
        var form=new multiparty.Form({uploadDir:a});
        form.parse(req,function (err,fields,files) {
            console.info(JSON.stringify(files,null,2));
            if(err){
                console.info(err);
            }else{
                var photo=files.photo[0];
                var oldPath=photo.path;
                var newPath=a+photo.originalFilename;
                console.info("这是旧路径"+oldPath);
                console.info("这是新路径"+newPath);
                var cclj="/files/"+photo.originalFilename;
                fs.rename(oldPath,newPath,function(err){
                    if(err){
                        console.info(err);
                    }else{
                        console.info("修改成功了");
                    }
                })
                var user=fields;
                console.info(user);
                var client=mysql.createServer();
                mysql.insertUser(client,user,cclj,function (result) {
                    console.info(result);
                    callback(result);
                })

            }
        })
     }
}
module.exports=new userModel();