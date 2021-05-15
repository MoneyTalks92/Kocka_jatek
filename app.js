// DOM manipuláció, javascriptel módosítjuk a css-t és a html-t

let scores, roundScore, activePlayer; previousDices; finalScore;

function init() {
  // a két játékos pontszáma egy két elemű tömbben lesz tárolva
  // az első elem az ekső játékos pontszáma, a második a második játékos pontszáma
  scores = [0, 0];

  // az aktuális játékos kör alatt megszerzett pontjai
  roundScore = 0;

  // mindig az első játékos kezd
  activePlayer = 0;

  // játékosok előző pontszámai
  previousDices = [0, 0];

  // a finalScore értékét beállítjuk a user által megadottra
  finalScore = document.getElementsByClassName('.final-score')[0].value;
  // ha nem ad meg értéket a user, akkor 100 lesz a finalScore
  if (finalScore === null) {
    finalScore = 100;
  }

  // beállítjuk a kezdő értékeket a UI-on is

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük
  // inline style-t adunk hozzá az img-hez...
  document.querySelector('.dice').style.display = 'none';
  // a gombokat megjelenítjük
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

init();
document.querySelector('.btn-new').addEventListener('click', init);

// ha a roll dice gombra kattint a user
document.querySelector('.btn-roll').addEventListener('click', function () {
  // console.log('rolling the dice...');
  // 1. generálunk egy random számot 1 és 6 között
  let dice = Math.floor(Math.random() * 6) + 1;
  // console.log(dice);
  // 2. Az eredményt megjelenítjük az UI-on
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  // string concatenation: szöveg összefűzés
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');
  // Ha  a játékos 1-est dob, a roundScore értékét veszti, és a következő játékos jön
  if (dice !== 1) {
    // A dobott értéket kiszámoljuk, majd megjelenítjük a piros dobozban...
    roundScore = roundScore + dice;

    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //  ha a játékos 1-est dobott
  } else {
    nextPlayer();
  }
  // a játékos minden szerzett pontját elveszti ha 2db 6-ost dob egymás után, következő játékos jön
  if (previousDices[activePlayer] === 6) {
    if (dice === 6) {
      scores[activePlayer] = 0;
      nextPlayer();
    }
  }
});


function nextPlayer() {
  // roundScore értéket nullázuk a UI-on is
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // a következő játékos jön
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  //  toggle: ha rajta volt a class akkor leveszi, ha nem volt rajta, akkor rárakja
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// ha a hold gombra rányom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték plusz a mostani
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  // ellenőrizzük, hogy van-e nyertes
  if (scores[activePlayer] >= 20) {
    // játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
  } else {
    nextPlayer();
  }
});