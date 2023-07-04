
const FONT_FAMILY_COMIC = 'Comic Sans MS';
const FONT_STYLE_ITALIC = 'italic';
const FONT_WEIGHT_BOLD = 'bold'
const FONT_COLOR_BLACK = 'black';
const FONT_ALIGN_CENTER = 'center';

const CANVAS_ROWS = 2;
const PANEL_PADDING = 10;
const PANEL_WIDTH = 630;
const PANEL_HEIGHT = 630;
const CAPTION_WIDTH = (PANEL_WIDTH - PANEL_PADDING) / 2;
const CAPTION_HEIGHT = 90;
const CAPTION_BORDER_STYLE = '#666666';
const CAPTION_FONT_SIZE = 27;
const CAPTION_FONT = CAPTION_FONT_SIZE+'px '+FONT_FAMILY_COMIC;
const CAPTION_OFFSETS = {
    t : { x : 0, y : 10 }
};

/**
 * Parse all panel caption input and return object matching position.
 * @param icps All caption input
 * @param p    Caption position
 */
function parsePanelCaption(icps,p) {
    var r;
    for (var icp of icps) {
        if ((icp.position - 1) === p) {
            r = icp;
            break;
        }
    }
    return r;
}

/**
 * Prepare box from panel caption input.
 * @param p    Prepared panel
 * @param icps All caption input
 * @param i    Caption index
 */
function preparePanelCaptionBox(p,icps,i) {
    var rx = p.x;
    var ry = p.y;
    var rc = "#FFFFFF";
    var rf = "27px Comic Sans MS";
    var rt = [];
    if (i === 0) {        // Upper-left
        rx = p.x;
        ry = p.y;
        rc = "#FFFF88";
        rf = 'italic bold ' + rf;
        rt = prepareCaption(icps,i);
    } else if (i === 1) { // Upper-right
        rx = p.x + p.p + CAPTION_WIDTH;
        ry = p.y;
        rc = "#FFFFCC";
        rf = 'italic bold ' + rf;
        rt = prepareCaption(icps,i);
    } else if (i === 2) { // Lower-left
        rx = p.x;
        ry = p.y + p.h - CAPTION_HEIGHT;
        rc = "#CCE5FF";
        rt = prepareCaption(icps,i);
    } else {                // Lower-right
        rx = p.x + p.p + CAPTION_WIDTH;
        ry = p.y + p.h - CAPTION_HEIGHT;
        rc = "#DAE8FC";
        rt = prepareCaption(icps,i);
    }
    return {
        w: CAPTION_WIDTH,
        h: CAPTION_HEIGHT,
        x: rx,
        y: ry,
        c: rc,
        f: rf,
        t: rt
    };
}

/**
 * Prepare all text lines from panel caption input.
 * @param icp Caption input
 */
function preparePanelCaptionText(icp) {
    let r = [];
    for (var i = 0; i < icp.text.length; i++) {
        let p = icp.position;
        let l = icp.text[i];
        let rl = preparePanelCaptionTextLine(p,l,i);
        r.push(rl);
    }
    return r;
}

/**
 * Prepare single text line from panel caption input.
 * @param p Caption input position
 * @param l Line of text
 * @param i Line index
 */
function preparePanelCaptionTextLine(p,l,i) {
    var rf = CAPTION_FONT;
    if (p.position < 3) {
        rf = FONT_STYLE_ITALIC+' '+FONT_WEIGHT_BOLD+' '+CAPTION_FONT;
    } else if (i > 0) {
        rf = FONT_STYLE_ITALIC+' '+CAPTION_FONT;
    }
    return {
        t : l,
        c : FONT_COLOR_BLACK,
        f : rf,
        a : FONT_ALIGN_CENTER
    };
}

/**
 * Draw all captions in panel with text.
 * @param c Prepared canvas
 * @param p Prepared panel
 */
function drawPanelCaptions(c,p) {
    for (var i = 0; i < p.cts.length; i++) {
        // Draw iff caption contains text
        let cp = p.cts[i];
        if (cp.t.length > 0) {
            drawPanelCaption(c,cp);
        }
    }
}

/**
 * Draw caption box and text in panel.
 * @param c  Prepared canvas
 * @param cp Prepared caption
 */
function drawPanelCaption(c,cp) {
    // Draw box
    drawPanelCaptionBox(c,cp);
    // Draw text
    drawPanelCaptionText(c,cp);
}

/**
 * Draw caption box in panel.
 * @param c  Prepared canvas
 * @param cp Prepared caption
 */
function drawPanelCaptionBox(c,cp) {
    c.cc.fillStyle = cp.c;
    c.cc.fillRect(cp.x,cp.y,cp.w,cp.h);
    c.cc.strokeStyle = CAPTION_BORDER_STYLE;
    c.cc.strokeRect(cp.x,cp.y,cp.w,cp.h);
}

/**
 * Draw all text lines in panel caption.
 * @param c  Prepared canvas
 * @param cp Prepared caption
 */
function drawPanelCaptionText(c,cp) {

    // Offset
    let x = cp.x + (cp.w / 2) + CAPTION_OFFSETS.t.x;
    var y = cp.y + (cp.h / 2) - (Math.floor(cp.t.length / 2) * CAPTION_FONT_SIZE);
    // Recenter if even number of lines
    if ((cp.t.length % 2) === 0) { y += (CAPTION_FONT_SIZE / 2); }
    y += CAPTION_OFFSETS.t.y;

    // Draw
    let t = {
        x  : x,
        y  : y,
        s  : CAPTION_FONT_SIZE,
        ls : cp.t
    };
    drawPanelText(c,t);

}

/**
 * Draw all text lines in panel bubble or caption.
 * @param c Prepared canvas
 * @param t Text
 */
function drawPanelText(c,t) {
    // For each line of text...
    var y = t.y;
    for (var l of t.ls) {
        drawPanelTextLine(c,l,t.x,y);
        y += t.s;
    }
}

/**
 * Draw single text line in panel bubble or caption.
 * @param c Prepared canvas
 * @param l Line of text
 * @param x X-coordinate (relative to canvas)
 * @param y Y-coordinate (relative to canvas)
 */
function drawPanelTextLine(c,l,x,y) {
    c.cc.fillStyle = l.c;
    c.cc.font = l.f;
    c.cc.textAlign = l.a;
    c.cc.fillText(l.t.toUpperCase(), x, y);
}
