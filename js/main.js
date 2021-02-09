/* global data */
/* exported data */

// Listen for 'input' events on the photoUrl input to update the src attribute of the photo preview when the input value changes.
var $photoUrl = document.querySelector('#photoUrl');
$photoUrl.addEventListener('input', function (event) {
  if (event.target.id === 'photoURL') {
    var $imgHolder = document.querySelector('.image');
    $imgHolder.getAttribute('src', event.target.value);
  }
});

var $form = document.querySelector('form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var input = {
    photoUrl: event.target.photoUrl.value,
    title: event.target.title.value,
    notes: event.target.notes.value
  };
  var i = 1;
  input.nextEntryId = i++;

  // console.log(input);
  $form.reset();

});
