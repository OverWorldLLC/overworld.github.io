async function sendContact(ev) {
  ev.preventDefault();

  const senderEmail = document.getElementById('emailInput').value;
  const senderMessage = document.getElementById('messageInput').value;

  const webhookUrl = 'https://discord.com/api/webhooks/1116085555097260053/FHBXPAsz21z23zGDH9lRC224jDeKQF5hQqAFlg6YBEsXta5BDPZccjZ-xIAv2gJ9_L4H';

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

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookBody)
    });

    if (response.ok) {
      await pagingDiscordServer(webhookUrl, senderEmail);
      alert("We've received your message!");
    } else {
      throw new Error('Failed to send webhook');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('There was an error! Try again later or contact us on Facebook.');
  }

  location.reload();
}

async function pagingDiscordServer(webhookUrl, textMessage) {
  const payload = JSON.stringify({ content: textMessage });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  };

  const response = await fetch(webhookUrl, requestOptions);
  if (response.ok) {
    console.log('Message sent successfully');
  } else {
    throw new Error('Failed to send message');
  }
}
