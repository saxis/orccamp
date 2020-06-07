import resources from "../resources";

export class Player {
  private _leveledup: boolean;
  private _address: string;
  private _hp: number;
  private _level: number;
  private _basedamage: number;
  private _maxhp: number;
  private _startinghp: number;
  private _inbatttle: boolean;
  private healthBar: UIText;
  private _aggroList: [];
  //private apiUrl = 'http://127.0.0.1:8080/player'
  private apiUrl = 'https://sutenquestapi.azurewebsites.net/player'
  //private aggUrl = 'http://127.0.0.1:8080/aggro'
  private aggUrl = 'https://sutenquestapi.azurewebsites.net/aggro'
  private levelUrl = 'https://sutenquestapi.azurewebsites.net/levels'
  //private levelUrl = 'http://127.0.0.1:8080/levels'

  constructor(address: string, startingHp: number, canvas) {
    this._address = address;
    this._hp = startingHp;
    this._maxhp = startingHp;
    this._startinghp = startingHp;
    this._inbatttle = false;
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
    this._leveledup = false;
  }

  get maxhp() {
    return this._maxhp;
  }

  set maxhp(val:number) {
    if (val > -1) {
      this._maxhp = val;
    }
  }

  get level() {
    return this._level;
  }

  set level(val:number) {
    if (val > 0) {
      this._level = val;
    }
  }

  get levelup() {
    return this._leveledup;
  }

  set levelup(val:boolean) {
    this._leveledup = val;
  }

  get basedamage() {
    return this._basedamage;
  }

  set basedamage(val:number) {
    if(val > -1) {
      this._basedamage = val
    }
  }

  get hp() {
    return this._hp;
  }

  set hp(val: number) {
    if (val > -1) {
      this._hp = val;
    }
  }

  get aggro() {
    return this._aggroList
  }

  set aggro(val:[]) {
    this._aggroList = val
  }

  get address() {
    return this._address;
  }

  set address(val:string) {
    this._address = val;
  }

  get battle() {
    return this._inbatttle;
  }

  set battle(val:boolean) {
    //log('setting inbattle in player ts to ', val)
    this._inbatttle = val;
  }

  showhpbar() {
    this.healthBar.visible = true;
  }

  achievementcheck(xp: number, currentlevel: number) {
    let url = this.levelUrl + '/' + this.address
    //let leveledup = false;

    //log(`achievement check top current level is: ${currentlevel} leveledup ${leveledup} `)

    executeTask(async () => {
      const hpo = {
        xp: xp
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        await fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          log('achievement check res back from API ', res)
          if(res.level > currentlevel) {
            log('level from api ', res.level)
            this.level = res.level
            this.levelup = true
          }
          log('setting new basedamage to ', res.basedamage)
          this.basedamage = res.basedamage
        })
      } catch(error) {
        log ('failed to update ', error)
      }
    })
    
  }

  updateaggro(action:string,mobid: string) {
    let url = this.aggUrl + '/' + this.address

    executeTask(async () => {
      const hpo = {
        action: action,
        mobid: mobid
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
          this.aggro = res.aggro
        })
      } catch(error) {
        log ('failed to update ', error)
      }

    })
  }

  heal(amount: number) {
    let url = this.apiUrl + '/' + this.address

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
          this.maxhp = res.maxhp
          this.healthBar.value = res.percentage + '%'
        })
      } catch(error) {
        log ('failed to heal ', error)
      }
      
    })
  }

  damage(amount:number) {
    let url = this.apiUrl + '/' + this.address

    executeTask(async () => {
      const hpo = {
        amount : -amount
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
          this.maxhp = res.maxhp
          this.healthBar.value = res.percentage + '%'
        })
      } catch(error) {
        log('failed to take player damage ', error)
      }
    })
  }

}