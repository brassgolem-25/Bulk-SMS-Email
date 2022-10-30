const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const http = require('https');
const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({
  extended: true
}));

require('dotenv').config()
app.use(express.static('public'));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "./public/index.html")
})

app.post("/",function(req,res){
  // const ema = req.body.email1;
  const  nme = req.body.email2;
  const mobile = req.body.Mobile;
  const sub=req.body.subject;
  const txt=req.body.message;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {  
      user: "2divyathakur002@gmail.com",
      pass: "jpbnnetshoiumqta"
    }
  })
  var myEmails = [nme]
  const options = {
      from:"2divyathakur002@gmail.com",
      to:myEmails,
      subject:sub,
      text:txt
  }
  transporter.sendMail(options,function(err,info){
      if(err){
          console.log(err);
          return;
      }
      console.log("Sent "+ info.response);
  })

  console.log(txt);
  

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  client.messages 
  .create({body: sub, from: '+13143508058', to: mobile})
  .then(message => console.log(message.sid));
  
  res.sendFile(__dirname+'/success.html')

})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server up and running at port 3000.");
})



