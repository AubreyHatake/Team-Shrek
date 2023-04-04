// var button = document.getElementById('button');
// button.addEventListener('click', function() {
//     console.log('button clicked');
//     });
// Path: index.html
/* <button id="button">Click me</button> */

var btn = document.querySelector('#search-artist');


function x () {
    console.log("you clicked a button!")
};

btn.addEventListener("click", x);

$( function() {
    $( "#datepicker" ).datepicker();
  } );
