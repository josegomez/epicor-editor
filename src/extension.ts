import { EpicorSettings } from './epicorhelper';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {window} from 'vscode';
import {showInputBox} from './dialog';
import * as epicor from './epicorhelper';
import { Uri} from 'vscode';
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
	var epicorSettings:EpicorSettings = new EpicorSettings(config.get('epicor.customizationfolder'),config.get('epicor.clientfolder'), config.get('epicor.dnspylocation'));
	
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	context.subscriptions.push(myStatusBarItem);

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));

	let disposable = vscode.commands.registerCommand('extension.openepicorcustomization', () => {
		// The code you place here will be executed every time your command is executed
		var argsAry:string[]=[];

		argsAry.push("-f");
		argsAry.push(String(epicorSettings.epicorClientFolder));
		argsAry.push("-r");
		argsAry.push(String(epicorSettings.epicorCustomizationFolder));
		argsAry.push("-a");
		argsAry.push("Add");
        var newFolder:string="";        
		const { spawn } = require('child_process');
		const bat = spawn(epicorSettings.epicorClientFolder+"\\CustomizationEditor.exe", argsAry, {'cwd':String(epicorSettings.epicorClientFolder)});
		bat.stdout.on('data', (data:string) => {
			console.log(String(data));
			newFolder = String(data);
		});
		
		bat.stderr.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.on('exit', (code:string) => {
			console.log(`Child exited with code ${code}`);
			let uri = Uri.file(newFolder.trim());
			vscode.commands.executeCommand('vscode.openFolder', uri);
		});   


	});

	let disposable2 = vscode.commands.registerCommand('extension.updateepicorcustomization', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');

		//window.showInformationMessage('Update');
		vscode.workspace.saveAll(false);
		var openFolder = vscode.workspace.rootPath;
		const customSettings = require(openFolder+'/CustomizationInfo.json');

		var argsAry:string[]=[];
		argsAry.push("-c");
		argsAry.push(String(customSettings.ConfigFile));
		argsAry.push("-u");
		argsAry.push(String(customSettings.Username));
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
		argsAry.push(String(customSettings.Key3));
		argsAry.push("-g");
		argsAry.push(String(customSettings.CSGCode));
		argsAry.push("-f");
		argsAry.push(String(epicorSettings.epicorClientFolder));
		argsAry.push("-o");
		argsAry.push(String(customSettings.Company));
		argsAry.push("-r");
		argsAry.push(String(customSettings.Folder));
		argsAry.push("-j");
		argsAry.push(String(customSettings.ProjectFolder));
		argsAry.push("-a");
		argsAry.push("Update");
                
		const { spawn } = require('child_process');
		const bat = spawn(epicorSettings.epicorClientFolder+"\\CustomizationEditor.exe", argsAry, {'cwd':String(epicorSettings.epicorClientFolder)});
		bat.stdout.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.stderr.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.on('exit', (code:string) => {
			console.log(`Child exited with code ${code}`);
			let uri = Uri.file(customSettings.ProjectFolder);
		vscode.commands.executeCommand('vscode.openFolder', uri);
		});   

	});

	let disposable3 = vscode.commands.registerCommand('extension.launch', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');

		var openFolder = vscode.workspace.rootPath;
		const customSettings = require(openFolder+'/CustomizationInfo.json');

		var argsAry:string[]=[];
		argsAry.push("-c");
		argsAry.push(String(customSettings.ConfigFile));
		argsAry.push("-u");
		argsAry.push(String(customSettings.Username));
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
		argsAry.push(String(customSettings.Key3));
		argsAry.push("-g");
		argsAry.push(String(customSettings.CSGCode));
		argsAry.push("-f");
		argsAry.push(String(epicorSettings.epicorClientFolder));
		argsAry.push("-o");
		argsAry.push(String(customSettings.Company));
		argsAry.push("-r");
		argsAry.push(String(customSettings.Folder));
		argsAry.push("-j");
		argsAry.push(String(customSettings.ProjectFolder));
		argsAry.push("-a");
		argsAry.push("Launch");
                
		const { spawn } = require('child_process');
		const bat = spawn(epicorSettings.epicorClientFolder+"\\CustomizationEditor.exe", argsAry, {'cwd':String(epicorSettings.epicorClientFolder)});
		bat.stdout.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.stderr.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.on('exit', (code:string) => {
			console.log(`Child exited with code ${code}`);
			let uri = Uri.file(customSettings.ProjectFolder);
		vscode.commands.executeCommand('vscode.openFolder', uri);
		});   
		


	});
	

	let disposable4 = vscode.commands.registerCommand('extension.editinepicor', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');

		var openFolder = vscode.workspace.rootPath;
		const customSettings = require(openFolder+'/CustomizationInfo.json');

		var argsAry:string[]=[];
		argsAry.push("-c");
		argsAry.push(String(customSettings.ConfigFile));
		argsAry.push("-u");
		argsAry.push(String(customSettings.Username));
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
		argsAry.push(String(customSettings.Key3));
		argsAry.push("-g");
		argsAry.push(String(customSettings.CSGCode));
		argsAry.push("-f");
		argsAry.push(String(epicorSettings.epicorClientFolder));
		argsAry.push("-o");
		argsAry.push(String(customSettings.Company));
		argsAry.push("-r");
		argsAry.push(String(customSettings.Folder));
		argsAry.push("-j");
		argsAry.push(String(customSettings.ProjectFolder));
		
		argsAry.push("-a");
		argsAry.push("Edit");
                
		const { spawn } = require('child_process');
		const bat = spawn(epicorSettings.epicorClientFolder+"\\CustomizationEditor.exe", argsAry, {'cwd':String(epicorSettings.epicorClientFolder)});
		bat.stdout.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.stderr.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.on('exit', (code:string) => {
			console.log(`Child exited with code ${code}`);
			let uri = Uri.file(customSettings.ProjectFolder);
		vscode.commands.executeCommand('vscode.openFolder', uri);
		});   
		


	});

	let disposable5 = vscode.commands.registerCommand('extension.debug', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');

		var openFolder = vscode.workspace.rootPath;
		const customSettings = require(openFolder+'/CustomizationInfo.json');

		var argsAry:string[]=[];
		argsAry.push("-c");
		argsAry.push(String(customSettings.ConfigFile));
		argsAry.push("-u");
		argsAry.push(String(customSettings.Username));
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
		argsAry.push(String(customSettings.Key3));
		argsAry.push("-g");
		argsAry.push(String(customSettings.CSGCode));
		argsAry.push("-f");
		argsAry.push(String(epicorSettings.epicorClientFolder));
		argsAry.push("-o");
		argsAry.push(String(customSettings.Company));
		argsAry.push("-r");
		argsAry.push(String(customSettings.Folder));
		argsAry.push("-j");
		argsAry.push(String(customSettings.ProjectFolder));
		argsAry.push("-d");
		argsAry.push(String(customSettings.DLLLocation));
		argsAry.push("-y");
		argsAry.push(String(epicorSettings.DNSpy));
		argsAry.push("-a");
		argsAry.push("Debug");
                
		const { spawn } = require('child_process');
		const bat = spawn(epicorSettings.epicorClientFolder+"\\CustomizationEditor.exe", argsAry, {'cwd':String(epicorSettings.epicorClientFolder)});
		bat.stdout.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.stderr.on('data', (data:string) => {
			console.log(String(data));
		});
		
		bat.on('exit', (code:string) => {
			console.log(`Child exited with code ${code}`);
			let uri = Uri.file(customSettings.ProjectFolder);
		vscode.commands.executeCommand('vscode.openFolder', uri);
		});   
		


	});
	




	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);
	

}

// this method is called when your extension is deactivated
export function deactivate() {}

function updateStatusBarItem(): void {
	
	var openFolder = vscode.workspace.rootPath;
	const customSettings = require(openFolder+'/CustomizationInfo.json');
	if(customSettings!==undefined)
	{
		myStatusBarItem.text = `Epicor Customization ${customSettings.Key1} in Environment ${customSettings.ConfigFile}`;
		myStatusBarItem.show();
	}
	else {
		myStatusBarItem.hide();
	}
}