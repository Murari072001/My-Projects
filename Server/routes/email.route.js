var nodemailer = require('nodemailer');
var express=require("express")
var router=express.Router()

router.get("/:email",(req,res) => {
  var otp=require("./generateOTP")
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'murari.t2001@gmail.com',
      pass: 'cgar audq qbqa azvl'
    }
  });
  var mailOptions = {
    from: 'murari.t2001@gmail.com',
    to: req.params.email,
    subject: `One-Time-Password(Please Don't share with anyone)`,
    html: `<p>Your OTP-<b>${otp}</b>. Use this OTP to login along with your mailID or Phone Number.</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json("Error")
    } else {
      console.log('Email sent: ' + info.response);
      res.json({sent:'Email sent: ' + info.response,OTP:otp})
    }
  });
})

module.exports=router;