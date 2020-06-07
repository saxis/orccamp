import { getUserAccount } from "@decentraland/EthereumController";
import { getUserData } from "@decentraland/Identity"
import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
import { WaitSystem } from "./gameObjects/waitSystem";
import { Player } from "./gameObjects/player";
import { Orc } from "./gameObjects/orc";
import { OrcBattle } from "./gameObjects/orcbattle";

new BaseScene();

let clicked = false;
const PUNCH_TIME = 2.2;

//const apiUrl = "http://localhost:8080/player";
const apiUrl = "https://sutenquestapi.azurewebsites.net/player"
//const npcUrl = "http://localhost:8080/npc";
const npcUrl = "https://sutenquestapi.azurewebsites.net/npc"


const gameCanvas = new UICanvas();
//let player;
let lowerCaseAddress;
let player = new Player(lowerCaseAddress, 40, gameCanvas);

const rect = new UIContainerRect(gameCanvas);
rect.width = "13.75%";
rect.height = "6.25%";
rect.vAlign = "center";
rect.hAlign = "right";
rect.positionY = 180;
rect.color = Color4.Gray();
rect.opacity = 0.7;
rect.visible = true;

player.showhpbar();
 
function registerPlayer () {
  executeTask(async () => {
    try {
      
      const address = await getUserAccount();
      const userdata = await getUserData();
      lowerCaseAddress = address.toLowerCase();
      let playerName = userdata.displayName
      player.address = address
  
      try {
        let response = await fetch(apiUrl + "/" + lowerCaseAddress);
        let json = await response.json();
        if (json.message == "Could not find player by address") {
          const newplayer = {
            address: lowerCaseAddress,
            hp: 20,
            maxhp: 20,
            percentage: 100,
            name: playerName,
            level:1,
            currentxp:0,
            basedamage:1
          };
  
          // request options
          const options = {
            method: "POST",
            body: JSON.stringify(newplayer),
            headers: {
              "Content-Type": "application/json",
            },
          };
  
          // send POST request
          log("sending post request with option to: ", apiUrl);
          fetch(apiUrl, options)
            .then((res) => res.json())
            .then((res) => {
              player.level = 1
              player.basedamage = 1
              log(res)
            })
        } else {
          log('found player ', json)
          player.level = json.level
          player.basedamage = json.basedamage
        }
      } catch (error) {
        log("Player search by ether address failed ", error);
      }
    } catch (error) {
      log(error.toString());
    }
  });
}



function loadMobs() {
  //Check with db if there are any mobs currently alive on this parcel
  //If there are, then create them in their current locations
  //Ask for an array of npc objects from the db and loop through that 
  executeTask(async () => {
      try {
        let response = await fetch(npcUrl);
        let json = await response.json();
        try {
          json.forEach(element => {
            let mob = new Orc(
              element.id,
              new AudioClip(element.sound),
              new GLTFShape(element.shape),
              element.hp,
              new Vector3(element.loc[0],element.loc[1],element.loc[2]),
              Quaternion.Euler(element.rot[0],element.rot[1],element.rot[2]),
              gameCanvas
            )
            engine.addSystem(
              new OrcBattle(
                gameCanvas,
                player,
                mob,
                new Vector3(element.loc[0],element.loc[1],element.loc[2]),
                Quaternion.Euler(element.rot[0],element.rot[1],element.rot[2]),
                clicked,
                PUNCH_TIME
              )
            );
            mob.name = element.name
          });
        } catch(error) {
          throw Error("Unable to loop through json array")
        }
        
      } catch (error) {
        log("npc search failed: ", error)
      }
  })

}

registerPlayer()
loadMobs()
engine.addSystem(new WaitSystem());



