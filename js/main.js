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
