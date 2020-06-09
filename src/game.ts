import { getUserAccount } from "@decentraland/EthereumController";
import { getUserData } from "@decentraland/Identity"
import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
import { WaitSystem } from "./gameObjects/waitSystem";
import { Player } from "./gameObjects/player";
import { Orc } from "./gameObjects/orc";
import { OrcBattle } from "./gameObjects/orcbattle";
import { NpcId } from "./components/npcId";
//import { CheckServer } from "./gameObjects/checkServer";

new BaseScene();

let clicked = false;
const PUNCH_TIME = 2.2;

//const apiUrl = "http://localhost:8080/player";
const apiUrl = "https://sutenquestapi.azurewebsites.net/player"
//const npcUrl = "http://localhost:8080/npc/loc/";
const npcUrl = "https://sutenquestapi.azurewebsites.net/npc/loc/"

const gameCanvas = new UICanvas();
let lowerCaseAddress: string;
let player = new Player(lowerCaseAddress, 40, gameCanvas);
let base = "-149,-124";

function registerPlayer () {
  executeTask(async () => {
    try {
      
      const address = await getUserAccount();
      const userdata = await getUserData();
      lowerCaseAddress = address.toLowerCase();
      //log('lowerCaseAddress ', lowerCaseAddress)
      let playerName = userdata.displayName
      player.address = address
      player.name = playerName
  
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
          //log("sending post request with option to: ", apiUrl);
          fetch(apiUrl, options)
            .then((res) => res.json())
            .then(() => {
              player.level = 1
              player.basedamage = 1
              //log(res)
            })
        } else {
          //log('found player ', json)
          player.level = json.level
          player.basedamage = json.basedamage
          player.resethealthBar(gameCanvas)
        }
      } catch (error) {
        log("Player search by ether address failed ", error);
      }
    } catch (error) {
      log(error.toString());
    }
  });
}



export function loadMobs(npcid = undefined) {
  //Check with db if there are any mobs currently alive on this parcel
  //If there are, then create them in their current locations
  //Ask for an array of npc objects from the db and loop through that 
  //after NPC is looted, call the delete method 
  //add a dead flag to the NPC. If its dead the death animation should be playing on spawn.
  // 

  executeTask(async () => {
      try {
        let response = await fetch(npcUrl + base);
        let json = await response.json();
        try {
          json.forEach(element => {
            //log(`npcid ${npcid} and elemenet.id ${element.id}`)
            if(npcid && npcid == element.id) {
              //log('skipping, already exists')
              //log('should set the current location of the mob now')
              const orcs = engine.getComponentGroup(NpcId)
              for (let ent of orcs.entities) {
                //log(ent.components)
                //log(ent.components)
                //log(ent.getParent())

                // log('setting new rot ', element.currentrot)
                // log('setting new loc ', element.currentloc)
                let newloc = new Vector3(element.currentloc[0],element.currentloc[1],element.currentloc[2])
                ent.getComponentOrNull(Transform).position = newloc
                let newrot = Quaternion.Euler(element.currentrot[0],element.currentrot[1],element.currentrot[2])
                ent.getComponentOrNull(Transform).rotation = newrot
              }
              //let npcid = ent.getComponentOrNull(NpcId)
            } else if(element.hp == 0) {
              log('skipping, already dead')
            } else {
              //log(element)
              let mob = new Orc(
                element.id,
                new AudioClip(element.sound),
                new GLTFShape(element.shape),
                element.hp,
                new Vector3(element.spawnloc[0],element.spawnloc[1],element.spawnloc[2]),
                Quaternion.Euler(element.spawnrot[0],element.spawnrot[1],element.spawnrot[2]),
                gameCanvas
              )
              // log(mob)
              // log(player)
              engine.addSystem(
                new OrcBattle(
                  gameCanvas,
                  player,
                  mob,
                  new Vector3(element.spawnloc[0],element.spawnloc[1],element.spawnloc[2]),
                  Quaternion.Euler(element.spawnrot[0],element.spawnrot[1],element.spawnrot[2]),
                  clicked,
                  PUNCH_TIME
                )
              );
              mob.name = element.name
            }
          });
        } catch(error) {
          throw Error(`Unable to loop through json array ${error}`)
        }
      } catch(error) {
        log("npc search failed: ", error)
      }
  })

}

registerPlayer()
//loadMobs()
engine.addSystem(new WaitSystem());

const refreshInterval: number = 3;
let refreshTimer: number = refreshInterval;

const orcs = engine.getComponentGroup(NpcId)

export class CheckServer {
  update(dt: number) {
    refreshTimer -= dt;
    if (refreshTimer < 0) {
      //log('in checkServer')
      //log('orcs.entities ', orcs.entities)
      if(orcs.entities.length == 0) {
        loadMobs()
      }
      for (let ent of orcs.entities) {
          //log('in battle loop')
          let npcid = ent.getComponentOrNull(NpcId)
          if (npcid.id) {
            //log('calling load mobs with the id ', npcid.id)
            loadMobs(npcid.id)
         } 
      }
       refreshTimer = refreshInterval;
    }
  }
}
engine.addSystem(new CheckServer())



