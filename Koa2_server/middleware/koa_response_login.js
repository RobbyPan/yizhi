module.exports = async (ctx, next) => {
    const url = ctx.request.url
    if (url == "/Login") {
        console.log(ctx.request);
        let ret = "true"
        ctx.response.body = ret;
    } if (url == "/Register") {
        console.log(ctx.request);
        ctx.response.body = "true";
    } else {
        console.log("错误：");
        console.log(ctx.request.url);
    }

    await next()
}