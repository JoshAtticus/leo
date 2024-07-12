let language = 'en';
let loadedLang = {};

function lang() {
    return loadedLang;
}

// thanks ChatGPT :)
// - Tnix
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      const arrCopy = [];
      for (let i = 0; i < obj.length; i++) {
        arrCopy[i] = deepCopy(obj[i]);
      }
      return arrCopy;
    }
  
    const objCopy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = deepCopy(obj[key]);
      }
    }
    return objCopy;
}
function deepMerge(target, source) {
    if (typeof target !== 'object' || target === null) {
      return source;
    }
    
    if (typeof source !== 'object' || source === null) {
      return target;
    }
  
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          if (!target[key] || typeof target[key] !== 'object') {
            target[key] = Array.isArray(source[key]) ? [] : {};
          }
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  
    return target;
}

function setlang(lang) {
    localStorage.setItem("language", lang);
    language = lang;
    if (lang === "en") {
        loadedLang = en;
    } else {
        loadedLang = deepMerge(deepCopy(en), deepCopy(eval(lang)));
    }
}

function currentlang() {
    return localStorage.getItem("language");
}

const en = {
    "reh": "English, US",
    "language": "English, US",
    "page_home": "Home",
    "page_start": "Start",
    "page_explore": "Explore",
    "page_inbox": "Inbox",
    "page_settings": "Settings",
    "meo_username": "Username",
    "meo_password": "Password",
    "meo_messagebox": "What's on your mind?",
    "meo_goanywhere": "Where would you like to go?",
    "meo_welcome": "Welcome!",
    "meo_bridged": {
        "start": "Bridged",
        "title": "This post has been bridged from another platform."
    },
    "title_chats": "Chats",
    "title_live": "Livechat",
    "settings_general": "General",
    "settings_appearance": "Appearance",
    "settings_plugins": "Plugins",
    "settings_languages": "Languages",
    "general_sub": {
        "chat": "Chat",
        "accessibility": "Accessibility",
        "misc": "Miscellaneous",
        "acc": "Account",
        "blockedusers": "Blocks",
        "blockedwords": "Blacklisted Words",
        "about": "About",
        "credits": "Credits",
        "contrib": "Contribute",
        "privacy": "Privacy & Safety",
    },
    "general_list": {
        "title": {
            "homepage": "Auto-navigate to Home",
            "consolewarnings": "Disable console warning",
            "forceupdates": "Enable forced updates",
            "blockedmessages": "Hide blocked user messages",
            "invtyping": "Invisible typing",
            "imagewhitelist": "Allow images from any source",
            "censorwords": "Censor blacklisted words",
            "embeds": "Special embeds",
            "reducemotion": "Reduce motion",
            "showpostbuttons": "Always show post buttons",
            "underlinelinks": "Always underline links",
            "magnify": "Magnify text",
            "entersend": "Don't send on Enter",
            "hideimages": "Hide images",
            "notifications": "Allow Notifications",
            "widemode": "New Desktop Experience",
            "discord": "Discord Post Layout",
        },
        "desc": {
            "homepage": "Instead of showing you the Start Page you get directly taken to home",
            "consolewarnings": "Hides warning message from console",
            "forceupdates": "Shows a force update button allowing you to force an update even if you're already up to date or using a beta build. Reload settings to see changes.",
            "blockedmessages": "Show a warning or hide messages completely",
            "invtyping": "Other users won't see you typing",
            "imagewhitelist": "This allows any site to see your IP, use responsibly",
            "censorwords": "Censors words instead of treating them like a blocked message",
            "embeds": "Embeds Tenor GIFS, Youtube Videos, ect. (Uses 3rd party cookies)",
            "reducemotion": "Reduce the intensity of animations and other moving effects",
            "showpostbuttons": "Post buttons always remain visible",
            "underlinelinks": "Make links to websites and other pages stand out more by underlining them",
            "magnify": "Enlargens and bolds text to be easier to read with poor eyesight (Requires refresh)",
            "entersend": "Enter key creates newlines instead of sending the post",
            "hideimages": "Blurs images before opening them",
            "notifications": "This will ask for notification permissions (Experimental)",
            "widemode": "Enables new desktop experience (Experiemental, Requires refresh)",
            "discord": "Reverses the post order to be more like Discord (Experiemental, Requires refresh)",
        }
    },
    "appearance_sub": {
        "theme": "Theme",
        "spthemes": "Special Themes",
        "acthemes": "Accessible Themes",
        "ogthemes": "Original Themes",
        "glthemes": "Glass Themes",
        "cstheme": "Custom Theme",
        "cscss": "Custom CSS",
    },
    "plugins_sub": {
        "manage": "Manage",
        "desc": "The plugins repo can be found ",
        "link": "here!"
    },
    "languages_sub": {
        "title": "Select a Language",
        "desc": "Don't see your language here? Help translate on",
        "link": "Github!"
    },
    "inbox_sub": {
        "desc": "Notifications are displayed here.",
    },
    "explore_sub": {
        "trendingunavailable": "Sorry, Trending (Beta) is only available in English for now.",
    },
    "live_sub": {
        "desc": "Messages won't be saved here."
    },
    "login_sub": {
        "title": "Login",
        "desc": "meo by eri, leo by josh",
        "oldpass": "Old Password",
        "newpass": "New Password",
        "agreement": "Terms of Use & Privacy Policy",
    },
    "leave_sub": {
        "desc": "Are you sure you want to leave",
        "end": "?",
    },
    "action": {
        "logout": "Log Out",
        "login": "Log In",
        "signup": "Register",
        "search": "Search",
        "mod": "Moderate",
        "creategc": "Create Chat",
        "leavegc": "Leave Chat?",
        "dmme": "DM Me :)",
        "invite": "Invite People",
        "gohome": "Go Home",
        "cleartokens": "Clear Tokens",
        "changepw": "Change Password",
        "clearls": "Clear Localstorage",
        "deleteacc": "Delete Account",
        "block": "Block",
        "blockuser": "Block User",
        "blockword": "Blacklist Word",
        "run": "Run",
        "close": "Close",
        "back": "Back",
        "opennewtab": "Open in Browser",
        "reply": "Reply",
        "mention": "Mention",
        "report": "Report",
        "delete": "Delete",
        "edit": "Edit",
        "share": "Share",
        "comment": "Comment",
        "nick": "Nickname",
        "create": "Create",
        "reason": "Reason",
        "sendreport": "Send Report",
        "yes": "Yes",
        "confirm": "Confirm",
        "update": "Update",
        "go": "Go",
        "apply": "Apply",
        "savetheme": "Save Theme",
        "loadtheme": "Load Theme",
        "resetplugins": "Disable All",
        "favorite": "Favorite",
        "download": "Download",
        "add": "Add",
        "adduser": "Add Member", // update
        "transfer": "Transfer Ownership", // update
        "bug": "Report Bug", // update
        "datarequest": "Request Data", // update
        "discuss": "Discuss", // update
    },
    "info": {
        "accexists": "Username Already Taken!",
        "invaliduser": "Invalid Username!",
        "invalidpass": "Invalid Password!",
        "invalidcreds": "Invalid username or password!",
        "accbanned": "Account Banned!",
        "accdeleted": "Account Deleted!",
        "conflict": "You probably logged in on another client. Refresh the page and log back in to continue.",
        "unknown": "Unknown Login Status:",
        "chatremoved": "You have been removed from the chat you were in.",
        "passupdate": "Your password has been updated!",
        "editingpost": "Editing Post:",
        "reportsent": "Report Sent!",
        "blockedip": "Blocked IP",
        "searchany": "Search for anything!",
        "cleartokens": "This will log you out everywhere.",
        "clearls": "This will log you out.",
        "signup": "By signing up you agree to the Meower TOS",
        "tokenscleared": "Tokens deleted, you will need to log back in",
        "accscheduled": "Account scheduled for deletion",
        "deletewarn": "It will be deleted FOREVER (a very long time!)",
        "changepwwarn": "It will be updated immediately.",
        "tryagain": "Try again",
        "cleared": "Cleared!",
        "plugin": "Restart now to apply new plugins and their settings",
    },
    "reports": {
        "spam": "Spam",
        "harassment": "Harassment or abuse towards others",
        "language": "Rude, vulgar or offensive language",
        "nsfw": "NSFW (sexual, alcohol, violence, gore, etc.)",
        "scam": "Scams, hacks, phishing or other malicious content",
        "harm": "Threatening violence or real world harm",
        "illegal": "Illegal activity",
        "suicide": "Self-harm/suicide",
        "age": "This person is too young to use Meower",
        "other": "Other",
    },
    "modals": {
        "report": "Report Post",
        "blockword": "Blacklist a Word",
        "blockauser": "Block a User (case sensitive)",
        "blockuser": "Block",
        "unblockuser": "Unblock",
        "bgimage": "Background Image Link",
        "blockedip": "IP Blocked",
        "cleartokens": "Clear Tokens?",
        "changepass": "Change Password",
        "clearls": "Clear Localstorage?",
        "deleteacc": "Delete Account?",
        "share": "Share",
        "plugin": "Refresh Required!",
        "shortcuts": "Shortcuts",
        "uploadimage": "Upload an image",
    },
    "profile": {
        "quote": "Quote",
        "persona": "Personalization",
        "profilecolor": "Profile Color",
        "profilepic": "Profile Picture",
    },
    "chats": { // update
        "owner": "Ownership",
        "members": "Members"
    }
}

const enuk = {
    "language": "English, UK",
    "page_home": "Home",
    "page_start": "Start",
    "page_explore": "Explore",
    "page_inbox": "Inbox",
    "page_settings": "Settings",
    "meo_username": "Username",
    "meo_password": "Password",
    "meo_messagebox": "What's on your mind?",
    "meo_goanywhere": "Where would you like to go?",
    "meo_welcome": "Welcome!",
    "meo_bridged": {
        "start": "Bridged",
        "title": "This post has been bridged from another platform.",
    },
    "title_chats": "Chats",
    "title_live": "Livechat",
    "settings_general": "General",
    "settings_appearance": "Appearance",
    "settings_plugins": "Plugins",
    "settings_languages": "Languages",
    "general_sub": {
        "chat": "Chat",
        "accessibility": "Accessibility",
        "misc": "Miscellaneous",
        "acc": "Account",
        "blockedusers": "Blocks",
        "blockedwords": "Blacklisted Words",
        "about": "About",
        "credits": "Credits",
    },
    "general_list": {
        "title": {
            "homepage": "Auto-navigate to Home",
            "consolewarnings": "Disable console warning",
            "forceupdates": "Enable forced updates",
            "blockedmessages": "Hide blocked user messages",
            "invtyping": "Invisible typing",
            "imagewhitelist": "Allow images from any source",
            "censorwords": "Censor blacklisted words",
            "embeds": "Special embeds",
            "reducemotion": "Reduce motion",
            "showpostbuttons": "Always show post buttons",
            "underlinelinks": "Always underline links",
            "entersend": "Don't send on Enter",
            "hideimages": "Hide images",
            "widemode": "New Desktop Experience",
        },
        "desc": {
            "homepage": "Instead of showing you the Start Page, you're taken directly to the Home.",
            "consolewarnings": "Hides warning messages from the console.",
            "forceupdates": "Shows a force update button allowing you to force an update even if you're already up to date or using a beta build. Reload settings to see changes.",
            "blockedmessages": "Shows a warning or hides messages completely.",
            "invtyping": "Other users won't see you typing.",
            "imagewhitelist": "Allows images from any site, use responsibly.",
            "censorwords": "Censors words instead of treating them like a blocked message.",
            "embeds": "Embeds Tenor GIFs, YouTube Videos, etc. (Uses 3rd party cookies).",
            "reducemotion": "Reduces the intensity of animations and other moving effects.",
            "showpostbuttons": "Post buttons always remain visible.",
            "underlinelinks": "Makes links to websites and other pages stand out more by underlining them.",
            "entersend": "Enter key creates newlines instead of sending the post",
            "hideimages": "Blurs images before opening them",
            "widemode": "Enables new desktop experience (Experiemental, Requires refresh)",
        },
    },
    "appearance_sub": {
        "theme": "Theme",
        "spthemes": "Special Themes",
        "acthemes": "Accessible Themes",
        "ogthemes": "Original Themes",
        "glthemes": "Glass Themes",
        "cstheme": "Custom Theme",
        "cscss": "Custom CSS",
    },
    "plugins_sub": {
        "manage": "Manage",
        "desc": "The plugins repo can be found ",
        "link": "here!"
    },
    "languages_sub": {
        "title": "Select a Language",
        "desc": "Don't see your language here? Help translate on",
        "link": "Github!"
    },
    "inbox_sub": {
        "desc": "Notifications are displayed here.",
    },
    "explore_sub": {
        "trendingunavailable": "Sorry, Trending (Beta) is only available in English for now.",
    },
    "live_sub": {
        "desc": "Messages won't be saved here."
    },
    "login_sub": {
        "title": "Login",
        "desc": "meo by eri, leo by josh",
        "oldpass": "Old Password",
        "newpass": "New Password",
        "agreement": "Terms of Use & Privacy Policy",
    },
    "leave_sub": {
        "desc": "Are you sure you want to leave",
        "end": "?",
    },
    "action": {
        "logout": "Log Out",
        "login": "Log In",
        "signup": "Register",
        "search": "Search",
        "mod": "Moderate",
        "creategc": "Create Chat",
        "leavegc": "Leave Chat?",
        "dmme": "DM Me :)",
        "invite": "Invite People",
        "gohome": "Go Home",
        "cleartokens": "Clear Tokens",
        "changepw": "Change Password",
        "clearls": "Clear Local Storage",
        "deleteacc": "Delete Account",
        "block": "Block",
        "blockuser": "Block User",
        "blockword": "Blacklist Word",
        "run": "Run",
        "close": "Close",
        "back": "Back",
        "opennewtab": "Open in Browser",
        "reply": "Reply",
        "mention": "Mention",
        "report": "Report",
        "delete": "Delete",
        "edit": "Edit",
        "share": "Share",
        "comment": "Comment",
        "nick": "Nickname",
        "create": "Create",
        "reason": "Reason",
        "sendreport": "Send Report",
        "yes": "Yes",
        "confirm": "Confirm",
        "update": "Update",
        "go": "Go",
        "apply": "Apply",
        "savetheme": "Save Theme",
        "loadtheme": "Load Theme",
        "resetplugins": "Disable All",
        "favorite": "Favourite",
        "download": "Download",
    },
    "info": {
        "accexists": "Username Already Taken!",
        "invaliduser": "Invalid Username!",
        "invalidpass": "Invalid Password!",
        "invalidcreds": "Invalid username or password!",
        "accbanned": "Account Banned!",
        "accdeleted": "Account Deleted!",
        "conflict": "You probably logged in on another client. Refresh the page and log back in to continue.",
        "unknown": "Unknown Login Status:",
        "chatremoved": "You have been removed from the chat you were in.",
        "passupdate": "Your password has been updated!",
        "editingpost": "Editing Post:",
        "reportsent": "Report Sent!",
        "blockedip": "Blocked IP",
        "searchany": "Search for anything!",
        "cleartokens": "This will log you out everywhere.",
        "clearls": "This will log you out.",
        "signup": "By signing up you agree to the Meower TOS",
        "tokenscleared": "Tokens deleted, you will need to log back in",
        "accscheduled": "Account scheduled for deletion",
        "deletewarn": "It will be deleted FOREVER (a very long time!)",
        "changepwwarn": "It will be updated immediately.",
        "tryagain": "Try again",
        "cleared": "Cleared!",
        "plugin": "Restart now to apply new plugins and their settings",
    },
    "reports": {
        "spam": "Spam",
        "harassment": "Harassment or abuse towards others",
        "language": "Rude, vulgar or offensive language",
        "nsfw": "NSFW (sexual, alcohol, violence, gore, etc.)",
        "scam": "Scams, hacks, phishing or other malicious content",
        "harm": "Threatening violence or real world harm",
        "illegal": "Illegal activity",
        "suicide": "Self-harm/suicide",
        "age": "This person is too young to use Meower",
        "other": "Other",
    },
    "modals": {
        "report": "Report Post",
        "blockword": "Blacklist a Word",
        "blockauser": "Block a User (case sensitive)",
        "blockuser": "Block",
        "unblockuser": "Unblock",
        "bgimage": "Background Image Link",
        "blockedip": "IP Blocked",
        "cleartokens": "Clear Tokens?",
        "changepass": "Change Password",
        "clearls": "Clear Local Storage?",
        "deleteacc": "Delete Account?",
        "share": "Share",
        "plugin": "Refresh Required!",
        "uploadimage": "Upload an image",
    },
    "profile": {
        "quote": "Quote",
        "persona": "Personalisation",
        "profilecolor": "Profile Colour",
        "profilepic": "Profile Picture",
    },
    "chats": { // update
        "members": "Members"
    }
}

const es = {
    //Spanish Americas Translation by ethernet/Ethernet0
    //Last updated 6/4/2024(2024-06-04) - version 1.1
    //hi eri! :)
    "language": "Español Latinoamérica", //corrected - ethernet0 v1.1
    "page_home": "Home",
    "page_start": "Inicio",
    "page_explore": "Explorar",
    "page_inbox": "Buzón",
    "page_settings": "Configuracion",
    "meo_username": "Nombre de Usuario",
    "meo_password": "Contraseña",
    "meo_messagebox": "¿En qué estás pensando?",
    "meo_goanywhere": "A dónde le gustaría ir?",
    "meo_welcome": "¡Bienvenido!",
    "meo_bridged": {
        "start": "Puenteado",
        "title": "Este mensaje ha sido puenteado desde otra plataforma."
    },
    "title_chats": "Chats",
    "title_live": "Tiempo real", // update - completed v1.1
    "settings_general": "General",
    "settings_appearance": "Apariencia",
    "settings_plugins": "Plugins (expansiones)",
    "settings_languages": "Idiomas",
    "general_sub": {
        "chat": "Chat",
        "accessibility": "Accesibilidad",
        "misc": "Otros",
        "acc": "Cuenta",
        "blockedusers": "Usuarios Bloqueados",
        "blockedwords": "Palabras Bloqueadas",
        "about": "Acerca De",
        "credits": "Creditos",
    },
    "general_list": {
        "title": {
            "homepage": "Auto-navegar a Home",
            "consolewarnings": "Desactivar advertencias de la consola",
            "blockedmessages": "Hide blocked user messages",
            "invtyping": "Escritura/Tecleado invisible",
            "imagewhitelist": "Permitir imágenes de cualquier fuente",
            "censorwords": "Censurar palabras de la lista negra",
            "embeds": "Incorporaciones especiales",
            "reducemotion": "Reducir movimiento",
            "showpostbuttons": "Siempre mostrar botones en mensajes",
            "underlinelinks": "Siempre subrayar enlaces",
            "entersend": "No enviar en Intro/Enter", // update - completed v1.1
            "hideimages": "Ocultar imágenes", // update - completed v1.1
            "widemode": "New Desktop Experience", // update
        },
        "desc": {
            "homepage": "En lugar de mostrarte la página de inicio, navegar directamente a home",
            "consolewarnings": "Oculta los mensajes de alerta de la consola",
            "blockedmessages": "Mostrar una advertencia (o) ocultar completamente los mensajes bloqueados",
            "invtyping": "Otros usuarios no te verán teclear",
            "imagewhitelist": "Esto permite que cualquier sitio vea tu direction IP, use responsibly",
            "censorwords": "Censurar palabras en lugar de tratarlas como un mensaje bloqueado",
            "embeds": "Incoroporar GIFs de Tenor, Videos de Youtube, ect. (Usa cookies de 3ª part)",
            "reducemotion": "Reducir la intensidad de las animaciones y otros efectos con movimiento",
            "showpostbuttons": "Los botones en las publicaciónes/mensajes permanecen siempre visibles",
            "underlinelinks": "Subrayar los enlaces a sitios web y otras páginas para que destaquen más.",
            "entersend": "La tecla Intro crea nuevas líneas en lugar de enviar el mensaje", // update - completed v1.1
            "hideimages": "Difuminar imágenes antes de abrirlas", // update - completed v1.1
            "widemode": "Enables new desktop experience (Experiemental, Requires refresh)", // update
        }
    },
    "appearance_sub": {
        "theme": "Tema",
        "spthemes": "Temas Speciales",
        "acthemes": "Temas Accesibles",
        "ogthemes": "Temas Originales",
        "glthemes": "Temas de Vidrio",
        "cstheme": "Tema Personalizado",
        "cscss": "Código CSS personalizado",
    },
    "plugins_sub": {
        "manage": "Manage",
        "desc": "The plugins repo can be found ",
        "link": "here!"
    },
    "languages_sub": {
        "title": "Seleccione un idioma", //corrected - ethernet0 v1.1
        "desc": "¿No ves tu idioma aquí? Ayuda a traducir en", //corrected - ethernet0 v1.1
        "link": "Github!"
    },
    "inbox_sub": {
        "desc": "Las notificaciones aparecen aquí.",
    },
    "live_sub": {
        "desc": "Aquí no se guardan los mensajes." // update - completed v1.1
    },
    "login_sub": {
        "title": "Iniciar sesión",
        "desc": "Este cliente/servicio fue hecho por eri :> - Traducido al español por ether",
        "oldpass": "Contraseña Anterior",
        "newpass": "Contraseña Nueva",
        "agreement": "Términos de servicio y Política de privacidad"
    },
    "leave_sub": { // update - completed v1.1
        "desc": "¿Estás seguro de que quieres irte",
        "end": "?",
    },
    "action": {
        "logout": "Cerrar Sesión",
        "login": "Iniciar Sesión",
        "signup": "Registrarse",
        "search": "Búsqueda",
        "mod": "Moderar",
        "creategc": "Crear Chat (Grupo)",
        "leavegc": "¿Abandonar Chat/Groupo?", // update - completed v1.1
        "dmme": "DM Me :)",
        "invite": "Invitar Personas",
        "gohome": "Ir a Home",
        "cleartokens": "Borrar Fichas de sesión (Tokens)",
        "changepw": "Cambiar Contraseña",
        "clearls": "Borrar Almacenamiento Local",
        "deleteacc": "Eliminar Cuenta",
        "block": "Bloquear",
        "blockuser": "Bloquear Usuario",
        "blockword": "Añadir Palabra a la Lista Negra",
        "run": "Run (Ejecutar)",
        "close": "Cerrar",
        "back": "Atrás",
        "opennewtab": "Abrir En Navegador Web",
        "reply": "Responder",
        "mention": "Mencionar Usuario",
        "report": "Denunciar",
        "delete": "Eliminar",
        "edit": "Editar",
        "share": "Compartir",
        "comment": "Comentar",
        "nick": "Sobrenombre",
        "create": "Crear",
        "reason": "Razón",
        "sendreport": "Enviar Denuncia",
        "yes": "Si",
        "confirm": "Confirmar",
        "update": "Actualizar",
        "go": "Ir",
        "apply": "Aplicar",
        "savetheme": "Save Theme (Salvar Tema)",
        "loadtheme": "Load Theme (Cargar Tema)",
        "resetplugins": "Deshabilitar todo", // update - completed v1.1
        "favorite": "Favoritos", // update - completed v1.1
        "download": "Download", // update
    },
    "info": {
        "accexists": "¡Nombre de Usuario ya Ocupado!",
        "invaliduser": "¡Nombre de Usuario Inválido!",
        "invalidpass": "¡Contraseña Inválida!",
        "invalidcreds": "Invalid username or password!", // update
        "accbanned": "¡Cuenta Vetada!",
        "accdeleted": "¡Cuenta eliminada!",
        "conflict": "Es probable que hayas iniciado una sesión en otro servicio/ciber cliente. Refresque la página y vuelva a iniciar una sesión para continuar.",
        "unknown": "Estado de inicio de sesión desconocido:",
        "chatremoved": "Has sido eliminado del chat/grupo en el que estabas.",
        "passupdate": "Su contraseña ha sido actualizada. Es posible que tenga que volver a iniciar su sesión.",
        "editingpost": "Editando Mensaje:",
        "reportsent": "¡Denuncia enviada!",
        "blockedip": "Dirección IP bloqueada",
        "searchany": "¡Busca cualquier cosa!",
        "cleartokens": "Esto cerrará tu sesión en todas partes",
        "clearls": "Esto cerrará tu sesión.",
        "signup": "Al registrarte aceptas los términos y condiciones de servicio de Meower",
        "tokenscleared": "Fichas de sesión (Session Tokens) eliminadas, tendrá que volver a iniciar sesión",
        "accscheduled": "Cuenta de usuario programada para su eliminación",
        "deletewarn": "Se borrará PARA SIEMPRE (¡Un tiempo muy largo!)",
        "changepwwarn": "Se actualizará de inmediato.", //update - completed v1.1
        "tryagain": "Inténtalo de nuevo",
        "cleared": "¡Borrado!",
        "plugin": "Reinicia ahora para aplicar las nuevas expansiones y sus ajustes.", // update - completed v1.1
    },
    "reports": {
        "spam": "Spam (Basura)",
        "harassment": "Acoso o abuso hacia otras personas",
        "language": "Lenguaje grosero, vulgar (y/o) ofensivo",
        "nsfw": "NSFW (sexual, alcohol, violencia, sangriento, etc.)",
        "scam": "Estafas, hackeos, phishing (y/o) otros contenidos maliciosos",
        "harm": "Amenazas de violencia o daños en el mundo real",
        "illegal": "Actividad ilegal",
        "suicide": "Autolesión/suicidio",
        "age": "Esta persona es demasiado/a joven para usar Meower",
        "other": "Otro",
    },
    "modals": {
        "report": "Denunciar Mensaje",
        "blockword": "Añadir Palabra a la Lista Negra",
        "blockauser": "Block a User (case sensitive)",
        "blockuser": "Bloquear",
        "unblockuser": "Desbloquear",
        "bgimage": "Enlace de Imagen de Fondo (Background Image Link)",
        "blockedip": "Dirección IP bloqueada",
        "cleartokens": "Borrar Fichas de sesión (Tokens)?",
        "changepass": "Cambiar Contraseña",
        "clearls": "Borrar Almacenamiento Local?",
    },
    "profile": {
        "quote": "Cita de perfil",
        "persona": "Personalización",
        "profilecolor": "Color del perfil",
        "profilepic": "Foto de perfil",
    },
    "chats": { // update - completed v1.1
        "members": "Miembros"
    }
}

const es_es = {
    // Spanish translation by ethernet/ethernet0, converted by NotFenixio
    // Last updated 02/06/2024 (dd/mm/yyyy)
    // hey eris, hi josh
    "language": "Español España",
    "page_home": "Inicio",
    "page_start": "Comienzo",
    "page_explore": "Explorar",
    "page_inbox": "Bandeja de entrada",
    "page_settings": "Configuración",
    "meo_username": "Nombre de usuario",
    "meo_password": "Contraseña",
    "meo_messagebox": "¿Qué tienes en mente?",
    "meo_goanywhere": "¿A dónde te gustaría ir?",
    "meo_welcome": "¡Bienvenido!",
    "meo_bridged": {
        "start": "Conectado",
        "title": "Esta publicación ha sido conectada desde otra plataforma."
    },
    "title_chats": "Chats",
    "title_live": "Chat en vivo",
    "settings_general": "General",
    "settings_appearance": "Apariencia",
    "settings_plugins": "Complementos",
    "settings_languages": "Idiomas",
    "general_sub": {
        "chat": "Chat",
        "accessibility": "Accesibilidad",
        "misc": "Misceláneo",
        "acc": "Cuenta",
        "blockedusers": "Usuarios bloqueados",
        "blockedwords": "Palabras en lista negra",
        "about": "Acerca de",
        "credits": "Créditos"
    },
    "general_list": {
        "title": {
            "homepage": "Navegación automática a Inicio",
            "consolewarnings": "Desactivar advertencias de consola",
            "forceupdates": "Habilitar actualizaciones forzadas",
            "blockedmessages": "Ocultar mensajes de usuarios bloqueados",
            "invtyping": "Escritura invisible",
            "imagewhitelist": "Permitir imágenes de cualquier fuente",
            "censorwords": "Censurar palabras en lista negra",
            "embeds": "Incrustaciones especiales",
            "reducemotion": "Reducir movimiento",
            "showpostbuttons": "Mostrar siempre los botones de publicación",
            "underlinelinks": "Subrayar siempre los enlaces",
            "entersend": "No enviar con Enter",
            "hideimages": "Ocultar imágenes",
            "widemode": "New Desktop Experience" // update
        },
        "desc": {
            "homepage": "En lugar de mostrarte la Página de Inicio, serás llevado directamente a Inicio",
            "consolewarnings": "Oculta los mensajes de advertencia de la consola",
            "forceupdates": "Muestra un botón de actualización forzada que te permite forzar una actualización incluso si ya estás actualizado o usando una versión beta. Recarga la configuración para ver los cambios.",
            "blockedmessages": "Mostrar una advertencia u ocultar los mensajes completamente",
            "invtyping": "Otros usuarios no verán que estás escribiendo",
            "imagewhitelist": "Esto permite que cualquier sitio vea tu IP, úsalo responsablemente",
            "censorwords": "Censura palabras en lugar de tratarlas como un mensaje bloqueado",
            "embeds": "Incrusta GIFs de Tenor, videos de YouTube, etc. (Usa cookies de terceros)",
            "reducemotion": "Reduce la intensidad de las animaciones y otros efectos en movimiento",
            "showpostbuttons": "Los botones de publicación siempre permanecen visibles",
            "underlinelinks": "Hacer que los enlaces a sitios web y otras páginas resalten más subrayándolos",
            "entersend": "La tecla Enter crea nuevas líneas en lugar de enviar la publicación",
            "hideimages": "Desenfoca las imágenes antes de abrirlas",
            "widemode": "Enables new desktop experience (Experiemental)" // update
        }
    },
    "appearance_sub": {
        "theme": "Tema",
        "spthemes": "Temas especiales",
        "acthemes": "Temas accesibles",
        "ogthemes": "Temas originales",
        "glthemes": "Temas de vidrio",
        "cstheme": "Tema personalizado",
        "cscss": "CSS personalizado"
    },
    "plugins_sub": {
        "manage": "Gestionar",
        "desc": "El repositorio de complementos se puede encontrar ",
        "link": "aquí!"
    },
    "languages_sub": {
        "title": "Seleccionar un idioma",
        "desc": "¿No ves tu idioma aquí? Ayuda a traducir en",
        "link": "Github!"
    },
    "inbox_sub": {
        "desc": "Las notificaciones se muestran aquí."
    },
    "explore_sub": {
        "trendingunavailable": "Lo siento, Trending (Beta) solo está disponible en inglés por ahora."
    },
    "live_sub": {
        "desc": "Los mensajes no se guardarán aquí."
    },
    "login_sub": {
        "title": "Iniciar sesión",
        "desc": "meo por eri, leo por josh",
        "oldpass": "Contraseña antigua",
        "newpass": "Nueva contraseña",
        "agreement": "Términos de uso y Política de privacidad"
    },
    "leave_sub": {
        "desc": "¿Estás seguro de que quieres salir",
        "end": "?",
    },
    "action": {
        "logout": "Cerrar sesión",
        "login": "Iniciar sesión",
        "signup": "Registrarse",
        "search": "Buscar",
        "mod": "Moderar",
        "creategc": "Crear chat",
        "leavegc": "¿Salir del chat?",
        "dmme": "DM Me :)",
        "invite": "Invitar a personas",
        "gohome": "Ir a Inicio",
        "cleartokens": "Borrar tokens",
        "changepw": "Cambiar contraseña",
        "clearls": "Borrar almacenamiento local",
        "deleteacc": "Eliminar cuenta",
        "block": "Bloquear",
        "blockuser": "Bloquear usuario",
        "blockword": "Palabra en lista negra",
        "run": "Ejecutar",
        "close": "Cerrar",
        "back": "Atrás",
        "opennewtab": "Abrir en el navegador",
        "reply": "Responder",
        "mention": "Mencionar",
        "report": "Reportar",
        "delete": "Eliminar",
        "edit": "Editar",
        "share": "Compartir",
        "comment": "Comentar",
        "nick": "Apodo",
        "create": "Crear",
        "reason": "Razón",
        "sendreport": "Enviar reporte",
        "yes": "Sí",
        "confirm": "Confirmar",
        "update": "Actualizar",
        "go": "Ir",
        "apply": "Aplicar",
        "savetheme": "Guardar tema",
        "loadtheme": "Cargar tema",
        "resetplugins": "Deshabilitar todo",
        "favorite": "Favorito",
        "download": "Download", // update
    },
    "info": {
        "accexists": "¡Nombre de usuario ya tomado!",
        "invaliduser": "¡Nombre de usuario inválido!",
        "invalidpass": "¡Contraseña inválida!",
        "invalidcreds": "Invalid username or password!", // update
        "accbanned": "¡Cuenta bloqueada!",
        "accdeleted": "¡Cuenta eliminada!",
        "conflict": "Probablemente iniciaste sesión en otro cliente. Refresca la página e inicia sesión nuevamente para continuar.",
        "unknown": "Estado de inicio de sesión desconocido:",
        "chatremoved": "Has sido eliminado del chat en el que estabas.",
        "passupdate": "¡Tu contraseña ha sido actualizada!",
        "editingpost": "Editando publicación:",
        "reportsent": "¡Reporte enviado!",
        "blockedip": "IP bloqueada",
        "searchany": "¡Busca cualquier cosa!",
        "cleartokens": "Esto cerrará tu sesión en todas partes.",
        "clearls": "Esto cerrará tu sesión.",
        "signup": "Al registrarte aceptas los Términos de Servicio de Meower",
        "tokenscleared": "Tokens eliminados, necesitarás iniciar sesión nuevamente",
        "accscheduled": "Cuenta programada para eliminación",
        "deletewarn": "Se eliminará PARA SIEMPRE (¡un tiempo muy largo!)",
        "changepwwarn": "Se actualizará inmediatamente.",
        "tryagain": "Inténtalo de nuevo",
        "cleared": "¡Borrado!",
        "plugin": "Reinicia ahora para aplicar los nuevos complementos y sus configuraciones"
    },
    "reports": {
        "spam": "Spam",
        "harassment": "Acoso o abuso hacia otros",
        "language": "Lenguaje grosero, vulgar u ofensivo",
        "nsfw": "NSFW (sexual, alcohol, violencia, gore, etc.)",
        "scam": "Estafas, hacks, phishing u otro contenido malicioso",
        "harm": "Amenaza de violencia o daño real",
        "illegal": "Actividad ilegal",
        "suicide": "Auto-lesiones/suicidio",
        "age": "Esta persona es demasiado joven para usar Meower",
        "other": "Otro"
    },
    "modals": {
        "report": "Reportar publicación",
        "blockword": "Añadir una palabra a la lista negra",
        "blockauser": "Bloquear a un usuario (sensible a mayúsculas)",
        "blockuser": "Bloquear",
        "unblockuser": "Desbloquear",
        "bgimage": "Enlace de imagen de fondo",
        "blockedip": "IP bloqueada",
        "cleartokens": "¿Borrar tokens?",
        "changepass": "Cambiar contraseña",
        "clearls": "¿Borrar almacenamiento local?",
        "deleteacc": "¿Eliminar cuenta?",
        "share": "Compartir",
        "plugin": "¡Requiere actualización!",
        "uploadimage": "Subir una imagen"
    },
    "profile": {
        "quote": "Cita",
        "persona": "Personalización",
        "profilecolor": "Color del perfil",
        "profilepic": "Foto de perfil"
    },
    "chats": {
        "members": "Miembros"
    }
}

const de = {
    // credit: mybearworld
    "language": "Deutsch, Deutschland",
    "page_home": "Home",
    "page_start": "Start",
    "page_explore": "Entdecken",
    "page_inbox": "Posteingang",
    "page_settings": "Einstellungen",
    "meo_username": "Benutzername",
    "meo_password": "Passwort",
    "meo_messagebox": "Worüber denkst du nach?",
    "meo_goanywhere": "Wo würdest du gerne hingehen?",
    "meo_welcome": "Willkommen!",
    "meo_bridged": {
        "start": "Extern", // translated as "external" because "überbrückt" would sound really awkward
        "title": "Dieser Post wurde auf einer externen Platform geschickt."
    },
    "title_chats": "Chats",
    "title_live": "Livechat", // update
    "settings_general": "Allgemein",
    "settings_appearance": "Aussehen",
    "settings_plugins": "Plugins",
    "settings_languages": "Sprachen",
    "general_sub": {
        "chat": "Chat",
        "accessibility": "Barrierenfreiheit",
        "misc": "Sonstiges",
        "acc": "Konto",
        "blockedusers": "Blockiert",
        "blockedwords": "Verbotene Wörter",
        "about": "Über",
        "credits": "Dankaussagungen",
    },
    "general_list": {
        "title": {
            "homepage": "Automatisch zu Home gehen",
            "consolewarnings": "Konsolenwarnung ausschalten",
            "forceupdates": "Enable forced updates", // update
            "blockedmessages": "Nachrichten von blockierten Nutzern verstecken",
            "invtyping": "Durchsichtiges Tippen",
            "imagewhitelist": "Bilder von jeder Quelle erlauben",
            "censorwords": "Verbotene Wörter blockieren",
            "embeds": "Besondere Einbettungen",
            "reducemotion": "Bewegung reduzieren",
            "showpostbuttons": "Postknöpfe immer zeigen",
            "underlinelinks": "Links immer unterstreichen",
            "entersend": "Don't send on Enter", // update
            "hideimages": "Hide images", // update
            "widemode": "New Desktop Experience" // update
        },
        "desc": {
            "homepage": "Direkt zu Home navigieren, statt die Startseite anzuzeigen",
            "consolewarnings": "Die Warnmeldung in der Konsole nicht zeigen",
            "forceupdates": "Shows a force update button allowing you to force an update even if you're already up to date or using a beta build. Reload settings to see changes.", // update
            "blockedmessages": "Nur eine Warnung zeigen, oder die Nachricht komplett verstecken",
            "invtyping": "Andere Nutzer werden dich nicht tippen sehen",
            "imagewhitelist": "Dadurch kann dadurch deine IP-Adresse sehen, nutze das verantwortlich",
            "censorwords": "Zensiert Wörter, statt sie als blockierte Nachricht zu sehen",
            "embeds": "Tenor-GIFS, YouTube-Videos etc. einbetten (Cookies dritter Parteien)",
            "reducemotion": "Die Intensität der Animationen und andere Bewegungseffekte reduzieren",
            "showpostbuttons": "Postknöpfe bleiben immer sichtbar",
            "underlinelinks": "Links zu Websiten und anderen Seiten unterstreichen und damit hervorheben",
            "entersend": "Enter key creates newlines instead of sending the post", // update
            "hideimages": "Blurs images before opening them", // update
            "widemode": "Enables new desktop experience (Experiemental)" // update
        }
    },
    "appearance_sub": {
        "theme": "Aussehen",
        "spthemes": "Besondere Aussehen",
        "acthemes": "Barrierenfreie Aussehen",
        "ogthemes": "Ursprüngliche Aussehen",
        "glthemes": "Glasaussehen",
        "cstheme": "Eigenes Aussehen",
        "cscss": "Eigenes CSS",
    },
    "plugins_sub": {
        "manage": "Einstellen",
        "desc": "The plugins repo can be found ",
        "link": "here!"
    },
    "languages_sub": {
        "title": "Wähle eine Sprache",
        "desc": "Siehst du deine Sprache hier nicht? Übersetze sie auf",
        "link": "Github!"
    },
    "inbox_sub": {
        "desc": "Benachrichtigungen werden hier angezeigt.",
    },
    "explore_sub": {
        "trendingunavailable": "Entschuldigung, Trending (Beta) ist derzeit nur auf Englisch verfügbar.",
    },
    "live_sub": {
        "desc": "Messages won't be saved here." // update
    },
    "login_sub": {
        "title": "Anmelden",
        "desc": "meo von eri, leo von josh",
        "oldpass": "Altes Passwort",
        "newpass": "Neues Passwort",
        "agreement": "Geschäftsbedingungen und Datenschutzerklärung"
    },
    "leave_sub": { // update
        "desc": "Are you sure you want to leave",
        "end": "?",
    },
    "action": {
        "logout": "Abmelden",
        "login": "Anmelden",
        "signup": "Konto erstellen",
        "search": "Suchen",
        "mod": "Moderieren",
        "creategc": "Chat erstellen",
        "leavegc": "Leave Chat?", // update
        "dmme": "Schicke mir eine Nachricht :)",
        "invite": "Menschen einladen",
        "gohome": "Zu Home gehen",
        "cleartokens": "Tokens löschen",
        "changepw": "Passwort ändern",
        "clearls": "Lokalen Speicherplatz löschen",
        "deleteacc": "Konto löschen",
        "block": "Blockieren",
        "blockuser": "Nutzer blockieren",
        "blockword": "Wort verbieten",
        "run": "Ausführen",
        "close": "Schließen",
        "back": "Zurück",
        "opennewtab": "Im Browser öffnen",
        "reply": "Antworten",
        "mention": "Ansprechen",
        "report": "Melden",
        "delete": "Löschen",
        "edit": "Bearbeiten",
        "share": "Teilen",
        "comment": "Kommentieren",
        "nick": "Spitzname",
        "create": "Erstellen",
        "reason": "Grund",
        "sendreport": "Meldung senden",
        "yes": "Ja",
        "confirm": "Bestätigen",
        "update": "Aktualisieren",
        "go": "Los",
        "apply": "Übernehmen",
        "savetheme": "Aussehen speichern",
        "loadtheme": "Aussehen laden",
        "resetplugins": "Alles ausschalten",
        "favorite": "Favorite", // update
        "download": "Download", // update
    },
    "info": {
        "accexists": "Der Benutzername wird schon benutzt!",
        "invaliduser": "Ungültiger Benutzername!",
        "invalidpass": "Ungültiges Passwort!",
        "invalidcreds": "Invalid username or password!", // update
        "accbanned": "Konto gebannt!",
        "accdeleted": "Konto gelöscht!",
        "conflict": "Du hast dich vermutlich bei einem anderen Client angemeldet. Lade die Seite neu und melde dich wieder ein, um weiterzumachen.",
        "unknown": "Unbekannter Anmeldestatus:",
        "chatremoved": "Du wurdest von dem Chat, in dem du bist, entfernt.",
        "passupdate": "Dein Passwort wurde aktualisiert!",
        "editingpost": "Post wird bearbeitet:",
        "reportsent": "Meldung wurde gesendet!",
        "blockedip": "Blockierte IP",
        "searchany": "Suche nach irgendetwas!",
        "cleartokens": "Das wird dich überall abmelden.",
        "clearls": "Das wird dich anmelden.",
        "signup": "Wenn du ein Konto erstellst, stimmst du den Nutzungsbedingungen von Meower zu",
        "tokenscleared": "Tokens wurden gelöscht, du musst dich erneut anmelden",
        "accscheduled": "Konto wird gelöscht werden",
        "deletewarn": "Es wird FÜR IMMER (eine sehr lange Zeit!) gelöscht",
        "changepwwarn": "It will be updated immediately.", //update
        "tryagain": "Versuche es erneut",
        "cleared": "Gelöscht!",
        "plugin": "Jetzt neu laden um neue Plugins und ihre Einstellungen anzuwenden",
    },
    "reports": {
        "spam": "Spam",
        "harassment": "Hassrede oder Missbrauch anderer",
        "language": "Unhöfliche, vulgäre oder Rude, vulgar or anstößige Sprache",
        "nsfw": "NSFW (Sexuelles, Alkohol, Gewalt, Blut, usw.)",
        "scam": "Betrug, Hacks, Phishing oder andere bösartigen Inhalte",
        "harm": "Drohung von Gewalt oder Schaden",
        "illegal": "Illegale Aktivität",
        "suicide": "Selbstschaden, Suizid",
        "age": "Diese Person ist zu jung, um Meower zu benutzen",
        "other": "Anderes",
    },
    "modals": {
        "report": "Post melden",
        "blockword": "Ein Wort verbieten",
        "blockauser": "Einen User blockieren (Groß- und Kleinschreibung zählt)",
        "blockuser": "Blockieren",
        "unblockuser": "Blockierung aufheben",
        "bgimage": "Link von Hintergrundbild",
        "blockedip": "IP-Blockiert",
        "cleartokens": "Tokens löschen?",
        "changepass": "Passwort ändern",
        "clearls": "Lokalen Speicherplatz löschen?",
        "deleteacc": "Konto löschen?",
        "share": "Teilen",
        "plugin": "Aktualisierung benötigt!",
        "uploadimage": "Lade ein Bild hoch",
    },
    "profile": {
        "quote": "Zitat",
        "persona": "Personalisierung",
        "profilecolor": "Profilfarbe",
        "profilepic": "Profilbild",
    },
    "chats": { // update
        "members": "Members"
    }
}

if (localStorage.getItem("language")) {
    setlang(localStorage.getItem("language"));
} else {
    setlang("en");
}