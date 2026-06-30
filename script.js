// ==========================================
// GLOBALS & PUNTEGGIO
// ==========================================
let userScore = 0;

function modificaPunteggio(valore) {
    userScore += valore;
    if (userScore < 0) userScore = 0; // Evitiamo punteggi negativi assurdi
    const scoreEl = document.getElementById('user-score');
    if (scoreEl) {
        scoreEl.textContent = userScore;
        // Effetto flash visivo al cambio punteggio
        scoreEl.style.color = valore > 0 ? "#33ff33" : "#ff3333";
        setTimeout(() => { scoreEl.style.color = "#ffb300"; }, 300);
    }
}

// ==========================================
// 1. DATABASE PROGETTI (FORMATO OGGETTO JSON)
// ==========================================
const progettiJSON = [
    {
        "titolo": "Log_Monitor_API",
        "descrizione": "Script per automatizzare le modifiche e il monitoraggio dei log di sistema attraverso chiamate API dirette.",
        "link_github": "#",
        "tag": "Python"
    },
    {
        "titolo": "Budget_Alert_Bot",
        "descrizione": "Invia notifiche istantanee tramite webhook quando i costi infrastrutturali superano la soglia impostata.",
        "link_github": "#",
        "tag": "Serverless"
    },
    {
        "titolo": "Home_Server_Automation",
        "descrizione": "Insieme di playbook Ansible per configurare un server locale con Docker, Pi-hole e Nextcloud.",
        "link_github": "#",
        "tag": "DevOps"
    }
];

function caricaProgetti() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = ''; 

    progettiJSON.forEach(progetto => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${progetto.titolo} [${progetto.tag}]</h3>
            <p>${progetto.descrizione}</p>
            <p><a href="${progetto.link_github}" target="_blank">[Vedi Codice]</a></p>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 2. MINI-GIOCO: OMINO ECO-CLEANER
// ==========================================
function runEcoCleaner() {
    const env = document.getElementById('cleaner-env');
    const log = document.getElementById('cleaner-log');
    const btn = document.getElementById('cleaner-btn');

    if (!env || !log || !btn) return;

    btn.disabled = true;
    env.innerHTML = "";

    const rifiuti = ["🍂", "🍾", "📰", "🥫", "🚬", "🪫"];
    let mappa = new Array(22).fill(" ");
    mappa[4] = rifiuti[0];
    mappa[9] = rifiuti[1];
    mappa[14] = rifiuti[2];
    mappa[19] = rifiuti[3];

    let posOmino = 0;
    let saccoRifiuti = 0;
    env.parentElement.style.height = "120px";

    const gameLoop = setInterval(() => {
        if (mappa[posOmino] !== " ") {
            saccoRifiuti++;
            log.textContent = `[EVENT]: Rifiuto raccolto! Sacco: ${saccoRifiuti}/4`;
            modificaPunteggio(10); // +10 punti per ogni pezzo di spazzatura raccolto
        }

        let rigaTesta = new Array(22).fill(" ");
        let rigaCorpo = [...mappa];

        rigaTesta[posOmino] = "o";
        rigaCorpo[posOmino] = "⅄";

        env.innerHTML = `
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaTesta.join("")}</div>
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaCorpo.join("")}</div>
<div style="color: #225522; margin-top: 2px;">____________________________________________________</div>`.trim();

        mappa[posOmino] = " ";
        posOmino++;

        if (posOmino >= mappa.length) {
            clearInterval(gameLoop);
            log.textContent = `[STATUS]: Ronda completata. Strade pulite! [Rifiuti rimossi: ${saccoRifiuti}]`;

            setTimeout(() => {
                let rigaTestaReset = new Array(22).fill(" ");
                let rigaCorpoReset = new Array(22).fill(" ");
                rigaTestaReset[0] = "o";
                rigaCorpoReset[0] = "⅄";

                env.innerHTML = `
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaTestaReset.join("")}</div>
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaCorpoReset.join("")}</div>
<div style="color: #225522; margin-top: 2px;">____________________________________________________</div>`.trim();

                btn.disabled = false; 
            }, 600); 
        }
    }, 180);
}

// ==========================================
// 3. MINI-GIOCO: BASKET
// ==========================================
function runPerfectParabola() {
    const ball = document.getElementById('basketball');
    const log = document.getElementById('basket-log');
    const container = document.getElementById('basket-container');
    const btn = document.querySelector('#basket-container-wrapper .terminal-btn') || document.querySelector('.terminal-btn');

    if (!ball || !log || !container) return;
    if (btn) btn.disabled = true;

    const width = container.clientWidth - 55;
    const maxHeight = 95; 
    let progress = 0; 

    const animation = setInterval(() => {
        progress += 2; 

        let x = (progress / 100) * width;
        let p = progress / 100;
        let y = 4 * maxHeight * p * (1 - p);

        ball.style.left = (10 + x) + 'px';
        ball.style.bottom = (10 + y) + 'px';

        if (progress < 50) {
            log.textContent = `[LAUNCH]: Spinta idraulica // Altitudine: ${Math.round(y)}px`;
        } else if (progress < 98) {
            log.textContent = `[GRAVITY]: Rientro in atmosfera // Distanza target: ${Math.round(width - x)}px`;
        } else if (progress >= 100) {
            log.textContent = `[STATUS]: SWISH! // Canestro perfetto registrato sul target 🗑️`;
            clearInterval(animation);
            modificaPunteggio(50); // +50 punti per un canestro perfetto!
            if (btn) btn.disabled = false;
        }
    }, 16); 
}

// ==========================================
// 4. MINI-GIOCO: TRIVIA SSH (ANTI-ISPEZIONE)
// ==========================================
function calcolaHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
}

const databaseDomande = [
    {
        Q: "QUERY: Quale linguaggio di programmazione, famoso per la sua JVM, usi come linguaggio principale?",
        A: 2105674328 
    },
    {
        Q: "QUERY: Quale hub software open-source utilizzi per gestire e automatizzare la tua domotica di casa?",
        A: 1042761895 
    },
    {
        Q: "QUERY: Come si chiama l'interfaccia di programmazione utilizzata dai servizi web per scambiare dati (spesso JSON) e che ami integrare?",
        A: 193420 
    },
    {
        Q: "QUERY: Quale software storico, antenato dei moderni IDE e basato su Pascal, hai usato nei tuoi primi anni da dev?",
        A: 2090192537 
    },
    {
        Q: "QUERY: Quale sport consideri un vero e proprio 'algoritmo in tempo reale' fatto di spaziature sul parquet?",
        A: 2043694002 
    }
];

let currentChallenge = {};
let guessedLetters = [];
let maxAttempts = 6;
let remainingAttempts = maxAttempts;
let targetWordLength = 0;

function initHangmanGame() {
    if (!document.getElementById('game-hint')) return;

    currentChallenge = databaseDomande[Math.floor(Math.random() * databaseDomande.length)];
    
    const lunghezze = { 2105674328: 4, 1042761895: 13, 193420: 3, 2090192537: 6, 2043694002: 6 };
    targetWordLength = lunghezze[currentChallenge.A];
    
    guessedLetters = [];
    remainingAttempts = maxAttempts;
    
    document.getElementById('game-hint').textContent = currentChallenge.Q;
    document.getElementById('attempts-left').textContent = remainingAttempts;
    document.getElementById('attempts-left').style.color = "#ffb300";
    document.getElementById('used-letters').textContent = "nessuna";
    document.getElementById('game-log').textContent = "guest@space:~$ ./ssh_hashed_bypass.sh --status=SECURE_MODE";
    document.getElementById('game-log').style.color = "#33ff33";
    document.getElementById('reset-game-btn').style.display = "none";
    
    renderWordDisplay();
    generateKeyboard();
}

function renderWordDisplay() {
    const display = document.getElementById('word-display');
    if (!display) return;

    let currentProgress = [];
    let parolaCompletaIndovinata = true;
    let letteraMappa = getMappaCorrente(currentChallenge.A);
    
    for (let i = 0; i < targetWordLength; i++) {
        let letteraCorretta = letteraMappa[i];
        if (guessedLetters.includes(letteraCorretta)) {
            currentProgress.push(letteraCorretta);
        } else {
            currentProgress.push("_");
            parolaCompletaIndovinata = false;
        }
    }
    
    display.textContent = currentProgress.join(" ");
    
    if (parolaCompletaIndovinata) {
        document.getElementById('game-log').textContent = "[ACCESS_GRANTED]: Hash verificato. Sessione SSH aperta.";
        document.getElementById('game-log').style.color = "#33ff33";
        disableAllKeyButtons();
        document.getElementById('reset-game-btn').style.display = "inline-block";
        modificaPunteggio(100); // +100 punti se indovini l'intera parola!
    }
}

function handleLetterGuess(letter, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.style.background = "#225522";
    buttonElement.style.color = "#0a0f0d";
    
    guessedLetters.push(letter);
    document.getElementById('used-letters').textContent = guessedLetters.join(", ");
    
    let letteraMappa = getMappaCorrente(currentChallenge.A);
    
    if (letteraMappa.includes(letter)) {
        document.getElementById('game-log').textContent = `[SUCCESS]: Carattere valido. Risoluzione collisione hash...`;
        renderWordDisplay();
    } else {
        remainingAttempts--;
        document.getElementById('attempts-left').textContent = remainingAttempts;
        document.getElementById('game-log').textContent = `[WARN]: Carattere errato. Nessun match nei blocchi.`;
        modificaPunteggio(-10); // -10 punti per ogni errore commesso
        
        if (remainingAttempts <= 2) document.getElementById('attempts-left').style.color = "#ff3333";
        
        if (remainingAttempts <= 0) {
            let soluzioni = { 2105674328: "JAVA", 1042761895: "HOMEASSISTANT", 193420: "API", 2090192537: "DELPHI", 2043694002: "BASKET" };
            document.getElementById('game-log').textContent = `[ACCESS_DENIED]: Brute-force fallito. La chiave era: ${soluzioni[currentChallenge.A]}`;
            document.getElementById('game-log').style.color = "#ff3333";
            displayParolaFinale(soluzioni[currentChallenge.A]);
            disableAllKeyButtons();
            document.getElementById('reset-game-btn').style.display = "inline-block";
        }
    }
}

function getMappaCorrente(hash) {
    const m = {
        2105674328: ["J", "A", "V", "A"],
        1042761895: ["H", "O", "M", "E", "A", "S", "S", "I", "S", "T", "A", "N", "T"],
        193420: ["A", "P", "I"],
        2090192537: ["D", "E", "L", "P", "H", "I"],
        2043694002: ["B", "A", "S", "K", "E", "T"]
    };
    return m[hash];
}

function displayParolaFinale(parola) {
    const display = document.getElementById('word-display');
    if (display) display.textContent = parola.split("").join(" ");
}

function generateKeyboard() {
    const container = document.getElementById('keyboard-container');
    if (!container) return;
    container.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.className = "terminal-btn";
        btn.style.padding = "5px 0";
        btn.style.fontSize = "12px";
        btn.onclick = () => handleLetterGuess(letter, btn);
        container.appendChild(btn);
    });
}

function disableAllKeyButtons() {
    document.querySelectorAll('#keyboard-container .terminal-btn').forEach(btn => btn.disabled = true);
}

// ==========================================
// AVVIO UNIFICATO E SICURO
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    caricaProgetti();
    if (document.getElementById('game-hint')) {
        initHangmanGame();
    }
});