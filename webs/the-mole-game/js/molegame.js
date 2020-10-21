  const moleIndex =  ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine', '.ten'];
  let totalScore = 0;
  let mole = document.querySelectorAll('.mole');
  let pointsToAdd = 1;
  let moleStatus = 'sad';

function chooseRandomMole () {
	let manipulatedMoleIndex = moleIndex[Math.floor(Math.random()*10)];
	let manipulatedMole = document.querySelector(manipulatedMoleIndex);
	return manipulatedMole;
}

  let nextTime = Date.now() + Math.random()*1000;
  let stopMessage = 'true'; 
  let moleCounter = 0;

  function next() {
  	if (stopMessage==='false') {
  		return;
  	}
  	const randomMole = chooseRandomMole();
    if (Date.now() > nextTime) {
      if (!randomMole.classList.contains('hidden')) {
      	randomMole.classList.add('hidden');
      } else {
	      	moleCounter += 1;
		  	if (moleCounter === 10) {
		  		randomMole.src = './imgs/king-mole-hungry.png';
		  		randomMole.setAttribute('id', 'hungryKing')
		  		moleCounter = 0;
		  	}
      	randomMole.classList.remove('hidden');
      	setTimeout(function(){
      		if (randomMole.id === 'hungryKing') {
      			randomMole.src='./imgs/king-mole-sad.png';
      		} else {
      			randomMole.src='./imgs/mole-sad.png';
      		}
      	}, 800);
      	setTimeout(function(){ randomMole.src ='./imgs/mole-leaving.png';
      	}, 850)
      	setTimeout(function () {
      		randomMole.classList.add('hidden');
      		randomMole.src = './imgs/mole-hungry.png';
      		randomMole.removeAttribute('id');
      	}, 1000);
		  }
		nextTime = Date.now() + Math.random()*1000;
      }
     requestAnimationFrame(next);
  }

 function addPoint () {
 	if (event.target.id === 'hungryKing') {
 		event.target.src = './imgs/king-mole-fed.png';
 		pointsToAdd = 2;
 	} else { 
 		event.target.src = './imgs/mole-fed.png';
 		pointsToAdd = 1;
 		}
	totalScore += pointsToAdd;
	let wormWidth = 65 * totalScore;
	const worm = document.querySelector('.worm-meter');
	worm.style.clip = 'rect(0, ' + wormWidth +'px, 58px, 0)'
	if (totalScore >= 10) {
		stopMessage = 'false';
		setTimeout(function winScreen () {
		const mainContainer = document.querySelector('.main-container');
		mainContainer.innerHTML = '';
		mainContainer.classList.add('win-screen');
	}, 1000);
	}
}

function init () {
	next ()
	mole.forEach(function (item) {
		item.addEventListener('click', addPoint)
	});
}

init();

