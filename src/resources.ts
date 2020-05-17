export default {
    sounds: {
        goblinHit: new AudioClip("sounds/goblin_hit.mp3"),
        punch: new AudioClip("sounds/punch.mp3"),
        playerHit: new AudioClip("sounds/player_hit.mp3"),
        playerHit2: new AudioClip("sounds/player_hit2.mp3"),
        grobb: new AudioClip("sounds/GROBB.mp3"),
        lava: new AudioClip("sounds/LAVASTOR.mp3"),
        fear: new AudioClip("sounds/FEARPLAN.mp3"),
        unlocksorceress: new AudioClip("sounds/unlock_sorceress.mp3"),
        peasantunlock: new AudioClip("sounds/peasantunlock.mp3"),
        fighterhit: new AudioClip("sounds/fighterhit.mp3"),
        missioncomplete: new AudioClip("sounds/missioncomplete.mp3"),
        button: new AudioClip("sounds/button.mp3"),
        evillaugh: new AudioClip("sounds/crazyChickLaugh.mp3"),
        birdsong: new AudioClip("sounds/Bird-song.mp3"),
        hailtraveler: new AudioClip("sounds/HailTraveler.mp3"),
        killping: new AudioClip("sounds/killping.mp3"),
        orclaugh: new AudioClip("sounds/orclaugh.mp3")
    },
    animations: {
        riversWalkClip: new AnimationState("walking"),
        turnRClip: new AnimationState("rightTurn"),
        turnLClip: new AnimationState("turnLeft")
    },
    models: {
        house: new GLTFShape("models/house.glb"),
        staticobjects: new GLTFShape("models/static_objects_glb.glb"),
        animatedleaves: new GLTFShape("models/leaves_falling_glb.glb"),
        lantern: new GLTFShape("models/lantern_glb.glb"),
        grassblades: new GLTFShape("models/grass_glb.glb"),
        brute: new GLTFShape("models/BruteAnimated6.glb"),
        orcgrunt: new GLTFShape("models/orcgrunt6.glb"),
        peasant: new GLTFShape("models/peasant.glb"),
        paladin: new GLTFShape("models/paladin8.glb"),
        orc_camp: new GLTFShape("models/orc_encampment_model.glb"),
        smoke1: new GLTFShape("models/smoke_animated_01.glb"),
        smoke2: new GLTFShape("models/smoke_animated_02.glb"),
        flag: new GLTFShape("models/flag_animated_model.glb"),
    },
    textures: {
        textContainer: new Texture("src/images/dialogs/textContainer.png"),
        optionsContainer: new Texture("src/images/dialogs/optionsContainer.png"),
        blueContainer: new Texture("src/images/dialogs/Sax_Text_Box_blue.png"),
        grayContainer: new Texture("src/images/dialogs/graybox.png"),
        playContainer: new Texture("src/images/UI-atlas.png"),
        hpCounter: new Texture("src/images/OldManDialog2.png"),
        orcGruntHpBar: new Texture("src/images/OrcGruntHPBar.png"),
        playerCounter: new Texture("src/images/player.png"),
        lootWindow: new Texture("src/images/LootWindow.png"),
        closeicon: new Texture("src/images/close_icon1.png")
      }
}