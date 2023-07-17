
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
const ELEMENT_ATTRIBUTION_ACTION_PREVIEW = 'strip-preview';
const ELEMENT_ATTRIBUTION_AREA_INPUT = 'wizard-attribution-content';
const ELEMENT_ATTRIBUTION_TITLE = 'attribution-title';
const ELEMENT_ATTRIBUTION_AUTHOR = 'attribution-author';
const ELEMENT_PANEL_DELIMITER = '-';
const ELEMENT_PANEL_PREFIX = 'p';
const ELEMENT_PANEL_SECTION_SUFFIX = ELEMENT_PANEL_DELIMITER+'section';
const ELEMENT_PANEL_SECTION_HEADER_SUFFIX = ELEMENT_PANEL_DELIMITER+'header';
const ELEMENT_PANEL_SECTION_CONTENT_SUFFIX = ELEMENT_PANEL_DELIMITER+'content';
const ELEMENT_ATTRIBUTION_TOGGLE_SUFFIX = ELEMENT_PANEL_DELIMITER+'toggle';
const ELEMENT_BUBBLE_PREFIX = 'b';
const ELEMENT_CAPTION_PREFIX = 'c';

function _initPage() {
    nextPanelId = 1;
    peekPanelId = '';
    let sectionsElement = document.getElementById(ELEMENT_SECTIONS);
    // Attribution
    let attributionElement = _initAttributionSection();
    sectionsElement.appendChild(attributionElement);
    // Panels (opening first panel)
    for (let i = 0; i < 4; i++) {
        let panelElement = _initPanelSection(i === 0);
        sectionsElement.appendChild(panelElement);
        nextPanelId += 1;
    }
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
    // Preview
    let previewElement = document.createElement('input');
    previewElement.id = ELEMENT_ATTRIBUTION_ACTION_PREVIEW;
    previewElement.type = 'button';
    previewElement.value = 'PREVIEW';
    previewElement.className = 'button';
    let onclick = '_preview()';
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

function _initPanelSection(panelOpen) {
    // Create section
    let panelId = ELEMENT_PANEL_PREFIX + nextPanelId;
    let sectionElement = document.createElement('section');
    sectionElement.id = panelId + ELEMENT_PANEL_SECTION_SUFFIX;
    sectionElement.className = 'wizard-section';
    // Create header
    _initPanelHeader(sectionElement,panelId,panelOpen);
    // Create content
    _initPanelContent(panelId,sectionElement,panelOpen);
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
    toggleElement.id = panelId + ELEMENT_ATTRIBUTION_TOGGLE_SUFFIX;
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

//
// I N P U T
//

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
    let ebl = panelId+ELEMENT_BUBBLE_PREFIX;
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
    let ecl = panelId+ELEMENT_CAPTION_PREFIX;
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
