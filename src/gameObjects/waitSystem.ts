import { TimeOut } from "../components/timeout";
import { SecondaryTimeOut } from "../components/secondaryTimeOut";

export const paused = engine.getComponentGroup(TimeOut);
export const secondarypaused = engine.getComponentGroup(SecondaryTimeOut)

export class WaitSystem {
  update(dt: number) {
    for (let ent of paused.entities) {
      let time = ent.getComponentOrNull(TimeOut);
      if (time) {
        if (time.timeLeft > 0) {
          time.timeLeft -= dt;
        } else {
          ent.removeComponent(TimeOut);
        }
      }
    }
    for (let ent of secondarypaused.entities) {
      let time = ent.getComponentOrNull(SecondaryTimeOut);
      if (time) {
        if (time.timeLeft > 0) {
          time.timeLeft -= dt;
        } else {
          ent.removeComponent(SecondaryTimeOut);
        }
      }
    }
  }
}