const express = require('express')
const router= require("./routes")
const app = express()



app.use('/api', router)
// app.use(express.json())


// app.get('/', (req, res) =>{
//     res.send("Hello world")
// })

// app.get('/sam', (req, res) =>{
//     res.send("Hello from shyam")
// })

// app.post('/test', (req, res) => {
//     const {username} = req.body
//     res.send(`Hello ${username}`)
// })
app.listen(3000, () => {
    console.log('Server listening on port 3000')

})