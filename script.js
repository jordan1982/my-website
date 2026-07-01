// ==========================================
// GLOBALS, RECORD E STATO GIOCO
// ==========================================
let userScore = 0;
let nodiCompletati = []; // Tiene traccia degli ID dei nodi già violati con successo

function modificaPunteggio(valore) {
    userScore += valore;
    if (userScore < 0) userScore = 0; 
    const scoreEl = document.getElementById('user-score');
    if (scoreEl) {
        scoreEl.textContent = userScore;
        scoreEl.style.color = valore > 0 ? "#33ff33" : "#ff3333";
        setTimeout(() => { scoreEl.style.color = "#ffb300"; }, 300);
    }

    // TRIGGER DI FINE GIOCO: Se superi i 1000 punti
    if (userScore >= 1000 && !document.getElementById('terminal-hacked-screen')) {
        mostraSchermataHacked();
    }
}

// ==========================================
// 1. DATABASE PROGETTI (FORMATO OGGETTO JSON)
// ==========================================
const progettiJSON = [
    {
        "titolo": "FantaReminder_Bot",
        "descrizione": "Un assistente automatizzato su Telegram dedicato ai fantallenatori: analizza i calendari di Serie A e invia notifiche push mirate prima dell'inizio di ogni turno di campionato per non dimenticare mai la formazione.",
        "link_github": "https://t.me/fantareminder",
        "tag": "Telegram Bot"
    },
    {
        "titolo": "Temperaturino_Sensor",
        "descrizione": "Firmware IoT sviluppato per schedine Wemos D1 Mini e sensore BME680. Gestisce il monitoraggio in tempo reale di temperatura e qualità dell'aria, l'autenticazione tramite un Access Point di configurazione dedicato (WiFiManager) e l'invio dei dati via MQTT. Include la predisposizione per case stampabile in 3D.",
        "link_github": "https://github.com/jordan1982/temperaturino",
        "tag": "C++ / Arduino"
    }
];

function caricaProgetti() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = ''; 

    progettiJSON.forEach(progetto => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // CONTROLLO DINAMICO: Se il tag è "Telegram Bot" cambia il testo del link
        const testoLink = progetto.tag === "Telegram Bot" ? "[Visita Canale]" : "[Vedi Codice]";

        card.innerHTML = `
            <h3>${progetto.titolo} [${progetto.tag}]</h3>
            <p>${progetto.descrizione}</p>
            <p><a href="${progetto.link_github}" target="_blank">${testoLink}</a></p>
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
            // CORREZIONE: Rimossa la modifica al punteggio globale
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
    const btn = document.getElementById('basket-btn') || document.querySelector('#basket-container-wrapper .terminal-btn') || document.querySelector('.terminal-btn');

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
            // CORREZIONE: Rimossa la modifica al punteggio globale
            if (btn) btn.disabled = false;
        }
    }, 16); 
}

// ==========================================
// 4. MINI-GIOCO: TRIVIA SSH (DATABASE COMPLETO)
// ==========================================

const databaseDomande = [
    { id: "NODE_01", difficolta: 1, Q: "QUERY [DIFF: 1]: Come si chiama l'interfaccia di programmazione utilizzata dai servizi web per scambiare dati (spesso JSON)?" },
    { id: "NODE_02", difficolta: 1, Q: "QUERY [DIFF: 1]: Quale linguaggio a marcatori definisce lo scheletro strutturale fondamentale di una pagina web?" },
    { id: "NODE_03", difficolta: 2, Q: "QUERY [DIFF: 2]: Quale linguaggio di programmazione, famoso per la sua JVM, usi come linguaggio principale?" },
    { id: "NODE_04", difficolta: 2, Q: "QUERY [DIFF: 2]: Quale sport consideri un vero e proprio 'algoritmo in tempo reale' fatto di spaziature sul parquet?" },
    { id: "NODE_05", difficolta: 3, Q: "QUERY [DIFF: 3]: Quale software storico, antenato dei moderni IDE e basato su Pascal, hai usato nei tuoi primi anni da dev?" },
    { id: "NODE_06", difficolta: 3, Q: "QUERY [DIFF: 3]: Quale comando Git usi per salvare localmente le modifiche nel tuo repository creando un punto di ripristino?" },
    { id: "NODE_07", difficolta: 4, Q: "QUERY [DIFF: 4]: Quale hub software open-source utilizzi per gestire e automatizzare la tua domotica di casa?" },
    { id: "NODE_08", difficolta: 4, Q: "QUERY [DIFF: 4]: Quale piattaforma utilizzi per isolare le tue applicazioni all'interno di container leggeri?" },
    { id: "NODE_09", difficolta: 5, Q: "QUERY [DIFF: 5]: Quale tool di automazione e configurazione software usa i playbook in formato YAML per orchestrare i server?" },
    { id: "NODE_10", difficolta: 5, Q: "QUERY [DIFF: 5]: Quale standard aperto basato su JSON viene comunemente usato per scambiare token di autenticazione cifrati in modo sicuro?" },
    { id: "NODE_11", difficolta: 1, Q: "QUERY [DIFF: 1]: Qual è il formato standard di formattazione del testo leggero usato per i file README su GitHub?" },
    { id: "NODE_12", difficolta: 1, Q: "QUERY [DIFF: 1]: Quale protocollo di rete usi per connetterti in modo cifrato e sicuro alla riga di comando di un server remoto?" },
    { id: "NODE_13", difficolta: 2, Q: "QUERY [DIFF: 2]: Quale linguaggio di scripting, nativo dei browser web, dà dinamismo alle pagine ed esegue questo stesso gioco?" },
    { id: "NODE_14", difficolta: 2, Q: "QUERY [DIFF: 2]: Quale database relazionale open-source famosissimo usa il linguaggio SQL ed è simboleggiato da un delfino?" },
    { id: "NODE_15", difficolta: 2, Q: "QUERY [DIFF: 2]: Quale comando Git usi per scaricare gli ultimi aggiornamenti dal repository remoto e unirli direttamente al tuo codice locale?" },
    { id: "NODE_16", difficolta: 3, Q: "QUERY [DIFF: 3]: Quale linguaggio di programmazione ad alto livello, amato per la sua leggibilità, usi per script di automazione e AI?" },
    { id: "NODE_17", difficolta: 3, Q: "QUERY [DIFF: 3]: Quale comando Linux usi nel terminale per cambiare i permessi di accesso di un file o di una cartella?" },
    { id: "NODE_18", difficolta: 3, Q: "QUERY [DIFF: 3]: Come si chiama il server web e reverse proxy open-source ad altissime prestazioni, famoso per la sua architettura asincrona?" },
    { id: "NODE_19", difficolta: 4, Q: "QUERY [DIFF: 4]: Quale database NoSQL orientato ai documenti memorizza i record in formato simile al JSON strutturato?" },
    { id: "NODE_20", difficolta: 4, Q: "QUERY [DIFF: 4]: Quale suite software usi spesso per orchestrare stack multi-container Docker tramite un singolo file YAML?" },
    { id: "NODE_21", difficolta: 4, Q: "QUERY [DIFF: 4]: Quale servizio cloud di Amazon (AWS) fornisce server virtuali elastici computazionali su richiesta?" },
    { id: "NODE_22", difficolta: 5, Q: "QUERY [DIFF: 5]: Quale orchestratore open-source di container, originariamente creato da Google, domina il mondo Cloud Native?" },
    { id: "NODE_23", difficolta: 5, Q: "QUERY [DIFF: 5]: Quale pattern architetturale prevede la separazione rigorosa tra le query di lettura e i comandi di scrittura dei dati?" },
    { id: "NODE_24", difficolta: 5, Q: "QUERY [DIFF: 5]: Quale storico microprocessore a 8-bit del 1976 ha fatto la storia dell'informatica muovendo computer come l'Apple II e il NES?" },
    { id: "NODE_25", difficolta: 3, Q: "QUERY [DIFF: 3]: Quale software DNS open-source adoperi nel tuo home server per bloccare pubblicità e tracciamenti a livello di intera rete?" }
];

const dizionarioCifrato = {
    "NODE_01": [65, 80, 73],                                                                           
    "NODE_02": [72, 84, 77, 76],                                                                      
    "NODE_03": [74, 65, 86, 65],                                                                      
    "NODE_04": [66, 65, 83, 75, 69, 84],                                                              
    "NODE_05": [68, 69, 76, 80, 72, 73],                                                              
    "NODE_06": [67, 79, 77, 77, 73, 84],                                                              
    "NODE_07": [72, 79, 77, 69, 65, 83, 83, 73, 83, 84, 65, 78, 84],                                  
    "NODE_08": [68, 79, 67, 75, 69, 82],                                                              
    "NODE_09": [65, 78, 83, 73, 66, 76, 69],                                                          
    "NODE_10": [74, 87, 84],                                                                          
    "NODE_11": [77, 65, 82, 75, 68, 79, 87, 78],                                                      
    "NODE_12": [83, 83, 72],                                                                          
    "NODE_13": [74, 65, 86, 65, 83, 67, 82, 73, 80, 84],                                              
    "NODE_14": [77, 89, 83, 81, 76],                                                                  
    "NODE_15": [80, 85, 76, 76],                                                                      
    "NODE_16": [80, 89, 84, 72, 79, 78],                                                              
    "NODE_17": [67, 72, 77, 79, 68],                                                                  
    "NODE_18": [78, 71, 73, 78, 88],                                                                  
    "NODE_19": [77, 79, 78, 71, 79, 68, 66],                                                          
    "NODE_20": [67, 79, 77, 80, 79, 83, 69],                                                          
    "NODE_21": [69, 67, 50],                                                                          
    "NODE_22": [75, 85, 66, 69, 82, 78, 69, 84, 69, 83],                                              
    "NODE_23": [67, 81, 82, 83],                                                                      
    "NODE_24": [54, 53, 48, 50],                                                                      
    "NODE_25": [80, 73, 72, 79, 76, 69]                                                               
};

let currentChallenge = {};
let guessedLetters = [];
let maxAttempts = 6;
let remainingAttempts = maxAttempts;

function initHangmanGame() {
    if (!document.getElementById('game-hint')) return;

    let nodiDisponibili = databaseDomande.filter(domanda => !nodiCompletati.includes(domanda.id));

    if (nodiDisponibili.length === 0) {
        nodiCompletati = [];
        nodiDisponibili = databaseDomande;
    }

    currentChallenge = nodiDisponibili[Math.floor(Math.random() * nodiDisponibili.length)];
    guessedLetters = [];
    remainingAttempts = maxAttempts;
    
    document.getElementById('game-hint').textContent = currentChallenge.Q;
    document.getElementById('attempts-left').textContent = remainingAttempts;
    document.getElementById('attempts-left').style.color = "#ffb300";
    document.getElementById('used-letters').textContent = "nessuna";
    document.getElementById('game-log').textContent = `[SECURE_MODE]: Connessione stabilita con il nodo ${currentChallenge.id}. Richiesta firma...`;
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
    const sequenzaCaratteri = dizionarioCifrato[currentChallenge.id];
    
    for (let i = 0; i < sequenzaCaratteri.length; i++) {
        let letteraCorretta = String.fromCharCode(sequenzaCaratteri[i]);
        if (guessedLetters.includes(letteraCorretta)) {
            currentProgress.push(letteraCorretta);
        } else {
            currentProgress.push("_");
            parolaCompletaIndovinata = false;
        }
    }
    
    display.textContent = currentProgress.join(" ");
    
    if (parolaCompletaIndovinata) {
        document.getElementById('game-log').textContent = "[ACCESS_GRANTED]: Payload crittografico decifrato. Sessione SSH aperta.";
        document.getElementById('game-log').style.color = "#33ff33";
        
        if (!nodiCompletati.includes(currentChallenge.id)) {
            nodiCompletati.push(currentChallenge.id);
        }

        disableAllKeyButtons();
        document.getElementById('reset-game-btn').style.display = "inline-block";
        
        const premiPunti = currentChallenge.difficolta * 50;
        modificaPunteggio(premiPunti); 
    }
}

function handleLetterGuess(letter, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.style.background = "#225522";
    buttonElement.style.color = "#0a0f0d";
    
    guessedLetters.push(letter);
    document.getElementById('used-letters').textContent = guessedLetters.join(", ");
    
    const sequenzaCaratteri = dizionarioCifrato[currentChallenge.id];
    let azzeccata = false;

    for (let i = 0; i < sequenzaCaratteri.length; i++) {
        if (String.fromCharCode(sequenzaCaratteri[i]) === letter) {
            azzaccata = true;
            break;
        }
    }
    
    if (azzeccata) {
        document.getElementById('game-log').textContent = `[SUCCESS]: Match trovato sul blocco posizionale.`;
        renderWordDisplay();
    } else {
        remainingAttempts--;
        document.getElementById('attempts-left').textContent = remainingAttempts;
        document.getElementById('game-log').textContent = `[WARN]: Bit non corrispondente. Integrità compromessa.`;
        
        const malusPunti = currentChallenge.difficolta * 10;
        modificaPunteggio(-malusPunti); 
        
        if (remainingAttempts <= 2) document.getElementById('attempts-left').style.color = "#ff3333";
        
        if (remainingAttempts <= 0) {
            document.getElementById('game-log').textContent = `[ACCESS_DENIED]: Brute-force interrotto. Sessione chiusa per motivi di sicurezza.`;
            document.getElementById('game-log').style.color = "#ff3333";
            disableAllKeyButtons();
            document.getElementById('reset-game-btn').style.display = "inline-block";
        }
    }
}

// ==========================================
// 5. SCHERMATA FINALE VITTORIA: BLACKOUT TOTALE DEL SITO
// ==========================================
function mostraSchermataHacked() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#020403";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    document.body.innerHTML = `
<div id="terminal-hacked-screen" style="font-family: monospace; text-align: center; color: #ff3333; width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; background: #020403; position: fixed; top: 0; left: 0; z-index: 999999;">
<pre style="font-size: 14px; line-height: 1.2; display: inline-block; text-align: left; color: #ff3333; margin-bottom: 25px;">
          ______
       .-"      "-.
      /            \\
     |              |
     |,  .-.  .-.  ,|
     | )(__/  \\__)( |
     |/     /\\     \\|
     (_      ^^      _)
      \\__|IIIIII|__/
       | \\IIIIII/ |
       \\          /
        \`--------\`
</pre>
    <h1 style="letter-spacing: 5px; margin: 15px 0; font-size: 32px; text-shadow: 0 0 12px #ff3333;">[SYSTEM HACKED]</h1>
    <p style="color: #33ff33; font-size: 18px; font-weight: bold; margin: 5px 0;">ROOT ACCESS GRANTED // FULL PORTFOLIO TAKEOVER</p>
    <p style="font-size: 13px; color: #666; max-width: 500px; margin: 12px auto; line-height: 1.5;">Tutti i moduli, i database JSON e i servizi del server sono stati permanentemente congelati e sottoposti a override crittografico.</p>
    <button class="terminal-btn" onclick="window.location.reload()" style="margin-top: 30px; border: 2px solid #ff3333; color: #ff3333; background: transparent; padding: 10px 25px; font-family: monospace; cursor: pointer; font-size: 14px; letter-spacing: 1px; font-weight: bold; transition: background 0.2s;">REBOOT SYSTEM</button>
</div>
    `.trim();
}

function generateKeyboard() {
    const container = document.getElementById('keyboard-container');
    if (!container) return;
    container.innerHTML = "";
    
    const tasti = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    
    tasti.forEach(letter => {
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

// ==========================================
// NUOVO MINI-GIOCO: RIGORE DEL FANTACALCIO
// ==========================================
function tiraRigore(direzioneUtente) {
    const log = document.getElementById('striker-log');
    const bottoni = document.querySelectorAll('#striker-controls .terminal-btn');
    if (!log) return;

    bottoni.forEach(btn => btn.disabled = true);
    log.textContent = `[LAUNCH]: Il pallone è partito verso: ${direzioneUtente.toUpperCase()}...`;
    log.style.color = "#ffb300";

    setTimeout(() => {
        const direzioniPortiere = ['sinistra', 'centro', 'destra'];
        const direzionePortiere = direzioniPortiere[Math.floor(Math.random() * direzioniPortiere.length)];

        if (direzioneUtente === direzionePortiere) {
            log.textContent = `[PARATA]: Il portiere si è tuffato a ${direzionePortiere} e ha intercettato il tiro!`;
            log.style.color = "#ff3333";
            // CORREZIONE: Rimossa la penalità al punteggio globale
        } else {
            log.textContent = `[GOAL!!]: Piazzata magistralmente a ${direzioneUtente}! Il portiere si è tuffato a ${direzionePortiere}. (+3 Punti Bonus in classifica!)`;
            log.style.color = "#33ff33";
            // CORREZIONE: Rimossa la ricompensa al punteggio globale
        }

        setTimeout(() => {
            bottoni.forEach(btn => btn.disabled = false);
            log.textContent = `[STATUS]: Palla riposizionata sul dischetto. Pronto per un nuovo tiro.`;
            log.style.color = "#33ff33";
        }, 1500);

    }, 1000);
}
