/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoUrl');
var $form = document.querySelector('form');
var $imgHolder = document.querySelector('.image');
var $entriesList = document.querySelector('.entries-list');
var $navEntries = document.querySelector('.nav-entries');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $newEntryBtn = document.querySelector('.new-entry-btn');
var $inputTitle = document.querySelector('.input-title');
var $inputNotes = document.querySelector('.input-notes');
var $inputPhotoUrl = document.querySelector('.input-photoUrl');
var $formTitle = document.querySelector('.form-title');

$photoUrl.addEventListener('input', function (event) {
  $imgHolder.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    var input = {
      image: event.target.photoUrl.value,
      title: event.target.title.value,
      notes: event.target.notes.value
    };

    input.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(input);

    var newEntry = createEntry(input);
    $entriesList.prepend(newEntry);
    $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();

  } else {
    var editObj = {
      image: event.target.photoUrl.value,
      title: event.target.title.value,
      notes: event.target.notes.value,
      entryId: data.editing.entryId
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries.splice(i, 1, editObj);
        var editEntry = createEntry(editObj);
        $entriesList.replaceChild(editEntry, $entriesList.children[i]);

      }
    }

    data.editing = null;
    $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
  }

});

function createEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  var $columnHalfLeft = document.createElement('div');
  $columnHalfLeft.setAttribute('class', 'column-half');
  $row.append($columnHalfLeft);

  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.image);
  $columnHalfLeft.appendChild($entryImage);

  var $columnHalfRight = document.createElement('div');
  $columnHalfRight.setAttribute('class', 'column-half');
  $row.append($columnHalfRight);

  var $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'title-container');
  $columnHalfRight.appendChild($titleContainer);

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entry.title;
  $titleContainer.appendChild($entryTitle);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pencil-alt';
  $titleContainer.appendChild($editIcon);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  $columnHalfRight.appendChild($entryNotes);

  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = createEntry(data.entries[i]);
    $entriesList.appendChild(entry);
  }
});

function viewEntries(event) {
  $entryForm.className = 'entry-form hidden';
  $entries.className = 'entries display';
  data.view = 'entries';
}

function viewForm(event) {
  $entryForm.className = 'entry-form display';
  $entries.className = 'entries hidden';
  data.view = 'entry-form';
  $formTitle.textContent = 'New Entry';
  data.editing = null;
}

$newEntryBtn.addEventListener('click', viewForm);
$navEntries.addEventListener('click', viewEntries);

if (data.view === 'entry-form') {
  viewForm();
} else if (data.view === 'entries') {
  viewEntries();
}

function editEntry(event) {
  if (event.target.className === 'fas fa-pencil-alt') {
    var entryObjectId = Number(event.target.closest('li').className);
    viewForm();
    var entryObj = getEntryObject(entryObjectId);
    data.editing = entryObj;
    $inputPhotoUrl.value = entryObj.image;
    $imgHolder.setAttribute('src', entryObj.image);
    $inputTitle.value = entryObj.title;
    $inputNotes.value = entryObj.notes;
    $formTitle.textContent = 'Edit Entry';
  }

}
$entriesList.addEventListener('click', editEntry);

function getEntryObject(element) {
  for (var i = 0; i < data.entries.length; i++) {
    if (element === data.entries[i].entryId) {
      return data.entries[i];
    }
  }
}
