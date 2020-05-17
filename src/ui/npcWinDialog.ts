import resources from "../resources";
import { SimpleDialog } from "../modules/simpleDialog";
import utils from "../../node_modules/decentraland-ecs-utils/index";


export class NpcWinDialog extends SimpleDialog {
  private dialogTree: SimpleDialog.DialogTree;

  public onSecondSequenceComplete: () => void;
  public onSecondPoorChoiceMade: () => void;
  public onSecondDialogStarted: () => void;
  public onSecondDialogEnded: () => void;

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
      .call(() =>  this.onSecondDialogStarted())
      .if(() => firstTimeDialog)
        .call(() => (firstTimeDialog = false))
        .say(
          () =>
          "Old Man Rivers says, \"Need to watch your mouth. Be careful who you insult. So. [Crystals] huh \"",
          { color: npcColor }
        )
          .beginOptionsGroup()
            .option(() => "1:- Tell me about the Crystals on Agatha's Prison.")
              .say(
                () =>
                'Old Man Rivers- "Ok. The crystals need to be unlocked in a sequence. "',
                { color: npcColor }
              )
                .beginOptionsGroup()
                  .option(() => "1:- I figured that much out already Old Man.")
                    .say(
                      () =>
                      "Old Man Rivers-  \"I see. Well aren't you smart then.\"",
                      { color: npcColor }
                    )
                      .beginOptionsGroup()
                        .option(() => "1:- Stop wasting my time and tell me what to do.")
                          .say(
                            () =>
                            'Old Man Rivers- "Fine. The sequence toggles after every wrong choice. There are two patterns. Learn them both to win. I will say no more."',
                            { color: npcColor }
                          )
                          .call(() => this.onSecondSequenceComplete())
                          .call(() =>  this.onSecondDialogEnded())
                        .endOption()
                        .option(() => "2:- You know what. I'll figure it out on my own.")
                          .say(
                            () =>
                            'Old Man Rivers- "Good. Best of luck to you."',
                            { color: npcColor }
                          )
                          .call(() =>  this.onSecondDialogEnded())
                        .endOption()
                      .endOptionsGroup()
                  .endOption()
                  .option(() => "2:- This is boring, I'm leaving.")
                    .say(
                      () =>
                      'Old Man Rivers- "You are a fool then. Perhaps go find an Art Gallery or something."',
                      { color: npcColor }
                    )
                    .call(() => (firstTimeDialog = true))
                    .call(() =>  this.onSecondDialogEnded())
                  .endOption()
                .endOptionsGroup()
            .endOption()
            .option(() => "2:- Lets talk some other time.")
              .say(
                () =>
                'Old Man Rivers- "No problem. Fare well adventurer. Safe travels."',
                { color: npcColor }
              )
              .call(() => (firstTimeDialog = true))
              .call(() =>  this.onSecondDialogEnded())
            .endOption()
          .endOptionsGroup()
      // .else()
      // .if(() => !unlockDoor)
      // .say(() => 'Old Man Rivers- "Hello again."')
      // .beginOptionsGroup()
      // .option(() => "> She did. I want to free her, she said she would reward me!")
      //   .say(() => 'You say, "She promised me some treasure. Now how do I get past the crystals Old Man?"', { color: npcColor })
      //   .say(() => 'Old Man Rivers say, "You\'ve made a poor choice. I\'ve sent for my son. After you and he have a chat we can talk crystals."', {color: npcColor})
      //   .call(() =>  this.onSecondPoorChoiceMade())
      // .endOption()
      // .option(() => "> No. I just wanted to say hello again.")
      // .say(() => 'You say, "No, I just wanted to say hello sir".', {color: npcColor })
      // .say(() => 'Old Man Rivers says, "Ah. I understand. Good to see you as well adventurer."', { color: npcColor})
      // .call(() =>  this.onSecondDialogEnded())
      // .endOption()
      // .option(() => "> No. I was not able to find Agatha.")
      // .say(() => 'You say, "No, I was not able to find her".', {color: npcColor })
      // .say(() => 'Old Man Rivers says, "Ah. I see. She is 9 parcels or so to the East, just in front of the Mystery Castle."', { color: npcColor}) 
      // .call(() =>  this.onSecondDialogEnded())
      // .endOption()
      // .endOptionsGroup()
      // .else()
      // .say(() => 'Old Man Rivers says, "Hello adventurer."')
      // .call(() =>  this.onSecondDialogEnded())
      // .endif()
      .endif();
  }

  public run(): void {
    if (!this.isDialogTreeRunning()) {
      this.runDialogTree(this.dialogTree);
    }
  }
}
