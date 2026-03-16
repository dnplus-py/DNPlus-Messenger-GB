/* DNPlus Messenger - Estilo Blanco y Verde Profesional */
:root {
    --whatsapp-bg: #e5ddd5; /* Fondo clásico de chat claro */
    --msg-mine: #176f47;    /* Tu verde favorito ✅ */
    --msg-theirs: #ffffff;  /* Burbujas blancas para otros */
    --text-color-mine: #ffffff; 
    --text-color-theirs: #111b21;
    --header-color: #176f47; /* Cabecera verde sólida */
    --accent-color: #176f47;
    --input-bg: #f0f2f5;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}

/* --- CABECERA --- */
header {
    height: 62px;
    background-color: var(--header-color) !important;
    color: white !important;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#action-header-menu {
    display: none; 
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 62px;
    background-color: #ffffff !important; /* Blanco al seleccionar mensajes */
    color: #54656f !important;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
    padding: 0 20px;
    z-index: 6000;
}

/* --- CONTENEDOR DE CHAT --- */
#chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* Fondo con patrón sutil de WhatsApp */
    background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
    background-color: var(--whatsapp-bg);
    background-blend-mode: overlay;
    background-opacity: 0.06;
}

/* --- BURBUJAS DE MENSAJE --- */
.bubble {
    max-width: 85%;
    padding: 6px 10px;
    border-radius: 8px;
    position: relative;
    font-size: 0.95rem;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    word-wrap: break-word;
}

/* Mis mensajes (Verde) */
.bubble-mine { 
    align-self: flex-end; 
    background-color: #dcf8c6; /* Verde clarito estilo WA para mejor lectura */
    background-color: var(--msg-mine); 
    color: white; 
    border-top-right-radius: 0px; 
}

/* Sus mensajes (Blanco) */
.bubble-theirs { 
    align-self: flex-start; 
    background-color: var(--msg-theirs); 
    color: var(--text-color-theirs); 
    border-top-left-radius: 0px; 
}

/* Colitas de las burbujas */
.bubble-mine::after {
    content: "";
    position: absolute;
    top: 0;
    right: -8px;
    width: 0;
    height: 0;
    border-left: 10px solid var(--msg-mine);
    border-bottom: 10px solid transparent;
}

.bubble-theirs::after {
    content: "";
    position: absolute;
    top: 0;
    left: -8px;
    width: 0;
    height: 0;
    border-right: 10px solid var(--msg-theirs);
    border-bottom: 10px solid transparent;
}

.msg-time {
    font-size: 11px;
    opacity: 0.6;
    text-align: right;
    margin-top: 2px;
    display: block;
}

/* --- ENTRADA DE TEXTO (BARRA INFERIOR) --- */
.input-area {
    background-color: #f0f2f5;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.input-card {
    background: #ffffff;
    border-radius: 24px;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 45px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
}

#chat-input {
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
    color: #111b21;
    font-size: 15px;
}

.action-btn {
    background: var(--msg-mine);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* --- PANEL DE EMOJIS (MODO CLARO) --- */
#emoji-panel {
    display: none;
    background-color: #ffffff;
    width: 100%;
    height: 250px;
    padding: 10px;
    overflow-y: auto;
    grid-template-columns: repeat(8, 1fr);
    gap: 4px;
    border-top: 1px solid #e1e4e8;
}

.emoji-category-title {
    grid-column: span 8;
    color: var(--msg-mine);
    font-size: 12px;
    font-weight: bold;
    padding: 8px 5px;
    background: #ffffff;
    position: sticky;
    top: 0;
}

/* --- RECUADRO DE AUDIO --- */
.audio-wrapper {
    width: 260px !important;
    background: transparent;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 4px !important;
}

.audio-user-photo {
    width: 45px !important;
    height: 45px !important;
    border-radius: 50% !important;
    object-fit: cover !important;
    border: 1px solid #e1e4e8 !important;
}

/* --- OVERLAY GRABACIÓN --- */
#rec-overlay {
    background-color: #f0f2f5;
    color: #d93025;
}

/* --- MENÚS DE MENSAJE (MODO CLARO) --- */
.msg-menu {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border: 1px solid #e1e4e8;
}

.menu-item {
    color: #111b21;
}

.menu-item:hover {
    background-color: #f5f6f6;
}

/* MULTIMEDIA */
.img-frame {
    width: 240px !important;   
    height: 240px !important;  
    border-radius: 4px;
    overflow: hidden;
}
