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