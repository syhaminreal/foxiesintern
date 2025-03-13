// // const express = require("express");

// // const app = express();
// //  // Call express() to create an instance


// // // //response can be anything but req and res are new or standard  mwthods.

// // // app.get("/", function (request, response) {
// // //     console.log("Request received:", request.method, request.url);
// // //     response.send("Hello, World!"); 
// // //     console.log(request)
// // //     // Sending a response to the client
// // // });

// // // //targeting the routes in the express
// // // //first paramet specifies the destination adnd the callback that send back the output 
// // // app.get("/home", function(req, res){
// // //     res.send("Contnct sam in redin reallife@gmail.com")

// // // })

// // // //routes test about
// // // app.get("/about", function(req, res) {
// // //     res.send(`
// // //         <h1>Reeed Monkey </h1>
// // //         <p>I have been doing this for the past one year and trying to go pro in this field.</p>
// // //     `);
// // // });

// // //route for the calculator
// // app.get("/calculate", function(req,res){
// //     // res.sendFile(__dirname) //provdies the location form anywher the locatopn
// //     console.log(__dirname)
// // })

// // app.listen(3000, function () {
// //     console.log("Server started on port 3000");
// // });

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse form data

// // Route for home page
// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html"); // Serve the HTML form
// });

// //body parser helps to pass form data

// console.log(req.body)

// // // Route for calculator
// app.post("/calculate", function (req, res) {
//     let num1 = parseFloat(req.body.num1);
//     let num2 = parseFloat(req.body.num2);
//     let result = num1 + num2; // Simple addition

//     res.send(`<h1>Result: ${result}</h1>`);
// });


// // Route for home page
// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html"); // Serve the HTML form
// });

// //body parser helps to pass form data

// console.log(req.body)

// // // Route for calculator
// app.post("/calculate", function (req, res) {
//     let num1 = parseFloat(req.body.num1);
//     let num2 = parseFloat(req.body.num2);
//     let result = num1 + num2; // Simple addition

//     res.send(`<h1>Result: ${result}</h1>`);
// });
// //239 dekhi
// app.get("/bmicalculator", function(res, req){
//    res.sendFile(__dirname + "/bmicalculator.html") 
// })

// app.listen("/bmiclaculator", function(req, res){
//     var height = parseFloat(req.body.height)
//     var weight = parseFloat(req.body.weight)

//     var bmi = weight /(height* weight)

//     res.send("Your bmi is" +bmi)
// })

// app.listen(3000, function () {
//     console.log("Server started on port 3000");
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route for Home Page
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Route for BMI Calculator Form
app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmicalculator.html");
});

// Route to Handle BMI Calculation
app.post("/bmicalculator", function (req, res) {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);

    if (!weight || !height) {
        return res.send("<h1>Please enter valid numbers for weight and height.</h1>");
    }

    let bmi = weight / (height * height); // Corrected BMI formula

    res.send(`<h1>Your BMI is: ${bmi.toFixed(2)}</h1>`);
});

// Start the server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
