let titles = ['Hausaufgaben', 'Training'];
let notes = ['Programmieren.', 'Cardio Training.'];
let titletrash = [];
let notetrash = [];
loadArrays();
loadTrashArrays();

function render() {
    document.getElementById('showBar').classList.remove('show-overlay-menu');
    showIcon();
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];

        content.innerHTML += /*html*/ `
        <div class="inputfield">
        <b id="inputTitle">${title}</b><br>
        <p id="inputNote">${note}</p>
        <img class="deleteBtn" src="./img/delete-24.png" onclick="deleteNote(${i})">
        </div>
        `;
    }
}

function addnote() { // Notiz 
    document.getElementById('showBar').classList.remove('show-overlay-menu');
    showIcon();

    content.innerHTML = '';
    content.innerHTML += /*html*/ `
    <div class="inputfield"> 
      <input placeholder="Titel..." id="title" maxlength="35">
      <input placeholder="Notiz..." id="note" maxlength="320">
      <img class="saveBtn" src="./img/save-24.png" onclick="saveNote()">
     </div>
    `;
}

function saveNote() { // Notiz speichern
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    let result = title + note;
    if (result < 1) {
        alert('Bitte einen Text eingeben')
    } else {
        titles.push(title);
        notes.push(note);
    }
    saveArrays();
    render();
}

function deleteNote(i) { // Notiz löschen
    titletrash.push(titles[i]);
    notetrash.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    saveTrashArrays();
    saveArrays();
    render();
}

function openTrash() { // Papierkorb öffen
    document.getElementById('showBar').classList.remove('show-overlay-menu');
    showIcon();
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titletrash.length; i++) {
        const title = titletrash[i];
        const note = notetrash[i];

        content.innerHTML += /*html*/ `
        <div class="inputfield">
        <b>${title}</b><br>
        <p>${note}</p>
        <img class="deleteBtn"src="./img/delete-24.png" onclick="deleteTrash(${i})">
        </div>
        `;
    }
}



function deleteTrash(i) { // Arrays aus Papierkorb löschen
    titletrash.splice(i, 1);
    notetrash.splice(i, 1);
    saveTrashArrays();
    openTrash();

}

function saveArrays() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
}

function loadArrays() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

function saveTrashArrays() {
    let titleText = JSON.stringify(titletrash);
    localStorage.setItem('titletrash', titleText);
    let noteText = JSON.stringify(notetrash);
    localStorage.setItem('notetrash', noteText)
}

function loadTrashArrays() {
    let titleText = localStorage.getItem('titletrash');
    let noteText = localStorage.getItem('notetrash');
    if (titleText && noteText) {
        titletrash = JSON.parse(titleText);
        notetrash = JSON.parse(noteText);
    }
}

// Ab hier Responsive //

function showMenu() {
    document.getElementById('showBar').classList.add('show-overlay-menu');
    document.getElementById('img-menu').classList.add('hide-menu');
}

function showIcon() {
    document.getElementById('img-menu').classList.remove('hide-menu');
}

