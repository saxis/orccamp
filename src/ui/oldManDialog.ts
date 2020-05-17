import resources from "../resources";
import { SimpleDialog } from "../modules/simpleDialog";
import { SoundBox } from "../components/soundbox";
//import utils from "../../node_modules/decentraland-ecs-utils/index";

const dialog1 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.hailtraveler)

export class PeasantDialog extends SimpleDialog {
  private dialogTree: SimpleDialog.DialogTree;

  public onSequenceComplete: () => void;
  public onPoorChoiceMade: () => void;
  public onDialogStarted: () => void;
  public onDialogEnded: () => void;
  public npcWon: () => void;
  public playerWon: () => void;

  constructor(gameCanvas: UICanvas) {
    // Create a new SimpleDialog to manage the dialog tree
    super({
      canvas: gameCanvas,
      leftPortrait: {
        width: 256,
        height: 256,
        sourceWidth: 256,
        sourceHeight: 256,
        positionX: "-17%"
      },
      rightPortrait: {
        width: 256,
        height: 256,
        sourceWidth: 256,
        sourceHeight: 256,
        positionX: "15%"
      },
      dialogText: {
        width: "47%",
        height: "25%",
        positionY: "-14%",
        textSpeed: 5,
        textIdleTime: 2,
        textConfig: { fontSize: 18, paddingLeft: 25, paddingRight: 25 },
        background: resources.textures.grayContainer,
        backgroundConfig: { sourceWidth: 200, sourceHeight: 70 }
      },
      optionsContainer: {
        stackOrientation: UIStackOrientation.VERTICAL,
        width: "47%",
        height: "15%",
        vAlign: "top",
        hAlign: "center",
        positionY: "-75%",
        background: resources.textures.grayContainer,
        backgroundConfig: {sourceWidth: 200, sourceHeight: 70},
        optionsTextConfig: { fontSize: 18, paddingLeft: 20, positionY: "-60%", color: Color4.Red()}
      }
    });

    // Variables used in the dialog tree
    let firstTimeDialog = true;
    let unlockDoor = false;

    // Dialog text colors
    const npcColor = Color4.White();

  

    this.dialogTree = new SimpleDialog.DialogTree()
      .call(() =>  this.onDialogStarted())
      .if(() => firstTimeDialog)
        .call(() => (firstTimeDialog = false))
        .call(() => dialog1.play())
        .say(() =>
          "Old Man Rivers-  Hail traveler. Been some time since I've seen visitors around here. How can I help you?",
          { color: npcColor }
        )
          .beginOptionsGroup()
            .option(() => "1:- What do you mean by visitors?")
              .say(() =>
                'Old Man Rivers-  Adventurers like yourself. Anyway, I\'m relaxing since the incident with Agatha.',
                { color: npcColor }
              )
                .beginOptionsGroup()
                  .option(() => "1:- Who is Agatha?")
                    .say(() => 
                      "Old Man Rivers- Agatha is a mean old sorceress. A real piece of work. Me and the Council had to imprison her.",
                      { color: npcColor }
                    )
                      .beginOptionsGroup()
                        .option(() => "1:- Why did the Council have to do that?")
                          .say(() =>
                            'Old Man Rivers-  Sometimes its the only choice lad. We did what we thought was best.',
                            { color: npcColor }
                          )
                          .say(() => 
                            'Old Man Rivers- She is right over there. Go take a look and come back to talk to me after. Dont believe her lies though.', { color: npcColor})
                          .call(() => this.onSequenceComplete())
                          .call(() =>  this.onDialogEnded())
                        .endOption()
                        .option(() => "2:- Sometimes you have to do what you have to do.")
                          .say(() =>
                            'Old Man Rivers says, "Indeed. Fare thee well adventurer. Safe travels."',
                            { color: npcColor }
                          )
                          .call(() =>  this.onDialogEnded())
                        .endOption()
                        .option(() => "3:- The council of mages is evil!")
                          .call(() => this.onPoorChoiceMade())
                        .endOption()
                      .endOptionsGroup()
                  .endOption()
                  .option(() => "2:- Your story sucks bro!")
                    .call(() => this.onPoorChoiceMade())
                  .endOption()
                  .option(() => "3:- I don't care about this at all.")
                    .say(() =>
                      'Old Man Rivers says, "No problem. Fare well adventurer. Safe travels."',
                      { color: npcColor }
                    )
                    .call(() => (firstTimeDialog = true))
                    .call(() =>  this.onDialogEnded())
                  .endOption()
                .endOptionsGroup()
            .endOption()
            .option(() => "2:- Lets talk some other time.")
              .say(() =>
                'Old Man Rivers- No problem. Fare well adventurer. Safe travels.',
                { color: npcColor }
              )
              .call(() => (firstTimeDialog = true))
              .call(() =>  this.onDialogEnded())
            .endOption()
            .option(() => "3:- Your mother is an orc!")
              .call(() => this.onPoorChoiceMade())
            .endOption()
          .endOptionsGroup()
      .else()
      .if(() => !unlockDoor)
      .say(() => 'Old Man Rivers- Hello again. Did that old witch send you back here?')
      .beginOptionsGroup()
      .option(() => "1:- She did. I want to free her, she said she would reward me!")
        .say(() => 'Old Man Rivers- You\'ve made a poor choice. If you can best me I will tell you about her prison.', {color: npcColor})
        .call(() =>  this.onPoorChoiceMade())
      .endOption()
      .option(() => "2:- No. I just wanted to say hello again.")
      .say(() => 'Old Man Rivers- Ah. I understand. Good to see you as well adventurer.', { color: npcColor})
      .call(() =>  this.onDialogEnded())
      .endOption()
      .option(() => "3:- No. I was not able to find Agatha.")
      .say(() => 'Old Man Rivers-  Ah. Then you are very stupid I see. Time to die.', { color: npcColor}) 
      .call(() =>  this.onPoorChoiceMade())
      .endOption()
      .endOptionsGroup()
      .else()
      .say(() => 'Old Man Rivers-  Hello adventurer.')
      .call(() =>  this.onDialogEnded())
      .endif()
      .endif();
  }

  public run(): void {
    if (!this.isDialogTreeRunning()) {
      this.runDialogTree(this.dialogTree);
    }
  }
}
