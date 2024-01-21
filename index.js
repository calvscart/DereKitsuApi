const express = require("express")
const morgan = require("morgan")
const nocache = require('nocache')
const fs = require('fs');
require("dotenv").config()

const app = new express()
const router = require("./src/router.js")


app.use(express.json())
app.use(morgan("dev"))
app.use(nocache())
app.use("/", router)

app.get("/", (req, res, next) => {
    res.json({
        Status: 200,
        Message: "Welcome to the Yandere Kitsune API",
        Paths: [
            "/image",
            "/generatewords"
        ]
    })
})
const port = process.env['PORT'] || 3000
app.listen(port, () =>{
    console.log(`App is now listening on port ${port}`)
})



const imageArray = fs.readdirSync(__dirname + "/assets")
imageArray.forEach((fileName) => {
    if(fileName.endsWith(".PNG")){
        const oldFileName = fileName.split(".")
        oldFileName[1] = "png"
        const newFileName = oldFileName.join(".")
        fs.renameSync( `./assets/${fileName}`,`./assets/${newFileName}`)
    }
    if(!fs.existsSync(__dirname + `/build/img/${fileName}`)){
        compress(__dirname+`/assets/${fileName}`, __dirname+"/build/img/")
    }
})

