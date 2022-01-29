const {ipcRenderer} = require('electron');
const items = require('./items');

let showModal = document.getElementById('show-modal');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let addItem = document.getElementById('add-item');
let itemUrl = document.getElementById('url');
let search = document.getElementById('search');
let clearLocal = document.getElementById('clear-local');

const toggleModalButtons = () => {
    addItem.disabled = addItem.disabled ? false : true;
    addItem.style.opacity = addItem.disabled ? 0.5 : 1;
    addItem.innerText = addItem.disabled ? 'Adding...' : 'Add item';
}

clearLocal.addEventListener('click', (e) => {
    items.clearStorage();
});

showModal.addEventListener('click', (e) => {
    modal.style.display = 'flex';
    itemUrl.focus();
});

closeModal.addEventListener('click', (e) => {
    modal.style.display = 'none';
});

addItem.addEventListener('click', (e) => {
    toggleModalButtons();
    if (itemUrl.value.trim()) {
        ipcRenderer.send('new-item', itemUrl.value);
    }
});

// Filter
search.addEventListener('keyup', (e) => {
    Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
        let hasMatch = item.innerText.toLocaleLowerCase().includes(search.value.toLocaleLowerCase());
        item.style.display = hasMatch ? 'flex' : 'none';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        return items.changeSelection(e.key);
    }
});

ipcRenderer.on('menu-focus-search', () => {
    search.focus();
});

ipcRenderer.on('menu-open-item-native', () => {
    items.openNative();
});

ipcRenderer.on('menu-delete-item', () => {
    let selectedItem = items.getSelectedItem();
    items.delete(selectedItem.index);
});

ipcRenderer.on('menu-open-item', () => {
    items.open();
});

ipcRenderer.on('menu-show-modal', () => {
    showModal.click();
});

ipcRenderer.on('new-item-success', (e, newItem) => {
    modal.style.display = 'none';
    itemUrl.value = '';
    toggleModalButtons();

    if (!newItem) {
        console.log('Error...');
        return;
    }

    items.addItem(newItem, true);
});

itemUrl.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addItem.click();
});