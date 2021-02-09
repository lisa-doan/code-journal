/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoUrl');
var $form = document.querySelector('form');
var $imgHolder = document.querySelector('.image');

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
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

});
