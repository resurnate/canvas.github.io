
const CANVAS_ROWS = 2;
const PANEL_PADDING = 10;
const PANEL_WIDTH = 630;
const PANEL_HEIGHT = 630;
const CAPTION_WIDTH = (PANEL_WIDTH - PANEL_PADDING) / 2;
const CAPTION_HEIGHT = 90;
const CAPTION_BORDER_STYLE = '#666666';
const CAPTION_FONT_SIZE = 27;
const CAPTION_OFFSETS = {
    t : { x : 0, y : 10 }
};

/**
 * Draw all captions in panel with text.
 * @param c canvas
 * @param p panel
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
 * @param c canvas
 * @param cp caption
 */
function drawPanelCaption(c,cp) {
    // Draw box
    drawPanelCaptionBox(c,cp);
    // Draw text
    drawPanelCaptionText(c,cp);
}

/**
 * Draw caption box in panel.
 * @param c  canvas
 * @param cp caption
 */
function drawPanelCaptionBox(c,cp) {
    c.cc.fillStyle = cp.c;
    c.cc.fillRect(cp.x,cp.y,cp.w,cp.h);
    c.cc.strokeStyle = CAPTION_BORDER_STYLE;
    c.cc.strokeRect(cp.x,cp.y,cp.w,cp.h);
}

/**
 * Draw all text lines in panel caption.
 * @param c  canvas
 * @param cp caption
 */
function drawPanelCaptionText(c,cp) {

    // Offset
    let x = cp.x + (CAPTION_WIDTH / 2) + CAPTION_OFFSETS.t.x;
    var y = cp.y + (CAPTION_HEIGHT / 2) - (Math.floor(cp.t.length / 2) * CAPTION_FONT_SIZE);
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
 * @param c canvas
 * @param t text
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
 * @param c canvas
 * @param l line
 * @param x x-coordinate (relative to canvas)
 * @param y y-coordinate (relative to canvas)
 */
function drawPanelTextLine(c,l,x,y) {
    c.cc.fillStyle = l.c;
    c.cc.font = l.f;
    c.cc.textAlign = l.a;
    c.cc.fillText(l.t.toUpperCase(), x, y);
}
