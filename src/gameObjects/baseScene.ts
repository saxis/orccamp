import resources from "../resources";
import { spawnEntity } from "../modules/SpawnerFunctions";
//import utils from "../../node_modules/decentraland-ecs-utils/index";
//import { spawnEntity } from "../modules/SpawnerFunctions";

export class BaseScene extends Entity {
  constructor() {
    super();
    engine.addEntity(this);

    const orccamp = new Entity("orccamp");
    const orcShape = resources.models.orc_camp;
    const orcLoc = new Transform({
      position: new Vector3(16, 0, 0),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1),
    });
    orccamp.addComponentOrReplace(orcLoc);
    orccamp.addComponentOrReplace(orcShape);
    engine.addEntity(orccamp);

    const grassBase = new Entity("grass");
    //const grassBase2 = new Entity("grass2");
    const grassShape = new GLTFShape(
      "models/FloorBaseGrass_01/FloorBaseGrass_01.glb"
    );
    grassBase.addComponentOrReplace(grassShape);
    // grassBase2.addComponentOrReplace(grassShape);
    const grassLoc = new Transform({
      position: new Vector3(8, 0, 8),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1),
    });
   
    grassBase.addComponentOrReplace(grassLoc);
    engine.addEntity(grassBase);
    grassBase.addComponent(new AudioSource(resources.sounds.birdsong));
    grassBase.getComponent(AudioSource).playOnce();

    const flag = spawnEntity(16, 0, 0, 0, 0, 0, 1, 1, 1);
    flag.addComponentOrReplace(resources.models.flag);

    const smoke1 = spawnEntity(16, 0, 0, 0, 0, 0, 1, 1, 1);
    smoke1.addComponentOrReplace(resources.models.smoke1);

    const smoke2 = spawnEntity(16, 0, 0, 0, 0, 0, 1, 1, 1);
    smoke2.addComponentOrReplace(resources.models.smoke2);

   
  }
}
