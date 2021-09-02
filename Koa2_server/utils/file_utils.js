const { rejects } = require('assert')
const { error } = require('console')
const fs = require('fs')
const { resolve } = require('path')
module.exports.getFileJsonData = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}