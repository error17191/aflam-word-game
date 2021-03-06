let arabicAlphabet = [
    ['ا', 'أ', 'ئ', 'ء', 'ؤ', 'آ', 'إ'],
    'ب',
    ['ت', 'ة'],
    'ث',
    'ج',
    'ح',
    'خ',
    'د',
    'ذ',
    'ر',
    'ز',
    'س',
    'ش',
    'ص',
    'ض',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ك',
    'ل',
    'م',
    'ن',
    'ه',
    'و',
    ['ى', 'ي'],
];

let movie = getRandomMovie();

let movieStructure = [];
let wrongLetterCount = 0;

for (let i = 0; i < arabicAlphabet.length; i++) {
    let letters = arabicAlphabet[i]
    if (Array.isArray(letters)) {
        document.querySelector('.alphabet').appendChild(
            createLetterElement(i === 0 ? 'ا - همزة' : letters.join(' - '), i)
        );
    } else {
        document.querySelector('.alphabet').appendChild(
            createLetterElement(letters, i)
        );
    }
}

document.querySelectorAll('.alphabet .letter').forEach(function (letter) {
    letter.addEventListener('click', function (e) {
        if (wrongLetterCount == 9) {
            return;
        }
        let index = e.target.getAttribute('data-index');
        let letters = Array.isArray(arabicAlphabet[index]) ? arabicAlphabet[index] : [arabicAlphabet[index]];
        let wrongChoice = true;
        for (let word of movieStructure) {
            for (let letterObj of word) {
                if (letters.includes(letterObj.letter)) {
                    letterObj.solved = true;
                    wrongChoice = false;
                }
            }
        }

        if (wrongChoice) {
            wrongLetterCount++
            e.target.remove();
            let $cell = document.querySelector('.cell.empty');
            $cell.classList.remove('empty');
            $cell.innerText = letters[0];
            if(wrongLetterCount == 9){
                alert(movie);
            }
        } else {
            e.target.remove();
            renderMovie();
        }
    });
});


prepareMovieStructure();
renderMovie();

function prepareMovieStructure() {
    movie.split(' ').forEach(function (word) {
        let wordStructure = [];
        for (let letter of word.split('')) {
            wordStructure.push({
                letter,
                solved: false,
            });
        }
        movieStructure.push(wordStructure);
    });
}


function renderMovie() {
    let $movie = document.querySelector('.movie');
    $movie.innerHTML = '';
    movieStructure.forEach(function (word) {
        $movie.appendChild(createWordElement(word));
    });
}

function createWordElement(word) {
    let $word = document.createElement('div');
    $word.classList.add('word');
    word.forEach(function (letter) {
        $word.appendChild(createMovieLetterElement(letter));
    });

    return $word;
}

function createMovieLetterElement(letter) {
    let $letter = document.createElement('span');
	$letter.innerText = letter.solved ? letter.letter : '-';
    return $letter
}

function createLetterElement(text, index) {
    let element = document.createElement('div');
    element.classList.add('letter');
    element.innerText = text + ' ';
    element.setAttribute('data-index', index);

    return element;
}

function getRandomMovie(){
	let movie = movies[Math.floor(Math.random() * (movies.length - 1))].name
	for(let char of movie.split('')){
		if(char == ' '){
			continue;
		}
		let isCharFound = false;
		for (let letters of arabicAlphabet){
			if(Array.isArray(letters) ? letters.includes(char) : letters == char){
				isCharFound = true;
				break;
			} 
		}
		
		if(!isCharFound){
			return getRandomMovie();
		}
	}
	
	return  movie;
}