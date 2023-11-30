const nodemailer = require("nodemailer");

const config = {
    config1: {
        user: 'sa',
        password: 'sasql',
        server: 'localhost\\SQLEXPRESS',
        database: 'Milenio',
        port: 1433,
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    },
    emailConfig: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "a181648une@gmail.com",
            pass: "ltxx yfgz eita xezz",
        }
    }
}

module.exports = config