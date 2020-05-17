export class SoundBox extends Entity {
    constructor(
      transform: TranformConstructorArgs,
      audio: AudioClip,
    ) {
      super();
      engine.addEntity(this);
      this.addComponent(new Transform(transform));
  
      if (audio) {
        let source = new AudioSource(audio)
        source.volume = 1;
        //this.addComponent(new AudioSource(audio));
        this.addComponent(source)
      }
      
    }

    play() {
        this.getComponent(AudioSource).playOnce()
    }
  }