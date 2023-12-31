const devel = false
var killme = false;
var page = "login";
var lul = 0;
var sul = "";

function replsh(rpl) {
    var trimmedString = rpl.length > 25 ?
        rpl.substring(0, 22) + "..." :
        rpl;
    return trimmedString;
}

function main() {
    page = "login";
    webSocket = new WebSocket("wss://server.meower.org/");
    var loggedin = false;

    webSocket.onclose = (event) => {
        logout(true);
    };
    loadTheme();
    webSocket.onmessage = (event) => {
        console.log("INC: " + event.data);

        var sentdata = JSON.parse(event.data);
        if (sentdata.val == "I:112 | Trusted Access enabled") {
            var data = {
                cmd: "direct",
                val: {
                    cmd: "type",
                    val: "js"
                }
            };

            webSocket.send(JSON.stringify(data));
            console.log("OUT: " + JSON.stringify(data));

            var data = {
                cmd: "direct",
                val: "meower"
            };

            webSocket.send(JSON.stringify(data));
            console.log("OUT: " + JSON.stringify(data));

            var pageContainer = document.getElementById("main");
            pageContainer.innerHTML = "<div class='settings'><div class='login'><h1>meo</h1><input type='text' id='userinput' placeholder='Username' class='login-input text'><input type='password' id='passinput' placeholder='Password' class='login-input text'><input type='button' id='submit' value='Log in' class='login-input button' onclick='dowizard()'> <input type='button' id='submit' value='Sign up' class='login-input button' onclick='doswizard()'><small>This client was made by eri :></small><small>Thanks for some of the code melt!</small><div id='msgs'></div></div><div class='footer'><img width='25px' src='images/meo96.png'></div></div>";
            if (localStorage.getItem("token") != undefined && localStorage.getItem("uname") != undefined) {
                document.getElementById("userinput").value = localStorage.getItem("uname");
                document.getElementById("passinput").value = localStorage.getItem("token");
                dowizard();
            };
        } else if (sentdata.val.mode == "auth") {
            loggedin = true;
            page = "home";
            if (localStorage.getItem("token") == undefined || localStorage.getItem("uname") == undefined) {
                localStorage.setItem("uname", sentdata.val.payload.username);
                localStorage.setItem("token", sentdata.val.payload.token);
            }


            document.getElementById("msgs").innerHTML = "";
            loadhome();
            console.log("Logged in!");
        } else if (sentdata.val == "E:110 | ID conflict") {
            alert("ID conflict. You probably logged in on another client. Refresh the page and log back in to continue.");
        } else if (sentdata.val.post_origin == "home") {
            if (loggedin == true && page == "home") {
                loadpost(sentdata.val);
            }
        } else if (sentdata.val.post_origin == "livechat") {
            if (loggedin == true && page == "home" && devel) {
                loadpost(sentdata.val);
            }
        } else if (killme) {
            return 0;
        } else if (sentdata.val.mode == "update_post") {
            console.log("Got update post for " + sentdata.val.payload._id);
            for (var vi = 0; vi < document.getElementById(sentdata.val.payload._id).children.length; vi++) {
                i = document.getElementById(sentdata.val.payload._id).children[vi];
                if (i.tagName == "IMG" && i.className == "editedicon") {
                    i.style = "height: 18px; width: auto; vertical-align: middle; margin-bottom: 5px;";
                } else if (i.tagName == "POSTCONTENT") {
                    i.innerText = sentdata.val.payload.p;
                }
            }
        } else if (sentdata.cmd == "ulist") {
            var iul = sentdata.val;
            sul = iul.trim().split(";");
            lul = sul.length - 1;
            sul = sul.slice(0, -1).join(", ") + (sul.length > 1 ? ", " : "") + sul.slice(-1);
            if (page == "home") {
                document.getElementById("info").innerText = lul + " users online (" + sul + ")";
            }
        }
    };
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            dopostwizard();
        }
    });

}

function loadpost(p) {
    if (p.u == "Discord") {
        var rcon = p.p;
        var parts = rcon.split(': ');
        var user = parts[0];
        var content = parts.slice(1).join(': ');
        var rawsplit = rcon.split(": ");
    } else {
        var content = p.p;
        var user = p.u;
    }

    var postContainer = document.createElement("div");
    postContainer.id = p._id;
    postContainer.classList.add("post");

    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    buttonContainer.innerHTML = "<div class='toolbarContainer'><div class='toolButton' onclick='goToAPI()'><svg viewBox='0 0 20 20' fill='currentColor' aria-hidden='true' width='18' height='18'><path d='M12.9297 3.25007C12.7343 3.05261 12.4154 3.05226 12.2196 3.24928L11.5746 3.89824C11.3811 4.09297 11.3808 4.40733 11.5739 4.60245L16.5685 9.64824C16.7614 9.84309 16.7614 10.1569 16.5685 10.3517L11.5739 15.3975C11.3808 15.5927 11.3811 15.907 11.5746 16.1017L12.2196 16.7507C12.4154 16.9477 12.7343 16.9474 12.9297 16.7499L19.2604 10.3517C19.4532 10.1568 19.4532 9.84314 19.2604 9.64832L12.9297 3.25007Z'></path><path d='M8.42616 4.60245C8.6193 4.40733 8.61898 4.09297 8.42545 3.89824L7.78047 3.24928C7.58466 3.05226 7.26578 3.05261 7.07041 3.25007L0.739669 9.64832C0.5469 9.84314 0.546901 10.1568 0.739669 10.3517L7.07041 16.7499C7.26578 16.9474 7.58465 16.9477 7.78047 16.7507L8.42545 16.1017C8.61898 15.907 8.6193 15.5927 8.42616 15.3975L3.43155 10.3517C3.23869 10.1569 3.23869 9.84309 3.43155 9.64824L8.42616 4.60245Z'></path></svg></div><div class='toolButton' onclick='reply(event)'><svg class='icon_d1ac81' width='24' height='24' viewBox='0 0 24 24'><path d='M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z' fill='currentColor'></path></svg></div></div>";
    postContainer.appendChild(buttonContainer);

    var postDate = document.createElement("i");
    tsr = p.t.e;
    tsra = tsr * 1000;
    tsrb = Math.trunc(tsra);
    var ts = new Date();
    ts.setTime(tsrb);
    sts = ts.toLocaleString();
    postDate.innerText = sts;

    var postContent = document.createElement("h3");
    postContent.innerHTML = "<span id='username'>" + user + "</span>";

    if (p.u === "Discord") {
        var bridged = document.createElement("bridge");
        bridged.innerText = "Bridged";
        bridged.setAttribute("title", "This message has been bridged from another platform.");
        postContent.appendChild(bridged);
    }
    postContent.appendChild(postDate);

    postContainer.appendChild(postContent);

    var postContentText = document.createElement("p");
    blist = ["", " ", "# ", "## ", "### ", "#### ", "##### ", "###### ", "\n"];
    if (!blist.includes(content)) {
        var splc = content.split("\n");
        var asplc = "";
        for (const i in splc) {
            if (i == splc.length - 1) {
                asplc += splc[i];
            } else {
                asplc += splc[i] + "\n\n";
            }
        }

        var escapedInput = asplc
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');


            var textContent = escapedInput
            .replace(/\*\*\*\*(.*?[^\*])\*\*\*\*/g, '$1')
            .replace(/\*\*(.*?[^\*])\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?[^\*])\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<code>$1</code>')
            .replace(/``([^`]+)``/g, '<code>$1</code>')
            .replace(/^# (.*?$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*?$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*?$)/gm, '<h3>$1</h3>')
            .replace(/^&gt; (.*?$)/gm, '<blockquote>$1</blockquote>')
            .replace(/~~([\s\S]*?)~~/g, '<del>$1</del>')
            .replace(/(?:https?|ftp):\/\/[^\s(){}[\]]+/g, function(url) {
                return `<a href="${url.replace(/<\/?blockquote>/g, '')}" target="_blank">${url}</a>`;
            });

        postContentText.innerHTML = textContent;

        postContentText.querySelectorAll('p a').forEach(link => {
            const url = link.getAttribute('href');
            const fileExtension = url.split('.').pop().toLowerCase();

            if (['png', 'jpg', 'jpeg', 'gif', 'mp4', 'webm', 'mov'].includes(fileExtension)) {
                link.classList.add('attachment');
                link.innerHTML = '<svg class="icon_ecf39b icon__13ad2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M10.57 4.01a6.97 6.97 0 0 1 9.86 0l.54.55a6.99 6.99 0 0 1 0 9.88l-7.26 7.27a1 1 0 0 1-1.42-1.42l7.27-7.26a4.99 4.99 0 0 0 0-7.06L19 5.43a4.97 4.97 0 0 0-7.02 0l-8.02 8.02a3.24 3.24 0 1 0 4.58 4.58l6.24-6.24a1.12 1.12 0 0 0-1.58-1.58l-3.5 3.5a1 1 0 0 1-1.42-1.42l3.5-3.5a3.12 3.12 0 1 1 4.42 4.42l-6.24 6.24a5.24 5.24 0 0 1-7.42-7.42l8.02-8.02Z" class=""></path></svg><span> attachments</span>';
            }
        });

        postContainer.appendChild(postContentText);

        var links = content.match(/(?:https?|ftp):\/\/[^\s(){}[\]]+/g);
        if (links) {
            links.forEach(link => {
                var baseURL = link.split('?')[0];

                var fileExtension = baseURL.split('.').pop().toLowerCase();
                var embeddedElement;

              

                if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
                    var imgElement = document.createElement("img");
                    imgElement.setAttribute("src", baseURL);
                    imgElement.setAttribute("style", "max-width: 300px;");
                    imgElement.classList.add("embed");

                    var imgLink = document.createElement("a");
                    imgLink.setAttribute("href", baseURL);
                    imgLink.setAttribute("target", "_blank");
                    imgLink.appendChild(imgElement);

                    embeddedElement = imgLink;
                } else if (['mp4', 'webm', 'mov'].includes(fileExtension)) {
                    embeddedElement = document.createElement("video");
                    embeddedElement.setAttribute("src", baseURL);
                    embeddedElement.setAttribute("controls", "controls");
                    embeddedElement.setAttribute("style", "max-width: 300px;");
                    embeddedElement.classList.add("embed");
                }

                var youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
                if (youtubeRegex.test(link)) {
                    var match = link.match(youtubeRegex);
                    var videoId = match[4];

                    embeddedElement = document.createElement("iframe");
                    embeddedElement.setAttribute("width", "560");
                    embeddedElement.setAttribute("height", "315");
                    embeddedElement.setAttribute("class", "embed");
                    embeddedElement.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
                    embeddedElement.setAttribute("title", "YouTube video player");
                    embeddedElement.setAttribute("frameborder", "0");
                    embeddedElement.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
                    embeddedElement.setAttribute("allowfullscreen", "");
                  } else if (link.includes('open.spotify.com')) {
                    var spotifyRegex = /track\/([a-zA-Z0-9]+)/;
                    var match = link.match(spotifyRegex);
                    if (match) {
                        var trackId = match[1];
                
                        var embeddedElement = document.createElement("iframe");
                        embeddedElement.setAttribute("style", "border-radius: 12px");
                        embeddedElement.setAttribute("src", `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`);
                        embeddedElement.setAttribute("width", "400px");
                        embeddedElement.setAttribute("height", "80px");
                        embeddedElement.setAttribute("frameBorder", "0");
                        embeddedElement.setAttribute("allowfullscreen", "");
                        embeddedElement.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
                        embeddedElement.setAttribute("loading", "lazy");
                
                        embeddedElement.classList.add("embed");

                    }
                }

                if (embeddedElement) {
                    postContainer.appendChild(embeddedElement);
                }
            });
        }
    }


    var pageContainer = document.getElementById("msgs");
    if (pageContainer.firstChild) {
        pageContainer.insertBefore(postContainer, pageContainer.firstChild);
    } else {
        pageContainer.appendChild(postContainer);
    }
}

function goToAPI() {
    var postId = event.target.closest('.post').id;
    window.open(`https://api.meower.org/posts?id=${postId}`, '_blank');
}


function reply(event) {
    var postContainer = event.target.closest('.post');
    if (postContainer) {
        var username = postContainer.querySelector('#username').innerText;
        document.getElementById('msg').value = `@${username} `;
        document.getElementById('msg').focus();
    }
}

function loadTheme() {
    const theme = localStorage.getItem("theme");

    if (theme) {
        document.documentElement.classList.add(theme + "-theme");
    }
}

function dowizard() {
    console.log(document.getElementById('userinput').value);
    var data = {
        cmd: "direct",
        val: {
            cmd: "authpswd",
            val: {
                username: document.getElementById('userinput').value,
                pswd: document.getElementById('passinput').value
            }
        }
    };
    document.getElementById("msgs").innerHTML = '';
    webSocket.send(JSON.stringify(data));
    console.log("User is logging in, details will not be logged for security reasons.");
}

function doswizard() {
    console.log(document.getElementById('userinput').value);
    var data = {
        cmd: "direct",
        val: {
            cmd: "gen_account",
            val: {
                username: document.getElementById('userinput').value,
                pswd: document.getElementById('passinput').value
            }
        }
    };
    document.getElementById("msgs").innerHTML = '';
    webSocket.send(JSON.stringify(data));
    console.log("User is signing up, details will not be logged for security reasons.");
}

function dopostwizard() {
    console.log("USER POSTED: " + document.getElementById('msg').value);
    if (devel) {
        var data = {
            cmd: "direct",
            val: {
                cmd: "post_chat",
                val: {
                    chatid: "livechat",
                    "p": document.getElementById('msg').value
                }
            }
        };
    } else {
        var data = {
            cmd: "direct",
            val: {
                cmd: "post_home",
                val: document.getElementById('msg').value
            }
        };
    }
    webSocket.send(JSON.stringify(data));
    console.log("OUT: " + JSON.stringify(data));
    document.getElementById('msg').value = "";
}

function loadhome() {
    page = "home";
    var pageContainer = document.getElementById("main");
    pageContainer.innerHTML = "<div class='info'><h1>Home</h1><p id='info'></p></div><div class='message-container'><input type='text' class='message-input text' id='msg' autocomplete='false' placeholder='Whats on your mind?'><button class='message-send button' id='submit' value='Post!' onclick='dopostwizard()'><svg aria-hidden='true' role='img' class='sendIcon__461ff' width='16' height='16' viewBox='0 0 16 16'><path d='M8.2738 8.49222L1.99997 9.09877L0.349029 14.3788C0.250591 14.691 0.347154 15.0322 0.595581 15.246C0.843069 15.4597 1.19464 15.5047 1.48903 15.3613L15.2384 8.7032C15.5075 8.57195 15.6781 8.29914 15.6781 8.00007C15.6781 7.70101 15.5074 7.4282 15.2384 7.29694L1.49839 0.634063C1.20401 0.490625 0.852453 0.535625 0.604941 0.749376C0.356493 0.963128 0.259941 1.30344 0.358389 1.61563L2.00932 6.89563L8.27093 7.50312C8.52405 7.52843 8.71718 7.74125 8.71718 7.99531C8.71718 8.24938 8.52406 8.46218 8.27093 8.4875L8.2738 8.49222Z' fill='currentColor'></path></svg></button></div><div id='msgs' class='posts'></div>";
    var pageContainer = document.getElementById("nav");
    pageContainer.innerHTML = "<div class='navigation'><input type='button' class='navigation-button button' id='submit' value='Settings' onclick='loadstgs()'><input type='button' class='navigation-button button' id='submit' value='Logout' onclick='logout(false)'></div>";
    var psbox = document.getElementById("msg");
    document.getElementById("info").innerText = lul + " users online (" + sul + ")";
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.meower.org/home?autoget");
    xhttp.onload = () => {
        var c = JSON.parse(xhttp.response);
        var i = 24;
        while (i != 0) {
            i -= 1;
            console.log("Loading post: " + i.toString());
            loadpost(c["autoget"][i]);
        }
    };
    xhttp.send();
}

function logout(iskl) {
    if (iskl != true) {
        localStorage.clear();
        webSocket.close();
    }
    killme = true;
    document.getElementById("msgs").innerHTML = "";
    document.getElementById("nav").innerHTML = "";
    killme = false;
    main();
}

function loadstgs() {
    page = "settings";
    document.getElementById("msgs").innerHTML = "";
    document.getElementById("nav").innerHTML = "";
    var pageContainer = document.getElementById("main");
    pageContainer.innerHTML = "<div class='settings'><h1>Settings</h1><div class='msgs'></div><h2>Theme</h2><div id='ex' class='post'><div class='buttonContainer'><div class='toolbarContainer'><div class='toolButton'><svg viewBox='0 0 20 20' fill='currentColor' aria-hidden='true' width='18' height='18'><path d='M12.9297 3.25007C12.7343 3.05261 12.4154 3.05226 12.2196 3.24928L11.5746 3.89824C11.3811 4.09297 11.3808 4.40733 11.5739 4.60245L16.5685 9.64824C16.7614 9.84309 16.7614 10.1569 16.5685 10.3517L11.5739 15.3975C11.3808 15.5927 11.3811 15.907 11.5746 16.1017L12.2196 16.7507C12.4154 16.9477 12.7343 16.9474 12.9297 16.7499L19.2604 10.3517C19.4532 10.1568 19.4532 9.84314 19.2604 9.64832L12.9297 3.25007Z'></path><path d='M8.42616 4.60245C8.6193 4.40733 8.61898 4.09297 8.42545 3.89824L7.78047 3.24928C7.58466 3.05226 7.26578 3.05261 7.07041 3.25007L0.739669 9.64832C0.5469 9.84314 0.546901 10.1568 0.739669 10.3517L7.07041 16.7499C7.26578 16.9474 7.58465 16.9477 7.78047 16.7507L8.42545 16.1017C8.61898 15.907 8.6193 15.5927 8.42616 15.3975L3.43155 10.3517C3.23869 10.1569 3.23869 9.84309 3.43155 9.64824L8.42616 4.60245Z'></path></svg></div><div class='toolButton'><svg class='icon_d1ac81' width='24' height='24' viewBox='0 0 24 24'><path d='M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z' fill='currentColor'></path></svg></div></div></div><h3>Username</h3><p>This is example text <a href='https://example.com' target='_blank'>https://example.com</a>... <a href='https://gnaw.pages.dev/images/car.jpg' target='_blank' class='attachment'>attachment</a></p><a href='https://gnaw.pages.dev/images/car.jpg' target='_blank'><img src='https://gnaw.pages.dev/images/car.jpg' class='embed' width='300px'></img></a></div><label for='themeDropdown' style='display:none;'>Select Theme:</label><select id='themeDropdown' onchange='changeTheme()' value=''><option value='dark'>Dark Theme</option><option value='light'>Light Theme</option></select><hr><input type='button' class='navigation-button button' id='submit' value='Go Home' onclick='loadhome()'></div>";

}

function changeTheme() {
    const selectedTheme = document.getElementById("themeDropdown").value;
    document.documentElement.className = selectedTheme + "-theme";
    localStorage.setItem("theme", selectedTheme);
}

function ping() {
    webSocket.send(JSON.stringify({
        cmd: "ping",
        val: ""
    }));
}



main();
setInterval(ping, 5000);