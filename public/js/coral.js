'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

$(".enterBtn").click(clickEnter);

function initializePage() {
	// your code here
}

function clickEnter(e){
	e.preventDefault();
	ga('send', 'event', 'enter', 'click');
}
 