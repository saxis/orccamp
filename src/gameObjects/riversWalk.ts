import { Npc } from "./npc";
import { TimeOut } from "../components/timeout";
import { DerpData } from "./lerpData";
import { SecondaryTimeOut } from "../components/secondaryTimeOut";

export class Walk {
    private _npc: Npc;
    private _turntime: number;
    private _walk: AnimationState;
    private _turn: AnimationState;

    constructor(npc: Npc, turntime: number, walk:AnimationState, turn:AnimationState) {
        this._npc = npc;
        this._turntime = turntime;
        this._walk = walk;
        this._turn = turn;
    }

    update(dt: number) {
      if (!this._npc.hasComponent(TimeOut) && !this._npc.hasComponent(SecondaryTimeOut)) {
        let transform = this._npc.getComponent(Transform);
        let path = this._npc.getComponent(DerpData);
        this._walk.playing = true;
        this._turn.playing = false;
        if (path.fraction < 1) {
          path.fraction += dt / 12;
          transform.position = Vector3.Lerp(
            path.array[path.origin],
            path.array[path.target],
            path.fraction
          );
        } else {
          path.origin = path.target;
          path.target += 1;
          if (path.target >= path.array.length) {
            path.target = 0;
          }
          path.fraction = 0;
          transform.lookAt(path.array[path.target]);
          this._walk.pause()
          this._turn.play();
          this._npc.addComponent(new TimeOut(this._turntime));
        }
      }
    }
  }