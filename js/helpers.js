function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function moveTo(element, targetPos, tickStart, tickEnd, callback, lastTick) {
    rendering = true;
    var d = new Date();
    var ticks = d.getTime();
    var top = parseInt(element.style.top, 10) || 0; // parses to int or is set to zero
    var left = parseInt(element.style.left, 10) || 0;
    var toprate = (targetPos.top - top) / (tickEnd - ticks);
    var leftrate = (targetPos.left - left) / (tickEnd - ticks);
    if (!lastTick) {
        lastTick = ticks;
    }
    var elapsed = ticks - lastTick;
    if (tickEnd > lastTick) {
        if (elapsed) {
            element.style.top = top + (toprate * elapsed) + 'px';
            element.style.left = left + (leftrate * elapsed) + 'px';
        }
        lastTick = ticks;
        // requestAnimationFrame only accepts functions, pass info along in a function
        requestAnimationFrame(function () {
            moveTo(element, targetPos, tickStart, tickEnd, callback, lastTick);
        });
    } else {
        element.style.top = targetPos.top + 'px';
        element.style.left = targetPos.left + 'px';
        callback(element);
    }
    rendering = false;
}

function randomColor() {
    // by using h,s,v we can get only bright colors
    // the (h) hue is random, but the (s) saturation is max, and the (v) brightness is max
    var h = Math.random();
    var s = 0.99;
    var v = 0.99;
    // the "golden ratio" allegedly gives better colors
    h = h + 0.618033988749895;
    h = h % 1;

    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }

    return "rgba(" + Math.floor(r * 255) + "," + Math.floor(g * 255) + "," + Math.floor(b * 255) + "," + 0.2 + ")";
}

// full explantion here: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function fillElWith(containerElement, insertElement, cols, rows) {
    var height = containerElement.offsetHeight / rows;
    var width = containerElement.offsetWidth / cols;
    for (var r = 0; r < rows; r++) {
        var y = r * height;
        for (var c = 0; c < cols; c++) {
            var x = c * width;
            var insertElementClone = insertElement.cloneNode(true);
            insertElementClone.style.height = (1/rows * 100) + '%';
            insertElementClone.style.width = (1/cols * 100) + '%';
            insertElementClone.style.position = 'absolute';
            insertElementClone.style.top = y + 'px';
            insertElementClone.style.left = x + 'px';
            containerElement.appendChild(insertElementClone);
        }
    }
}
