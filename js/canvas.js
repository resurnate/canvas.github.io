
const FONT_FAMILY_COMIC = 'Comic Sans MS';
const FONT_FAMILY_HELVETICA = 'Helvetica';
const FONT_STYLE_ITALIC = 'italic';
const FONT_WEIGHT_BOLD = 'bold'
const FONT_COLOR_BLACK = 'black';
const FONT_ALIGN_CENTER = 'center';

//
// C A N V A S
//

const CANVAS_ROWS = 2;

//
// C O P Y R I G H T
//

const COPYRIGHT = 'resurnate.com';
const COPYRIGHT_FONT_SIZE = 14;
const COPYRIGHT_FONT = COPYRIGHT_FONT_SIZE+'px '+FONT_FAMILY_HELVETICA;
const COPYRIGHT_OFFSETS = { x : 0, y : -2 };

/**
 * Prepare copyright.
 */
function prepareCopyright() {
    let dy = new Date().getFullYear();
    let rt = '\u00A9'+' '+dy+' '+COPYRIGHT;
    return {
        t : rt,
        c : FONT_COLOR_BLACK,
        f : COPYRIGHT_FONT,
        a : FONT_ALIGN_CENTER
    };
}

/**
 * Draw copyright in canvas.
 * @param c  Prepared canvas
 * @param cp Prepared copyright
 */
function drawCopyright(c,cp) {

    // Offset
    let o = COPYRIGHT_OFFSETS;
    let x = o.x;
    let y = (ATTRIBUTION_FONT_SIZE / 2) + o.y;

    // Draw
    c.cc.save();
    c.cc.translate((c.cw / 2), (c.ph / 2));
    c.cc.rotate((3 * Math.PI) / 2);
    c.cc.fillStyle = cp.c;
    c.cc.font = cp.f;
    c.cc.textAlign = cp.a;
    c.cc.fillText(cp.t.toUpperCase(), x, y);
    c.cc.restore();

}

//
// A T T R I B U T I O N
//

const ATTRIBUTION_FONT_SIZE = 14;
const ATTRIBUTION_FONT = ATTRIBUTION_FONT_SIZE+'px '+FONT_FAMILY_HELVETICA;
const ATTRIBUTION_OFFSETS = { x : 0, y : -2 };

/**
 * Prepare attribution from input.
 * @param i All input
 */
function prepareAttribution(i) {
    let ii = i.id;
    let it = i.title;
    let ia = i.author;
    let rt = ii+' "'+it+'" by '+ia;
    return {
        t : rt,
        c : FONT_COLOR_BLACK,
        f : ATTRIBUTION_FONT,
        a : FONT_ALIGN_CENTER
    };
}

/**
 * Draw attribution in canvas.
 * @param c Prepared canvas
 * @param a Prepared attribution
 */
function drawAttribution(c,a) {

    // Offset
    let o = ATTRIBUTION_OFFSETS;
    let x = o.x;
    let y = (ATTRIBUTION_FONT_SIZE / 2) + o.y;

    // Draw
    c.cc.save();
    c.cc.translate((c.cw / 2), ((c.ph / 2) + c.ph));
    c.cc.rotate((3 * Math.PI) / 2);
    c.cc.fillStyle = a.c;
    c.cc.font = a.f;
    c.cc.textAlign = a.a;
    c.cc.fillText(a.t.toUpperCase(), x, y);
    c.cc.restore();

}

//
// P A N E L S
//

const PANEL_PADDING = 10;
const PANEL_WIDTH = 630;
const PANEL_HEIGHT = 630;
const PANEL_BORDER_STYLE = '#666666';
const PANEL_BACKGROUND_COLORS = [ "#B3B3B3", "#F7F7F7" ];

/**
 * Prepare background in panel.
 * @param p Prepared panel
 */
function preparePanelBackground(p) {
    let rw = p.w - (p.p * 2);
    let rh = p.h - (p.p * 2);
    let rux = p.x + p.p;
    let ruy = p.y + p.p;
    return {
        w  : rw,
        h  : rh,
        ux : rux,       // Upper-left
        uy : ruy,
        lx : rux + rw, // Lower-right
        ly : ruy + rh
    };
}


/**
 * Draw all panels in canvas.
 * @param c  Prepared canvas
 * @param ps Prepared panels
 */
function drawPanels(c,ps) {
    for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        drawPanel(c,p);
    }
}

/**
 * Draw panel background, bubbles and captions in canvas.
 * @param c Prepared canvas
 * @param p Prepared panel
 */
function drawPanel(c,p) {
    drawPanelBackground(c,p.bg);
    if (p.bbi.startsWith("burst")) {
        // Bubble on top of captions - bursting!
        drawPanelCaptions(c,p);
        drawPanelBubbles(c,p);
    } else {
        drawPanelBubbles(c,p);
        drawPanelCaptions(c,p);
    }
}

/**
 * Draw background in panel.
 * @param c  Prepared canvas
 * @param bg Prepared background
 */
function drawPanelBackground(c,bg) {

    // Gradient
    let g = c.cc.createLinearGradient(bg.ux, bg.uy, bg.ux, bg.ly);
    g.addColorStop(0, PANEL_BACKGROUND_COLORS[0]);
    g.addColorStop(1, PANEL_BACKGROUND_COLORS[1]);

    // Draw
    c.cc.fillStyle = g;
    c.cc.fillRect(bg.ux,bg.uy,bg.w,bg.h);
    c.cc.strokeStyle = PANEL_BORDER_STYLE;
    c.cc.strokeRect(bg.ux,bg.uy,bg.w,bg.h);

}

//
// B U B B L E S
//

const BUBBLE_FONT_SIZE = 30;
const BUBBLE_FONT = BUBBLE_FONT_SIZE+'px '+FONT_FAMILY_COMIC;
const BUBBLE_OFFSETS = [
    {
        l : "speech1",
        i : { w : 0, h : -150, x : 0, y : 100 },
        t : [
            { x : 0, y : 10 }
        ]
    },
    {
        l : "speech3",
        i : { w : -20, h : -180, x : 12, y : 100 },
        t : [
            { x : 135, y : -103 },
            { x : -140, y : -38 },
            { x : -8, y : 121 }
        ]
    },
    {
        l : "thought1",
        i : { w : -25, h : -120, x : 10, y : 110 },
        t : [
            { x : 0, y : -2 }
        ]
    },
    {
        l : "burst1",
        i : { w : 20, h : -140, x : -10, y : 70 },
        t : [
            { x : 0, y : 10 }
        ]
    }
];

/**
 * Parse all offsets and return offset matching label.
 * @param l Offset label
 */
function parsePanelBubbleOffset(l) {
    let r;
    for (let o of BUBBLE_OFFSETS) {
        if (o.l === l) {
            r = o;
            break;
        }
    }
    return r;
}

/**
 * Parse all input and return bubble matching position.
 * @param ibbs All bubble input
 * @param i    Bubble position
 */
function parsePanelBubble(ibbs,i) {
    let r;
    for (let ibb of ibbs) {
        if ((ibb.position - 1) === i) {
            r = ibb;
            break;
        }
    }
    return r;
}

/**
 * Prepare all bubbles in panel.
 * @param p    Prepared panel
 * @param ibbs All panel bubble input
 */
function preparePanelBubbles(p,ibbs) {
    let r = [];
    let is = Number(p.image.charAt(p.image.length - 1));
    for (let i = 0; i < is; i++) {
        let ibb = parsePanelBubble(ibbs,i);
        r.push(preparePanelBubble(p,ibb));
    }
    return r;
}

/**
 * Prepare bubble box and text from panel input.
 * @param p   Prepared panel
 * @param ibb Bubble input
 */
function preparePanelBubble(p,ibb) {
    let ri;
    let rt = [];
    if (ibb !== undefined) { // Has bubble
        ri = preparePanelBubbleImage(p);
        rt = preparePanelBubbleText(ibb);
    }
    return {
        i : ri,
        t : rt
    }
}

/**
 * Prepare all bubble image from panel input.
 * @param p   Prepared panel
 */
function preparePanelBubbleImage(p) {
    return {
        l : p.image
    }
}

/**
 * Prepare all bubble text lines from panel input.
 * @param ibb Bubble input
 */
function preparePanelBubbleText(ibb) {
    let r = [];
    for (let l of ibb.text) {
        r.push(preparePanelBubbleTextLine(l));
    }
    return r;
}

/**
 * Prepare single bubble text line from panel input.
 * @param l Line of text
 */
function preparePanelBubbleTextLine(l) {
    return {
        t : l,
        c : FONT_COLOR_BLACK,
        f : BUBBLE_FONT,
        a : FONT_ALIGN_CENTER
    };
}

/**
 * Draw all bubbles in panel.
 * @param c Prepared canvas
 * @param p Prepared panel
 */
function drawPanelBubbles(c,p) {
    for (let i = 0; i < p.bbs.length; i++) {
        let bb = p.bbs[i];
        let o = parsePanelBubbleOffset(bb.i.l);
        drawPanelBubble(c,p,bb,i,o);
    }
}

/**
 * Draw bubble image and text in panel.
 * @param c  Prepared canvas
 * @param p  Prepared panel
 * @param bb Prepared bubble
 * @param i  Bubble position
 * @param o  Offset
 */
function drawPanelBubble(c,p,bb,i,o) {
    // Draw image (once)
    if (i === 0) {
        drawPanelBubbleImage(c,p,bb,o.i);
    }
    // Draw text
    drawPanelBubbleText(c,p.bg,bb,o.t[i]);
}

/**
 * Draw bubble image in panel.
 * @param c  Prepared canvas
 * @param p  Prepared panel
 * @param bb Prepared bubble
 * @param o  Offset
 */
function drawPanelBubbleImage(c,p,bb,o) {

    // Offset (leveraging panel background)
    let w = p.bg.w + o.w;
    let h = p.bg.h + o.h;
    let x = p.bg.ux + o.x;
    let y = p.bg.uy + o.y;

    // Draw
    c.cc.drawImage(p.i, x, y, w, h);

}

/**
 * Draw bubble text in panel.
 * @param c  Prepared canvas
 * @param bg Prepared background
 * @param bb Prepared bubble
 * @param o  Offset
 */
function drawPanelBubbleText(c,bg,bb,o) {

    // Offset (leveraging panel background)
    let x = bg.ux + (bg.w / 2) + o.x;
    let y = bg.uy + (bg.h / 2) - (Math.floor(bb.t.length / 2) * BUBBLE_FONT_SIZE);
    // Recenter if even number of lines
    if ((bb.t.length % 2) === 0) { y += (BUBBLE_FONT_SIZE / 2); }
    y += o.y;

    // Draw
    let t = {
        x  : x,
        y  : y,
        s  : BUBBLE_FONT_SIZE,
        ls : bb.t
    };
    drawPanelText(c,t);

}

//
// C A P T I O N S
//

const CAPTION_WIDTH = (PANEL_WIDTH - PANEL_PADDING) / 2;
const CAPTION_HEIGHT = 90;
const CAPTION_BORDER_STYLE = '#666666';
const CAPTION_BOX_COLORS = [ '#FFFF88', '#FFFFCC', '#CCE5FF','#DAE8FC' ];
const CAPTION_FONT_SIZE = 27;
const CAPTION_FONT = CAPTION_FONT_SIZE+'px '+FONT_FAMILY_COMIC;
const CAPTION_OFFSETS = {
    t : { x : 0, y : 10 }
};

/**
 * Parse all input and return caption matching position.
 * @param icts All caption input
 * @param i    Caption position
 */
function parsePanelCaption(icts,i) {
    let r;
    for (let ict of icts) {
        if ((ict.position - 1) === i) {
            r = ict;
            break;
        }
    }
    return r;
}

/**
 * Prepare all captions in panel.
 * @param p    Prepared panel
 * @param icts All panel caption input
 */
function preparePanelCaptions(p, icts) {
    let r = [];
    for (let i = 0; i < 4; i++) {
        let ict = parsePanelCaption(icts,i);
        r.push(preparePanelCaption(p,ict,i));
    }
    return r;
}

/**
 * Prepare caption box and text from panel input.
 * @param p   Prepared panel
 * @param ict Caption input
 * @param i   Caption position index
 */
function preparePanelCaption(p,ict,i) {
    let rb = preparePanelCaptionBox(p,i);
    let rt = [];
    if (ict !== undefined) { // Has caption
        rt = preparePanelCaptionText(ict);
    }
    return {
        b : rb,
        t : rt
    };
}

/**
 * Prepare caption box from panel input.
 * @param p Prepared panel
 * @param i Caption position index
 */
function preparePanelCaptionBox(p,i) {
    let rx = p.x;
    let ry = p.y;
    let rc = CAPTION_BOX_COLORS[i];
    if (i === 0) {        // Upper-left
        ry = p.y;
    } else if (i === 1) { // Upper-right
        rx = p.x + p.p + CAPTION_WIDTH;
    } else if (i === 2) { // Lower-left
        ry = p.y + p.h - CAPTION_HEIGHT;
    } else {                // Lower-right
        rx = p.x + p.p + CAPTION_WIDTH;
        ry = p.y + p.h - CAPTION_HEIGHT;
    }
    return {
        w: CAPTION_WIDTH,
        h: CAPTION_HEIGHT,
        x: rx,
        y: ry,
        c: rc
    };
}

/**
 * Prepare all caption text lines from panel input.
 * @param ict Caption input
 */
function preparePanelCaptionText(ict) {
    let r = [];
    for (let i = 0; i < ict.text.length; i++) {
        let p = ict.position;
        let l = ict.text[i];
        let rl = preparePanelCaptionTextLine(p,l,i);
        r.push(rl);
    }
    return r;
}

/**
 * Prepare single caption text line from panel input.
 * @param p Caption position
 * @param l Line of text
 * @param i Line index
 */
function preparePanelCaptionTextLine(p,l,i) {
    let rf = CAPTION_FONT;
    if (p < 3) {
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
    for (let i = 0; i < p.cts.length; i++) {
        // Draw iff caption contains text
        let ct = p.cts[i];
        if (ct.t.length > 0) {
            drawPanelCaption(c,ct);
        }
    }
}

/**
 * Draw caption box and text in panel.
 * @param c  Prepared canvas
 * @param ct Prepared caption
 */
function drawPanelCaption(c,ct) {
    // Draw box
    drawPanelCaptionBox(c,ct);
    // Draw text
    drawPanelCaptionText(c,ct);
}

/**
 * Draw caption box in panel.
 * @param c  Prepared canvas
 * @param ct Prepared caption
 */
function drawPanelCaptionBox(c,ct) {
    c.cc.fillStyle = ct.b.c;
    c.cc.fillRect(ct.b.x,ct.b.y,ct.b.w,ct.b.h);
    c.cc.strokeStyle = CAPTION_BORDER_STYLE;
    c.cc.strokeRect(ct.b.x,ct.b.y,ct.b.w,ct.b.h);
}

/**
 * Draw caption text in panel.
 * @param c  Prepared canvas
 * @param ct Prepared caption
 */
function drawPanelCaptionText(c,ct) {

    // Offset (leveraging caption box)
    let x = ct.b.x + (ct.b.w / 2) + CAPTION_OFFSETS.t.x;
    let y = ct.b.y + (ct.b.h / 2) - (Math.floor(ct.t.length / 2) * CAPTION_FONT_SIZE);
    // Recenter if even number of lines
    if ((ct.t.length % 2) === 0) { y += (CAPTION_FONT_SIZE / 2); }
    y += CAPTION_OFFSETS.t.y;

    // Draw
    let t = {
        x  : x,
        y  : y,
        s  : CAPTION_FONT_SIZE,
        ls : ct.t
    };
    drawPanelText(c,t);

}

//
// M I S C E L L A N E O U S
//

/**
 * Draw all text lines in panel bubble or caption.
 * @param c Prepared canvas
 * @param t Text
 */
function drawPanelText(c,t) {
    // For each line of text...
    let y = t.y;
    for (let l of t.ls) {
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
