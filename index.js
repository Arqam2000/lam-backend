import express from "express";
// import cors from "cors"
const app = express()

app.use(express.json())
// app.use(cors({
//     origin: ["https://lamaesthetic.co.uk"]
// }))

import crRouter from "./src/routes/customer.routes.js"

app.use("/api/v1/reviews", crRouter)

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running..."
    })
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})