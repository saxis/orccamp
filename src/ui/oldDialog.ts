import resources from "../resources";
import { SimpleDialog } from "../modules/simpleDialog";
import utils from "../../node_modules/decentraland-ecs-utils/index";


export class PeasantDialog extends SimpleDialog {
  private dialogTree: SimpleDialog.DialogTree;

  public onSequenceComplete: () => void;
  public onPoorChoiceMade: () => void;
  public onDialogStarted: () => void;
  public onDialogEnded: () => void;

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
        //spacing: 2,
        width: "47%",
        height: "25%",
        //vAlign: "top",
        //hAlign: "center",
        //positionY: "-75%",
        positionY: "-14%",
        background: resources.textures.grayContainer,
        backgroundConfig: {sourceWidth: 200, sourceHeight: 70},
        optionsTextConfig: { fontSize: 18, paddingLeft: 25, paddingRight: 25 }
        //optionsTextConfig: { fontSize: 22, paddingLeft: 20, positionY: "-60%", color: Color4.Black()}
      }
    });

    // Variables used in the dialog tree
    let firstTimeDialog = true;
    let unlockDoor = false;

    // Dialog text colors
    const npcColor = Color4.Black();
    const playerColor = Color4.Black();

  

    this.dialogTree = new SimpleDialog.DialogTree()
      .call(() =>  this.onDialogStarted())
      .if(() => firstTimeDialog)
        .call(() => (firstTimeDialog = false))
        .say(
          () =>
          "Old Man Rivers says, \"Hail traveler. Been some time since I've seen [visitors] around these parts. How can I help you? \"",
          { color: npcColor }
        )
          .beginOptionsGroup()
            .option(() => "1:- What do you mean by visitors?")
              .say(() => 'You- "What do you mean by visitors?"', { color: npcColor })
              .say(
                () =>
                'Old Man Rivers-  Adventurers like yourself. Anyway, I\'m relaxing since the incident with Agatha.',
                { color: npcColor }
              )
                .beginOptionsGroup()
                  .option(() => "> Who is Agatha?")
                    .say(() => 'You say, "Who is Agatha? What are you talking about Old Man?"', {
                      color: npcColor
                    })
                    .say(
                      () =>
                      "Old Man Rivers says, \"Agatha is a mean old sorceress. A real piece of work. Me and the [council] had to imprison her.\"",
                      { color: npcColor }
                    )
                      .beginOptionsGroup()
                        .option(() => "> Why did the Council have to do that?")
                          .say(() => 'You say, "Why did the Council have to imprison her?"', { color: npcColor })
                          .say(
                            () =>
                            'Old Man Rivers says, "Sometimes its the only choice lad. We did what we thought was best."',
                            { color: npcColor }
                          )
                          .say(() => 
                            'Old Man Rivers says, "Her prison is right over there, at the edge of this property."', { color: npcColor})
                          .say(() => 'Old Man Rivers says, "She may try to talk to you.. don\'t believe her lies. Come and speak to me again once you have had a look at her."', {color: npcColor})
                          //.say(() => 'Old Man Rivers says, "Come and speak to me again once you have had a look at her."',{color: npcColor})
                          .call(() => this.onSequenceComplete())
                          .call(() =>  this.onDialogEnded())
                        .endOption()
                        .option(() => "> Sometimes you have to do what you have to do.")
                          .say(() => 'You say, "Sometimes you have to do what you have to do".', {color: npcColor })
                          .say(
                            () =>
                            'Old Man Rivers says, "Indeed. Fare thee well adventurer. Safe travels."',
                            { color: npcColor }
                          )
                          .call(() =>  this.onDialogEnded())
                        .endOption()
                      .endOptionsGroup()
                  .endOption()
                  .option(() => "> I don't care about this at all.")
                    .say(() => 'You say, "I do not have time for this right now".', {color: npcColor })
                    .say(
                      () =>
                      'Old Man Rivers says, "No problem. Fare well adventurer. Safe travels."',
                      { color: npcColor }
                    )
                    .call(() => (firstTimeDialog = true))
                    .call(() =>  this.onDialogEnded())
                  .endOption()
                .endOptionsGroup()
            .endOption()
            .option(() => "> Lets talk some other time.")
              .say(() => 'You say, "I do not have time for this right now".', {color: npcColor })
              .say(
                () =>
                'Old Man Rivers says, "No problem. Fare well adventurer. Safe travels."',
                { color: npcColor }
              )
              .call(() => (firstTimeDialog = true))
              .call(() =>  this.onDialogEnded())
            .endOption()
          .endOptionsGroup()
      .else()
      .if(() => !unlockDoor)
      .say(() => 'Old Man Rivers says, "Hello again. Did that old witch send you back here?"')
      .beginOptionsGroup()
      .option(() => "> She did. I want to free her, she said she would reward me!")
        .say(() => 'You say, "She promised me some treasure. Now how do I get past the crystals Old Man?"', { color: npcColor })
        .say(() => 'Old Man Rivers say, "You\'ve made a poor choice. I\'ve sent for my son. After you and he have a chat we can talk crystals."', {color: npcColor})
        .call(() =>  this.onPoorChoiceMade())
      .endOption()
      .option(() => "> No. I just wanted to say hello again.")
      .say(() => 'You say, "No, I just wanted to say hello sir".', {color: npcColor })
      .say(() => 'Old Man Rivers says, "Ah. I understand. Good to see you as well adventurer."', { color: npcColor})
      .call(() =>  this.onDialogEnded())
      .endOption()
      .option(() => "> No. I was not able to find Agatha.")
      .say(() => 'You say, "No, I was not able to find her".', {color: npcColor })
      .say(() => 'Old Man Rivers says, "Ah. I see. She is 9 parcels or so to the East, just in front of the Mystery Castle."', { color: npcColor}) 
      .call(() =>  this.onDialogEnded())
      .endOption()
      .endOptionsGroup()
      .else()
      .say(() => 'Old Man Rivers says, "Hello adventurer."')
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
