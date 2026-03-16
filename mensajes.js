// mensajes.js - Versión DNPlus Blanco y Verde (PACK COMPLETO EMOJIS)
console.log("✅ DNPlus Messenger: Sistema Activado (Modo Claro + Full Emojis)");

const firebaseConfig = {
    apiKey: "AIzaSyD2nZF5QC-Zti80xP1A518qbUPnhRru_9A",
    databaseURL: "https://dnplus-messenger-pro-default-rtdb.firebaseio.com"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const miId = localStorage.getItem("user_phone") || "595992536184";
const idOtro = localStorage.getItem("chat_destinatario_id");
const salaId = localStorage.getItem("chat_sala_id");
const input = document.getElementById('chat-input');
const actionIcon = document.getElementById('action-icon');
const chatContainer = document.getElementById('chat-container');

let msgSeleccionado = null;
let mediaRecorder, audioChunks = [], isRecording = false;
let currentZoom = 1;

window.onload = () => {
    if(!idOtro || !salaId) return;

    db.ref("usuarios_registrados/" + idOtro).on("value", s => {
        const d = s.val();
        if(d) {
            document.getElementById('header-name').innerText = d.nombre || idOtro;
            document.getElementById('header-photo').src = d.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
    });

    db.ref("chats_privados/" + salaId).on("child_added", s => {
        dibujarBurbuja(s.val(), s.key);
    });

    db.ref("chats_privados/" + salaId).on("child_removed", s => {
        const el = document.getElementById(s.key);
        if(el) el.remove();
    });

    const bgSaved = localStorage.getItem("chat_bg_" + salaId);
    if(bgSaved) {
        chatContainer.style.backgroundImage = `url('${bgSaved}')`;
        chatContainer.style.backgroundSize = "cover";
    }

    cargarEmojis();
};

function dibujarBurbuja(data, key) {
    const esMio = data.emisor === miId;
    const b = document.createElement('div');
    b.id = key;
    b.className = `bubble ${esMio ? 'bubble-mine' : 'bubble-theirs'}`;
    
    b.oncontextmenu = (e) => { 
        e.preventDefault(); 
        showMsgMenu(key); 
    };

    if (data.tipo === 'audio') {
        b.innerHTML = `
        <div class="audio-wrapper">
            <div class="audio-photo-container">
                 <img src="${data.fotoEmisor || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" class="audio-user-photo">
            </div>
            <i class="fas fa-play cursor-pointer" onclick="reproducirAudio('${data.url}', this)" style="color: ${esMio ? '#fff' : '#176f47'}"></i>
            <div class="audio-info-container">
                <div class="h-[3px] bg-black/10 w-full rounded-full overflow-hidden">
                    <div class="h-full w-0" style="background-color: ${esMio ? '#fff' : '#176f47'}"></div>
                </div>
                <div class="audio-time-text" style="color: ${esMio ? 'rgba(255,255,255,0.8)' : '#667781'}">
                    ${data.duracion || '0:05'}
                </div>
            </div>
        </div>
        <span class="msg-time">${data.hora}</span>`;
    } 
    else if (data.tipo === 'imagen') {
        b.innerHTML = `<div class="img-frame" onclick="verImagen('${data.url}')"><img src="${data.url}" class="w-full h-full object-cover"></div><span class="msg-time">${data.hora}</span>`;
    } 
    else {
        b.innerHTML = `<div class="text-content">${data.mensaje}</div><span class="msg-time">${data.hora}</span>`;
    }

    chatContainer.appendChild(b);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// --- AUDIO ---
let audioActual = null, iconoActual = null;
function reproducirAudio(url, icono) {
    if (audioActual && !audioActual.paused) {
        audioActual.pause();
        iconoActual.className = "fas fa-play";
        if (audioActual.src === url) return;
    }
    audioActual = new Audio(url);
    iconoActual = icono;
    icono.className = "fas fa-pause";
    audioActual.play();
    audioActual.onended = () => icono.className = "fas fa-play";
}

async function startRec() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        isRecording = true;
        document.getElementById('rec-overlay').style.display = 'flex';
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.start();
    } catch (err) { console.error(err); }
}

function stopRec() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        document.getElementById('rec-overlay').style.display = 'none';
        mediaRecorder.onstop = () => {
            const reader = new FileReader();
            reader.readAsDataURL(new Blob(audioChunks, { type: 'audio/mp3' }));
            reader.onloadend = () => sendData({ tipo: 'audio', url: reader.result, duracion: "Voz" });
        };
    }
}

// --- MENÚ DE ACCIONES ---
function showMsgMenu(key) {
    msgSeleccionado = key;
    document.querySelectorAll('.bubble').forEach(el => el.style.backgroundColor = "");
    const el = document.getElementById(key);
    if(el) el.style.backgroundColor = "rgba(0,0,0,0.05)";
    document.getElementById('action-header-menu').style.display = 'flex';
}

function cerrarMenuAcciones() {
    if (msgSeleccionado) {
        const el = document.getElementById(msgSeleccionado);
        if (el) el.style.backgroundColor = "";
    }
    document.getElementById('action-header-menu').style.display = 'none';
    msgSeleccionado = null;
}

function borrarMensaje() {
    if (msgSeleccionado) {
        db.ref("chats_privados/" + salaId + "/" + msgSeleccionado).remove();
        cerrarMenuAcciones();
    }
}

// --- CARGA DE EMOJIS (PACK COMPLETO RE-INTEGRADO) ---
function toggleEmojis() {
    const p = document.getElementById('emoji-panel');
    p.style.display = p.style.display === 'grid' ? 'none' : 'grid';
}

function cargarEmojis() {
    const panel = document.getElementById('emoji-panel');
    if (!panel || !input) return; 

    const pack = {
        "Caritas y Personas": ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],
        "Gestos y Cuerpo": ["👋","🤚","🖐️","✋","🖖","👌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦿","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄"],
        "Corazones y Amor": ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","💌","🤵","💏","👩‍❤️‍💋‍👨","👨‍❤️‍💋‍👨","👩‍❤️‍💋‍👩","💑"],
        "Animales y Naturaleza": ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🦍","🦧","🐕","🦮","🐕‍🦺","🐩","🐺","🦝","🐈","🐅","🐆","🐴","🐎","🦄","🦓","🦌","🐂","🐃","🐄","🐖","🐗","🐏","🐑","🐐","🐪","🐫","🦙","🦒","🐘","🦏","🦛","🐁","🐀","🐿️","🦔","🦇","🦥","🦦","🦨","🦘","🦡","🐾","🦃","🐔","🐓","🐣","🐤","🐥","🐦","🐧","🕊️","🦅","🦆","🦢","🦉","🦩","🦚","🦜","🐊","🐢","🦎","🐍","🐲","🐉","🦕","🦖","🐳","🐋","🐬","🐟","🐠","🐡","🦈","🐙","🐚","🐌","🦋","🐛","🐜","🐝","🐞","🦗","🕷️","🕸️","🦂","🦟","🦠","💐","🌸","💮","🏵️","🌹","🥀","🌺","🌻","🌼","🌷","🌱","🌲","🌳","🌴","🌵","🌾","🌿","☘️","🍀","🍁","🍂","🍃"],
        "Comida y Bebida": ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🌽","🥕","🧄","🧅","🥔","🍠","🥐","🍞","🥖","🥨","🥯","🥞","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🍳","🍲","🥣","🥗","🍿","🧈","🧂","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍢","🍣","🍤","🍥","🥮","🍡","🥟","🥠","🥡","🍦","🍧","🍨","🍩","🍪","🎂","🍰","🧁","🥧","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🍵","🧉","🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🥤","🧃"],
        "Actividades y Viajes": ["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🎱","🏓","🏸","🥅","🏒","🏑","🏏","⛳","🏹","🎣","🤿","🥊","🥋","⛸️","🎿","🛷","🎯","🪀","🪁","🎮","🕹️","🎰","🎲","🧩","🧸","♠️","♥️","♦️","♣️","♟️","🃏","🀄","🎴","🎭","🖼️","🎨","🧵","🧶","🌍","🌎","🌏","🌐","🗺️","🗾","🧭","🏔️","🌋","🗻","🏕️","🏖️","🏜️","🏝️","🏞️","🏟️","🏛️","🏗️","🧱","🏘️","🏙️","🏚️","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏬","🏭","🏯","🏰","💒","🗼","🗽","⛪","🕌","🛕","🕍","⛩️","🕋","⛲","⛺","🌁","🌃","🏙️","🌄","🌅","🌆","🌇","🌉","♨️","🎠","🎡","🎢","💈","🎪","🚂","🚃","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚝","🚞","🚋","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚕","🚖","🚗","🚘","🚙","🚚","🚛","🚜","🏎️","🏍️","🛵","🚲","🦽","🦼","🛴","🛹","🚏","🛣️","🛤️","⛽","🚨","🚥","🚦","🛑","🚧","⚓","⛵","🛶","🚤","🛳️","⛴️","🛥️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸"],
        "Objetos": ["⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️","💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴","💶","💷","💰","💳","💎","⚖️","🧰","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","🧱","⛓️","🧲","🔫","💣","🧨","🪓","🔪","🗡️","⚔️","🛡️","🚬","⚰️","⚱️","🏺","🔮","📿","🧿","💈","⚗️","🔭","🔬","🕳️","🩹","🩺","💊","💉","🩸","🧬","🌡️","🧹","🧺","🧻","🚽","🚰","🚿","🛁","🛀","🧼","🪒","🧽","🧴","🛎️","🔑","🗝️","🚪","🪑","🛋️","🛏️","🛌","🖼️","🛍️","🛒","🎁","🎈","🎏","🎀","🎊","🎉","🎎","🏮","🎐","🧧","✉️","📩","📧","📨","📤","📥","📦","📫","📪","📅","🗑️","📋","📁","📂","🗂️","📓","📕","📖","🔗","📎","📍","✂️","🖊️","🖋️","🖍️","📝","💼"],
        "Banderas": ["🇵🇾","🇦🇷","🇧🇷","🇺🇾","🇨🇱","🇧🇴","🇨🇴","🇲🇽","🇪🇸","🇺🇸","🇻🇪","🇵🇪","🇪🇨","🇵🇷","🇨🇺","🇩🇴","🇬🇹","🇭🇳","🇸🇻","🇳🇮","🇨🇷","🇵🇦"]
    };

    panel.innerHTML = "";
    for (const [cat, lista] of Object.entries(pack)) {
        const t = document.createElement('div');
        t.className = "emoji-category-title"; 
        t.innerText = cat;
        panel.appendChild(t);
        lista.forEach(e => {
            const s = document.createElement('span');
            s.className = "emoji-item"; 
            s.innerText = e;
            s.onclick = () => { 
                input.value += e; 
                input.dispatchEvent(new Event('input')); 
            };
            panel.appendChild(s);
        });
    }
}

// --- ENVÍO ---
function sendData(p) {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    db.ref("chats_privados/" + salaId).push({ ...p, emisor: miId, hora: hora });
}

input.oninput = () => actionIcon.className = input.value.trim() ? "fas fa-paper-plane" : "fas fa-microphone";

const btn = document.getElementById('action-btn');
btn.onclick = () => {
    if(input.value.trim()) {
        sendData({ tipo: 'texto', mensaje: input.value });
        input.value = ""; input.dispatchEvent(new Event('input'));
    }
};

btn.onmousedown = btn.ontouchstart = (e) => { if(!input.value.trim()) startRec(); };
btn.onmouseup = btn.ontouchend = () => { if(isRecording) stopRec(); };

document.addEventListener('click', (e) => {
    if(!e.target.closest('.input-area') && !e.target.closest('#emoji-panel')) document.getElementById('emoji-panel').style.display = 'none';
    if(!e.target.closest('.bubble') && !e.target.closest('#action-header-menu')) cerrarMenuAcciones();
});
