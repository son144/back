import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/user.routes.js"
import taskRouter from "./routes/task.routes.js"

const app=express()
app.use(cors());

app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({extended:true,limit:"16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser())
 app.get('/', (req, res) => {
    res.send('Hello World!')
})
//  routes declaration 
app.use("/api/v1/users",router)
app.use("/api/v1/tasks",taskRouter)


export {app}

