const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hungerexpressdomain@gmail.com',
        pass: 'HungerExpress710'
    }
});

exports.send = (email, token) => {
    const resetLink = `https://vercel.com/ordermyfood/hunger-express/reset-password?token=${token}`;
        const mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
}