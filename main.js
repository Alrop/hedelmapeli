/** @format */
// canvas init
var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d'),
	container = document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var btnCoords = [];

// game var init
var money = 20;
var bet = 1;
var reelLock, reelSpin, scoreEvent, hasSpun, winning, gameReset;

spin = function () {
	money -= bet;
	reelCheck = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

	// if reel index NaN or not locked, reroll symbol
	for (let i = 0; i < 4; i++) {
		if (reelSpin[i] == NaN || reelLock[i] == false) {
			var num = Math.ceil(Math.random() * 5);
			reelSpin[i] = num;
		}
	}

	// DEBUG force spin result. //  1 = seven, 2 = apple, 3 = melon, 4 = pear, 5 = cherry
	// reelSpin = [2, 2, 2, 2];

	// count symbol occurances
	for (let i = 0; i < reelSpin.length; i++) {
		reelCheck[reelSpin[i]] = (reelCheck[reelSpin[i]] || 0) + 1;
	}
	// if 3*Seven or 4x any symbols, set scoring to true
	for (let i = 1; i < reelSpin.length; i++) {
		if (reelCheck[1] == 3 || reelCheck[i] == 4) {
			scoring(reelCheck);
		}
	}

	if (hasSpun == true) {
		scoring(reelCheck);
	} else {
		console.log('do locks & respin ' + reelSpin);
		hasSpun = true;
		update();
	}
};

scoring = function (reelCheck) {
	console.log(reelCheck);
	// payout for 3*Seven, four of same from sevens, apple, melon, pear, cherry
	if (reelCheck[1] == 3) {
		money += bet * 5;
		winning += bet * 5;
	} else if (reelCheck[1] == 4) {
		money, (winning += bet * 10);
		winning += bet * 10;
	} else if (reelCheck[2] == 4) {
		money += bet * 6;
		winning += bet * 6;
	} else if (reelCheck[3] == 4) {
		money += bet * 5;
		winning += bet * 5;
	} else if (reelCheck[4] == 4) {
		money += bet * 4;
		winning += bet * 4;
	} else if (reelCheck[5] == 4) {
		money += bet * 3;
		winning += bet * 3;
	} else {
		console.log('Ei voittoa');
	}
	gameReset = true;
	update();
};

// find mouse click position
canvas.addEventListener('click', function (evt) {
	var mousePos = getMousePos(canvas, evt);
	console.log(mousePos);

	// allow player to hold after spinning reels
	if (hasSpun == true) {
		for (let i = 0; i < btnCoords.length; i++) {
			if (
				mousePos.x > btnCoords[i].x &&
				mousePos.x < btnCoords[i].x + 80 &&
				mousePos.y > btnCoords[i].y &&
				mousePos.x < btnCoords[i].y + 80
			) {
				if (reelLock[i] == false) {
					reelLock[i] = true;
					console.log('lukko ' + i + ' aktivoitu');
					console.log(reelLock);
				} else {
					reelLock[i] = false;
					console.log('lukko ' + i + ' deaktivoitu');
				}
			}
		}
	}

	// before spinning, set bet
	if (hasSpun == false) {
		let x = 55;
		for (i = 0; i < 3; i++)
			if (
				mousePos.x > 220 + i * x &&
				mousePos.x < 276 + i * x &&
				mousePos.y > 52 &&
				mousePos.y < 92
			) {
				bet = i + 1;
				console.log('panos on ' + (1 + i));
			}
	}

	// spin, or if won start a new
	if (
		mousePos.x > 480 &&
		mousePos.x < 610 &&
		mousePos.y > 380 &&
		mousePos.y < 460 &&
		money >= bet
	) {
		if (gameReset == false) {
			spin();
		} else {
			console.log('Game reset tripped');
			initGame();
		}
	}
	update();
});

// find where mouse click happens
function getMousePos(canvas, clickPos) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: clickPos.clientX - rect.left,
		y: clickPos.clientY - rect.top,
	};
}

// Stores coordinates for "hold" buttons
function storeCoordinate(xVal, yVal, array) {
	array.push({ x: xVal, y: yVal });
}

function update() {
	draw.background(ctx, canvas);
	draw.buttons(reelLock);
	draw.reelFruits(reelSpin, reelLock);
}
function initGame() {
	reelLock = [false, false, false, false];
	reelSpin = [1, 2, 3, 4];
	scoreEvent = false;
	hasSpun = false;
	gameReset = false;
	winning = 0;
	draw.buttonLayout();
	update();
}

initGame();
update();
