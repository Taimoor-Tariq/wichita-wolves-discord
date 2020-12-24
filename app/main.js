const {app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const {overlayWindow} = require('electron-overlay-window');

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	});

	global.mainWindow = mainWindow;
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