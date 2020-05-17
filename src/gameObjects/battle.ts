import { Npc } from "./npc";
import { DerpData } from "./lerpData";
import { TimeOut } from "../components/timeout";
import { SecondaryTimeOut } from "../components/secondaryTimeOut"
import { SoundBox } from "../components/soundbox";
import resources from "../resources";
import { Player } from "./player";
import { PeasantDialog, SecondDialog } from "../ui/index";

const soundbox2 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.evillaugh)
const soundbox3 = new SoundBox(new Transform({position: new Vector3(7, 0, 8) }), resources.sounds.playerHit2)
const soundbox4 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.playerHit)

export class Battle {
    private _player: Player;
    private _npc: Npc;
    //private _turntime: number;
    private _walk: AnimationState;
    private _talk: AnimationState;
    private _turn: AnimationState;
    private _fight: AnimationState;
    private _hit: AnimationState;
    private _death: AnimationState;
    private _clicked = false;
    private _battlepause: number;
    private dead = false;
    private _startfight: boolean = false;
    private _dialog: PeasantDialog;
    private _punchpause: number = 2

    public endFight: () => void;

    constructor(player: Player, npc: Npc, turntime: number, walk:AnimationState, talk:AnimationState, turn:AnimationState, fight:AnimationState, hit:AnimationState,death:AnimationState, clicked:boolean, battlepause:number, dialog:PeasantDialog) {
        this._player = player;
        this._npc = npc;
        this._walk = walk;
        this._talk = talk;
        this._turn = turn;
        this._fight = fight;
        this._hit = hit;
        this._death = death
        this._clicked = clicked;
        this._battlepause = battlepause;
        this._dialog = dialog
    }

    update() {
      let transform = this._npc.getComponent(Transform);
      let path = this._npc.getComponent(DerpData); 
      let dist = distance(transform.position, camera.position);
      if (dist < 8) {
        let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
        transform.lookAt(playerPos);
        if(this._npc.battle){
          if(!this._startfight){
            this._npc.addComponentOrReplace(
               new OnPointerDown(
                  e => {
                    this._npc.getComponent(OnPointerDown).showFeedback = false;
                    if(!this._npc.hasComponent(SecondaryTimeOut)) {
                      this._clicked = true;
                      log('this._clicked ', this._clicked)
                    }
                  },{
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "Punch" 
                  }
              )
            )
            this._startfight = true;
          }
          if (!this.dead && !this._clicked) {
            log('in the block not dead and not clicked')
            if(!this._npc.hasComponent(SecondaryTimeOut) && this._npc.getComponent(OnPointerDown).showFeedback === false) {
              this._npc.getComponent(OnPointerDown).showFeedback = true;
            }
            if (!this._npc.hasComponent(TimeOut)) {
              log('in the block not dead, not clicked, and no Timeout')
              this._walk.playing = false;
              this._turn.playing = false;
              this._talk.playing = false;
              this._hit.playing = false;
              this._fight.play()
              soundbox3.play()
              this._player.damage(1)
              if(this._player.hp == 0) {
                //soundbox2.play()
                this._fight.stop()
                this.dead = true;
                this._npc.battle = false;
                this._dialog.npcWon()
              }
              this._npc.addComponentOrReplace(new TimeOut(this._battlepause)); 
            } 
          } else if (!this.dead && this._clicked) {
            log('in the block not dead and clicked')
            if(!this._npc.hasComponent(SecondaryTimeOut)) {
              log('in the block not dead, clicked, no secondary timeout ')
              this._walk.playing = false;
              this._turn.playing = false;
              this._talk.playing = false;
              this._fight.playing = false;
              this._hit.play()
              soundbox4.play()
              this._npc.takedamage(1)
              this._clicked = false;
              if(this._npc.hp == 0) {
                this.dead = true;
                this._npc.battle = false;
                this._fight.stop()
                this._death.play()
                this._death.looping = false;
                this._dialog.playerWon()
              }
              this._npc.addComponentOrReplace(new SecondaryTimeOut(this._punchpause));
            }
          }  
        } else {
          this._walk.playing = false;
          this._turn.playing = false;
          this._talk.play();
          this._npc.addComponentOrReplace(new TimeOut(this._battlepause));  
        } 
      } else {
          this._fight.stop()
          this._death.stop()
          this._hit.stop()
          this._talk.stop()
          this._walk.play()
          transform.lookAt(path.array[path.target]);
      }
    }
  }

  function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x;
    const b = pos1.z - pos2.z;
    return a * a + b * b;
  }

  const camera = Camera.instance;