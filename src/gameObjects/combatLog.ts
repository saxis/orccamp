export class CombatLog {
    private _canvas;
    private _combatlog;

    constructor(canvas) {
      this._canvas = canvas;
      //this._combatlog = new UIContainerRect(this._canvas);
      this._combatlog = new UIText(canvas)
    //   this._combatlog.width = "13.75%";
    //   this._combatlog.height = "20.25%";
      this._combatlog.vAlign = "bottom";
      this._combatlog.hAlign = "center";
      this._combatlog.hTextAlign = "center"
      this._combatlog.fontSize = 24;
      //this._combatlog.positionY = 180;
      this._combatlog.color = Color4.Black();
      this._combatlog.opacity = 0.8;
      this._combatlog.visible = true;
    }

    get text() {
        return this._combatlog.value;
    }

    set text(val:string) {
        if(val) {
            this._combatlog.value = val;
        }
    }
  
    public show() {
      this._combatlog.visible = true;
    }
  
    public hide() {
      this._combatlog.visible = false;
    }
  }