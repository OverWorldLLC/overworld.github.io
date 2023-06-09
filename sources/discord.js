async function sendContact(ev) {
  ev.preventDefault();
  const senderEmail = document.getElementById('emailInput').value;
  const senderMessage = document.getElementById('messageInput').value;
  const webhookBody = {
    embeds: [{
      title: 'Website Form Submitted',
      fields: [{
        name: 'Sender',
        value: senderEmail
      }, {
        name: 'Message',
        value: senderMessage
      }],
      embed_color: "#4e4cc4"
    }]
  };
  const webhookUrl = 'https://discord.com/api/webhooks/1116085555097260053/FHBXPAsz21z23zGDH9lRC224jDeKQF5hQqAFlg6YBEsXta5BDPZccjZ-xIAv2gJ9_L4H';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(webhookBody)
  });
  if (response.ok) {
    alert("We've received your message!");
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'overworldllc2023@gmail.com',
        pass: 'ghgbsxxgfvfzpnam'
      }
    });
    // Configure the email options
    let mailOptions = {
      from: "overworldllc2023@gmail.com",
      to: senderEmail,
      subject: 'Hello',
      text: 'Hello, how are you?'
    };
    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } else {
    alert('There was an error! Try again later or contact us on Facebook.');
  }
}