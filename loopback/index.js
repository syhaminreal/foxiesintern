const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxlivxzan', // Cloud name
});


const url = cloudinary.url('')

console.log(url)