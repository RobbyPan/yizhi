const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
    const url = ctx.request.url
    let filePath = '../data' + url + '.json'
    filePath = path.join(__dirname, filePath)
    try {
        const ret = await fileUtils.getFileJsonData(filePath)
        ctx.response.body = ret
    } catch (error) {
        const errormsg = {
            message: '没有读取到文件',
            status: 404
        }
        ctx.response.body = JSON.stringify(errormsg)
    }

    await next()
}