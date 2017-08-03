const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
const { globalShortcut } = electron;
let maping_win, udxschema_win, udxdata_win;
let SureToExit = false;

/**********************************Dialog*********** */

const main_ipc = electron.ipcMain;
const dialog = electron.dialog;

//save UDX file dialog
main_ipc.on('saveUDXFile-dialog', function (event) {
  const options = {
    title: 'Save UDX File',
    filters: [
      { name: 'Files', extensions: ['xml', 'zip'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saveUDXFile-path', filename);
  })
})

//save format file dialog
main_ipc.on('saveFormatFile-dialog', function (event) {
  const options = {
    title: 'Save Format File',
    filters: [
      { name: 'Files', extensions: ['*'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saveFormatFile-path', filename);
  })
})

//save schema file 
main_ipc.on('saveUdxSchemaFile-dialog', function (event) {
  const options = {
    title: 'Save UDX Schema File',
    filters: [
      { name: 'Files', extensions: ['xml'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saveUdxSchemaFile-path', filename);
  })
})

//choose UDX file Dialog
main_ipc.on('openUDXFile-dialog', function (event) {
  const options = {
    title: 'Choose UDX File',
    filters: [
      { name: 'Files', extensions: ['xml', 'zip'] }
    ]
  }
  dialog.showOpenDialog(options, function (filename) {
    event.sender.send('openUDXFile-path', filename);
  })
})

//choose format file dialog
main_ipc.on('openFormatFile-dialog', function (event) {
  const options = {
    title: 'Choose Format File',
    filters: [
      { name: 'Files', extensions: ['*'] }
    ]
  }
  dialog.showOpenDialog(options, function (filename) {
    event.sender.send('openFormatFile-path', filename);
  })
})

//choose folder dialog
main_ipc.on('openFolder-dialog', function (event) {
  const options = {
    title: 'Choose Mapping Method Folder',
    properties: ['openFile', 'openDirectory']
  }
  dialog.showOpenDialog(options, function (filename) {
    event.sender.send('openFolder-path', filename);
  })
})

//load udx shcema
main_ipc.on('openUdxSchemaFile-dialog', function (event) {
  const options = {
    title: 'Choose File',
    filters: [
      { name: 'Files', extensions: ['xml'] }
    ]
  }
  dialog.showOpenDialog(options, function (filename) {
    event.sender.send('openUdxSchemaFile-path', filename);
  })
})

//close window
main_ipc.on('close-mapping-window', function (event) {
  SureToExit = true;
  if (maping_win !== undefined) {
    maping_win.close();
  }
  if (udxschema_win !== undefined) {
    udxschema_win.close();
  }
  if (udxdata_win !== undefined) {
    udxdata_win.close();
  }

})

main_ipc.on('close-schema-window', function (event) {
  SureToExit = true;
  if (maping_win !== undefined) {
    maping_win.close();
  }
  if (udxschema_win !== undefined) {
    udxschema_win.close();
  }
  if (udxdata_win !== undefined) {
    udxdata_win.close();
  }
})

main_ipc.on('close-udx-window', function (event) {
  SureToExit = true;
  if (maping_win !== undefined) {
    maping_win.close();
  }
  if (udxschema_win !== undefined) {
    udxschema_win.close();
  }
  if (udxdata_win !== undefined) {
    udxdata_win.close();
  }
})


/**********************************Dialog*********** */

/**********************************Menu*********** */
// const Menu = require('electron').Menu;
// var template = [
//   {
//     label: '关闭',
//     click: function () { win.close();console.log("关闭")},
//     // submenu: [
//     //   {
//     //     label: 'Undo',
//     //     accelerator: 'CmdOrCtrl+Z',
//     //     role: 'undo'
//     //   }
//     // ]
//   }]
//  var menu = Menu.buildFromTemplate(template);
//  Menu.setApplicationMenu(menu);

/**********************************Menu*********** */



/*******************start Mapping Method window */

function createMappingWindow() {
  // Create the browser window.
  maping_win = new BrowserWindow({
    width: 1100,
    height: 710,
    minWidth: 1100,
    minHeight: 710, backgroundColor: '#ffffff'
  });

  //maximize
  //maping_win.maximize();

  // and load the index.html of the app.
  maping_win.loadURL(`file://${__dirname}/mapping.html`);

  // Open the DevTools.
  //win.webContents.openDevTools();j.


  maping_win.on('close', (event) => {
    if (!SureToExit) {
      event.sender.send('window-close');
      event.preventDefault();
    }

  })


  // Emitted when the window is closed.
  maping_win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    maping_win = null;
  });

}

/*******************end Mapping Method window */

/*******************start udx schema Method window */
function createUdxSchemaWindow() {
  // Create the browser window.
  udxschema_win = new BrowserWindow({
    width: 1100,
    height: 710,
    minWidth: 1100,
    minHeight: 710, backgroundColor: '#ffffff'
  });

  //maximize
  //udxschema_win.maximize();

  // and load the index.html of the app.
  udxschema_win.loadURL(`file://${__dirname}/udx-schema.html`);

  // Open the DevTools.
  //win.webContents.openDevTools();

  udxschema_win.on('close', (event) => {
    if (!SureToExit) {
      event.sender.send('window-close');
      event.preventDefault();
    }

  })

  // Emitted when the window is closed.
  udxschema_win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    udxschema_win = null;
  });
}
/*******************end udx schema Method window */

/*******************start udx data window*/

function createUdxDataWindow() {
  // Create the browser window.
  udxdata_win = new BrowserWindow({
    width: 1100,
    height: 710,
    minWidth: 1100,
    minHeight: 710, backgroundColor: '#ffffff'
  });

  //maximize
  //udxdata_win.maximize();

  // and load the index.html of the app.
  udxdata_win.loadURL(`file://${__dirname}/udx-data.html`);

  // Open the DevTools.
  //win.webContents.openDevTools();

  udxdata_win.on('close', (event) => {
    if (!SureToExit) {
      event.sender.send('window-close');
      event.preventDefault();
    }

  })

  // Emitted when the window is closed.
  udxdata_win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    udxdata_win = null;
  });
}
/*******************end udx data window */


app.on('ready', createMappingWindow);
//app.on('ready', createUdxSchemaWindow);
//app.on('ready', createUdxDataWindow);



app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createMappingWindow();
  }
});