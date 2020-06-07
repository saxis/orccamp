export class CombatLog {
    private _canvas;
    private _combatlog0;
    private _combatlog1;
    private _combatlog2;
    private _combatlog3;
    private _combatlog4;
    private _displayarray;
    private _counter;

    constructor(canvas) {
      this._canvas = canvas;
      //this._combatlog = new UIContainerRect(this._canvas);
      this._combatlog0 = new UIText(canvas)
      this._combatlog0.vAlign = "bottom";
      this._combatlog0.hAlign = "center";
      this._combatlog0.hTextAlign = "center"
      this._combatlog0.fontSize = 24;
      this._combatlog0.opacity = 0.8;
      this._combatlog0.visible = true;
      this._combatlog0.positionY = 120;

      this._combatlog1 = new UIText(canvas)
      this._combatlog1.vAlign = "bottom";
      this._combatlog1.hAlign = "center";
      this._combatlog1.hTextAlign = "center"
      this._combatlog1.fontSize = 24;
      this._combatlog1.positionY = 90;
      this._combatlog1.opacity = 0.8;
      this._combatlog1.visible = true;

      this._combatlog2 = new UIText(canvas)
      this._combatlog2.vAlign = "bottom";
      this._combatlog2.hAlign = "center";
      this._combatlog2.hTextAlign = "center"
      this._combatlog2.fontSize = 24;
      this._combatlog2.positionY = 60;
      this._combatlog2.opacity = 0.8;
      this._combatlog2.visible = true;

      this._combatlog3 = new UIText(canvas)
      this._combatlog3.vAlign = "bottom";
      this._combatlog3.hAlign = "center";
      this._combatlog3.hTextAlign = "center"
      this._combatlog3.fontSize = 24;
      this._combatlog3.positionY = 30;
      this._combatlog3.opacity = 0.8;
      this._combatlog3.visible = true;

      this._combatlog4 = new UIText(canvas)
      this._combatlog4.vAlign = "bottom";
      this._combatlog4.hAlign = "center";
      this._combatlog4.hTextAlign = "center"
      this._combatlog4.fontSize = 24;
      this._combatlog4.opacity = 0.8;
      this._combatlog4.visible = true;

      this._displayarray = []
      this._counter = 0
    }

    get text() {
        return this._combatlog0.value;
    }

    set text(val:string) {
      if(this._counter > 4) {
         this._counter = 0
      }

      this._displayarray[this._counter] = val

      if(this._counter == 0) {
        // if(this._displayarray[this._counter] && this._displayarray[this._counter].length > 1) {
        //   this._combatlog0.value = ""
        // }
        this._combatlog0.value = this._displayarray[this._counter]
      } else if (this._counter == 1) {
        this._combatlog1.value = this._displayarray[this._counter]
      } else if (this._counter == 2) {
        this._combatlog2.value = this._displayarray[this._counter]
      } else if (this._counter == 3) {
        this._combatlog3.value = this._displayarray[this._counter]
      } else if (this._counter = 4) {
        this._combatlog4.value = this._displayarray[this._counter] 
      }
      //this._combatlog.value = val;
      
      this._counter += 1
    }

    public clearlog() {
      log('in clearlog')
      this._displayarray = []
      this._combatlog0 = ""
      this._combatlog1 = ""
      this._combatlog2 = ""
      this._combatlog3 = ""
      this._combatlog4 = ""
    }
  
    // public show() {
    //   this._combatlog.visible = true;
    // }
  
    // public hide() {
    //   this._combatlog.visible = false;
    // }
  }