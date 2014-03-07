'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

$(".enterBtn").click(clickEnter);
$(".makeNewBtn").click(clickMakeNew);

function initializePage() {
	// your code here
}

function clickEnter(e){
	e.preventDefault();
	ga('send', 'event', 'enter', 'click');
}

function clickMakeNew(e){
	e.preventDefault();
	ga('send', 'event', 'makeNew', 'click');
} 

var overlayElement = document.createElement("div");
overlayElement.className = 'modalOverlay';
document.body.appendChild(overlayElement);

var modalWindowElement = document.createElement("div");
modalWindowElement.className = 'modalWindow';
modalWindowElement.innerHTML = msg;
modalWindowElement.style.left = (window.innerWidth - 200) / 2 + "px";
document.body.appendChild(modalWindowElement);

setTimeout(function() {
  modalWindowElement.style.opacity = 1;
  overlayElement.style.opacity = 0.4;
  overlayElement.addEventListener("click", hidePopUpMessage, false);
}, 300);