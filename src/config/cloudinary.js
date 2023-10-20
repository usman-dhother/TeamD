const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'duh39grse', 
  api_key: '592819279194859', 
  api_secret: 'XOhZtTIovSdT8lCtz_EdqOGQ7Kg' 
});

module.exports = cloudinary;