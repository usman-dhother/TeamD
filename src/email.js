const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hungerexpressdomain@gmail.com',
        pass: 'bwld mluo dvhd ynsx'
    }
});


exports.send = (email, message) => {
    const mailOptions = {
        from: 'hungerexpressdomain@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
}