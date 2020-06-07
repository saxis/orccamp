import { DerpData } from "./lerpData";
import { TimeOut } from "../components/timeout";
import { SecondaryTimeOut } from "../components/secondaryTimeOut"
import { SoundBox } from "../components/soundbox";
import resources from "../resources";
import { Player } from "./player";
//import { PeasantDialog, SecondDialog } from "../ui/index";
import { Orc } from "./orc";
import { HpCounter } from "./hpCounter";
import { LootWindow } from "./lootWindow"
import { SpawnTimeOut } from "../components/spawnTimer";
import { CombatLog } from "./combatLog";

//const soundbox2 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.evillaugh)
const soundbox3 = new SoundBox(new Transform({position: new Vector3(7, 0, 8) }), resources.sounds.playerHit2)
const soundbox4 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.playerHit)
const killbox = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.killping)
const orclaugh = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.orclaugh)


export class OrcBattle {
    private _player: Player;
    private _npc: Orc
    private _startPos: Vector3;
    private _startRot: Quaternion;
    //private _turntime: number;
    private _walk: AnimationState;
    private _turn: AnimationState;
    private _fight: AnimationState;
    private _kick: AnimationState;
    private _hit: AnimationState;
    private _idle: AnimationState;
    private _hit2: AnimationState;
    private _death: AnimationState;
    private _death2: AnimationState;
    private _clicked = false;
    private _battlepause: number;
    private dead = false;
    private _startfight: boolean = false;
    //private _dialog: PeasantDialog;
    private _punchpause: number = 2
    private _pacified: boolean = false;
    private _orcGruntHpBar: HpCounter;
    private _lootWindow: LootWindow;
    private _combatLog: CombatLog;
    private canvas;

    public endFight: () => void;

    constructor(canvas, player: Player, npc: Orc, startPos:Vector3, startRot:Quaternion,  clicked:boolean, battlepause:number ) {
        this._player = player;
        this._npc = npc;
        this._startPos = startPos;
        this._startRot = startRot;
        this._walk = this._npc.walk;
        this._turn = this._npc.turnAround 
        this._fight = this._npc.boxing;
        this._kick = this._npc.kick
        this._idle = this._npc.idle
        this._hit = this._npc.hit1;
        this._hit2 = this._npc.hit2
        this._death = this._npc.death1
        this._death2 = this._npc.death2
        this._clicked = clicked;
        this._battlepause = battlepause;
        this.canvas = canvas;
        //this._dialog = dialog
        this._orcGruntHpBar = new HpCounter(canvas,resources.textures.orcGruntHpBar,'npc')
        this._lootWindow = new LootWindow(canvas, resources.textures.lootWindow)
        this._combatLog = new CombatLog(canvas)
        this._npc.resethealthbar(canvas)

        if (this._npc.hp == 0) {
          this.dead = true;
        }

        this._npc.addComponentOrReplace(
            new OnPointerDown(
               e => {
                 this._npc.getComponent(OnPointerDown).showFeedback = false;
                 if(!this._npc.hasComponent(SecondaryTimeOut)) {
                   this._clicked = true;
                 }
               },{
                 button: ActionButton.PRIMARY,
                 showFeedback: true,
                 hoverText: "Punch" 
               }
           )
         )
    }

    update(dt: number) {
      let transform = this._npc.getComponent(Transform);
      if(this._player.levelup) {
        log(`You have reached a new level. You are now level ${this._player.level}`)
        this._combatLog.text = `You have reached a new level! You are now level ${this._player.level}`
        this._player.levelup = false;
        this._combatLog.clearlog()
       }
      //let path = this._npc.getComponent(DerpData); 
      let dist = distance(transform.position, camera.position);
      if (dist < 8) {
        let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
        transform.lookAt(playerPos);
          if(this.dead == false && this._npc.battle == false) {
            this._npc.battle = true;
            this._player.updateaggro("add",this._npc.id)
          }
          
          if (!this.dead && !this._clicked) {
            if(!this._npc.hasComponent(SecondaryTimeOut) && this._npc.getComponent(OnPointerDown).showFeedback === false) {
              this._npc.getComponent(OnPointerDown).showFeedback = true;
            }
            if (!this._npc.hasComponent(TimeOut)) {
              this._walk.playing = false;
              this._turn.playing = false;
              this._hit.playing = false;
              this._hit2.playing = false;
              this._idle.playing = false;
              
              if(Math.round(Math.random() * 1)){
                this._fight.play()
              } else {
                this._kick.play()
              }

              soundbox3.play()
              this._player.damage(1)
              //log(`An ${this._npc.name} hits YOU for 1 point of damage`)
              this._combatLog.text = `An ${this._npc.name} hits YOU for 1 point of damage`

              if(this._player.hp == 0) {
                orclaugh.play()
                this._fight.stop()
                this._kick.stop()
                this.dead = true;
                this._npc.battle = false;
                //this._dialog.npcWon()
                this._npc.addComponentOrReplace(
                  new Transform({
                    position: this._startPos,
                    rotation: this._startRot
                  })
                );
                this._idle.play()
              }
              this._npc.addComponentOrReplace(new TimeOut(this._battlepause)); 
            } 
          } else if (!this.dead && this._clicked) {
            //log('in the block not dead and clicked')
            if(!this._npc.hasComponent(SecondaryTimeOut)) {
             // log('in the block not dead, clicked, no secondary timeout ')
              this._walk.playing = false;
              this._turn.playing = false;
              this._fight.playing = false;
              this._kick.playing = false;
              this._idle.playing = false;

              if(Math.round(Math.random() * 1)){
                this._hit.play()
              } else {
                this._hit2.play()
              }

              soundbox4.play()
              let nowloc = [transform.position.x,transform.position.y,transform.position.z]
              let nowrot = [transform.rotation.x, transform.rotation.y, transform.rotation.z]
              if(this._player.basedamage === undefined) {
                this._player.basedamage = 1
              }
              this._npc.takedamage(this._player.basedamage, nowloc, nowrot)
              log(`You hit ${this._npc.name} for ${this._player.basedamage} point of damage`)
              this._combatLog.text = `You hit ${this._npc.name} for ${this._player.basedamage} point of damage`

              this._clicked = false;

              if(this._npc.hp == 0) {
                this._npc.addComponentOrReplace(new SpawnTimeOut(90)); 
                this._npc.addComponentOrReplace(
                  new OnPointerDown(
                     e => {
                      this._lootWindow.show()
                      this._npc.loadloot()
                      let close = new UIImage(this.canvas, resources.textures.closeicon)
                      close.name = "clickable-image"
                      close.width = "30px"
                      close.height = "30px"
                      close.sourceWidth = 512
                      close.sourceHeight = 512
                      close.vAlign = "center"
                      close.positionY = 250;
                      close.positionX = 60;
                      close.isPointerBlocker = true
                      close.onClick = new OnClick(() => {
                        this._lootWindow.hide()
                        this._npc.hideloot()
                        close.visible = false;
                      })
                     },{
                       button: ActionButton.PRIMARY,
                       showFeedback: true,
                       hoverText: "Loot Corpse" 
                     }
                 )
                )
                let aggarray = []
                aggarray = this._player.aggro
                if (aggarray != undefined && aggarray.length > 0) {
                  if(aggarray.indexOf(this._npc.id) > -1) {
                    //log('removing from aggrolist: ', this._npc.id)
                    this._player.updateaggro("remove",this._npc.id)
                  }
                }
                this.dead = true;
                this._npc.battle = false;
                this._fight.stop()
                this._kick.stop()
                this._hit.stop()
                this._hit2.stop()

                this._death.play()
                this._death.looping = false;

                //log(`You have slain an ${this._npc.name}`)
                this._combatLog.text = `You have slain an ${this._npc.name}` 
                //log('You have gained experience!')
                this._combatLog.text = 'You have gained experience!' 

                killbox.play()

                if(this._player.level === undefined) {
                  this._player.level = 1
                }

                this._player.achievementcheck(20,this._player.level)
                // log(`In orcbattle leveledup is now ${leveledup}`)
                // if(leveledup) {
                //   log(`You have reached a new level. You are now level ${this._player.level}`)
                //   this._combatLog.text = `You have reached a new level! You are now level ${this._player.level}`
                // }

                if(Math.round(Math.random() * 1)){
                  this._death.play()
                  this._death.looping = false;
                } else {
                  this._death2.play()
                  this._death2.looping = false;
                }

                this._orcGruntHpBar.hide()
                this._npc.hidehpbar()

                this._combatLog.hide()

                //this._combatLog.clearlog();
              }
              this._npc.addComponentOrReplace(new SecondaryTimeOut(this._punchpause));
            }
          }  
       
      } else if (dist < 20 && dist > 8) {
        
        //log('less than 20, more than 8')
        if(!this.dead) {
            this._orcGruntHpBar.show()
            this._npc.showhpbar()
            
            let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
            this._npc.addComponentOrReplace(new DerpData([this._startPos,playerPos]))
    
            let transform = this._npc.getComponent(Transform);
            transform.lookAt(playerPos);
    
            let path = this._npc.getComponent(DerpData);
    
            this._walk.playing = true;
            this._turn.playing = false;
            this._fight.playing = false;
            this._kick.playing = false;
            this._hit.playing = false;
            this._hit2.playing = false;
            this._idle.playing = false;

            // transform.position = Vector3.Lerp(
            //   this._startPos,
            //   playerPos,
            //   .2
            // )
    
            if (path.fraction < 1) {
              // let separator = 0
              // separator = separator + 0.2
              // log('separator ', separator)
            //   log('path.fraction is less than 1 ', path.fraction)
            //   log('dt ', dt)
            //   log('dt/12 ', dt/12)
               //path.fraction += dt / 12
              //  path.fraction += 0.2
              //  log('path.fraction after addition ', path.fraction)
            //log('path array origin ', path.array[path.origin])
            //log('path array target ', path.array[path.target])
    
              transform.position = Vector3.Lerp(
                path.array[path.origin],
                path.array[path.target],
                //path.fraction
                0.5
              );
            }
        }

        
        
      } else {
          if(!this.dead) {
            let aggarray = []
            aggarray = this._player.aggro
            if (aggarray != undefined && aggarray.length > 0) {
              if(aggarray.indexOf(this._npc.id) > -1) {
                //log('removing from aggrolist: ', this._npc.id)
                this._player.updateaggro("remove",this._npc.id)
                //log('setting battle to false')
                this._npc.battle = false;
              }
            } else if (aggarray != undefined && aggarray.length == 0) {
              if (!this._npc.hasComponent(TimeOut)) {
                if(this._player.hp < this._player.maxhp) {
                  //log(`player current hp ${this._player.hp} max hp: ${this._player.maxhp}`)
                  this._player.heal(1)
                  this._npc.addComponentOrReplace(new TimeOut(this._battlepause)); 
                }
              }
            }
            
            this._orcGruntHpBar.hide()
            this._npc.hidehpbar()
            this._fight.stop()
            this._hit.stop()
            this._walk.stop()
            this._npc.addComponentOrReplace(
              new Transform({
                position: this._startPos,
                rotation: this._startRot
              })
            );
            this._idle.play()

          } else if(!this._npc.hasComponent(SpawnTimeOut)) {
            this._death.stop()
            this.dead = false;
            this._npc.resethealthbar(this.canvas)
            this._npc.heal(2000)
            this._npc.addComponentOrReplace(
              new OnPointerDown(
                 e => {
                   this._npc.getComponent(OnPointerDown).showFeedback = false;
                   if(!this._npc.hasComponent(SecondaryTimeOut)) {
                     this._clicked = true;
                   }
                 },{
                   button: ActionButton.PRIMARY,
                   showFeedback: true,
                   hoverText: "Punch" 
                 }
             )
           )  
           this._combatLog.show()
          }
      }
    }
  }

  function levelup() {
    this._combatLog.text = `You have reached a new level! You are now level ${this._player.level}`
  }

  function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x;
    const b = pos1.z - pos2.z;
    return a * a + b * b;
  }

  const camera = Camera.instance;