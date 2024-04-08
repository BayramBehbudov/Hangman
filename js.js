const imgParagraps = document.querySelector("#imgBox") // imge verdiyimiz id ile tuturuq 
const wrongLettersParagraps = document.getElementById("wrongLetters") //sehv herflerin yazilacagi yer
const trialCountParagraps = document.getElementById("trialCount") // qalan cehdlerin sayini gosterecek
const pointParagraps = document.getElementById("point") // istifadecinin xallarini gosterecek
const resultTextParagraps = document.getElementById("resultText") // console log kimi result yazaciq

const wordLettersParagraps = document.getElementById("wordLetters") //duzgun herfleri yazaciq


let wrongLetters = [] //sehv herfler gelecek
let trueLetters = [] //  filmin adindaki herfler gelecek
let filmsName = ["avatar", "joker", "matrix", "titanic", "tomandjerry"]
let trialCount = 10 // cehdlerin sayi
let playerPoint = 0 // istifadecinin xali
let movie // filmin adini bir nece yerde isledirik deye globala cixardim


let lettersSelectedCount = 0 // dogru herfler tekrar tiklanmasin deye istifade etdim
let correctSelected = []    // dogru herflerin icinden secilenleri bura yigacam

chooseMovie() 


function chooseMovie() { // bu funksiya sehife acilan kimi cagirilir

    movie = movieName() //funksiyadan gelen filmin adin gotururuk
    trueLetters = nameLetterTrue(movie)  // filmin adini herflere ayiririq


    imgParagraps.src = `./img/${movie}.jpg` // imgni deyismek ucun, bunun fotolar qovluqdaki adlari ile burada yaratdigimiz arraydaki adlarla eyni olmalidi

    writeWordCount(trueLetters) // film secilen kimi cagirilir

}

function movieName() { // bu filmlerin icinden tesadufi film secmek ucundur
    filmIndex = Math.floor(Math.random() * filmsName.length)
    return filmsName[filmIndex]
}


function nameLetterTrue(item) { // bu funksiya filmin adini herflere ayirib donderir. biz bunu daxil edilen herflerin burada olub olmadigini yoxlayacagiq

    let letters = []

    for (let i = 0; i <= item.length - 1; i++) {
        letters.push(item[i])
    }
    return letters
}


function writeWordCount(trueLetters) { // sehife acilanda film adinin sayina gore - yazan funksiya
    let word = ""
    trueLetters.forEach(item => {
        word += `-`
    })
    wordLettersParagraps.textContent = word
}





function deleteFilm(items) { // bu film adlarinin icinden filmin adini silmek ucundur/ mutasiya ederek
    filmsName = filmsName.filter(item => item !== items)
     
}





function trial() { // oyuncunun cehd sayini hesablayib ekrana yazan funksiya

    if (trialCount !== 1) {

        trialCount -= 1
        trialCountParagraps.textContent = `Trial Right : ` + trialCount

    } else {

        resultTextParagraps.textContent = "Result Text: Cehd limitini bitirdiniz. Oyun yeniden baslayir."

        reset()
    }
}



function capitalizeFirstLetter(word) { // herfler ekrana cixanda filmin ilk herfini boyuk yazacaq
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function writeTrueLetter(letter) { // herfleri ardicil yazan funksiya
    if (!correctSelected.includes(letter)) {
        trueLetters.forEach((lett, index) => {
            if (lett === letter) {
                let updatedWord = wordLettersParagraps.textContent.slice(0, index) + lett + wordLettersParagraps.textContent.slice(index + 1);
                updatedWord = capitalizeFirstLetter(updatedWord); 
                
                wordLettersParagraps.textContent = updatedWord;
                lettersSelectedCount++;


                displayWordWith3DEffect(wordLettersParagraps.textContent);

            }
        });
    }
}



function displayWordWith3DEffect(word) { // chatGpt sagolsun effekt verdi)))
    wordLettersParagraps.innerHTML = ''; 
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.textContent = word[i];
        span.classList.add('letter');
        wordLettersParagraps.appendChild(span);
        apply3DEffect(span, i); 
    }
}

function apply3DEffect(element, index) { // chatGpt
    setTimeout(() => {
        element.style.animation = 'pop 0.5s ease';
    }, index * 50); // Her harfe biraz gecikme vererek 3D efektini uygula  
}





window.addEventListener("keydown", function (e) {   // Bu funksiya istifadecinin klik etdiyi herfi qaytarir
    if (e.keyCode >= 65 && e.keyCode <= 90) { // bu yoxlayir ki istifadeci heqiqeten herfe klik edib yoxsa simvola. herfe klik edibse bu blok isleyir
        var letter = e.key.toLowerCase() // e.key herfin ozudu
        

        if (checkTrueOrWrong(letter)) {

            writeTrueLetter(letter) // herf truedusa ekrana yazacaq

            checkWin() // her klikde cagirilir ve qalibi mueyyen edir

            if (!correctSelected.includes(letter)) { // bu herf eger orda yoxdusa ve eger true herfdise yigilir hem de tekrar daxil edilmesin deye yoxlayir

                correctSelected.push(letter)

            } else {
                resultTextParagraps.textContent = "Result Text: Bu herf artiq daxil edilib"
            }


        } else {
            trial()
        }

    } else {
        resultTextParagraps.textContent = "Result Text:  Ingilis herflerinden istifade edin"
    }
})


function checkTrueOrWrong(letter) { //bu funksiya klik olunan herfi yoxlayir
    if (trueLetters.includes(letter)) { // eger true herflerdedise true donderir


        return true //true qaytariram ki if blokuna girsin funksiyani cagiranda

    } else { // eger true herflerde deyilse

        if (!wrongLetters.includes(letter)) { // ve o herf  hemde wrong herflerde deyilse 
            wrongLetters.push(letter) // hemin herfi wrong herflere elave edir
        }

        wrongLettersParagraps.textContent = `Wrong Letters : ` + wrongLetters // wrong herfleri ekrana yazdirir 

        resultTextParagraps.textContent = "Result Text: Sehv herf daxil etdiniz"

        return false // herf wrongdadisa false dondurur ki if blokuna girmesin cagrilanda
    }

}

function checkWin() { // qalibiyyeti mueyyen eden funksiya
    if (lettersSelectedCount < trueLetters.length) {

        resultTextParagraps.textContent = "Result Text: Dogru herf daxil etdiniz"
    }
    if (lettersSelectedCount == trueLetters.length) {
        resultTextParagraps.textContent = "Result Text: Siz qalib geldiniz"
        playerPoint++
        pointParagraps.textContent = "Your Points: " + playerPoint
        reset()
        deleteFilm(movie)
    }
}

function reset() { 
    setTimeout(function () { // reset funksiyasi 1 saniye gecikecek 
        wrongLetters = []
        wrongLettersParagraps.textContent = `Wrong Letters : `
        trueLetters = []
        trialCount = 10
        trialCountParagraps.textContent = `Trial Right : ` + trialCount
        correctSelected = []
        resultTextParagraps.textContent = "Result Text: "
        lettersSelectedCount = 0

        chooseMovie()
    }, 1500);

    if (playerPoint == 5) { // eger filmler cardindan filmler silinib qutarsa yeniden baslamasi ucundur
        filmsName = ["avatar", "joker", "matrix", "titanic", "tomandjerry"]
        playerPoint = 0
    }
}

