
const SESSION_TOKEN = 'session-token';
const SESSION_EXPIRES = 'session-expires';
const SESSION_USER = 'session-user';
const SESSION_ELEMENT_CONTAINER = 'session';
const SESSION_ELEMENT_CONTENT = 'session-content';

function sessionAuthLoginMock() {
    const nowMs = Date.now();
    const expireMs = nowMs + (10*1000); // 10 seconds
    localStorage.setItem(SESSION_TOKEN, 'MOCK');
    localStorage.setItem(SESSION_EXPIRES, expireMs.toString());
    localStorage.setItem(SESSION_USER, 'MOCK');
    sessionUiInit();
}

function sessionAuthLogoutMock() {
    sessionAuthRevoke();
    sessionUiInit();
}

function sessionAuthRevoke() {
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(SESSION_EXPIRES);
    localStorage.removeItem(SESSION_USER);
    // XXX: To be completed!
    // https://discordapp.com/api/oauth2/token/revoke
}

function sessionUiInit() {
    // Prepare
    let contentElement = document.getElementById(SESSION_ELEMENT_CONTENT);
    if (contentElement !== null) {
        contentElement.remove();
    }
    let sessionElement = document.getElementById(SESSION_ELEMENT_CONTAINER);
    contentElement = document.createElement('div');
    contentElement.id = SESSION_ELEMENT_CONTENT;
    contentElement.className = 'content';
    sessionElement.appendChild(contentElement);
    // Refresh
    const token = localStorage.getItem(SESSION_TOKEN);
    if (token === null) {
        sessionUiInitLogin();
    } else {
        const nowMs = Date.now();
        const expireMs = Number(localStorage.getItem(SESSION_EXPIRES));
        if (nowMs >= expireMs) {
            sessionAuthRevoke();
            sessionUiInitLogin();
        } else {
            sessionUiInitLogout();
        }
    }
}

function sessionUiInitLogin() {
    let contentElement = document.getElementById(SESSION_ELEMENT_CONTENT);
    // Login
    let loginElement = document.createElement('a');
    loginElement.text = String.fromCharCode(0x2386)+' Login';
    // loginElement.href = 'https://discord.com/api/oauth2/authorize?client_id=1130981795589013535&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fdiscord.html&response_type=token&scope=identify';
    // Uncomment when testing!
    loginElement.href = 'javascript:';
    let onclick = 'sessionAuthLoginMock()';
    loginElement.setAttribute('onclick',onclick);
    contentElement.appendChild(loginElement);
}

function sessionUiInitLogout() {
    let contentElement = document.getElementById(SESSION_ELEMENT_CONTENT);
    // User
    let userElement = document.createElement('span');
    userElement.innerHTML = 'Hello '+localStorage.getItem(SESSION_USER);
    contentElement.appendChild(userElement);
    // Logout
    let logoutElement = document.createElement('a');
    logoutElement.text = String.fromCharCode(0x2347)+' Logout';
    // logoutElement.style.fontSize = '24px';
    // Uncomment when testing!
    logoutElement.href = 'javascript:';
    let onclick = 'sessionAuthLogoutMock()';
    logoutElement.setAttribute('onclick',onclick);
    contentElement.appendChild(logoutElement);
}
