const Koa = require("koa")
// const static = require("koa-static")
const app = new Koa()

const resMime = require('./resMine.js'); //引入自定义模块，模块主要处理响应头
const path = require("path")
const fs = require("fs")

const src = 'C:\\Users\\Administrator\\Desktop\\PaymentDS\\server\\static'.replace(/\\/g,'/');


app.use((ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
    // Content-Type表示具体请求中的媒体类型信息
    ctx.set("Content-Type", "application/json;charset=utf-8");
    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);
    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 300);
    /*
    CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
        Cache-Control、
        Content-Language、
        Content-Type、
        Expires、
        Last-Modified、
        Pragma。
    */
    // 需要获取其他字段时，使用Access-Control-Expose-Headers，
    // getResponseHeader('myData')可以返回我们所需的值
    //https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
    ctx.set("Access-Control-Expose-Headers", "myData");
    const pathName = ctx.url
    if(pathName!= '/favicon.ico'){  
        //这里正式写处理逻辑
        console.log('开始读取文件');
        let extName = path.extname(pathName);//拿到扩展名（比如说：'index.html' => '.html'）
        //下面用到 fs 去读取客户端请求的文件，path.join拼接成绝对路径
        console.log(extName)
        console.log(path.join(__dirname,pathName))
        const data = fs.readFileSync(path.join(__dirname,pathName));

        console.log(data) //打印看看资源的内容
        var mime = resMime.getMime(fs,extName);  //调用外部模块resMime,这个模块我是用来，请求的文件后缀名转换成mime标准的响应头Content-Type类型（比如说：'.css'=>'text/css','.js'=>'text/javascript'）
        console.log(mime)
        console.log(ctx.url)
        ctx.set("Content-Type",`${mime};chartset='utf8'`);
        ctx.body = data
    }
})


app.listen(3000)
