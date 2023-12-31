
//
// I N I T I A L I Z E
//

let nextPanelId;
let peekPanelId;

const ELEMENT_SECTIONS = 'panel-sections';
const ELEMENT_ATTRIBUTION_SECTION = 'attribution-section';
const ELEMENT_ATTRIBUTION_SECTION_HEADER = 'attribution-header';
const ELEMENT_ATTRIBUTION_SECTION_CONTENT = 'attribution-content';
const ELEMENT_ATTRIBUTION_TOGGLE = 'attribution-toggle';
const ELEMENT_ATTRIBUTION_LAYOUT = 'attribution-layout';
const ELEMENT_ATTRIBUTION_AREA_ACTION = 'attribution-action';
const ELEMENT_ATTRIBUTION_AREA_INPUT = 'wizard-attribution-content';
const ELEMENT_ATTRIBUTION_ACTION_LOAD = 'strip-load';
const ELEMENT_ATTRIBUTION_ACTION_PREVIEW = 'strip-preview';
const ELEMENT_ATTRIBUTION_TITLE = 'attribution-title';
const ELEMENT_ATTRIBUTION_AUTHOR = 'attribution-author';
const ELEMENT_COVER_SECTION = 'cover-section';
const ELEMENT_COVER_SECTION_HEADER = 'cover-header';
const ELEMENT_COVER_SECTION_CONTENT = 'cover-content';
const ELEMENT_COVER_TOGGLE = 'cover-toggle';
const ELEMENT_COVER_LAYOUT = 'cover-layout';
const ELEMENT_COVER_AREA_ACTION = 'cover-action';
const ELEMENT_COVER_AREA_PEEK = 'cover-peek';
const ELEMENT_COVER_CANVAS = 'cover-canvas';
const ELEMENT_COVER_IMAGE = 'cover-image';
const ELEMENT_PANEL_PREFIX = 'p';
const ELEMENT_PANEL_DELIMITER = '-';
const ELEMENT_PANEL_SECTION_SUFFIX = ELEMENT_PANEL_DELIMITER+'section';
const ELEMENT_PANEL_SECTION_HEADER_SUFFIX = ELEMENT_PANEL_DELIMITER+'header';
const ELEMENT_PANEL_SECTION_CONTENT_SUFFIX = ELEMENT_PANEL_DELIMITER+'content';
const ELEMENT_PANEL_TOGGLE_SUFFIX = ELEMENT_PANEL_DELIMITER+'toggle';
const ELEMENT_PANEL_LAYOUT_SUFFIX = ELEMENT_PANEL_DELIMITER+'panel';
const ELEMENT_PANEL_AREA_ACTION_SUFFIX = ELEMENT_PANEL_DELIMITER+'action';
const ELEMENT_PANEL_AREA_BUBBLE_SUFFIX = ELEMENT_PANEL_DELIMITER+'bubble';
const ELEMENT_PANEL_AREA_CAPTION_SUFFIX = ELEMENT_PANEL_DELIMITER+'caption';
const ELEMENT_PANEL_AREA_PEEK_SUFFIX = ELEMENT_PANEL_DELIMITER+'peek';
const ELEMENT_PANEL_AREA_JSON_SUFFIX = ELEMENT_PANEL_DELIMITER+'json';
const ELEMENT_PANEL_BUBBLE_PREFIX = 'b';
const ELEMENT_PANEL_CAPTION_PREFIX = 'c';
const ELEMENT_PANEL_CANVAS_SUFFIX = ELEMENT_PANEL_DELIMITER+'canvas';
const ELEMENT_PANEL_PRE_SUFFIX = ELEMENT_PANEL_DELIMITER+'pre';
const ELEMENT_MODAL_SECTION = 'modal';
const ELEMENT_MODAL_AREA_PREVIEW = 'modal-preview';
const ELEMENT_MODAL_CLOSE = 'modal-close';
const ELEMENT_MODAL_CANVAS = 'modal-canvas';

function _initPage() {
    // Session
    sessionUiInit();
    // Attribution
    let sectionsElement = document.getElementById(ELEMENT_SECTIONS);
    let attributionElement = _initAttributionSection();
    sectionsElement.appendChild(attributionElement);
    // Cover
    let coverElement = _initCoverSection();
    sectionsElement.appendChild(coverElement);
    // Panels
    _initPanelSections(sectionsElement,4,1);
    // Modal
    _initModalSection();
}

function _initAttributionSection() {
    // Create section
    let sectionElement = document.createElement('section');
    sectionElement.id = ELEMENT_ATTRIBUTION_SECTION;
    sectionElement.className = 'wizard-section';
    // Create header
    _initAttributionHeader(sectionElement);
    // Create content
    _initAttributionContent(sectionElement);
    return sectionElement;
}

function _initAttributionHeader(sectionElement) {
    let headerElement = document.createElement('div');
    headerElement.id = ELEMENT_ATTRIBUTION_SECTION_HEADER;
    headerElement.className = 'wizard-header';
    sectionElement.appendChild(headerElement);
    // Toggle
    let toggleLabel = 'Strip';
    let toggleElement = document.createElement('a');
    toggleElement.id = ELEMENT_ATTRIBUTION_TOGGLE;
    toggleElement.href = 'javascript:';
    toggleElement.text = _uiToggleText(true,toggleLabel);
    let onclick =
        '_uiToggle("'+
        ELEMENT_ATTRIBUTION_SECTION_CONTENT+'","'+
        ELEMENT_ATTRIBUTION_TOGGLE+'","'+
        toggleLabel+'")';
    toggleElement.setAttribute('onclick',onclick);
    headerElement.appendChild(toggleElement);
}

function _initAttributionContent(sectionElement) {
    let contentElement = document.createElement('div');
    contentElement.id = ELEMENT_ATTRIBUTION_SECTION_CONTENT;
    sectionElement.appendChild(contentElement);
    // Layout
    let layoutElement = document.createElement('div');
    layoutElement.id = ELEMENT_ATTRIBUTION_LAYOUT;
    layoutElement.className = 'wizard-attribution';
    contentElement.appendChild(layoutElement);
    // Area: Action
    _initAttributionAction(layoutElement);
    // Area: Input
    _initAttributionInput(layoutElement);
}

function _initAttributionAction(layoutElement) {
    // Area
    let areaElement = document.createElement('div');
    areaElement.id = ELEMENT_ATTRIBUTION_AREA_ACTION;
    areaElement.className = 'wizard-attribution-action';
    layoutElement.appendChild(areaElement);
    // Load
    let loadElement = document.createElement('input');
    loadElement.id = ELEMENT_ATTRIBUTION_ACTION_LOAD;
    loadElement.type = 'button';
    loadElement.value = 'LOAD';
    loadElement.className = 'button';
    let onclick = '_actionLoad()';
    loadElement.setAttribute('onclick', onclick);
    areaElement.appendChild(loadElement);
    // Preview
    let previewElement = document.createElement('input');
    previewElement.id = ELEMENT_ATTRIBUTION_ACTION_PREVIEW;
    previewElement.type = 'button';
    previewElement.value = 'PREVIEW';
    previewElement.className = 'button';
    onclick = '_actionPreview()';
    previewElement.setAttribute('onclick', onclick);
    areaElement.appendChild(previewElement);
}

function _initAttributionInput(layoutElement) {
    // Area
    let areaElement = document.createElement('div');
    areaElement.className = ELEMENT_ATTRIBUTION_AREA_INPUT;
    layoutElement.appendChild(areaElement);
    // Title
    let itemElement = document.createElement('div');
    itemElement.className = 'wizard-attribution-group';
    areaElement.appendChild(itemElement);
    let labelElement = document.createElement('label');
    labelElement.innerHTML = 'Title';
    labelElement.htmlFor = ELEMENT_ATTRIBUTION_TITLE;
    itemElement.appendChild(labelElement);
    let titleElement = document.createElement('input');
    titleElement.id = ELEMENT_ATTRIBUTION_TITLE;
    titleElement.type = 'text';
    titleElement.name = ELEMENT_ATTRIBUTION_TITLE;
    titleElement.value = 'Something catchy';
    itemElement.appendChild(titleElement);
    // Author
    itemElement = document.createElement('div');
    itemElement.className = 'wizard-attribution-group';
    areaElement.appendChild(itemElement);
    labelElement = document.createElement('label');
    labelElement.innerHTML = 'Author';
    labelElement.htmlFor = ELEMENT_ATTRIBUTION_AUTHOR;
    itemElement.appendChild(labelElement);
    let authorElement = document.createElement('input');
    authorElement.id = ELEMENT_ATTRIBUTION_AUTHOR;
    authorElement.type = 'text';
    authorElement.name = ELEMENT_ATTRIBUTION_AUTHOR;
    authorElement.value = 'Pen name';
    itemElement.appendChild(authorElement);
}

function _initCoverSection() {
    // Create section
    let sectionElement = document.createElement('section');
    sectionElement.id = ELEMENT_COVER_SECTION;
    sectionElement.className = 'wizard-section';
    // Create header
    _initCoverHeader(sectionElement);
    // Create content
    _initCoverContent(sectionElement);
    return sectionElement;
}

function _initCoverHeader(sectionElement) {
    let headerElement = document.createElement('div');
    headerElement.id = ELEMENT_COVER_SECTION_HEADER;
    headerElement.className = 'wizard-header';
    sectionElement.appendChild(headerElement);
    // Toggle
    let toggleLabel = 'Cover';
    let toggleElement = document.createElement('a');
    toggleElement.id = ELEMENT_COVER_TOGGLE;
    toggleElement.href = 'javascript:';
    toggleElement.text = _uiToggleText(true,toggleLabel);
    let onclick =
        '_uiToggle("'+
        ELEMENT_COVER_SECTION_CONTENT+'","'+
        ELEMENT_COVER_TOGGLE+'","'+
        toggleLabel+'")';
    toggleElement.setAttribute('onclick',onclick);
    headerElement.appendChild(toggleElement);
}

function _initCoverContent(sectionElement) {
    let contentElement = document.createElement('div');
    contentElement.id = ELEMENT_COVER_SECTION_CONTENT;
    sectionElement.appendChild(contentElement);
    // Layout
    let layoutElement = document.createElement('div');
    layoutElement.id = ELEMENT_COVER_LAYOUT;
    layoutElement.className = 'wizard-cover';
    contentElement.appendChild(layoutElement);
    // Area: Action
    _initCoverAction(layoutElement);
    // Area: Peek
    _initCoverPeek(layoutElement);
}

function _initCoverAction(layoutElement) {
    // Area
    let areaElement = document.createElement('div');
    areaElement.id = ELEMENT_COVER_AREA_ACTION;
    areaElement.className = 'wizard-cover-action';
    layoutElement.appendChild(areaElement);
    // Peek
    let peekElement = document.createElement('input');
    peekElement.type = 'button';
    peekElement.value = 'PEEK';
    peekElement.className = 'button';
    let onclick = '_coverPeek()';
    peekElement.setAttribute('onclick',onclick);
    areaElement.appendChild(peekElement);
    // Hide
    let hideElement = document.createElement('input');
    hideElement.type = 'button';
    hideElement.value = 'HIDE';
    hideElement.className = 'button';
    onclick = '_coverHide()';
    hideElement.setAttribute('onclick',onclick);
    areaElement.appendChild(hideElement);
}

function _initCoverPeek(layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = ELEMENT_COVER_AREA_PEEK;
    areaElement.className = 'wizard-cover-peek';
    layoutElement.appendChild(areaElement);
}

function _initPanelSections(sectionsElement,sections,open) {
    nextPanelId = 1;
    peekPanelId = '';
    for (let i = 0; i < sections; i++) {
        // Opening first panel
        let panelElement = _initPanelSection((i + 1) === open);
        sectionsElement.appendChild(panelElement);
        nextPanelId += 1;
    }
}

function _initPanelSection(panelOpen) {
    // Create section
    let panelId = ELEMENT_PANEL_PREFIX + nextPanelId;
    let sectionElement = document.createElement('section');
    sectionElement.id = panelId + ELEMENT_PANEL_SECTION_SUFFIX;
    sectionElement.className = 'wizard-section';
    // Create header
    _initPanelHeader(sectionElement,panelId,panelOpen);
    // Create content
    _initPanelContent(sectionElement,panelId,panelOpen);
    return sectionElement;
}

function _initPanelHeader(sectionElement,panelId,panelOpen) {
    let headerElement = document.createElement('div');
    headerElement.id = panelId + ELEMENT_PANEL_SECTION_HEADER_SUFFIX;
    headerElement.className = 'wizard-header';
    sectionElement.appendChild(headerElement);
    // Toggle
    let toggleLabel = 'Panel';
    let toggleContent = panelId + ELEMENT_PANEL_SECTION_CONTENT_SUFFIX;
    let toggleElement = document.createElement('a');
    toggleElement.id = panelId + ELEMENT_PANEL_TOGGLE_SUFFIX;
    toggleElement.href = 'javascript:';
    toggleElement.text = _uiToggleText(panelOpen,toggleLabel);
    let onclick = '_uiToggle("'+
        toggleContent+'","'+
        toggleElement.id+'","'+
        toggleLabel+'")';
    toggleElement.setAttribute('onclick',onclick);
    headerElement.appendChild(toggleElement);
    // Action
    let actionElement = document.createElement('a');
    actionElement.className = 'wizard-header-action';
    headerElement.appendChild(actionElement);
    // Add
    let addElement = document.createElement('a');
    addElement.href = 'javascript:';
    addElement.text = String.fromCharCode(0x002B);
    onclick = '_uiPanelAdd("'+panelId+'")';
    addElement.setAttribute('onclick',onclick);
    actionElement.appendChild(addElement);
    // Remove
    let removeElement = document.createElement('a');
    removeElement.href = 'javascript:';
    removeElement.text = String.fromCharCode(0x00D7);
    onclick = '_uiPanelRemove("'+panelId+'")';
    removeElement.setAttribute('onclick',onclick);
    actionElement.appendChild(removeElement);
}

function _initPanelContent(sectionElement,panelId,panelOpen) {
    let contentElement = document.createElement('div');
    contentElement.id = panelId + ELEMENT_PANEL_SECTION_CONTENT_SUFFIX;
    if (!panelOpen) {
        contentElement.style = 'display: none';
    }
    sectionElement.appendChild(contentElement);
    // Layout
    let layoutElement = document.createElement('div');
    layoutElement.id = panelId + ELEMENT_PANEL_LAYOUT_SUFFIX;
    layoutElement.className = 'wizard-panel';
    contentElement.appendChild(layoutElement);
    // Area: Action
    _initPanelAction(panelId,layoutElement);
    // Area: Bubble
    _initPanelInputBubble(panelId,layoutElement);
    // Area: Caption
    _initPanelInputCaption(panelId,layoutElement);
    // Area: Peek
    _initPanelPeek(panelId,layoutElement);
    // Area: JSON
    _initPanelJson(panelId,layoutElement);
}

function _initPanelAction(panelId,layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = panelId + ELEMENT_PANEL_AREA_ACTION_SUFFIX;
    areaElement.className = 'wizard-action';
    layoutElement.appendChild(areaElement);
    // Peek
    let peekElement = document.createElement('input');
    peekElement.type = 'button';
    peekElement.value = 'PEEK';
    peekElement.className = 'button';
    let onclick = '_actionPeek("'+panelId+'")';
    peekElement.setAttribute('onclick',onclick);
    areaElement.appendChild(peekElement);
    // JSON
    let jsonElement = document.createElement('input');
    jsonElement.type = 'button';
    jsonElement.value = 'JSON';
    jsonElement.className = 'button';
    onclick = '_actionPeekJson("'+panelId+'")';
    jsonElement.setAttribute('onclick',onclick);
    areaElement.appendChild(jsonElement);
    // Hide
    let hideElement = document.createElement('input');
    hideElement.type = 'button';
    hideElement.value = 'HIDE';
    hideElement.className = 'button';
    onclick = '_actionPeekHide("'+panelId+'")';
    hideElement.setAttribute('onclick',onclick);
    areaElement.appendChild(hideElement);
}

function _initPanelInputBubble(panelId,layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = panelId + ELEMENT_PANEL_AREA_BUBBLE_SUFFIX;
    areaElement.className = 'wizard-bubble';
    layoutElement.appendChild(areaElement);
    _initPanelInputBubbleImage(panelId,areaElement);
    _initPanelInputBubbleText(panelId,areaElement);
}

function _initPanelInputBubbleImage(panelId,areaElement) {
    let headerElement = document.createElement('h3');
    headerElement.innerHTML = 'Bubble Image';
    areaElement.appendChild(headerElement);
    let labelFor = panelId + ELEMENT_PANEL_BUBBLE_PREFIX;
    let labelElement = document.createElement('label');
    labelElement.innerHTML = 'Choose: &nbsp; ';
    labelElement.htmlFor = labelFor;
    areaElement.appendChild(labelElement);
    let selectElement = document.createElement('select');
    selectElement.id = labelFor;
    selectElement.name = labelFor;
    areaElement.appendChild(selectElement);
    for (let label of BUBBLE_LABELS) {
        let optionElement = document.createElement('option');
        optionElement.value = label;
        optionElement.text = label;
        selectElement.appendChild(optionElement);
    }
}

function _initPanelInputBubbleText(panelId,areaElement) {
    let headerElement = document.createElement('h3');
    headerElement.innerHTML = 'Bubble Text';
    areaElement.appendChild(headerElement);
    for (let i = 1; i <= 3; i++) {
        let labelFor = panelId + ELEMENT_PANEL_BUBBLE_PREFIX + i;
        let labelElement = document.createElement('label');
        let labelHtml = i;
        if (i === 1) {
            labelHtml = labelHtml+' (Top)';
        } else if (i === 3) {
            labelHtml = labelHtml+' (Bottom)';
        } else {
            labelHtml = labelHtml+' (Between)';
        }
        labelElement.innerHTML = labelHtml;
        labelElement.htmlFor = labelFor;
        areaElement.appendChild(labelElement);
        let textareaElement = document.createElement('textarea');
        textareaElement.id = labelFor;
        textareaElement.name = labelFor;
        textareaElement.value = i;
        textareaElement.rows = 3;
        areaElement.appendChild(textareaElement);
    }
}

function _initPanelInputCaption(panelId,layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = panelId + ELEMENT_PANEL_AREA_CAPTION_SUFFIX;
    areaElement.className = 'wizard-caption';
    layoutElement.appendChild(areaElement);
    _initPanelInputCaptionText(panelId,areaElement);
}


function _initPanelInputCaptionText(panelId,areaElement) {
    let headerElement = document.createElement('h3');
    headerElement.innerHTML = 'Caption Text';
    areaElement.appendChild(headerElement);
    for (let i = 1; i <= 4; i++) {
        let labelFor = panelId + ELEMENT_PANEL_CAPTION_PREFIX + i;
        let labelElement = document.createElement('label');
        let labelHtml = i;
        let textValue = i;
        if (i === 1) {
            labelHtml = labelHtml+' (Upper Left)';
            textValue = 'Where';
        } else if (i === 2) {
            labelHtml = labelHtml+' (Upper Right)';
            textValue = 'When';
        } else if (i === 3) {
            labelHtml = labelHtml+' (Lower Left)';
            textValue = 'From Who\n(Emotion)';
        } else {
            labelHtml = labelHtml+' (Lower Right)';
            textValue = 'To Who\n(Emotion)';
        }
        labelElement.innerHTML = labelHtml;
        labelElement.htmlFor = labelFor;
        areaElement.appendChild(labelElement);
        let textareaElement = document.createElement('textarea');
        textareaElement.id = labelFor;
        textareaElement.name = labelFor;
        textareaElement.value = textValue;
        textareaElement.rows = 3;
        areaElement.appendChild(textareaElement);
    }
}

function _initPanelPeek(panelId,layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = panelId + ELEMENT_PANEL_AREA_PEEK_SUFFIX;
    areaElement.className = 'wizard-peek';
    layoutElement.appendChild(areaElement);
}

function _initPanelJson(panelId,layoutElement) {
    let areaElement = document.createElement('div');
    areaElement.id = panelId + ELEMENT_PANEL_AREA_JSON_SUFFIX;
    areaElement.className = 'wizard-json';
    layoutElement.appendChild(areaElement);
}

function _initModalSection() {
    let modalElement = document.getElementById(ELEMENT_MODAL_SECTION);
    // When modal (x) clicked, close it
    let closeElement = document.getElementById(ELEMENT_MODAL_CLOSE);
    closeElement.onclick = function() {
        modalElement.style.display = 'none';
    }
    // When anywhere outside modal clicked, close it
    window.onclick = function(event) {
        if (event.target === modalElement) {
            modalElement.style.display = 'none';
        }
    }
}

function _destroyPanelSections(sectionsElement) {
    // Find panel section elements
    let es = [];
    for (let e of sectionsElement.childNodes) {
        if (e.id !== undefined) {
            if (e.id.startsWith(ELEMENT_PANEL_PREFIX) &&
                e.id.endsWith(ELEMENT_PANEL_SECTION_SUFFIX)) {
                es.push(e);
            }
        }
    }
    // Remove elements
    for (let i = 0; i < es.length; i++) {
        es[i].remove();
    }
}

//
// L O A D
//

function _loadPage() {
    let origin = document.location.origin;
    let url = origin+PLAY_PATHNAME;
    fetchJson(url)
        .then((result) => {
            let data = JSON.parse(result);
            _loadAttributionInput(data);
            _coverHide();
            let sectionsElement = document.getElementById(ELEMENT_SECTIONS);
            _destroyPanelSections(sectionsElement);
            _initPanelSections(sectionsElement,data.panels.length,data.panels.length);
            for (let i = 0; i < data.panels.length; i++) {
                let panelId = ELEMENT_PANEL_PREFIX + (i + 1);
                let panelData = data.panels[i];
                _loadPanelInputBubbleImage(panelId,panelData);
                _loadPanelInputBubbleText(panelId,panelData);
                _loadPanelInputCaptionText(panelId,panelData);
            }
        })
        .catch(() => {
            alert("Failed to load file: " + url);
        });
}

function _loadAttributionInput(data) {
    // Title
    let titleElement = document.getElementById(ELEMENT_ATTRIBUTION_TITLE);
    titleElement.value = data.title;
    // Author
    let authorElement = document.getElementById(ELEMENT_ATTRIBUTION_AUTHOR);
    authorElement.value = data.author;
}

function _loadPanelInputBubbleImage(panelId,panelData) {
    let id = panelId + ELEMENT_PANEL_BUBBLE_PREFIX;
    let selectElement = document.getElementById(id);
    selectElement.value = panelData.image;
}

function _loadPanelInputBubbleText(panelId,panelData) {
    for (let i = 1; i <= 3; i++) {
        let id = panelId + ELEMENT_PANEL_BUBBLE_PREFIX + i;
        let text = '';
        for (let j = 0; j < panelData.bubbles.length; j++) {
            let bubble = panelData.bubbles[j];
            if (i === bubble.position) {
                text = loadPanelText(bubble.text);
                break;
            }
        }
        let textareaElement = document.getElementById(id);
        textareaElement.value = text;
    }
}

function _loadPanelInputCaptionText(panelId,panelData) {
    for (let i = 1; i <= 4; i++) {
        let id = panelId + ELEMENT_PANEL_CAPTION_PREFIX + i;
        let text = '';
        for (let j = 0; j < panelData.captions.length; j++) {
            let caption = panelData.captions[j];
            if (i === caption.position) {
                text = loadPanelText(caption.text);
                break;
            }
        }
        let textareaElement = document.getElementById(id);
        textareaElement.value = text;
    }
}

//
// I N P U T
//

let input;

function _inputPreview() {
    input = _inputAttribution();
    input.panels = _inputPanels();
}

function _inputCover() {
    input = _inputAttribution();
    input.panels = [];
}

function _inputPeek(panelId) {
    input = _inputAttribution();
    input.panels = [];
    input.panels.push(_inputPanel(panelId));
}

function _inputAttribution() {
    let r = {};
    r.version = '1';
    r.id = new Date().getFullYear() + '-000';
    r.title = document.getElementById(ELEMENT_ATTRIBUTION_TITLE).value;
    r.author = document.getElementById(ELEMENT_ATTRIBUTION_AUTHOR).value;
    return r;
}

function _inputPanels() {
    let r = [];
    let es = document.getElementById(ELEMENT_SECTIONS);
    for (let e of es.childNodes) {
        if (e.id !== undefined) {
            if (e.id.startsWith(ELEMENT_PANEL_PREFIX) &&
                e.id.endsWith(ELEMENT_PANEL_SECTION_SUFFIX)) {
                let vs = e.id.split(ELEMENT_PANEL_DELIMITER);
                let panelId = vs[0];
                r.push(_inputPanel(panelId));
            }
        }
    }
    return r;
}

function _inputPanel(panelId) {
    // Parse image
    let ebl = panelId+ELEMENT_PANEL_BUBBLE_PREFIX;
    let bl = document.getElementById(ebl).value;
    let bc = parsePanelBubbleCount(bl);
    // Parse bubbles
    let bs = [];
    for (let i = 0; i < bc; i++) {
        let bp = i + 1;
        let ebts = ebl+bp;
        let bts = document.getElementById(ebts).value;
        let b = {
            position: bp,
            text: parsePanelText(bts)
        };
        bs.push(b);
    }
    // Parse captions
    let ecl = panelId+ELEMENT_PANEL_CAPTION_PREFIX;
    let cs = [];
    for (let i = 0; i < 4; i++) {
        let cp = i + 1;
        let ects = ecl+cp;
        let cts = document.getElementById(ects).value;
        let c = {
            position: cp,
            text: parsePanelText(cts)
        };
        cs.push(c);
    }
    // Return
    return {
        image: bl,
        bubbles: bs,
        captions: cs
    };
}

//
// U S E R   I N T E R F A C E
//

function _uiToggle(content,toggle,label) {
    let open = toggleElement(content);
    let header = document.getElementById(toggle);
    header.text = _uiToggleText(open,label);
}

function _uiToggleText(open,label) {
    let charCode = open ? 0x21F1 : 0x21F2;
    let direction = String.fromCharCode(charCode);
    return direction+' '+label;
}

function _uiPanelAdd(panelId) {
    let sectionsElement = document.getElementById(ELEMENT_SECTIONS);
    // Find next sibling
    let sectionId = panelId + ELEMENT_PANEL_SECTION_SUFFIX;
    let siblingElement;
    let found = false;
    for (let childElement of sectionsElement.childNodes) {
        if (childElement.id !== undefined) {
            if (childElement.id === sectionId) {
                found = true;
            } else if (found) {
                siblingElement = childElement;
                break;
            }
        }
    }
    // Insert before sibling
    let sectionElement = _initPanelSection(true);
    if (siblingElement === undefined) {
        // Last panel section
        sectionsElement.appendChild(sectionElement);
    } else {
        sectionsElement.insertBefore(sectionElement, siblingElement);
    }
    nextPanelId += 1;
}

function _uiPanelRemove(panelId) {
    let sectionsElement = document.getElementById(ELEMENT_SECTIONS);
    // Find next sibling
    let sectionId = panelId + ELEMENT_PANEL_SECTION_SUFFIX;
    for (let childElement of sectionsElement.childNodes) {
        if (childElement.id !== undefined) {
            if (childElement.id === sectionId) {
                childElement.remove();
                break;
            }
        }
    }
}

//
// A C T I O N
//

function _actionLoad() {
    _loadPage();
}

function _actionPreview() {
    // Remove previous
    let canvasElement = document.getElementById(ELEMENT_MODAL_CANVAS);
    if (canvasElement !== null) {
        let previewElement = document.getElementById(ELEMENT_MODAL_AREA_PREVIEW);
        previewElement.removeChild(canvasElement);
    }
    // Parse input, preload images and draw
    _inputPreview();
    let imageURLs = _miscPrepareImages(input);
    loadImages(imageURLs,_drawPreview,_miscLoadImagesError);
}

function _drawPreview(images) {
    // Prepare
    let canvasElement = document.createElement('canvas');
    let canvasContext = canvasElement.getContext(CANVAS_CONTEXT);
    let canvasPrepared = prepareCanvas(canvasContext,input,images);
    // Draw
    canvasElement.id = ELEMENT_MODAL_CANVAS;
    canvasElement.width = canvasPrepared.w;
    canvasElement.height = canvasPrepared.h;
    let previewElement = document.getElementById(ELEMENT_MODAL_AREA_PREVIEW);
    previewElement.appendChild(canvasElement);
    let modalElement = document.getElementById(ELEMENT_MODAL_SECTION);
    modalElement.style.display = "block";
    drawCanvas(canvasPrepared, false);
}

function _coverPeek() {
    // Remove previous
    let peekElement = document.getElementById(ELEMENT_COVER_AREA_PEEK);
    let canvasElement =  document.getElementById(ELEMENT_COVER_CANVAS);
    if (canvasElement !== null) {
        peekElement.removeChild(canvasElement);
    }
    let imageElement =  document.getElementById(ELEMENT_COVER_IMAGE);
    if (imageElement !== null) {
        peekElement.removeChild(imageElement);
    }
    // Parse input, preload images and draw
    _inputCover();
    let imageURLs = _miscPrepareCover();
    loadImages(imageURLs,_drawCover,_miscLoadImagesError);
}

function _drawCover(images) {
    // Prepare canvas
    let canvasElement = document.createElement('canvas');
    let canvasContext = canvasElement.getContext(CANVAS_CONTEXT);
    let canvasPrepared = prepareCover(canvasContext,input,images[0]);
    // Draw canvas (hidden)
    canvasElement.id = ELEMENT_COVER_CANVAS;
    canvasElement.width = canvasPrepared.w;
    canvasElement.height = canvasPrepared.h;
    // canvasElement.style.display = 'none';
    let peekElement = document.getElementById(ELEMENT_COVER_AREA_PEEK);
    peekElement.style.display = 'flex';
    // peekElement.appendChild(canvasElement);
    drawCover(canvasPrepared);
    // Draw image
    let imgElement = document.createElement('img');
    imgElement.id = ELEMENT_COVER_IMAGE;
    imgElement.src = canvasElement.toDataURL();
    peekElement.appendChild(imgElement);
}

function _coverHide() {
    let peekElement = document.getElementById(ELEMENT_COVER_AREA_PEEK);
    peekElement.style.display = 'none';
}

function _actionPeek(panelId) {
    // Remove previous
    let canvasElement =  document.getElementById(panelId+ELEMENT_PANEL_CANVAS_SUFFIX);
    if (canvasElement !== null) {
        let peekElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_PEEK_SUFFIX);
        peekElement.removeChild(canvasElement);
    }
    let preElement =  document.getElementById(panelId+ELEMENT_PANEL_PRE_SUFFIX);
    if (preElement !== null) {
        let jsonElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_JSON_SUFFIX);
        jsonElement.removeChild(preElement);
    }
    // Parse input, preload images and draw
    _inputPeek(panelId);
    let imageURLs = _miscPrepareImages(input);
    peekPanelId = panelId;
    loadImages(imageURLs,_drawPeek,_miscLoadImagesError);
}

function _drawPeek(images) {
    // Prepare
    let canvasElement = document.createElement('canvas');
    let canvasContext = canvasElement.getContext(CANVAS_CONTEXT);
    let canvasPrepared = prepareCanvas(canvasContext,input,images);
    let preElement = document.createElement('pre');
    // Draw peek
    canvasElement.id = peekPanelId+ELEMENT_PANEL_CANVAS_SUFFIX;
    canvasElement.width = canvasPrepared.w;
    canvasElement.height = canvasPrepared.h;
    let peekElement = document.getElementById(peekPanelId+ELEMENT_PANEL_AREA_PEEK_SUFFIX);
    peekElement.style.display = 'flex';
    peekElement.appendChild(canvasElement);
    drawCanvas(canvasPrepared, false);
    // Draw JSON (in background)
    preElement.id = peekPanelId+ELEMENT_PANEL_PRE_SUFFIX;
    let jsonElement = document.getElementById(peekPanelId+ELEMENT_PANEL_AREA_JSON_SUFFIX);
    jsonElement.style.display = 'none';
    jsonElement.appendChild(preElement);
    preElement.innerText = JSON.stringify(input.panels[0],null,2);
}

function _actionPeekJson(panelId) {
    let peekElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_PEEK_SUFFIX);
    peekElement.style.display = 'none';
    let jsonElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_JSON_SUFFIX);
    jsonElement.style.display = 'flex';
}

function _actionPeekHide(panelId) {
    let peekElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_PEEK_SUFFIX);
    peekElement.style.display = 'none';
    let jsonElement = document.getElementById(panelId+ELEMENT_PANEL_AREA_JSON_SUFFIX);
    jsonElement.style.display = 'none';
}

//
// M I S C E L L A N E O U S
//

function _miscPrepareCover() {
    let origin = document.location.origin;
    let labels = ['cover'];
    return prepareImages(origin,labels);
}

function _miscPrepareImages(input) {
    let origin = document.location.origin;
    let labels = parseImages(input);
    return prepareImages(origin,labels);
}

function _miscLoadImagesError(url) {
    alert('Failed to load one or more images: ' + url);
}
