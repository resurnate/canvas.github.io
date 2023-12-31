
const SESSION_TOKEN = 'session-token';
const SESSION_EXPIRES = 'session-expires';
const SESSION_USER = 'session-user';
const SESSION_DISCORD_URL = 'https://discord.com';
const SESSION_DISCORD_API = SESSION_DISCORD_URL+'/api';
const SESSION_DISCORD_AUTH = SESSION_DISCORD_API+'/oauth2/authorize'
const SESSION_DISCORD_AUTH_CLIENT = '1130981795589013535';
const SESSION_DISCORD_AUTH_REDIRECT = '/discord.html';
//const SESSION_DISCORD_USER = SESSION_DISCORD_API+'/users/@me';
const SESSION_HUB_AUTH_IMPLICIT = '/authn/implicit';
const SESSION_PROVIDER_DISCORD = 'discord';
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

function sessionDiscordAuthenticate() {
    let uri = SESSION_DISCORD_AUTH + '?';
    uri = uri + 'response_type=token';
    uri = uri + '&client_id=' + SESSION_DISCORD_AUTH_CLIENT;
    uri = uri + '&scope=identify';
    let redirect = window.location.origin + SESSION_DISCORD_AUTH_REDIRECT;
    uri = uri + '&redirect_uri=' + encodeURI(redirect);
    return uri;
}

function sessionDiscordAuthenticated() {
    let fragment = new URLSearchParams(window.location.hash.slice(1));
    let [accessToken, tokenType, expiresIn] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('expires_in')];
    if (!accessToken) {
        window.location.href = '/';
    } else {
        // Implicit grant
        postJsonThenJsonXhr(
            hubOrigin()+SESSION_HUB_AUTH_IMPLICIT,
            JSON.stringify({
                provider: SESSION_PROVIDER_DISCORD,
                access_token: accessToken,
                token_type: tokenType,
                expires_in: expiresIn
            }),
            true)
            .then((result) => {
                let data = JSON.parse(result);
                // XXX: This is obviously very insecure!!
                let jwt = data.jwt;
                localStorage.setItem(SESSION_TOKEN, jwt);
                let date = new Date();
                let expires = data.expires; // Seconds
                let expiresDate = date.setSeconds(date.getSeconds() + Number(expires));
                localStorage.setItem(SESSION_EXPIRES, expiresDate.toString());
                let user = data.whoami.moniker;
                localStorage.setItem(SESSION_USER, user);
            })
            .catch((err) => {
                console.log("Failed to grant implicit session: " + err);
            })
            .finally(() => {
                window.location.replace("/");
            });
        // fetch(SESSION_DISCORD_USER, {
        //     headers: {
        //         authorization: `${tokenType} ${accessToken}`,
        //     },
        // })
        //     .then(result => result.json())
        //     .then(response => {
        //         let { username, discriminator } = response;
        //         let user = `${username}#${discriminator}`
        //         localStorage.setItem(SESSION_USER, user);
        //         window.location.replace("/");
        //     })
        //     .catch(console.error);
    }
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
    loginElement.text = String.fromCharCode(0x2348)+' Login';
    loginElement.href = sessionDiscordAuthenticate();
    // Uncomment when testing!
    // loginElement.href = 'javascript:';
    // let onclick = 'sessionAuthLoginMock()';
    // loginElement.setAttribute('onclick',onclick);
    contentElement.appendChild(loginElement);
}

function sessionUiInitLogout() {
    let contentElement = document.getElementById(SESSION_ELEMENT_CONTENT);

    // XXX: For testing purposes only!
    let testElement = document.createElement('a');
    testElement.text = 'Test';
    testElement.href = 'javascript:void(0);';
    testElement.style.marginRight = '10px';
    let onclick = 'testUserFindAll()';
    testElement.setAttribute('onclick',onclick);
    contentElement.appendChild(testElement);

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
    onclick = 'sessionAuthLogoutMock()';
    logoutElement.setAttribute('onclick',onclick);
    contentElement.appendChild(logoutElement);
}

function testUserFindAll() {
    const url=hubOrigin()+'/users/find/all';
    const token = localStorage.getItem(SESSION_TOKEN);
    const headers = [];
    headers.push({
        name: 'Authorization',
        value: `Bearer ${token}`
    });
    headers.push({
        name: 'Accept',
        value: 'application/json; charset=UTF-8'
    });
    doXhr('GET', url, undefined, headers, true)
        .then((result) => {
            let data = JSON.parse(result);
            console.log("Result: " + JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Failed to find all users: " + err);
        })
}