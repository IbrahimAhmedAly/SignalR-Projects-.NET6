// create connection
let connectionUserCount = new signalR.HubConnectionBuilder()
    /*.configureLogging(signalR.logLevel.Information)*/
    .withUrl("/hubs/userCount", signalR.HttpTransportType.webSockets).build();

// connect to methods that hub invokes aka receive notificaion from hub
connectionUserCount.on("updateTotalViews", (value) => {
    let newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString(); 
});

connectionUserCount.on("updateTotalUsers", value => {
    let newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

// invoke hub methods aka send notification to hub
function NewWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "Ibrahim").then(value => console.log(value));
}

// start connection 
function fulfilled() {
    // do something on start
    console.log("Connection to User Hub Successful");
    NewWindowLoadedOnClient();
}

function rejected() {
    // rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);




