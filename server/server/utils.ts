const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')


import { IncomingMessage } from "http";
function writeDataToFile(filename:string, content:Record<string, string[]|number|string>){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err:Error) =>{
        if(err){
            console.log(err)
        }
    })
}

function getPostOrganisation(req:IncomingMessage){
    return new Promise((resolve, reject) =>{
        try{
            let body = ''
            req.on('data', (chunk) =>{
                body += chunk.toString()

            })
            req.on('end', () =>{
                resolve(body)
            })

        }catch(error){
            reject(error)
        }
    })
} 

module.exports = {
    writeDataToFile,
    getPostOrganisation
}