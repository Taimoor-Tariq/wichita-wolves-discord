const {app, BrowserWindow } = require('electron');
const fs = require('fs');

let extarWindows = [];

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	});

	global.mainWindow = mainWindow;
	mainWindow.setMenu(null);
	mainWindow.loadURL(`https://discord.com/channels/617434888555200576/649150426159251477`);
	mainWindow.webContents.on('did-finish-load', () => { fs.readFile(`${__dirname}/src/css/main.css`, "utf-8", (err, data) => {
		if (err) console.log(err);
		else {
			mainWindow.webContents.insertCSS(data.replace(/\s{2,10}/g, ' ').trim());
		}
	})});

	mainWindow.webContents.on('did-navigate-in-page', (t) => {
		console.log(t.sender.history);
		let newURL = t.sender.history[t.sender.history.length-1];
		// https://discord.com/channels/617434888555200576/
		// https://discord.com/channels/@me/


		if (newURL.startsWith("https://discord.com/channels/@me/")) {
			let newWindow = new BrowserWindow({
				width: 600,
				height: 400
			});

			mainWindow.webContents.goBack();
			newWindow.setMenu(null);
			newWindow.loadURL(newURL);
			newWindow.webContents.on('did-finish-load', () => { fs.readFile(`${__dirname}/src/css/main.css`, "utf-8", (err, data) => {
				if (err) console.log(err);
				else {
					newWindow.webContents.insertCSS(data.replace(/\s{2,10}/g, ' ').trim());
				}
			})});

			// extarWindows.push(newWindow);
		}
	});

	mainWindow.maximize();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});