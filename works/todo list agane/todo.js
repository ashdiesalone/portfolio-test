'use strict';

const IDBRequest = indexedDB.open('tasks', 1);

IDBRequest.addEventListener('upgradeneeded', () => {
    const db = IDBRequest.result;
    db.createObjectStore('tasks', {
        autoIncrement: true,
    })
})

IDBRequest.addEventListener('success', () => {
    readObj();
    console.log('Todo bien pa');
})

IDBRequest.addEventListener('error', () => {
    console.log('Ocurrió un error al abrir la base de datos');
})

document.querySelector('.btn-add').addEventListener('click', () => {
    let task = document.getElementById('task-name').value;
    if (task.length > 0) {
        addObj({task});
        readObj();
        document.getElementById('task-name').value = '';
    }
})

document.getElementById('task-name').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        document.querySelector('.btn-add').click();
    }
})

const getIDBStuff = (mode, msg) => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction('tasks', mode);
    const objStore = IDBTransaction.objectStore('tasks');
    IDBTransaction.addEventListener('complete', () => {
        console.log(msg);
    })
    return objStore;
}

const addObj = obj => {
    const IDBStuff = getIDBStuff('readwrite', 'Objeto agregado correctamente');
    IDBStuff.add(obj);
}

const readObj = () => {
    const IDBStuff = getIDBStuff('readonly');
    const cursor = IDBStuff.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector('.tasks-container').innerHTML = '';
    cursor.addEventListener('success', () => {
        if (cursor.result) {
            let element = HTMLStuff(cursor.result.key, cursor.result.value);
            fragment.appendChild(element);
            cursor.result.continue();
        } else document.querySelector('.tasks-container').appendChild(fragment);
    })
}

const editObj = (key, obj) => {
    const IDBStuff = getIDBStuff('readwrite', 'Objeto modificado correctamente');
    IDBStuff.put(obj, key);
}

const delObj = obj => {
    const IDBStuff = getIDBStuff('readwrite', 'Objeto eliminado correctamente');
    IDBStuff.delete(obj);
}

const HTMLStuff = (id, task) => {
    const tasksContainer = document.createElement('div');
    const taskItem = document.createElement('div');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');

    tasksContainer.classList.add('tasks-container');
    taskItem.classList.add('task');
    button.classList.add('delete');
    h3.textContent = task.task;
    button.textContent = 'X';

    taskItem.appendChild(h3);
    taskItem.appendChild(button);
    tasksContainer.appendChild(taskItem);

    h3.addEventListener('click', () => {
        h3.classList.toggle('complete');
    })

    button.addEventListener('click', () => {
        delObj(id);
        document.querySelector('.tasks-container').removeChild(tasksContainer);
    })

    return tasksContainer;
}