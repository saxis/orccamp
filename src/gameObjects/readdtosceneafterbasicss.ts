// import utils from "../node_modules/decentraland-ecs-utils/index";
// import { createChannel } from "../node_modules/decentraland-builder-scripts/channel";
// import { createInventory } from "../node_modules/decentraland-builder-scripts/inventory";
// import Script1 from "../ff9257ec-9d62-404f-97c7-cf19c4035761/src/item";
// import Script2 from "../7402ef02-fc7f-4e19-b44a-4613ee2526c5/src/item";
// import Script3 from "../df8d742f-045c-4fe3-8c70-adfb47d22baf/src/item";
// import Script4 from "../swordScript/src/item";
// import { BuilderHUD } from "./modules/BuilderHUD"
//import { getUserData } from "@decentraland/Identity";

//const instructions = new UIText(gameCanvas);
// instructions.value =
//   "The Brute has defeated you. Seek out the sorceress Mehetra in her abode to the far North.";
// instructions.fontSize = 20;
// instructions.hAlign = "left";
// instructions.positionX = 200;
// instructions.vAlign = "center";
// instructions.visible = false;

//const playButton = new UIImage(gameCanvas, resources.textures.playContainer)
//oldManCounter.sourceLeft = 0
//oldManCounter.sourceTop = 0
//oldManCounter.sourceWidth = 344
//oldManCounter.sourceHeight = 64

//turnRClip.looping = false;
//turnLClip.looping = false;

//const peasant1 = new Vector3(14, 0, -13);

// let imageAtlas = "images/OldManDialog.png"
// let imageTexture = new Texture(imageAtlas)
// const playButton = new UIImage(gameCanvas, imageTexture)
// playButton.sourceLeft = 50;
// playButton.sourceTop = 100;
// playButton.sourceWidth = 344;
// playButton.sourceHeight = 64;

// const peasant = new Npc(
//   resources.sounds.peasantunlock,
//   resources.models.peasant,
//   5,
//   peasant1
// );

// const showHealthBar = function() {
//   oldManCounter.visible = true;
// }


  // function respawnRivers() {
//   engine.addEntity(oldmanrivers)

//   oldmanrivers.addComponentOrReplace(
//     new OnPointerDown(
//       e => {
//         seconddialog.run();
//       },
//       {
//         button: ActionButton.PRIMARY,
//         showFeeback: true,
//         hoverText: "Speak to Old Man Rivers"
//       }
//     )
//   );
// }

// function spawnLoot() {
//   const fantasyChest = new Entity("fantasyChest");
//   engine.addEntity(fantasyChest);
//   const transform3 = new Transform({
//     position: new Vector3(6, 0, 6.5),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(1, 1, 1)
//   });
//   fantasyChest.addComponentOrReplace(transform3);

//   const fantasyIronKey = new Entity("fantasyIronKey");
//   engine.addEntity(fantasyIronKey);
//   const transform4 = new Transform({
//     position: new Vector3(6, 0, 7.5),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(1, 1, 1)
//   });
//   fantasyIronKey.addComponentOrReplace(transform4);

//   const scroll = new Entity("scroll");
//   engine.addEntity(scroll);
//   const transform5 = new Transform({
//     position: new Vector3(6.5, 0.2, 6.5),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(1, 1, 1)
//   });
//   scroll.addComponentOrReplace(transform5);

//   const oldIronSword = new Entity("oldIronSword");
//   engine.addEntity(oldIronSword);
//   oldIronSword.setParent(baseScene);
//   const transform6 = new Transform({
//     position: new Vector3(6, 0.3, 6.5),
//     rotation: new Quaternion(
//       -7.781870092739773e-16,
//       0.7071068286895752,
//       -8.429368136830817e-8,
//       -0.7071068286895752
//     ),
//     scale: new Vector3(1.000008225440979, 1, 0.5000041127204895)
//   });
//   oldIronSword.addComponentOrReplace(transform6);
  

//   const channelId = Math.random()
//     .toString(16)
//     .slice(2);
//   const channelBus = new MessageBus();
//   const inventory = createInventory(UICanvas, UIContainerStack, UIImage);
//   const options = { inventory };

//   const script1 = new Script1();
//   const script2 = new Script2();
//   const script3 = new Script3();
//   const script4 = new Script4();
//   script1.init();
//   script2.init(options);
//   script3.init();
//   script4.init(options);

//   script1.spawn(
//     fantasyChest,
//     { onClickText: "Use the Key", onClick: [], onOpen: [], onClose: [] },
//     createChannel(channelId, fantasyChest, channelBus)
//   );

//   script2.spawn(
//     fantasyIronKey,
//     {
//       target: "fantasyChest",
//       respawns: false,
//       onEquip: [],
//       onUse: [{ entityName: "fantasyChest", actionId: "toggle", values: {} }]
//     },
//     createChannel(channelId, fantasyIronKey, channelBus)
//   );


//   script3.spawn(
//     scroll,
//     { "text": "You have received Scroll of Weak Fireball", "fontSize": 24 },
//     createChannel(channelId, scroll, channelBus)
//   );

//   script4.spawn(
//     oldIronSword,
//     {
//       target: "fantasyChest",
//       respawns: false,
//       onEquip: [],
//       onUse: [{entityName: "fantasyChest", actionId: "toggle", values: {}}]
//     },
//     createChannel(channelId, oldIronSword, channelBus)
//   )



//   respawnRivers();
// }

// const house = new Entity("house")
// const houseModel = resources.models.house;
// houseModel.withCollisions = true
// houseModel.visible = true
// const houseLoc = new Transform({
//   position: new Vector3(8, 0, -12),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1),
// });
// house.addComponentOrReplace(houseLoc);
// house.addComponentOrReplace(houseModel)
// engine.addEntity(house);


// const hud: BuilderHUD = new BuilderHUD();
// hud.attachToEntity(peasant)

// async function afterSalute() {
//     //await salute.play()
//     //salute.looping = false;
//     //log('playing the walk clip after the salute')
//     //riversWalkClip.play()
//     oldmanriversAnimator.getClip('riversWalkClip').play()
//   }


// @Component("peasantlerpData")
// export class PeasantLerpData {
//   array: Vector3[] = peasantpath;
//   origin: number = 0;
//   target: number = 1;
//   fraction: number = 0;
// }

// let peasantAnimator = new Animator();
// peasant.addComponent(peasantAnimator);

// const peasantWalk = new AnimationState("yawn");
// const peasantIdle = new AnimationState("idle");
// const peasantDeath = new AnimationState("death");
// const peasantYawn = new AnimationState("yawn");
// const peasantBoxing = new AnimationState("boxing");
// const peasantHitInHead = new AnimationState("hitInHead");
// peasantAnimator.addClip(peasantWalk);
// peasantAnimator.addClip(peasantIdle);
// peasantAnimator.addClip(peasantDeath);
// peasantAnimator.addClip(peasantYawn);
// peasantAnimator.addClip(peasantBoxing);
// peasantAnimator.addClip(peasantHitInHead);

// const peasant2 = new Vector3(14, 0, -9);
// const peasant3 = new Vector3(14, 0, 13);
// const peasant4 = new Vector3(12, 0, 13);
// const peasant5 = new Vector3(12, 0, 2);
// const peasant6 = new Vector3(7, 0, 2);
// const peasant7 = new Vector3(7, 0, -2);
// const peasant8 = new Vector3(4, 0, -2);
// const peasant9 = new Vector3(4, 0, -13);

// const peasantpath: Vector3[] = [peasant1,peasant2,peasant3,peasant4,peasant5,peasant6,peasant7,peasant8,peasant9]
// peasant.addComponent(new PeasantLerpData());
// peasantWalk.play();
// export class PeasantWalk {
//   update(dt: number) {
//     if (!peasant.hasComponent(TimeOut) && !talkingClip.playing && !fightIdle.playing && !boxing.playing) {
//       let transform = peasant.getComponent(Transform);
//       let path = peasant.getComponent(PeasantLerpData);
//       peasantWalk.playing = true;
//       turnRClip.playing = false;
//       if (path.fraction < 1) {
//         path.fraction += dt / 12;
//         transform.position = Vector3.Lerp(
//           path.array[path.origin],
//           path.array[path.target],
//           path.fraction
//         );
//       } else {
//         path.origin = path.target;
//         path.target += 1;
//         if (path.target >= path.array.length) {
//           path.target = 0;
//         }
//         path.fraction = 0;
//         transform.lookAt(path.array[path.target]);
//         peasantWalk.pause();
//         turnRClip.play();
//         turnRClip.looping = false;
//         oldmanrivers.addComponent(new TimeOut(TURN_TIME));
//       }
//     }
//   }
// }

// engine.addSystem(new PeasantWalk());

// export class BattleCry {
//   update() {
//     let transform = oldmanrivers.getComponent(Transform);
//     let path = oldmanrivers.getComponent(DerpData); 
//     let dist = distance(transform.position, camera.position);
//     if (dist < 8) {
//       let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
//       transform.lookAt(playerPos);
//       if(battle){
//         if (!dead && !clicked) {
//           if (!oldmanrivers.hasComponent(TimeOut)) {
//             riversWalkClip.playing = false;
//             turnLClip.playing = false;
//             fightIdle.playing = false;
//             boxing.play()
//             soundbox3.getComponent(AudioSource).playOnce()
//             PLAYER_HP--; 
//             text.value = `HP: ${PLAYER_HP}    Rivers HP: ${HIT_POINTS}`;
//             if (PLAYER_HP == 0) {
//               soundbox2.getComponent(AudioSource).playOnce();
//               text.visible = false;
//               instructions.visible = true;
//               dead = true;
//               battle = false;
//             }
//             oldmanrivers.addComponent(new TimeOut(PUNCH_TIME)); 
//           } 
//         } 
//       } else {
//         boxing.playing = false;
//         riversWalkClip.playing = false;
//         turnLClip.playing = false;
//         talkingClip.play()
//       } 
//     } else {
//         boxing.stop()
//         fightIdle.stop()
//         talkingClip.stop()
//         transform.lookAt(path.array[path.target]);
//     }
//   }
// }

// engine.addSystem(new BattleCry());
//engine.addSystem(new Battle(oldmanrivers,TURN_TIME,riversWalkClip,turnLClip, boxing, battle, clicked, PUNCH_TIME, PLAYER_HP))

// const camera = Camera.instance;

// function distance(pos1: Vector3, pos2: Vector3): number {
//   const a = pos1.x - pos2.x;
//   const b = pos1.z - pos2.z;
//   return a * a + b * b;
// }
