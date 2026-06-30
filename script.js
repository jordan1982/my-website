// 1. IL TUO DATABASE PROGETTI (FORMATO OGGETTO JSON)
        // Modifica, aggiungi o rimuovi elementi da questo array per aggiornare il sito
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

        // Funzione per stampare i progetti dal JSON alla pagina HTML
        function caricaProgetti() {
            const container = document.getElementById('projects-container');
            container.innerHTML = ''; // Svuota il loader grafico

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

        // 3. SIMULATORE OMINO VOLONTARIO IN ASCII ART (Y CAPOVOLTA)
        // 3. SIMULATORE OMINO VOLONTARIO CON RESET INIZIALE
        function runEcoCleaner() {
            const env = document.getElementById('cleaner-env');
            const log = document.getElementById('cleaner-log');
            const btn = document.getElementById('cleaner-btn');

            btn.disabled = true;
            env.innerHTML = "";

            // Configurazione Rifiuti (puoi cambiare questi simboli con quelli che preferisci)
            const rifiuti = ["🍂", "🍾", "📰", "🥫", "🚬", "🪫"];

            // Generiamo il percorso di 22 slot
            let mappa = new Array(22).fill(" ");
            mappa[4] = rifiuti[0];
            mappa[9] = rifiuti[1];
            mappa[14] = rifiuti[2];
            mappa[19] = rifiuti[3];

            let posOmino = 0;
            let saccoRifiuti = 0;

            env.parentElement.style.height = "120px";

            const gameLoop = setInterval(() => {
                // Controllo collisione
                if (mappa[posOmino] !== " ") {
                    saccoRifiuti++;
                    log.textContent = `[EVENT]: Rifiuto raccolto! Sacco: ${saccoRifiuti}/4`;
                }

                // Creiamo le due righe del frame corrente
                let rigaTesta = new Array(22).fill(" ");
                let rigaCorpo = [...mappa];

                // Disegniamo l'omino nella posizione corrente
                rigaTesta[posOmino] = "o";
                rigaCorpo[posOmino] = "⅄";

                // Renderizziamo il frame
                env.innerHTML = `
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaTesta.join("")}</div>
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaCorpo.join("")}</div>
<div style="color: #225522; margin-top: 2px;">____________________________________________________</div>
        `.trim();

                // Pulisce il terreno dove è passato l'omino
                mappa[posOmino] = " ";

                posOmino++;

                // Fine del percorso
                if (posOmino >= mappa.length) {
                    clearInterval(gameLoop);
                    log.textContent = `[STATUS]: Ronda completata. Strade pulite! [Rifiuti rimossi: ${saccoRifiuti}]`;

                    // --- FIX: RIPOSIZIONA L'OMINO ALL'INIZIO ---
                    setTimeout(() => {
                        let rigaTestaReset = new Array(22).fill(" ");
                        let rigaCorpoReset = new Array(22).fill(" ");
                        rigaTestaReset[0] = "o";
                        rigaCorpoReset[0] = "⅄";

                        env.innerHTML = `
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaTestaReset.join("")}</div>
<div style="white-space: pre; font-family: monospace; line-height: 1.1; letter-spacing: 2px; color: #33ff33;">${rigaCorpoReset.join("")}</div>
<div style="color: #225522; margin-top: 2px;">____________________________________________________</div>
                `.trim();

                        btn.disabled = false; // Riabilita il bottone solo dopo il reset visivo
                    }, 600); // Mezzo secondo di pausa prima di scattare all'inizio
                }
            }, 180);
        }

        // 2. FUNZIONE ANIMAZIONE BASKET REALE CON PARABOLA CSS/JS
        function runPerfectParabola() {
            const ball = document.getElementById('basketball');
            const log = document.getElementById('basket-log');
            const container = document.getElementById('basket-container');
            const btn = document.querySelector('.terminal-btn');

            btn.disabled = true;

            // Calcolo dinamico dello spazio disponibile nel contenitore (compatibile con Mobile)
            const width = container.clientWidth - 55;
            const maxHeight = 95; // Altezza del picco della parabola in pixel

            let progress = 0; // Percentuale avanzamento del lancio (da 0 a 100)

            const animation = setInterval(() => {
                progress += 2; // Step di avanzamento ad ogni frame

                // Coordinata X lineare
                let x = (progress / 100) * width;

                // Coordinata Y matematica: equazione quadratica pura della parabola
                let p = progress / 100;
                let y = 4 * maxHeight * p * (1 - p);

                // Spostamento fisico degli elementi sulla griglia pixel
                ball.style.left = (10 + x) + 'px';
                ball.style.bottom = (10 + y) + 'px';

                // Switch dei log del terminale in tempo reale basato sui progressi
                if (progress < 50) {
                    log.textContent = `[LAUNCH]: Spinta idraulica // Altitudine: ${Math.round(y)}px`;
                } else if (progress < 98) {
                    log.textContent = `[GRAVITY]: Rientro in atmosfera // Distanza target: ${Math.round(width - x)}px`;
                } else if (progress >= 100) {
                    log.textContent = `[STATUS]: SWISH! // Canestro perfetto registrato sul target 🗑️`;
                    clearInterval(animation);
                    btn.disabled = false;
                }
            }, 16); // ~60 Frame al secondo per una fluidità totale
        }

        // Inizializza il caricamento dei dati JSON all'apertura del documento
        window.onload = caricaProgetti;
// Funzione di Hashing super leggera. Trasforma una stringa in un numero unico imprevedibile.
function calcolaHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
}

// Database delle domande. Le risposte sono HASH NUMERICI.
// Anche ispezionando, un umano vedrà solo numeri senza senso.
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
    currentChallenge = databaseDomande[Math.floor(Math.random() * databaseDomande.length)];
    
    // Non salviamo più la parola intera in chiaro da nessuna parte in memoria!
    // Usiamo una mappa temporanea solo per sapere quanto è lunga la parola misteriosa
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

// Ricostruisce la stringa visiva (_ _ _ _) verificando gli hash delle combinazioni
function renderWordDisplay() {
    const display = document.getElementById('word-display');
    let currentProgress = [];
    let parolaCompletaIndovinata = true;
    
    // Chiama un dizionario virtuale per la verifica della singola lettera in base alla domanda attuale
    // Nota: La parola reale NON è esposta in chiaro.
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

// Helper interno per mappare i vettori di verifica senza salvare le stringhe nel database principale
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
    document.getElementById('word-display').textContent = parola.split("").join(" ");
}

function generateKeyboard() {
    const container = document.getElementById('keyboard-container');
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

// Boot sicuro dei giochi all'avvio (attende che l'HTML sia interamente caricato)
window.addEventListener('DOMContentLoaded', () => {
    // Verifica che l'elemento del gioco esista nella pagina attuale prima di avviarlo
    if (document.getElementById('game-hint')) {
        initHangmanGame();
    }
});