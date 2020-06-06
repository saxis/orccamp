export class Npc extends Entity {
  private _hp: number;
  private _name: string;
  private _battle: boolean = false;
  private _startinghp:number;
  //private _walkClip: AnimationState
  public idle1: AnimationState;
  public idle2: AnimationState;
  public idle3: AnimationState;
  public walk: AnimationState;
  public death: AnimationState;
  public hit: AnimationState;
  public hitInHead: AnimationState;
  public hitAndFall: AnimationState;
  private healthBar: UIText;

  constructor(
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
        rotation: rotation
      })
    );
    this.addComponent(new AudioSource(sound));
    this._hp = startingHp;
    this._startinghp = startingHp;
    let npcAnimator = new Animator();
    this.addComponent(npcAnimator);
    this.idle1 = new AnimationState("idle")
    npcAnimator.addClip(this.idle1)
    this.idle2 = new AnimationState("idle2")
    npcAnimator.addClip(this.idle2)
    this.idle3 = new AnimationState("idle3")
    npcAnimator.addClip(this.idle3)
    this.walk = new AnimationState("walk");
    npcAnimator.addClip(this.walk);
    this.death = new AnimationState("death")
    npcAnimator.addClip(this.death)
    this.hit = new AnimationState("hit")
    npcAnimator.addClip(this.hit)
    this.hitAndFall = new AnimationState("hitInHead")
    npcAnimator.addClip(this.hitAndFall)
    this.hitInHead = new AnimationState("hitInHead")
    npcAnimator.addClip(this.hitInHead)
    this.healthBar = new UIText(canvas)
    this.healthBar.hAlign = "left";
    this.healthBar.vAlign = "center";
    this.healthBar.hTextAlign = "left";
    this.healthBar.vTextAlign = "center";
    this.healthBar.width = "100%";
    this.healthBar.height = "100%";
    this.healthBar.value = ((startingHp/startingHp)*100).toString() + '%';
    this.healthBar.positionY = 180;
    this.healthBar.positionX = 100;
    this.healthBar.fontSize = 14;
    this.healthBar.outlineWidth = 0.4;
    this.healthBar.textWrapping = true;
    this.healthBar.fontWeight = "bold";
    this.healthBar.isPointerBlocker = false;
    this.healthBar.visible = false;
  }

  public playAudio() {
    this.getComponent(AudioSource).playOnce();
  }

  get name() {
    return this._name;
  }

  set name(val:string) {
    this._name = val;
  }

  get battle() {
    return this._battle;
  }

  set battle(val: boolean) {
    this._battle = val;
  }

  get hp() {
    return this._hp;
  }

  set hp(val: number) {
    if (val > -1) {
      this._hp = val;
    }
  }

  showhpbar() {
    this.healthBar.visible = true;
  }

  hidehpbar() {
    this.healthBar.visible = false;
  }

  heal(amount: number) {
    this.hp += amount;
    this.healthBar.value  =  ((this.hp/this._startinghp)*100).toFixed(0).toString() + '%';
  }

  takedamage(amount: number) {
    this.hp -= amount;
    this.healthBar.value  = ((this.hp/this._startinghp)*100).toFixed(0).toString() + '%';
  }
}
