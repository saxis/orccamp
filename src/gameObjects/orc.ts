export class Orc extends Entity {
    private _hp: number;
    private _battle: boolean = false;
    private _startinghp:number;
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
      this.walk = new AnimationState("walking");
      npcAnimator.addClip(this.walk);
      this.turnAround = new AnimationState("turnAround");
      npcAnimator.addClip(this.turnAround);
      this.idle = new AnimationState("idle");
      npcAnimator.addClip(this.idle);
      this.boxing = new AnimationState("punch");
      npcAnimator.addClip(this.boxing);
      this.kick = new AnimationState("kick");
      npcAnimator.addClip(this.kick)
      this.hit1 = new AnimationState("hitInHead");
      npcAnimator.addClip(this.hit1);
      this.hit2 = new AnimationState("hitInKidney")
      npcAnimator.addClip(this.hit2)
      this.death1 = new AnimationState("death1");
      npcAnimator.addClip(this.death1);
      this.death2 = new AnimationState("death2")
      npcAnimator.addClip(this.death2)
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

    resethealthbar(canvas) {
        this.healthBar = new UIText(canvas)
        this.healthBar.hAlign = "left";
        this.healthBar.vAlign = "center";
        this.healthBar.hTextAlign = "left";
        this.healthBar.vTextAlign = "center";
        this.healthBar.width = "100%";
        this.healthBar.height = "100%";
        this.healthBar.value = ((this._startinghp/this._startinghp)*100).toString() + '%';
        this.healthBar.positionY = 180;
        this.healthBar.positionX = 100;
        this.healthBar.fontSize = 14;
        this.healthBar.outlineWidth = 0.4;
        this.healthBar.textWrapping = true;
        this.healthBar.fontWeight = "bold";
        this.healthBar.isPointerBlocker = false;
        this.healthBar.visible = false; 

        this.npcName = new UIText(canvas)
    this.npcName.vAlign = "center";
    this.npcName.hTextAlign = "left";
    this.npcName.vTextAlign = "center";
    this.npcName.width = "100%";
    this.npcName.height = "100%";
    this.npcName.value = 'Orc Grunt'
    this.npcName.positionY = 195;
    this.npcName.positionX = 95;
    this.npcName.fontSize = 10;
    this.npcName.outlineWidth = 0.4;
    this.npcName.textWrapping = true;
    this.npcName.fontWeight = "bold";
    this.npcName.isPointerBlocker = false;
    this.npcName.visible = false; 
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
      this.npcName.visible = true;
    }

    hidehpbar() {
      this.healthBar.visible = false;
      this.npcName.visible = false;
    }
  
    heal(amount: number) {
      this.hp += amount;
      this.healthBar.value  =  ((this.hp/this._startinghp)*100).toFixed(0).toString() + '%';
    }
  
    takedamage(amount: number) {
      this.hp -= amount;
      this.healthBar.value  = ((this.hp/this._startinghp)*100).toFixed(0).toString() + '%';
      log('orc healthbar value should be showing: ', this.healthBar.value)
    }
  }
  