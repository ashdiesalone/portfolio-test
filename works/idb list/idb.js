'use strict';

const IDBRequest = indexedDB.open('sxundb', 1);

IDBRequest.addEventListener('upgradeneeded', () => {
    const db = IDBRequest.result;
    db.createObjectStore('nombres', {
        autoIncrement: true
    })
})

IDBRequest.addEventListener('success', () => {
    console.log('Todo bien pa');
    readObj();
})

IDBRequest.addEventListener('error', () => {
    console.log('Ocurrió un error al abrir la base de datos');
})

document.querySelector('.btn-add').addEventListener('click', () => {
    let nombre = document.getElementById('name').value;
    if (nombre. length > 0) {
        if (document.querySelector('.posible') != undefined) {
            if (confirm('Hay elementos sin guardar, quieres continuar ?')) {
                addObj({nombre});
                readObj();
            }
        } else {
            addObj({nombre});
            readObj();
        }
    } 
})

document.getElementById('name').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        document.querySelector('.btn-add').click();
        document.getElementById('name').value = '';
    }
})

const getIDBData = (mode, msg) => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction('nombres', mode);
    const objectStore = IDBTransaction.objectStore('nombres');
    IDBTransaction.addEventListener('complete', () => {
        console.log(msg);
    })
    return objectStore;
}

const addObj = obj => {
    const IDBData = getIDBData('readwrite', 'Objeto agregado correctamente');
    IDBData.add(obj);
}

const readObj = () => {
    const IDBData = getIDBData('readonly');
    const cursor = IDBData.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector('.nombres').innerHTML = '';
    cursor.addEventListener('success', () => {
        if (cursor.result) {
            let elemento = nombresHTML(cursor.result.key, cursor.result.value);
            fragment.appendChild(elemento)
            cursor.result.continue();
        } else document.querySelector('.nombres').appendChild(fragment);
    })
}

const editObj = (key, obj) => {
    const IDBData = getIDBData('readwrite', 'Objeto modificado correctamente');
    IDBData.put(obj, key);
}

const delObj = key => {
    const IDBData = getIDBData('readwrite', 'Objeto eliminado correctamente');
    IDBData.delete(key);
}

const nombresHTML = (id, name) => {
    const container = document.createElement('div');
    const h2 = document.createElement('h2');
    const options = document.createElement('div');
    const saveBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    container.classList.add('nombre');
    h2.classList.add('texto');
    options.classList.add('options');
    saveBtn.classList.add('imposible');
    delBtn.classList.add('delete');

    saveBtn.textContent = 'Guardar';
    delBtn.textContent = 'Eliminar';
    h2.textContent = name.nombre;
    h2.setAttribute('contenteditable', true);
    h2.setAttribute('spellcheck', false);

    container.appendChild(h2);
    container.appendChild(options);
    options.appendChild(saveBtn);
    options.appendChild(delBtn);

    h2.addEventListener('keydown', () => {
        saveBtn.classList.replace('imposible', 'posible');
    })

    h2.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            saveBtn.click();
            saveBtn.classList.replace('posible', 'imposible');
        }
    })

    saveBtn.addEventListener('click', () => {
        if (saveBtn.classList == 'posible') {
            editObj(id, {nombre: h2.textContent});
            saveBtn.classList.replace('posible', 'imposible');
        }
    })

    delBtn.addEventListener('click', () => {
        delObj(id);
        document.querySelector('.nombres').removeChild(container);
    })

    return container;
}