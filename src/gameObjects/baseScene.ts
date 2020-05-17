import resources from "../resources";
import { spawnEntity } from "../modules/SpawnerFunctions";
//import utils from "../../node_modules/decentraland-ecs-utils/index";
//import { spawnEntity } from "../modules/SpawnerFunctions";

export class BaseScene extends Entity {
  constructor() {
    super();
    engine.addEntity(this);

    // const staticObjects = new Entity();
    // staticObjects.setParent(this);
    // const gltfShape = resources.models.staticobjects;
    // staticObjects.addComponentOrReplace(gltfShape);
    // const transform_2 = new Transform({
    //   position: new Vector3(16, 0, 0),
    //   rotation: new Quaternion(0, 0, 0, 1),
    //   scale: new Vector3(1, 1, 1),
    // });
    // staticObjects.addComponentOrReplace(transform_2);
    // engine.addEntity(staticObjects);

    // const grassblades = new Entity("grassblades");
    // const grassBladesShape = resources.models.grassblades;
    // const grassBladesLoc = new Transform({
    //   position: new Vector3(16, 0, 0),
    //   rotation: new Quaternion(0, 0, 0, 1),
    //   scale: new Vector3(1, 1, 1),
    // });
    // grassblades.addComponentOrReplace(grassBladesLoc);
    // grassblades.addComponentOrReplace(grassBladesShape);
    // engine.addEntity(grassblades);

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
    const grassBase2 = new Entity("grass2");
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
    // const grassLoc2 = new Transform({
    //   position: new Vector3(8, 0, -8),
    //   rotation: new Quaternion(0, 0, 0, 1),
    //   scale: new Vector3(1, 1, 1),
    // });
    grassBase.addComponentOrReplace(grassLoc);
    // grassBase2.addComponentOrReplace(grassLoc2);
    engine.addEntity(grassBase);
    // engine.addEntity(grassBase2);
    grassBase.addComponent(new AudioSource(resources.sounds.birdsong));
    grassBase.getComponent(AudioSource).playOnce();

    // const flag = spawnEntity(16, 0, -16, 0, 0, 0, 1, 1, 1);
    // flag.addComponentOrReplace(resources.models.flag);

    // const smoke1 = spawnEntity(8, 0, -8, 0, 0, 0, 1, 1, 1);
    // smoke1.addComponentOrReplace(resources.models.smoke1);

    // const smoke2 = spawnEntity(8, 0, 8, 0, 0, 0, 1, 1, 1);
    // smoke2.addComponentOrReplace(resources.models.smoke2);

    // const leaves = spawnEntity(16, 0, 0, 0, 0, 0, 1, 1, 1);
    // leaves.addComponentOrReplace(resources.models.animatedleaves);

    // const lantern = spawnEntity(5.6, 2.2, 8.82, 0, -90, 0, 1, 1, 1);
    // lantern.addComponentOrReplace(resources.models.lantern);
    // lantern.addComponent(new AudioSource(resources.sounds.lava));
  }
}
