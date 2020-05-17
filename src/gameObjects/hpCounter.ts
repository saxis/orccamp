export class HpCounter {
  private _canvas;
  private _image;
  private _hpbar;
  constructor(canvas, image, type) {
    this._canvas = canvas;
    this._image = image;
    this._hpbar = new UIImage(this._canvas, this._image);
     if(type == 'npc') {
        this._hpbar.hAlign = "left";
    } else {
        this._hpbar.hAlign = "right";
    }
    this._hpbar.vAlign = "center";
    this._hpbar.width = "13.75%";
    this._hpbar.height = "6.25%";
    this._hpbar.positionY = 180;
    this._hpbar.sourceWidth = 344;
    this._hpbar.sourceHeight = 64;
    this._hpbar.visible = false;
  }

  public show() {
    this._hpbar.visible = true;
  }

  public hide() {
    this._hpbar.visible = false;
  }
}
