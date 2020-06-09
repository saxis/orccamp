// import { loadMobs } from "../game";
// import { NpcId } from "../components/npcId";

// const refreshInterval: number = 3;
// let refreshTimer: number = refreshInterval;

// export const orcs = engine.getComponentGroup(NpcId)

// export class CheckServer {
//   update(dt: number) {
//     refreshTimer -= dt;
//     if (refreshTimer < 0) {
//       log('in checkServer')
//       for (let ent of orcs.entities) {
//           log('in battle loop')
//           let npcid = ent.getComponentOrNull(NpcId)
//           log(npcid.id)
//           if (npcid.id) {
//             log('calling load mobs with the id ', npcid.id)
//             loadMobs(npcid.id)
//          } else {
//            log('calling load mobs without the id')
//            loadMobs()
//          }
//       }
//        refreshTimer = refreshInterval;
//     }
//   }
// }
