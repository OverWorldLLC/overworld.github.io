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
  
  const button = document.querySelector('button[type="submit"]');
  const originalButtonText = button.textContent;
  
  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookBody)
    });

    if (response.ok) {
      function pagingDiscordServer(webhookUrl, textMessage) {
        const payload = JSON.stringify({ content: textMessage });
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        };

        fetch(webhookUrl, requestOptions)
          .then(response => {
            if (response.ok) {
              console.log('Message sent successfully');
            } else {
              console.error('Failed to send message');
            }
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
      }

      pagingDiscordServer(
        'https://discord.com/api/webhooks/1116085555097260053/FHBXPAsz21z23zGDH9lRC224jDeKQF5hQqAFlg6YBEsXta5BDPZccjZ-xIAv2gJ9_L4H',
        senderEmail
      );

      button.textContent = 'Sent';
      alert("We've received your message!");
    } else {
      button.textContent = 'Error';
      alert('There was an error! Try again later or contact us on Facebook.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    button.textContent = 'Error';
    alert('There was an error! Try again later or contact us on Facebook.');
  }

  button.disabled = false;
  setTimeout(function () {
    button.textContent = originalButtonText;
  }, 2000);
}
