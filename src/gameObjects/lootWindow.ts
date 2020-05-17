export class LootWindow {
    private _canvas;
    private _image;
    private _loot;
    constructor(canvas, image) {
      this._canvas = canvas;
      this._image = image;
      this._loot = new UIImage(this._canvas, this._image);
      this._loot.hAlign = "center"
      this._loot.vAlign = "center";
      this._loot.width = "10%";
      this._loot.height = "30%";
      this._loot.positionY = 180;
      this._loot.sourceWidth = 161;
      this._loot.sourceHeight = 195;
      this._loot.visible = false;
    }
  
    public show() {
      this._loot.visible = true;
    }
  
    public hide() {
      this._loot.visible = false;
    }
  }
  