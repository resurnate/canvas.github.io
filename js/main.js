
const IMAGE_PATHNAME = '/img/';
const IMAGE_SUFFIX = '.png';
const CANVAS_CONTEXT = '2d';
const SAMPLE_PATHNAME = '/doc/sample.json';
const PLAY_PATHNAME = '/doc/play.json';

function hubOrigin() {
    let r;
    let origin = window.location.origin;
    if (origin.startsWith('http://localhost:3001')) {
        r = 'http://localhost:3000';
    } else {
        r = 'https://resurnate.cyclic.app';
    }
    return r;
}

function postJsonThenJsonXhr(url, content) {
    let headers = [];
    headers.push({
        name: 'Content-Type',
        value: 'application/json; charset=UTF-8'
    });
    headers.push({
        name: 'Accept',
        value: 'application/json; charset=UTF-8'
    });
    return doXhr('POST', url, content, headers);
}

function doXhr(method, url, content, headers) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            } else if (xhr.readyState === 4) {
                reject(xhr.status);
            }
        });
        xhr.open(method, url);
        if (headers) {
            for (let header of headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (content === undefined) {
            xhr.send();
        } else {
            xhr.send(content);
        }
    });
}

function fetchJson(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            } else if (xhr.readyState === 4) {
                reject(xhr.status);
            }
        });
        xhr.open('GET', url);
        xhr.send();
    });
}

function parseImages(input) {
    let r = [];
    for (let ip of input.panels) {
        r.push(ip.image);
    }
    return r;
}

function prepareImages(origin,labels) {
    let r = [];
    for (let label of labels) {
        let ru = origin + IMAGE_PATHNAME + label + IMAGE_SUFFIX;
        r.push(ru);
    }
    return r;
}

function loadImages(urls,callbackOk,callbackErr) {
    let r = [];
    let rl= 0;     // Images loaded
    let rc= false; // Error caught?
    for (let i = 0; i < urls.length; i++) {
        let ru = urls[i];
        let ri = new Image();
        r.push(ri);
        ri.onload = function() {
            rl++;
            if (rl >= urls.length) {  // All images are loaded
                callbackOk(r);
            }
        };
        ri.onerror=function() { // Caught error
            if (rc === false) {
                rc = true;
                callbackErr(ru);
            }
        }
        ri.src = ru;
    }
}

function toggleElement(id) {
    let r = false;
    let e = document.getElementById(id);
    if ((e.style.display === '') || (e.style.display === 'block')) {
        e.style.display = 'none';
    } else {
        e.style.display = 'block';
        r = true;
    }
    return r;
}
