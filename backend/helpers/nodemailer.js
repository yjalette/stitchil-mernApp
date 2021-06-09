const nodemailer = require("nodemailer");
require('dotenv').config()
const hbs = require("nodemailer-express-handlebars");


async function sendEmail(mail) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_USERNAME,
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: process.env.GOOGLE_ACCESS_TOKEN
        }
    });

    transporter.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            partialsDir: './backend/views/partials',
            layoutsDir: './backend/views/layouts',
            defaultLayout: 'main'
        },
        viewPath: './backend/views/layouts',
        extName: '.hbs'

    }))

    const newMail = {
        from: mail.from || process.env.GOOGLE_USERNAME,
        to: mail.to || process.env.GOOGLE_USERNAME,
        ...mail
    }

    const promisse = new Promise((resolve, reject) => {
        transporter.sendMail(newMail, err => {
            if (err) reject(err)
            else transporter.close();
            resolve(true);
        });
    })

    return promisse

}


exports.sendEmail = sendEmail;

