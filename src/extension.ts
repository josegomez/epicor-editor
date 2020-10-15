import { EpicorSettings } from "./epicorhelper";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { window } from "vscode";
import * as path from "path";

import * as epicor from "./epicorhelper";
import { Uri } from "vscode";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let myStatusBarItem: vscode.StatusBarItem;
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "epicor-editor" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  const config = vscode.workspace.getConfiguration();
  var epicorSettings: EpicorSettings = new EpicorSettings(
    config.get("epicor.customizationfolder"),
    config.get("epicor.clientfolder"),
    config.get("epicor.dnspylocation")
  );

  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  context.subscriptions.push(myStatusBarItem);

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );

  let disposable = vscode.commands.registerCommand(
    "extension.openepicorcustomization",
    () => {
      // The code you place here will be executed every time your command is executed
      var argsAry: string[] = [];
      VersionCheck(epicorSettings);
      argsAry.push("-f");
      argsAry.push(String(epicorSettings.epicorClientFolder));
      argsAry.push("-r");
      argsAry.push(String(epicorSettings.epicorCustomizationFolder));
      argsAry.push("-a");
      argsAry.push("Add");
      var newFolder: string = "";
      const { spawn } = require("child_process");
      const bat = spawn(
        epicorSettings.epicorClientFolder + "\\CustomizationEditor.exe",
        argsAry,
        { cwd: String(epicorSettings.epicorClientFolder) }
      );
      bat.stdout.on("data", (data: string) => {
        console.log(String(data));
        newFolder = String(data);
      });

      bat.stderr.on("data", (data: string) => {
        console.log(String(data));
      });

      bat.on("exit", (code: string) => {
        console.log(`Child exited with code ${code}`);
        let uri = Uri.file(newFolder.trim());
        vscode.commands.executeCommand("vscode.openFolder", uri);
      });
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "extension.updateepicorcustomization",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      //vscode.window.showInformationMessage('Hello World!');

      //window.showInformationMessage('Update');
      VersionCheck(epicorSettings);
      vscode.workspace.saveAll(false);
      var openFolder = vscode.workspace.rootPath;
      delete require.cache[
        require.resolve(openFolder + "/CustomizationInfo.json")
      ];
      const customSettings = require(openFolder + "/CustomizationInfo.json");

      var argsAry: string[] = [];
      argsAry.push("-c");
      argsAry.push(String(customSettings.ConfigFile));
      argsAry.push("-u");
      argsAry.push(String(customSettings.Username)===""?"~":String(customSettings.Username));
      argsAry.push("-p");
      argsAry.push(String(customSettings.Password));
      argsAry.push("-t");
      argsAry.push(String(customSettings.ProductType));
      argsAry.push("-l");
      argsAry.push(String(customSettings.LayerType));
      argsAry.push("-k");
      argsAry.push(String(customSettings.Key1));
      argsAry.push("-m");
      argsAry.push(String(customSettings.Key2));
      argsAry.push("-n");
      argsAry.push(
        String(customSettings.Key3) === "" ? "~" : String(customSettings.Key3)
      );
      argsAry.push("-g");
      argsAry.push(
        String(customSettings.CSGCode) === ""
          ? "~"
          : String(customSettings.CSGCode)
      );
      argsAry.push("-f");
      argsAry.push(String(epicorSettings.epicorClientFolder));
      argsAry.push("-o");
      argsAry.push(
        String(customSettings.Company) === ""
          ? "~"
          : String(customSettings.Company)
      );
      argsAry.push("-r");
      argsAry.push(String(customSettings.Folder));
      argsAry.push("-j");
      argsAry.push(String(customSettings.ProjectFolder));
      argsAry.push("-a");
      argsAry.push("Update");
      if (customSettings.Version) {
        argsAry.push("-v");
        argsAry.push(String(customSettings.Version));
      }
      if (customSettings.Encrypted) {
        argsAry.push("-e");
        argsAry.push(String(customSettings.Encrypted));
      }

      const { spawn } = require("child_process");
      const bat = spawn(
        epicorSettings.epicorClientFolder + "\\CustomizationEditor.exe",
        argsAry,
        { cwd: String(epicorSettings.epicorClientFolder) }
      );
      bat.stdout.on("data", (data: string) => {
        console.log(String(data));
      });

      bat.stderr.on("data", (data: string) => {
        console.log(String(data));
      });

      bat.on("exit", (code: string) => {
        console.log(`Child exited with code ${code}`);
        let uri = Uri.file(customSettings.ProjectFolder);
        vscode.commands.executeCommand("vscode.openFolder", uri);
        omniSharpHelper();
      });
    }
  );

  let disposable6 = vscode.commands.registerCommand(
    "extension.downloadcustomization",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      //vscode.window.showInformationMessage('Hello World!');
      omniSharpHelper();
      var openFolder = vscode.workspace.rootPath;
      delete require.cache[
        require.resolve(openFolder + "/CustomizationInfo.json")
      ];
      const customSettings = require(openFolder + "/CustomizationInfo.json");
      VersionCheck(epicorSettings);
      var argsAry: string[] = [];
      argsAry.push("-c");
      argsAry.push(String(customSettings.ConfigFile));
      argsAry.push("-u");
      argsAry.push(String(customSettings.Username)===""?"~":String(customSettings.Username));
      argsAry.push("-p");
      argsAry.push(String(customSettings.Password));
      argsAry.push("-t");
      argsAry.push(String(customSettings.ProductType));
      argsAry.push("-l");
      argsAry.push(String(customSettings.LayerType));
      argsAry.push("-k");
      argsAry.push(String(customSettings.Key1));
      argsAry.push("-m");
      argsAry.push(String(customSettings.Key2));
      argsAry.push("-n");
      argsAry.push(
        String(customSettings.Key3) === "" ? "~" : String(customSettings.Key3)
      );
      argsAry.push("-g");
      argsAry.push(
        String(customSettings.CSGCode) === ""
          ? "~"
          : String(customSettings.CSGCode)
      );
      argsAry.push("-f");
      argsAry.push(String(epicorSettings.epicorClientFolder));
      argsAry.push("-o");
      argsAry.push(
        String(customSettings.Company) === ""
          ? "~"
          : String(customSettings.Company)
      );
      argsAry.push("-r");
      argsAry.push(String(customSettings.Folder));
      argsAry.push("-j");
      argsAry.push(String(customSettings.ProjectFolder));
      argsAry.push("-a");
      argsAry.push("Download");
      if (customSettings.Encrypted) {
        argsAry.push("-e");
        argsAry.push(String(customSettings.Encrypted));
      }
      const { spawn } = require("child_process");
      const bat = spawn(
        epicorSettings.epicorClientFolder + "\\CustomizationEditor.exe",
        argsAry,
        { cwd: String(epicorSettings.epicorClientFolder) }
      );
      bat.stdout.on("data", (data: string) => {
        console.log(String(data));
      });

      bat.stderr.on("data", (data: string) => {
        console.log(String(data));
      });

      bat.on("exit", (code: string) => {
        console.log(`Child exited with code ${code}`);
        let uri = Uri.file(customSettings.ProjectFolder);
        vscode.commands.executeCommand("vscode.openFolder", uri);
        omniSharpHelper();
      });
    }
  );

  let disposable7 = vscode.commands.registerCommand(
    "extension.launchwitht",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      //vscode.window.showInformationMessage('Hello World!');
      VersionCheck(epicorSettings);
      LaunchInEpicor(epicorSettings, true);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable6);
  context.subscriptions.push(disposable7);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function updateStatusBarItem(): void {
  var openFolder = vscode.workspace.rootPath;
  const customSettings = require(openFolder + "/CustomizationInfo.json");
  if (customSettings !== undefined) {
    myStatusBarItem.text = `Epicor Customization ${
      customSettings.Key1
    } in Environment ${customSettings.ConfigFile}`;
    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}

var omniSharpHelper = function() {
  var omniSharp = vscode.extensions.getExtension("ms-dotnettools.csharp");
  if (omniSharp !== undefined) {
    if (omniSharp.isActive === false) {
      omniSharp.activate().then(function() {
        vscode.commands.executeCommand("o.restart");
      });
    } else {
      vscode.commands.executeCommand("o.restart");
    }
  }
};

var VersionCheck = function(epicorSettings: EpicorSettings) {
  var request = require("request");
  request(
    "https://raw.githubusercontent.com/josegomez/epicor-editor-helper/master/CommonClasses/CustomizationEditor.json?" +
      rand(99999),
    function(error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        var publishedVersion = JSON.parse(body);
        try {
          delete require.cache[
            require.resolve(
              epicorSettings.epicorClientFolder + "/CustomizationEditor.json"
            )
          ];
        } catch (err) {}
        try {
          const currentVersion = require(epicorSettings.epicorClientFolder +
            "/CustomizationEditor.json");
          if (
            currentVersion === undefined ||
            publishedVersion.Version !== currentVersion.Version
          ) {
            window
              .showInformationMessage(
                "New Helper Library Version Availble!!",
                "Go Download it"
              )
              .then(selection => {
                const { exec } = require("child_process");
                var pid = exec(
                  "start https://marketplace.visualstudio.com/items?itemName=josecgomez.epicor-editor"
                );
              });
          }
        } catch (err) {
          window
            .showInformationMessage(
              "New Helper Library Version Availble!!",
              "Go Download it"
            )
            .then(selection => {
              const { exec } = require("child_process");
              var pid = exec(
                "start https://marketplace.visualstudio.com/items?itemName=josecgomez.epicor-editor"
              );
            });
        }
      }
    }
  );
};

var rand = function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
};

var LaunchInEpicor = function(
  epicorSettings: EpicorSettings,
  toolbox: boolean
) {
  var openFolder = vscode.workspace.rootPath;
  delete require.cache[require.resolve(openFolder + "/CustomizationInfo.json")];
  const customSettings = require(openFolder + "/CustomizationInfo.json");

  var argsAry: string[] = [];
  argsAry.push("-c");
  argsAry.push(String(customSettings.ConfigFile));
  argsAry.push("-u");
  argsAry.push(String(customSettings.Username)===""?"~":String(customSettings.Username));
  argsAry.push("-p");
  argsAry.push(String(customSettings.Password));
  argsAry.push("-t");
  argsAry.push(String(customSettings.ProductType));
  argsAry.push("-l");
  argsAry.push(String(customSettings.LayerType));
  argsAry.push("-k");
  argsAry.push(String(customSettings.Key1));
  argsAry.push("-m");
  argsAry.push(String(customSettings.Key2));
  argsAry.push("-n");
  argsAry.push(
    String(customSettings.Key3) === "" ? "~" : String(customSettings.Key3)
  );
  argsAry.push("-g");
  argsAry.push(
    String(customSettings.CSGCode) === "" ? "~" : String(customSettings.CSGCode)
  );
  argsAry.push("-f");
  argsAry.push(String(epicorSettings.epicorClientFolder));
  argsAry.push("-o");
  argsAry.push(
    String(customSettings.Company) === "" ? "~" : String(customSettings.Company)
  );
  argsAry.push("-r");
  argsAry.push(String(customSettings.Folder));
  argsAry.push("-j");
  argsAry.push(String(customSettings.ProjectFolder));
  argsAry.push("-y");
  argsAry.push(
    String(epicorSettings.DNSpy) === "" ? "~" : String(epicorSettings.DNSpy)
  );
  argsAry.push("-d");
  argsAry.push(
    String(customSettings.DLLLocation) === ""
      ? "~"
      : String(customSettings.DLLLocation)
  );
  argsAry.push("-a");
  if (toolbox === true) {
    argsAry.push("Toolbox");
  } else {
    argsAry.push("Launch");
  }
  if (customSettings.Encrypted) {
    argsAry.push("-e");
    argsAry.push(String(customSettings.Encrypted));
  }
  if (customSettings.Version) {
    argsAry.push("-v");
    argsAry.push(String(customSettings.Version));
  }
  const { spawn } = require("child_process");
  const bat = spawn(
    epicorSettings.epicorClientFolder + "\\CustomizationEditor.exe",
    argsAry,
    { cwd: String(epicorSettings.epicorClientFolder) }
  );
  var teAlert: vscode.TextEditor | any;

  bat.stdout.on("data", (data: string) => {
    console.log(String(data));
    if (String(data).trim() === "EDITMODE") {
      vscode.workspace.saveAll(false);
      const fs = require("fs");
      window.showWarningMessage(
        "This customization is being Edited in Epicor, please refrain from making changes here in VS Code until you are notified to avoid conflicts! (see above)",
        "Got it! I won't Touch anything, I promise!"
      );
      if (
        !fs.existsSync(
          path.join(String(vscode.workspace.rootPath), "alert.txt")
        )
      ) {
        let txt =
          "ATTENTION\n\nYou have clicked Edit, Code Wizard, Data Tools or References in the ToolBox.\nThis triggers the edit functionality in epicor and when finished the changes made in epicor are synchronized to VS Code.\nRefrain from making changes here (in your script within VSCode) until this message has been dismissed\nor until the toolbox is closed so that you don't lose any changes.\n\nNOTE:\nIf you navigate away from this file alert.txt this file will hang around even after Epicor is done, just FYI... \nIf that happens and you are SURE that Epicor is done feel free to close it and move on... otherwise Sit Tight!";
        fs.writeFile(
          path.join(String(vscode.workspace.rootPath), "alert.txt"),
          txt,
          (err: any) => {
            if (err) {
              throw err;
            }
            vscode.workspace
              .openTextDocument(
                path.join(String(vscode.workspace.rootPath), "alert.txt")
              )
              .then((a: vscode.TextDocument) => {
                vscode.window.showTextDocument(a, 1, false).then(e => {
                  teAlert = e;
                });
              });
          }
        );
      } else {
        vscode.workspace
          .openTextDocument(
            path.join(String(vscode.workspace.rootPath), "alert.txt")
          )
          .then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
              teAlert = e;
            });
          });
      }
    } else {
      if (window.activeTextEditor !== undefined) {
        let te = window.activeTextEditor;
        if (te.document.fileName.includes("alert")) {
          vscode.commands.executeCommand("workbench.action.closeActiveEditor");
        } else {
          if (teAlert !== undefined) {
            teAlert.hide();
            teAlert = undefined;
            window.showInformationMessage(
              "All clear, you may edit your Script in VS Again, the Epicor changes have been synchronized down",
              "Sweet!, Thanks!"
            );
          }
        }
      }
      const fs = require("fs");
      fs.unlinkSync(path.join(String(vscode.workspace.rootPath), "alert.txt"));
    }
    //omniSharpHelper();
  });

  bat.stderr.on("data", (data: string) => {
    console.log(String(data));
  });

  bat.on("exit", (code: string) => {
    console.log(`Child exited with code ${code}`);
    let uri = Uri.file(customSettings.ProjectFolder);
    vscode.commands.executeCommand("vscode.openFolder", uri);
    omniSharpHelper();
  });
};
