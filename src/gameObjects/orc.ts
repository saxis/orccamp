import resources from "../resources";
import { NpcId } from "../components/npcId";

export class Orc extends Entity {
  private _id: string;
  private _hp: number;
  private _battle: boolean = false;
  private _startinghp: number;
  public walk: AnimationState;
  public turnAround: AnimationState;
  public idle: AnimationState;
  public boxing: AnimationState;
  public kick: AnimationState;
  public hit1: AnimationState;
  public hit2: AnimationState;
  public death1: AnimationState;
  public death2: AnimationState;
  private healthBar: UIText;
  private npcName: UIText;
  private npcLevel: UIText;
  private loot: UIText;
  private loot2: UIText;
  private loot3: UIText;
  private close: UIImage;
  //private npcUrl = "http://localhost:8080/npc";
  private npcUrl = 'https://sutenquestapi.azurewebsites.net/npc'

  constructor(
    id:string,
    sound: AudioClip,
    model: GLTFShape,
    startingHp: number,
    start: Vector3,
    rotation: Quaternion,
    canvas
  ) {
    super();
    engine.addEntity(this);
    this.addComponent(model);
    this.addComponent(
      new Transform({
        position: start,
        rotation: rotation,
      })
    );
    this.addComponent(new AudioSource(sound));
    this._id = id;
    this._hp = startingHp;
    this._startinghp = startingHp;
    this.addComponent(new NpcId())
    this.getComponent(NpcId).id = this._id
    let npcAnimator = new Animator();
    this.addComponent(npcAnimator);
    this.walk = new AnimationState("walking");
    npcAnimator.addClip(this.walk);
    this.turnAround = new AnimationState("turnAround");
    npcAnimator.addClip(this.turnAround);
    this.idle = new AnimationState("idle");
    npcAnimator.addClip(this.idle);
    this.boxing = new AnimationState("punch");
    npcAnimator.addClip(this.boxing);
    this.kick = new AnimationState("kick");
    npcAnimator.addClip(this.kick);
    this.hit1 = new AnimationState("hitInHead");
    npcAnimator.addClip(this.hit1);
    this.hit2 = new AnimationState("hitInKidney");
    npcAnimator.addClip(this.hit2);
    this.death1 = new AnimationState("death1");
    npcAnimator.addClip(this.death1);
    this.death2 = new AnimationState("death2");
    npcAnimator.addClip(this.death2);
  }

  public playAudio() {
    this.getComponent(AudioSource).playOnce();
  }

  resethealthbar(canvas) {
    this.hp = this._startinghp;
    this.healthBar = new UIText(canvas);
    this.healthBar.hAlign = "left";
    this.healthBar.vAlign = "center";
    this.healthBar.hTextAlign = "left";
    this.healthBar.vTextAlign = "center";
    this.healthBar.width = "100%";
    this.healthBar.height = "100%";
    this.healthBar.value =
      ((this._startinghp / this._startinghp) * 100).toString() + "%";
    this.healthBar.positionY = 180;
    this.healthBar.positionX = 100;
    this.healthBar.fontSize = 14;
    this.healthBar.outlineWidth = 0.4;
    this.healthBar.textWrapping = true;
    this.healthBar.fontWeight = "bold";
    this.healthBar.isPointerBlocker = false;
    this.healthBar.visible = false;

    this.npcName = new UIText(canvas);
    this.npcName.vAlign = "center";
    this.npcName.hTextAlign = "left";
    this.npcName.vTextAlign = "center";
    this.npcName.width = "100%";
    this.npcName.height = "100%";
    this.npcName.value = "Orc Grunt";
    this.npcName.positionY = 195;
    this.npcName.positionX = 95;
    this.npcName.fontSize = 10;
    this.npcName.outlineWidth = 0.4;
    this.npcName.textWrapping = true;
    this.npcName.fontWeight = "bold";
    this.npcName.isPointerBlocker = false;
    this.npcName.visible = false;

    this.npcLevel = new UIText(canvas);
    this.npcLevel.vAlign = "center";
    this.npcLevel.hTextAlign = "left";
    this.npcLevel.vTextAlign = "center";
    this.npcLevel.width = "100%";
    this.npcLevel.height = "100%";
    if (this._startinghp > 10 && this._startinghp < 20) {
      this.npcLevel.value = "2";
    } else {
      this.npcLevel.value = "1";
    }
    
    this.npcLevel.positionY = 165;
    this.npcLevel.positionX = 40;
    this.npcLevel.fontSize = 14;
    this.npcLevel.outlineWidth = 0.4;
    this.npcLevel.textWrapping = true;
    this.npcLevel.fontWeight = "bold";
    this.npcLevel.isPointerBlocker = false;
    this.npcLevel.visible = false;

    this.loot = new UIText(canvas);
    this.loot.vAlign = "center";
    this.loot.hTextAlign = "center";
    this.loot.vTextAlign = "center";
    this.loot.width = "100%";
    this.loot.height = "100%";
    this.loot.value = "1 Mana";
    //this.loot.positionX = 300;
    this.loot.positionY = 200;
    this.loot.fontSize = 10;
    this.loot.outlineWidth = 0.4;
    this.loot.textWrapping = true;
    this.loot.fontWeight = "bold";
    this.loot.isPointerBlocker = false;
    this.loot.visible = false;

    this.loot2 = new UIText(canvas);
    this.loot2.vAlign = "center";
    this.loot2.hTextAlign = "center";
    this.loot2.vTextAlign = "center";
    this.loot2.width = "100%";
    this.loot2.height = "100%";
    this.loot2.value = "Rusty Sword";
    this.loot2.positionY = 160;
    this.loot2.fontSize = 10;
    this.loot2.outlineWidth = 0.4;
    this.loot2.textWrapping = true;
    this.loot2.fontWeight = "bold";
    this.loot2.isPointerBlocker = false;
    this.loot2.visible = false;

    this.loot3 = new UIText(canvas);
    this.loot3.vAlign = "center";
    this.loot3.hTextAlign = "center";
    this.loot3.vTextAlign = "center";
    this.loot3.width = "100%";
    this.loot3.height = "100%";
    this.loot3.value = "Dirty Cloth Cap";
    this.loot3.positionY = 120;
    this.loot3.fontSize = 10;
    this.loot3.outlineWidth = 0.4;
    this.loot3.textWrapping = true;
    this.loot3.fontWeight = "bold";
    this.loot3.isPointerBlocker = false;
    this.loot3.visible = false;

    this.close = new UIImage(canvas, resources.textures.closeicon);
    this.close.name = "clickable-image";
    this.close.width = "30px";
    this.close.height = "30px";
    this.close.sourceWidth = 512;
    this.close.sourceHeight = 512;
    this.close.vAlign = "center";
    this.close.positionY = 250;
    this.close.positionX = 60;
    this.close.isPointerBlocker = true;
    this.close.visible = false;
  }

  get battle() {
    return this._battle;
  }

  set battle(val: boolean) {
    this._battle = val;
  }

  get id() {
    return this._id;
  }

  get hp() {
    return this._hp;
  }

  set hp(val: number) {
    if (val > -1) {
      this._hp = val;
    }
  }

  setPosition(loc,rot) {
    this.getComponentOrNull(Transform).position = loc
    this.getComponentOrNull(Transform).rotation = rot
  }

  loadloot() {
    this.loot.visible = true;
    this.loot2.visible = true;
    this.loot3.visible = true;
    this.close.visible = true;
  }

  hideloot() {
    this.loot.visible = false;
    this.loot2.visible = false;
    this.loot3.visible = false;
    this.close.visible = false;
  }

  showhpbar() {
    this.healthBar.visible = true;
    this.npcName.visible = true;
    this.npcLevel.visible = true;
  }

  hidehpbar() {
    this.healthBar.visible = false;
    this.npcName.visible = false;
    this.npcLevel.visible = false;
  }

  heal(amount: number) {
    let url = this.npcUrl + '/' + this._id;

    executeTask(async () => {
      const hpo = {
        amount : amount
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          this.hp = res.hp
          this.healthBar.value = res.percentage + '%'
        })
      } catch(error) {
        log ('failed to heal ', error)
      }
      
    })
  }

  takedamage(amount:number, loc, rot) {
    let url = this.npcUrl + '/' + this._id

    // log('sending loc to server: ', loc)
    // log('sending rot to server: ', rot)

    executeTask(async () => {
      const hpo = {
        amount : -amount,
        loc:loc,
        rot:rot
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(url, options)
          .then((res) => res)
          .then((res) => res.json())
          .then((res) => {
            this.hp = res.hp
            //log('setting healthbar value to ', res.percentage)
            this.healthBar.value = res.percentage + '%'
          })
      } catch(error) {
        log('failed to take npc damage ', error)
      }
    })
  }

  remove() {
    let url = this.npcUrl + '/' + this._id

    executeTask(async () => {
      const options = {
        method: "DELETE",
      };

      try {
        fetch(url, options)
          .then((res) => res)
          // .then((res) => res.json())
          // .then((res) => {
          //   log('after delete ')
          // })
      } catch(error) {
        log('failed to delete npc ', error)
      }
    })
  }
}
