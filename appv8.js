let arabicAlphabet = [
    ['ا', 'أ', 'ئ', 'ء', 'ؤ', 'آ'],
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

let movie = movies[Math.floor(Math.random() * (movies.length - 1))].name;

let movieStructure = [];
let wrongLetterCount = 0;

for (let i = 0; i < arabicAlphabet.length; i++) {
    let letters = arabicAlphabet[i]
    if (Array.isArray(letters)) {
        document.querySelector('.letters').appendChild(
            createLetterElement(letters.join(' - '), i)
        );
    } else {
        document.querySelector('.letters').appendChild(
            createLetterElement(letters, i)
        );
    }
}

document.querySelectorAll('.letters .letter').forEach(function (letter) {
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
            let $div = document.createElement('div');
            $div.innerText = letters[0];
            $cell.appendChild($div);
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
    let $letter = document.createElement('div');
    $letter.classList.add('letter');
    if (letter.solved) {
        let $innerLetter = document.createElement('div');
        $innerLetter.innerText = letter.letter;
        $letter.appendChild($innerLetter);
    }

    return $letter
}

function createLetterElement(text, index) {
    let element = document.createElement('div');
    element.classList.add('letter');
    element.innerText = text + ' ';
    element.setAttribute('data-index', index);

    return element;
}
