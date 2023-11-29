/** @format */

var draw = {};
var offset = 90;
var symbols = ['Seiska', 'Omena', 'Meloni', 'Päärynä', 'Kirsikka'];
var multipliers = [10, 6, 5, 4, 3];

// Set background, bloated to also do some of UI
draw.background = function (ctx, canvas) {
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	let img = new Image();
	img.src = 'src/coin.png';
	img.onload = () => {
		ctx.drawImage(img, 100, 90);
	};

	// paint & print multiplier
	ctx.fillStyle = 'black';
	ctx.fillRect(230, 18, 70, 40);
	ctx.fillRect(475, 20, 155, 200);

	ctx.fillStyle = 'white';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';

	ctx.fillText('Panos kertoimet:', 480, 40);
	y = 22;
	for (let i = 0; i < symbols.length; i++) {
		ctx.fillText(
			'4*' + symbols[i] + ' = ' + multipliers[i],
			490,
			62 + y * i
		);
	}
	ctx.fillText('3* Seiska = 5', 490, 62 + y * 5);

	// print current balance and bet
	ctx.font = 'bold 40px serif';
	ctx.fillText('Rahaa: ' + money + '€', 100, 40);
	ctx.fillText('Panos: ', 100, 82);

	bgBet = 220;
	for (i = 0; i < 3; i++) {
		ctx.fillStyle = 'black';
		ctx.fillRect(bgBet, 60, 52, 40);

		if (bet == i + 1) {
			ctx.fillStyle = 'white';
		} else {
			ctx.fillStyle = 'gray';
		}
		ctx.fillText(i + 1 + '€', 7 + bgBet, 82);
		bgBet += 55;
	}
};

draw.buttonLayout = function () {
	for (let i = 0; i < 4; i++) {
		storeCoordinate(offset * (i + 1), 380, btnCoords);
	}
};

draw.buttons = function (reelLock) {
	for (let i = 0; i < 4; i++) {
		// fillRect(x, y, width, height)
		ctx.fillStyle = 'black';
		ctx.fillRect(offset * (i + 1), 380, 80, 80);

		// text settings
		ctx.font = 'bold 20px serif';
		ctx.textAlign = 'left';
		// if hold reel = true, make text red. else white
		if (reelLock[i] == true) {
			ctx.fillStyle = 'red';
			ctx.fillRect(offset * (i + 1) + 1, 380, 76, 76);
			ctx.fillStyle = 'white';
		} else {
			ctx.fillStyle = 'darkRed';
			ctx.fillRect(offset * (i + 1) + 1, 380, 76, 76);
			ctx.fillStyle = 'gray';
		}

		// indicate that Hold buittons can function
		if (hasSpun == true) {
			ctx.fillStyle = 'white';
		} else {
			ctx.fillStyle = 'grey';
		}
		ctx.fillText('Lukittu', 5 + offset * (i + 1), 400);
	}

	ctx.fillStyle = 'black';
	ctx.fillRect(480, 380, 130, 80);

	if (money >= bet) {
		ctx.fillStyle = 'red';
		ctx.fillRect(482, 382, 125, 75);
		ctx.fillStyle = 'white';
		ctx.fillText('Pelaa', 520, 410, 75);
	} else {
		ctx.fillStyle = 'darkRed';
		ctx.fillRect(482, 382, 125, 75);
		ctx.fillStyle = 'grey';
		ctx.fillText('Ei rahaa', 510, 430, 75);
	}
};

// draw fruits
draw.reelFruits = function (reelSpin) {
	ctx.fillStyle = 'black';
	let offset = 50;

	var img = new Image();
	img.src = 'src/symbols.png';

	// console.log(reelSpin);
	img.onload = () => {
		for (let i = 0; i < reelSpin.length; i++) {
			// fillRect(x, y, width, height)
			ctx.fillRect(offset, 250, 90, 100);
			ctx.drawImage(
				img,
				0,
				img.width * (reelSpin[i] - 1),

				img.height + 80,
				img.width,
				offset + 5,
				260,

				canvas.height,
				img.width
			);
			// move row to right
			offset += 110;
		}
	};
};
