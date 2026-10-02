import { connectDB } from "./DB/connection.js"
import { BooksRouter, CollectionRouter, LogsRouter } from "./Modules/index.js"

export const bootstrap = async (app,express)=>{
app.use(express.json())
await connectDB()
app.use("/api/v1/collection",CollectionRouter)
app.use("/api/v1",BooksRouter)
app.use("/api/v1",LogsRouter)

app.all("/*dummy",(req,res)=>{
    return res.status(404).json({message:"Not Found Handler !!"})
})
}