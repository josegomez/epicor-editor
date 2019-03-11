import { window } from 'vscode';


export async function showInputBox() {
	const result = await window.showInputBox({
		value: '',
        placeHolder: 'Customization ID Starts with',
    });

    return result;
}