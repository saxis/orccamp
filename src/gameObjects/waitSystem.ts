import { TimeOut } from "../components/timeout";
import { SecondaryTimeOut } from "../components/secondaryTimeOut";
import { SpawnTimeOut } from "../components/spawnTimer";

export const paused = engine.getComponentGroup(TimeOut);
export const secondarypaused = engine.getComponentGroup(SecondaryTimeOut)
export const spawntimer = engine.getComponentGroup(SpawnTimeOut)

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
    for (let ent of spawntimer.entities) {
      let time = ent.getComponentOrNull(SpawnTimeOut);
      if (time) {
        if (time.timeLeft > 0) {
          time.timeLeft -= dt;
        } else {
          ent.removeComponent(SpawnTimeOut);
        }
      }
    }
  }
}