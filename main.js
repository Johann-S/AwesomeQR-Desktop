const { app, BrowserWindow } = require('electron')
const path = require('path')

const debug = /--debug/.test(process.argv[2])

let mainWindow

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  return app.makeSingleInstance(() => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
				mainWindow.restore()
			}

      mainWindow.focus()
    }
  })
}

function createWindow () {
	const windowOptions = {
		width: 1080,
		minWidth: 680,
		height: 840,
		title: app.getName()
	}

	mainWindow = new BrowserWindow(windowOptions)
	mainWindow.loadURL('http://localhost:8080/app/index.html')

	// Launch fullscreen with DevTools open, usage: npm run debug
	if (debug) {
		mainWindow.webContents.openDevTools()
		mainWindow.maximize()
		require('devtron').install()
	}

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

function init () {
  const shouldQuit = makeSingleInstance()
  if (shouldQuit) {
		return app.quit()
	}

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

init()
