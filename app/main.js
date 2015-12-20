var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var fs = require('fs');
var shell = require('shell');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate-with-no-open-windows', function () {
    newWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

    newWindow();

    var template = [
        {
            label: "Application",
            submenu: [
                {label: "O aplikácii", selector: "orderFrontStandardAboutPanel:"},
                {type: "separator"},
                {label: "Ukončiť", accelerator: "Command+Q", click: app.quit}
            ]
        },
        {
            label: "Editovať",
            submenu: [
                {label: "Späť", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
                {label: "Opakovať", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
                {type: "separator"},
                {label: "Vystrihnúť", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                {label: "Kopírovať", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                {label: "Vložiť", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                {label: "Označiť všetko", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
            ]
        },
        {
            label: "Vytlačiť",
            submenu: [
                {label: "Vytlačiť do PDF", accelerator: "CmdOrCtrl+P", click: function () {
                    printPdf('/tmp/medibox.pdf');
                }}
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});


function newWindow () {
    mainWindow = new BrowserWindow({
        "use-content-size": true,
        width: 1200,
        height: 750,
        "web-preferences": {
            "node-integration": false // loads jquery as global not module
        }
    });

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

}

function printPdf (path) {
    var opts = {
        marginsType: 0,
        printBackground: true,
        printSelectionOnly: false,
        landscape: true
    };
    mainWindow.printToPDF(opts, function (pdf_err, result, a) {
        console.log('pdf_err', pdf_err);
        fs.writeFile(path, result, function (write_err) {
            console.log('write_err', write_err);
            shell.openItem(path);
        });
    });
}
