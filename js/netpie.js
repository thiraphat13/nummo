client = new Paho.MQTT.Client("mqtt.netpie.io", 443, "Client ID");
client.onMessageArrived = onMessageArrived;

order = [];

var options = {
    useSSL: true,
    userName : "Token",
    password : "Secret",  
    onSuccess: onConnect,
    onFailure:doFail,
}

client.connect(options);

function onConnect() {
    client.subscribe("@msg/open");
}

while(!client.connected()) {
    client.connect(options);
}

function doFail(e){
    e;
}

function onMessageArrived(message) {
    document.getElementById("show-"+message.destinationName).innerHTML += message.payloadString+"<br>";
    document.getElementById("show-"+message.destinationName).scrollTop = document.getElementById("show-"+message.destinationName).scrollHeight;
    changeStatus(message.payloadString,message.destinationName);
    getQueue(message.destinationName,message.payloadString);
}

function publishMessage() {
    topic_name = "@msg/open";
    msg_name = document.getElementById("num1").value+document.getElementById("num2").value+document.getElementById("num3").value+document.getElementById("num4").value+document.getElementById("num5").value+document.getElementById("num6").value+document.getElementById("num7").value;
    message = new Paho.MQTT.Message(msg_name);
    message.destinationName = topic_name;
    client.send(message);
}
