import { window } from "vscode";
import * as vscode from 'vscode';
import { Uri} from 'vscode';
import { ExtensionContext, StatusBarAlignment, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation } from 'vscode';



 
 export class CustomizationData implements vscode.QuickPickItem
 {
    label:string="";
    description:string="";
    detail:string="";

    customData:{ Key1: string; Key2:string, Description:string, Key3:string,ProductID:string,CGCCode:string,TypeCode:string, Company:string };

    constructor(i:{ Key1: string; Key2:string, Description:string, Key3:string,ProductID:string,CGCCode:string,TypeCode:string, Company:string  })
    {
        this.customData=i;
        this.label =i.Key1;
        this.description = i.Description;
        this.detail= i.Key2;
    }
 }   

 export class EpicorSettings
 {
    epicorClientFolder:string|undefined="";
    epicorCustomizationFolder:string|undefined="";
    DNSpy:string|undefined="";
    
    constructor(epicorCustomizationFolder:string|undefined,epicorClientFolder:string|undefined,DNSpy:string|undefined)
    {
        this.epicorClientFolder = epicorClientFolder;
        this.epicorCustomizationFolder = epicorCustomizationFolder;
        this.DNSpy=DNSpy;
    }
 }