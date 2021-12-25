// library function
import express from "express";

const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Universe')
})

app.post('/', (req, res) => {
    const data = req.body
    console.log(req);
    res.send(JSON.stringify(data))
})
app.listen(port, () => console.log(`listening to ${port}`))