/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('input-local-storage');

if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);

}

window.addEventListener('beforeunload', function (event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('input-local-storage', todosJSON);
});
