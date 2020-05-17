export class Player {
  private _hp: number;
  private _startinghp: number;
  private healthBar: UIText;

  constructor(startingHp: number, canvas) {
    this._hp = startingHp;
    this._startinghp = startingHp;
    this.healthBar = new UIText(canvas);
    this.healthBar.hAlign = "right";
    this.healthBar.vAlign = "center";
    this.healthBar.hTextAlign = "right";
    this.healthBar.vTextAlign = "center";
    this.healthBar.width = "100%";
    this.healthBar.height = "100%";
    this.healthBar.value = 
      ((this._startinghp / this._startinghp) * 100).toString() + "%";
    this.healthBar.positionY = 180;
    this.healthBar.positionX = -60;
    this.healthBar.fontSize = 14;
    this.healthBar.outlineWidth = 0.4;
    this.healthBar.textWrapping = true;
    this.healthBar.fontWeight = "bold";
    this.healthBar.isPointerBlocker = false;
    this.healthBar.visible = false;
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

  heal(amount: number) {
    if (amount > 0) {
      this.hp += amount;
      this.healthBar.value =
        ((this.hp / this._startinghp) * 100).toFixed(0).toString() + "%";
    }
  }

  damage(amount: number) {
  if (amount > 0) {
      this.hp -= amount;
      this.healthBar.value =
        ((this.hp / this._startinghp) * 100).toFixed(0).toString() + "%";
    }
  }
}
