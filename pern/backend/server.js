// const express = require("express");

// const app = express();
//  // Call express() to create an instance


// // //response can be anything but req and res are new or standard  mwthods.

// // app.get("/", function (request, response) {
// //     console.log("Request received:", request.method, request.url);
// //     response.send("Hello, World!"); 
// //     console.log(request)
// //     // Sending a response to the client
// // });

// // //targeting the routes in the express
// // //first paramet specifies the destination adnd the callback that send back the output 
// // app.get("/home", function(req, res){
// //     res.send("Contnct sam in redin reallife@gmail.com")

// // })

// // //routes test about
// // app.get("/about", function(req, res) {
// //     res.send(`
// //         <h1>Reeed Monkey </h1>
// //         <p>I have been doing this for the past one year and trying to go pro in this field.</p>
// //     `);
// // });

// //route for the calculator
// app.get("/calculate", function(req,res){
//     // res.sendFile(__dirname) //provdies the location form anywher the locatopn
//     console.log(__dirname)
// })

// app.listen(3000, function () {
//     console.log("Server started on port 3000");
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse form data

// Route for home page
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); // Serve the HTML form
});

// // Route for calculator
app.post("/calculate", function (req, res) {
    let num1 = parseFloat(req.body.num1);
    let num2 = parseFloat(req.body.num2);
    let result = num1 + num2; // Simple addition

    res.send(`<h1>Result: ${result}</h1>`);
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
