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

$photoUrl.addEventListener('input', function (event) {
  $imgHolder.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var input = {
    image: event.target.photoUrl.value,
    title: event.target.title.value,
    notes: event.target.notes.value
  };
  input.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(input);
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  var newEntry = createEntry(input);
  $entriesList.prepend(newEntry);

  $form.reset();

});

function createEntry(entry) {
  var $li = document.createElement('li');

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
}

$newEntryBtn.addEventListener('click', viewForm);
$navEntries.addEventListener('click', viewEntries);

if (data.view === 'entry-form') {
  viewForm();
} else if (data.view === 'entries') {
  viewEntries();
}
