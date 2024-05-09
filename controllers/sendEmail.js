const nodemailer = require('nodemailer');


const sendEmail = async (req , res) =>{
    let testAccount = await nodemailer.createTestAccount();

      // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'candido.mclaughlin@ethereal.email',
        pass: 'gmMGW31Vaz49cSckW5'
    },
  });

// to send send method is using

  let info = await transporter.sendMail({
    from: '"Test" <candido.mclaughlin@ethereal.email>', // sender address
    to: "umairhaq054@gmail.com", // list of receivers
    subject: "Hello ", // Subject line
    text: "Hello ", // plain text body
    html: "<b>Hello </b>", // html body
  });

  console.log("Message sent", info.messageId); // just get upper value

    res.json(info)

};

module.exports = sendEmail;