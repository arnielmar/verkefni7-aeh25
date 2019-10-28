/**
 * Verkefni 7 – Gisk leikur
 *
 * Leikur sem snýst um að giska á tölu milli 0 og 100
 */


/**
 * Global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur enginn leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *  - Fyrsti leikur kláraðist í tveim ágiskunum.
 *  - Seinni leikur kláraðist í þrem ágiskunum.
 */

const games = [];


/**
 * Byrjar leikinn okkar með því að kalla í play().
 * Eftir að play() klárar þá er boðið notandanum að spila annann leik með confirm()
 * Ef notandi ýtir á "ok" þá er annar leikur spilaður.
 * Ef notandi ýtir á "cancel" þá er sótt niðurstöður með getResults() og þær birtar með alert().
 */
function start() {
  let x = 1;
  do {
    x = play();
  } while (x===1 && confirm('Viltu spila annan leik?'))
  alert(getResults());
}

/**
* Spilar einn leik. Sér um að:
*  - Velja tölu af handahófi í byrjun með randomNumber()
*  - Biðja notanda um tölu með prompt()
*  - Vinna úr intaki frá notanda með parseGuess()
*  - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
*  - Haldautan um fjölda ágiskana
*  - Vista fjölda ágiskana í "games" fylki þegar búið er að giska rétt
* 
* Ef notandi ýtir á cancel þegar beðið er um ágiskun skal hætta í leik en ekki vista ágiskanir
*  - t.d. með því að nota break í lykkju.
* 
* Þarf að útfæra með lykkju og flæðisstýringum
*/
function play() {
  const random = randomNumber(0,100);
  let guesses = 0;
  while (true) {
    const answer = prompt('Giskaðu á tölu á milli 0 og 100');
    if (answer === null) {
      alert('Hætt í leik');
      return 0;
    }
    const playerAnswer = parseGuess(answer)
    if (playerAnswer === null) {
      alert('Vinsamlegast sláðu inn löglega tölu á milli 0 og 100');
      continue;
    }
    const response = getResponse(playerAnswer, random);
    alert(response);
    if (response !== 'Rétt') {
      guesses++;
    } else {
      guesses++;
      games.push(guesses);
      return 1;
    }
  }
}

/**
* Skilar niðurstöðum um spilaða leiki sem streng.
* Fjöldi leikja er skilað ásamt meðalfjölda giska, t.d.:
*    "þú spilaðir 10 leiki
*     Meðalfjöldi ágiskana var 5"
* ATH að meðalfjöldi kemur í nýrri línu.
* Ef enginn leikur var spilaður er skilað:
*    "Þú spilaðir engann leik >_<"
*/
function getResults() {
  const gamesPlayed = games.length;
  const avgGuesses = calculateAverage();
  if (gamesPlayed === 0) {
    return 'Þú spilaðir engan leik >_<';
  } else {
    return 'Þú spilaðir ' + gamesPlayed + ' leiki \nMeðalfjöldi ágiskana var ' + avgGuesses;
  }
}

/**
* Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í 
* global breytu "games". Skilar gildi með tveim aukastöfum.
* Ef games = [3, 3, 4] er niðurstaðan (3+3+4)/3 = 3.66666667
* og henni skilað sem 3.67
* 
* þarf að útfæra með lykkju.
*/
function calculateAverage() {
  let guessSum = 0;
  let numberOfGames = games.length;
  for (let i = 0; i < numberOfGames; i++) {
    guessSum += games[i];
  }
  let average = guessSum/numberOfGames;
  return average.toFixed(2);
}

/**
* Tekur in input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
* Ef ekki er hægt að ná tölu úr input er skilað null
*/
function parseGuess(input) {
  const number = parseInt(input, 10);
  if (isNaN(number)) {
    return null;
  } else {
    return number;
  }
}

/**
* Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
*  - guess sem tölu, ágiskun notanda
*  - correct sem tölu, rétt gildi
* Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
* Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
* Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
* Ef munur er undir 10 skal skila "Nálægt"
* Ef munur er undir 20 skal skila "Frekar langt frá"
* Ef munur er undir 50 skal skila "Langt frá"
* Annars skal skila "Mjög langt frá"
* 
* Þarf að útfæra með flæðistýringu.
* Math.abs skilar algildi tölu: |a| = Math.abs(a)
*/
function getResponse(guess, correct) {
  const distance = Math.abs(correct - guess);
  if (guess < 0) {
    return 'Ekki rétt';
  } else if (guess === correct) {
    return 'Rétt';
  } else if (distance < 5) {
    return 'Mjög nálægt';
  } else if (distance < 10) {
    return 'Nálægt';
  } else if (distance < 20) {
    return 'Frekar langt frá';
  } else if (distance < 50) {
    return 'Langt frá';
  } else {
    return 'Mjög langt frá';
  }
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
function randomNumber(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();