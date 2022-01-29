// Exports function to create main app menu
const {Menu, shell, app} = require('electron');

module.exports = (appWindow) => {
    let template = [
        {
            label: 'Items',
            submenu: [
                {
                    label: 'Add new',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWindow.send('menu-show-modal');
                    }
                },
                {
                    label: 'Open selected item',
                    accelerator: 'CmdOrCtrl+Enter',
                    click: () => {
                        appWindow.send('menu-open-item');
                    }
                },
                {
                    label: 'Delete item',
                    accelerator: 'CmdOrCtrl+Backspace',
                    click: () => {
                        appWindow.send('menu-delete-item');
                    }
                },
                {
                    label: 'Open in browser',
                    accelerator: 'CmdOrCtrl+Shift+Enter',
                    click: () => {
                        appWindow.send('menu-open-item-native');
                    }
                },
                {
                    label: 'Search items',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        appWindow.send('menu-focus-search');
                    }
                }
            ]
        },
        {
            role: 'editMenu'
        },
        {
            role: 'windowMenu'
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn more',
                    click: () => {
                        shell.openExternal('https://github.com/SebaSwash');
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') template.unshift({role: 'appMenu'});

    let menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
};