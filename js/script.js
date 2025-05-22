let score = 0;
let currentQuestion = 0;
// knappen til at tjekke svar
let checkAnswerBtn = document.getElementById("check-answer-btn");


// variabel der husker hvilken svarmulighed er valgt (bruges til at tjekke om svar er korrekt)
let selectedChoice = null;

// spørgsmålene i array
let questions = [

    //spørgsmål 1
    {
        choices: ["En allergisk reaktion mod menstruationsblod", "En kræftsygdom i livmoderen", "Når mænd gror en livmoder", "Når livermodervæv vokser andre steder i kroppen"],
        correctAnswer: 3,
        htmlContent: `
        <h1>Hvad er endometriose?</h1>
        <div class="gif-video-container">
            <video src="img/video/question-1-gif.mp4" autoplay loop muted playinline ></video>
        </div>
        
        <div id="question-choices"></div>`,
        layout: "grid",
        popupHtml:
        `<p>Endometriose gør at livmodervæv vokser andre steder i kroppen. Lær mere i videoen:</p>
        
        <div class="video-popup-container">
            <video src="img/video/question-1-answer.mp4" loop playinline></video>

            <div class="play-popup-video">
                <img src="img/video/playvideo.svg">
            </div>

            <div class="pause-popup-video"></div>
        </div>`,
    },
    //spørgsmål 2
    {
        choices: ["50%", "25%", "10%", "under 1%"],
        correctAnswer: 2,
        htmlContent: `
        <h1>Hvor mange kvinder rammes af endometriose?</h1>
        <div id="question-choices"></div>
        `,
        layout: "row",
        popupHtml: `
        <p>Op til <strong>10% af kvinder</strong> rammes af endometriose,<br>hvilket er <strong>lige så mange som er ramt af diabetes</strong>.</p>
        <img src="/img/groupwomen.svg">`
    },

    //spørgsmål 3
    {
        choices: ["A) Langvarige smerter i underlivet", "B) Svært ved at blive gravid", "C) Smerter når man skal tisse eller have afføring under menstruation", "D) Højere risiko for livmoderhalskræft", "E) Følelse af træthed i lang tid"],
        correctAnswer: 3,
        htmlContent: `
        <h1>Hvad kan endometriose <em>ikke</em> føre til?</h1>
        <p>Vælg én svarmulighed</p>
        <div id="question-choices"></div>
        `,
        layout: "row",
        popupHtml: `<p>Endometriose kan heldigvis <strong><em>ikke</em></strong> føre til højere risiko for livmoderhalskræft. Lær mere i videoen:</p>
        
                <div class="video-popup-container">
            <video src="img/video/question-3-answer.mp4" loop playinline></video>

            <div class="play-popup-video">
                <img src="img/video/playvideo.svg">
            </div>

            <div class="pause-popup-video"></div>
        </div>`
    },

    //spørgsmål 4
    {
        choices: [
            //objekter istedet for strings
            {name: "Halsey",
            img: "img/celebrities/halsey.png"},
            {name: "Billie Eilish",
            img: "img/celebrities/billieeilish.png"},
            {name: "Cameron Diaz",
            img: "img/celebrities/camerondiaz.png"},
            {name: "Serena Williams",
            img: "img/celebrities/serenawilliams.png"},

        ],
        correctAnswer: 0,
        htmlContent: `
        <h1>En af de tre kendte kvinder har stået frem med endometriose. Kan du gætte hvem?</h1>
        <div id="question-choices"></div>
        `,
        layout: "grid-img",
        popupHtml: `
        <p>Sangeren Halsey har endometriose og har været åben omkring sine oplevelser med sygdommen.</p>
        <div class="video-popup-container">
            <video src="/img/video/halsey.mp4" playinline></video>

            <div class="play-popup-video">
                <img src="img/video/playvideo.svg">
            </div>
            <div class="pause-popup-video"></div>
        </div>
        `
    },
    //spørgsmål 5
    {
        choices: ["Sandt", "Falsk"],
        correctAnswer: 0,
        htmlContent: `
        <h1>Det tager ofte mere end 5 år at blive diagnosticeret med endometriose</h1>
        <p class="quote">"Jeg fik bare at vide, at jeg skulle tage en panodil og tage mig sammen."<br>- Anonym, 22 år</p>
        <div id= "question-choices"></div>
        `,
        layout: "true-false",
        popupHtml: `<p>Det kan ofte tage <strong>op til 5-10 år</strong>, at få
        diagnosen stillet. Dette er bl.a. grundet mangel på opmærksomhed om emnet.</p>
        <img src="img/diagnose.svg">`
    },
    //spørgsmål 6
    {
        choices: ["En midlertidig hormonknude i æggestokken", "Chokolade Cyst", "Sammenvoksninger (adhærencer)", "Infektion i livmoderen"],
        correctAnswer: 1,
        htmlContent: `
        <h1>Hvilken endometriose følgevirkning ser du nedenfor</h1>
        <div class="img-container">
            <img src="img/chokoladecyst.gif">
        </div>
        <div id="question-choices"></div>
        `,
        layout: "grid",
        popupHtml: `
        
        <p>En "chokolade cyste" er en cyste fyldt med blod og væske, der kan opstå ved endometriose.</p>
        <p>Denne cyst vokser i æggestokken og <strong>kan lede til infertilitet.</strong></p>`
    },

    //spørgsmål 7
     {
        choices: ["Mindre end 10%", "Ca. 25-40 %", "Over 60%", "Over 90%"],
        correctAnswer: 2,
        htmlContent: `
        <h1>Hvor stor er risikoen for, at personer med endometriose føler ensomhed?</h1>
        <p>Mange melder ofte fra til sociale begivenheder, da smerterne gør det svært at deltage. Det kan føre til, at de føler sig isolerede og distancerede fra deres venner og familie.</p>
        <div class="img-container">
            <img src="img/endopigeensom.png">
        </div>
        <div id="question-choices"></div>
        `,
        layout: "grid",
        popupHtml: `<p>Faktisk oplever op til <strong>70% ensomhed</strong>, fordi smerter kan gøre det svært at deltage socialt.</p>
        <p><strong>Støtte fra andre</strong> kan gøre en stor forskel.`
    },

    //spørgsmål 8
     {
        choices: ["Sandt", "Falsk"],
        correctAnswer: 1,
        htmlContent: `
        <h1>Endometriosesmerter kommer aldrig ud over menstruationstidspunktet </h1>
        <p class="quote">"Nogle, har så stærke smerter, at de besvimer på toiletgulvet. Det er vigtigt at tage dem alvorligt"<br>- Lene Agersnap.</p>
        <div id="question-choices"></div>
        `,
        layout: "true-false",
        popupHtml: `
        <p>Når livmodervæven som ved endometriose kan vokse uden for livmoderen, kan lede til betændelse og arvæv</p>
        <p>Dette kan lede til at <strong>smerterne bliver kroniske</strong> og mærkes selv uden for menstruationstidspunktet.</p>
        `
    },

    //spørgsmål 9
     {
        choices: ["Mindre end 5%", "Ca. 5-15%", "Ca. 15-30%", "Ca. 30-50%"],
        correctAnswer: 3,
        htmlContent: `
        <h1>For personer med endometriose, hvor stor er risikoen for infertilitet</h1>
        <p>Forestil dig, at du i årevis drømmer om at få et barn — men hver måned, i stedet for håb, kommer der smerter, blod og skuffelse.</p>
        <div class="img-container">
            <img src="img/endoliggerpige.svg">
        </div>
        <div id="question-choices"></div>
        `,
        layout: "grid",
        popupHtml: `
        <p>Endometriose er en af de <strong>største årsager til infertilitet.</strong></p>
        <p>Mellem <strong>30-50%</strong> af kvinder med sygdommen kan få svært ved at blive gravide. Det kan ske, selv ved milde symptomer.</p>`
    },

]

// ####################################################################################################
// Funktioner
// ####################################################################################################
// generering af spørgsmål (html)
function generateQuestion() {

    // definer containeren til spørgsmål
    let questionContainer = document.querySelector(".question-container");

    // slet gamle spørgsmål
    questionContainer.innerHTML = "";

    // generer spørgsmål baseret på htmlContent
    questionContainer.innerHTML = questions[currentQuestion].htmlContent;

    // kør "generer valgmuligheder" funktionen
    generateChoices();
}

// generering af valgmuligheder
function generateChoices() {

    // definer containeren til valgmulighederne
    let questionChoicesContainer = document.getElementById("question-choices");

    // slet gammle valgmuligheder
    questionChoicesContainer.innerHTML = "";

    // generer nye valgmuligheder baseret på js objektet i arrayet øverst, med for loop (kunne også være forEach)
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    
        // generer <button> og giv det en variabel
        let generatedChoiceBtn = document.createElement("button");

        // hvis layout er "grid-img" er "choices" property sat til at være et objekt i dette specifikke spørgsmål, da der skal være et billede.
        if (questions[currentQuestion].layout === "grid-img") {
            let choiceImg = document.createElement("img");

            // gå et lag dybere ned da dette er et objekt - img og name
            choiceImg.src = questions[currentQuestion].choices[i].img;
            generatedChoiceBtn.innerText = questions[currentQuestion].choices[i].name;

            // smid billede ind i knap
            generatedChoiceBtn.appendChild(choiceImg);
        }
        else {

            // hvis det ikke er "grid-img" er choices bare en alm array uden objekter, og man skal derfor ikke et lag dybere ned
            generatedChoiceBtn.innerText = questions[currentQuestion].choices[i];
        }

        // tilføj tekst of class til <button>
        generatedChoiceBtn.classList.add("choice-btn");

        // smid <button> ind i "question-choices" containeren
        questionChoicesContainer.appendChild(generatedChoiceBtn);

        // bind knap til i e.g. knap1 = 0, knap2 = 1, knap3 = 2 osv.
        generatedChoiceBtn.setAttribute("data-btn-index", i);

        // tilføj tryk-eventlistener - gør sådan kun en knap kan vælges ad gangen og til at gemme i selectedchoice 
        generatedChoiceBtn.onclick = function() {

            audioSelect();
    
            // fjern først "selected" class fra alle knapper så ikke flere er markeret (med forEach, men kunne også være for loop)
            document.querySelectorAll(".choice-btn").forEach(function(btn) {
                btn.classList.remove("selected");
            });
            // tilføj efter "selected" class til den valgte knap
            this.classList.add("selected");
        
            // this.getAttribute("data-gtn-index") returnerer string, parseInt konverterer til tal
            selectedChoice = parseInt(this.getAttribute("data-btn-index"));
        
            checkAnswerBtn.disabled = false;
        };
    }

    // tilføj classes til css alt efter layout property
    if (questions[currentQuestion].layout === "grid") {
        questionChoicesContainer.classList.add("grid");
    } else if (questions[currentQuestion].layout === "row") {
        questionChoicesContainer.classList.add("row");
    } else if (questions[currentQuestion].layout === "true-false") {
        questionChoicesContainer.classList.add("true-false");
    } else if (questions[currentQuestion].layout === "grid-img") {
        questionChoicesContainer.classList.add("grid-img");
    }
}

// generering af valgmuligheder (når man trykker på "tjek svar" knappen defineret i generateQuestion)
function checkAnswer() {

    let userIsCorrect;

    if (selectedChoice === questions[currentQuestion].correctAnswer) {
        userIsCorrect = true;
        score++;
    } else {
        userIsCorrect = false;
    }

    infoPopup(userIsCorrect);
}

function infoPopup(trueOrFalse) {
    let overlay = document.querySelector(".overlay");
    let popup = document.querySelector(".popup");

    // gør overlay og popup synlig, og gør sådan man ikke kan scrolle
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
    document.querySelector("body").style.overflow = "hidden";


    // Sæt knaptekst (standard "videre")
    let buttonText = "Videre";
    // hvis det er sidste spørgsmål, så ændre knapteksten til "afslut"
    if (currentQuestion+1 === questions.length) {
        buttonText = "Afslut";
    }
    // gem html i en variabel
    let nextButtonHtml = `
        <button class="fade-up" id="next-question-btn">${buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_141_205" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_141_205)">
                <path d="M12 15.6443L15.6443 12L12 8.35575L10.9558 9.4L12.8057 11.25H8.25V12.75H12.8057L10.9558 14.6L12 15.6443ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="white"/>
                </g>
            </svg>
        </button>`;


    // Vis om svar er rigtigt/forkert, tag indhold fra property popupHtml
    if (trueOrFalse === true) {

        audioCorrect();

        popup.innerHTML =
            `<div class="right-circle">
                <dotlottie-player src="/img/lotti/right.lottie" background="transparent" speed="1" style="width: 44px; height: 44px" autoplay></dotlottie-player>
            </div>
            <h2 class="fade-up">
                Stærkt, det var <br> rigtigt!
            </h2>  
            <div class="fade-up">
                ${questions[currentQuestion].popupHtml}
            </div>
            ${nextButtonHtml}`;

    } else if ( trueOrFalse === false) {

        audioWrong();

        popup.innerHTML = 
            `<div class="wrong-circle">
                <dotlottie-player src="/img/lotti/wrong.lottie" background="transparent" speed="1" style="width: 44px; height: 44px" autoplay></dotlottie-player>
            </div>
            <h2 class="fade-up">
                Øv, det var <br>forkert...
            </h2>
            <div class="fade-up">
                ${questions[currentQuestion].popupHtml}
            </div>
            ${nextButtonHtml}`;
    }

    // variabler til  popup video
    let popupVideo = document.querySelector(".video-popup-container video");
    let popupPlay = document.querySelector(".play-popup-video");
    let popupPause = document.querySelector(".pause-popup-video");
    
    // if statement der checker om der er en viedeo før den laver funktionalitet
    if (popupVideo !== null) {
        popupPlay.onclick = function() {
            popupVideo.play();
            popupPlay.style.visibility = "hidden";
            popupPlay.style.opacity = "0";
            popupPause.style.visibility = "1";
            popupPause.style.visibility = "visible";
        };
        popupPause.onclick = function() {
            popupVideo.pause();
            popupPlay.style.visibility = "visible";
            popupPlay.style.opacity = "1";
            popupPause.style.opacity = "0";
            popupPause.style.visibility = "hidden";
        };
    }

    //Videre-/afslutknappen
    let nextButton = document.getElementById("next-question-btn");

    nextButton.onclick = function() {
        if (currentQuestion+1 < questions.length) {
            currentQuestion++;

            updateProgressBar(currentQuestion, questions.length);

            generateQuestion();

            closeInfoPopup();
            selectedChoice = null;
        } else {
            closeInfoPopup();
            endQuiz()
        }
    }
}

function closeInfoPopup() {
    document.querySelector(".overlay").style.visibility = "hidden";
    document.querySelector(".overlay").style.opacity = "0";
    document.querySelector(".popup").style.visibility = "hidden";
    document.querySelector(".popup").style.opacity = "0";
    document.querySelector(".popup").innerHTML = "";
    document.querySelector("body").style.overflow = "auto";
    //window.scrollTo(0, 0);
}

function endQuiz() {
    screenContainer = document.getElementById("screen-container");
    screenContainer.innerHTML = "";
    screenContainer.classList.add("end-screen");
    screenContainer.innerHTML =
    `
    <div class="end-screen-innercontainer">
        <span>DIT RESULTAT</span>
        <h1>Du har svaret <br> rigtigt på ${score}/${questions.length}<br> spørgsmål!</h1>
        <p>Du klarede det! Tak fordi du tog quizzen <br> – viden gør en stor forskel.</p>
        <a href="index.html" class="end-screen-button">Prøv igen
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_141_205" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="32" height="32" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_141_205)">
                <path d="M12 15.6443L15.6443 12L12 8.35575L10.9558 9.4L12.8057 11.25H8.25V12.75H12.8057L10.9558 14.6L12 15.6443ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#1E1E1E"/>
                </g>
            </svg>
        </a>
    </div>
    
    <img src="img/background-endscreen.jpg" class="end-screen-backgroundimg">
    `

    endAudio();

    // confetti fra library: https://confetti.js.org/more.html (school pride)
    const end = Date.now() + 15 * 1000;
        const colors = ["#bb0000", "#ffffff"];
        (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        })();
}

function updateProgressBar(currentQuestion, totalQuestions) {
    const fill = document.querySelector('.progress__fill');
    const percent = (currentQuestion / totalQuestions) * 100;
    fill.style.width = `${percent}%`;
}

// ########################## Audio #########################
function audioCorrect() {
    new Audio('img/audio/duharsvaretrigtig.mp3').play();
}

function audioWrong() {
    new Audio('img/audio/duharsvaretforkert.mp3').play();
}

function audioSelect() {
    new Audio('img/audio/kliklyd.mp3').play();
}

function endAudio() {
    new Audio('img/audio/duharvundet.mp3').play();
}
// ########################## Audio Slut #########################

generateQuestion();
    
// giv den en onclick eventlistener
checkAnswerBtn.onclick = function () {
    checkAnswer();
    checkAnswerBtn.disabled = true;
};