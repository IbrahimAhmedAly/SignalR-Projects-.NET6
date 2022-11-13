let cloakSpan = document.getElementById("cloakCounter");
let stoneSpan = document.getElementById("stoneCounter");
let wandSpan = document.getElementById("wandCounter");

// create connection
let connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/deathlyhallows").build();

// connect to methods that hub invokes aka receive notificaion from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString(); 
    stoneSpan.innerText = stone.toString(); 
    wandSpan.innerText = wand.toString(); 
});

// invoke hub methods aka send notification to hub

// start connection 
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRaceStatus").then(raceCounter => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });

    // do something on start
    console.log("Connection to User Hub Successful");
}

function rejected() {
    // rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);




