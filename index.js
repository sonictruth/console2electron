'use strict';

function getColors() {
	var tangoColors = [
		// dark:
		'#2e3436',
		'#cc0000',
		'#4e9a06',
		'#c4a000',
		'#3465a4',
		'#75507b',
		'#06989a',
		'#d3d7cf',
		// bright:
		'#555753',
		'#ef2929',
		'#8ae234',
		'#fce94f',
		'#729fcf',
		'#ad7fa8',
		'#34e2e2',
		'#eeeeec'
	];

	tangoColors[256] = '#f0f0f0';
	tangoColors[257] = '#000000';
	return tangoColors;
}
var terminalBox = document.getElementById('terminal-window');
var Terminal = require('term.js');


var term = new Terminal({
	colors: getColors(),
	convertEol: true,
	cols: 80,
	rows: 20,
	useStyle: true,
	screenKeys: true,
	cursorBlink: true
});


term.open(terminalBox);
terminalBox.focus();

var f = require('child_process').fork('./question.js', [], {
	silent: true
});

f.stdout.on('data', function(data) {
	term.write(data.toString());
});


term.on('data', function(data) {
	if (f.connected) {
		f.stdin.write(data);
	}
});

var closeTerminal = function() {
	console.log('Closing terminal...');
};

f.on('exit', closeTerminal);
f.on('error', closeTerminal);

// f.on('close', closeTerminal);
// f.on('disconnect', closeTerminal);