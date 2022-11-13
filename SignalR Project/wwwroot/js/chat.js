// create connection
let connectionChat = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat").build();

document.getElementById("sendMessage").disabled = true;

connectionChat.on("MessageReceived", (user, message) => {
    const li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} - ${message}`;
});

document.getElementById("sendMessage").addEventListener('click', function () {
    const sender = document.getElementById("senderEmail").value;
    const message = document.getElementById("chatMessage").value;
    const receiver = document.getElementById("receiverEmail").value;

    if (receiver.length > 0) {
        connectionChat.send("SendMessageToReceiver", sender, receiver, message);
    } else {
        // send message to all of the users
        connectionChat.send("SendMessageToAll", sender, message).catch((err) => {
            return console.error(err.toString());
        });
    }
    event.preventDefault();
});

connectionChat.start().then(function () {
    document.getElementById("sendMessage").disabled = false;
});
