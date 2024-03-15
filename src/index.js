import dotenv from "dotenv"
import connectDb from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path:"./.env"
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("hii");
        console.log(`SERVER Is RUNNING AT PORT : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`mongo db connection failed ${error}`);
})



