const cloudinary = require('cloudinary');

cloudinary.config({
cloud_name: 'dc7hd0mjo',
api_key: process.env.API_KEY_CLOUDINARY,
api_secret: process.env.API_SECRET_CLOUDINARY
});

module.exports.uploads = function(file) {
return new Promise(resolve => {
cloudinary.uploader.upload(file, (result) =>{
resolve({url: result.url, id: result.public_id})
}, {resource_type: "auto"})
})
}