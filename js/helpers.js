(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

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
            insertElementClone.style.height = (1 / rows * 100) + '%';
            insertElementClone.style.width = (1 / cols * 100) + '%';
            insertElementClone.style.position = 'absolute';
            insertElementClone.style.top = y + 'px';
            insertElementClone.style.left = x + 'px';
            containerElement.appendChild(insertElementClone);
        }
    }
}

function logoFun() {
    // class names of letters in SVG groups
    var letters = ['g.j', 'g.jdot', 'g.w', 'g.h', 'g.o', 'g.o2', 'g.p', 'g.e', 'g.r', 'g.dot', 'g.n', 'g.e2', 'g.t'];

    // looping with for
    for (var i = 0; i < letters.length; i++) {
        // IIFE needed, for is iterative
        (function () {
            var _i = i;
            setTimeout(function () {
                document.querySelector('#svglogo ' + letters[_i]).style.fill = 'white';
            }, i * 100);
        })()

    }

    // looping with forEach
    letters.forEach(function (letter, index) {
        //IIFE not needed, forEach is functional
        setTimeout(function () {
            document.querySelector('#svglogo ' + letter).style.fill = 'black';
        }, index * 150);
    });

    letters.forEach(function (letter, index) {
        document.querySelector('#svglogo ' + letter).style.opacity = 1;
    });

    // another variation
    var cloneit = document.querySelector('#svglogo2').cloneNode(true);
    cloneit.setAttribute('id', 'svglogo3');
    document.getElementsByTagName("section")[0].appendChild(cloneit);

}

function logoShowByLetter(svgid){
    // class names of letters in SVG groups
    var letters = [' g.j', ' g.jdot', ' g.w', ' g.h', ' g.o', ' g.o2', ' g.p', ' g.e', ' g.r', ' g.dot', ' g.n', ' g.e2', ' g.t'];
    var colors = ['#C93A32','#D93A32','#DA3F35','#DD433A','#FD6136','#FE8050','#FF9050','#FE9851','#FAA852','#F3B053','#F0BC53','#EFCA54','#F0D057'];
    var paths = [];

    var letterTime = 150;
    for (var i = 0; i < letters.length; ++i) {
        paths[i] = document.querySelector("#" + svgid + letters[i] + ' path');
    }
    var lineDrawing = anime({
        targets: "#" + svgid + " path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutCubic",
        duration: 2500,
        delay: function (el, i) {
            return letterTime * i;
        },
        begin: function (anim) {

        },
        update: function (anim) {
            for (var i = 0; i < paths.length; ++i) {
                if (anim.currentTime >= (letterTime * (i+1))+400) {
                    paths[i].style.stroke = lighten(colors[i],0.15);
                    paths[i].style.fill = colors[i];
                }
            }
            autoplay: true;
        }
    });
}

function logoAnimate(svgid){
    // class names of letters in SVG groups
    var letters = ['g.j', 'g.jdot', 'g.w', 'g.h', 'g.o', 'g.o2', 'g.p', 'g.e', 'g.r', 'g.dot', 'g.n', 'g.e2', 'g.t'];

    // with a little help from anime.js
    var logoTimeline = anime.timeline();
    letters.forEach(function (letter, index) {
        var el = "#" + svgid + " path";
        logoTimeline.add(
            anime({
                targets: el,
                strokeDashoffset: [{
                        value: [anime.setDashoffset, anime.setDashoffset],
                        duration: 3000
                    },
                    {
                        value: 0,
                        duration: 1200,
                        delay: 150 * index,
                        easing: 'easeInOutQuart'
                    }
                ],
                strokeWidth: {
                    value: [1, 1.05],
                    delay: 100 * index,
                    duration: 200,
                    easing: 'easeInQuad'
                },
                stroke: {
                    value: ['#FFF', function (el) {
                        return anime.getValue(el, 'stroke')
                    }],
                    duration: 800,
                    delay: 250 * index,
                    easing: 'easeInQuad'
                },
                offset: 0
            })
        );
    });
}

function lighten(color, luminosity) {

	// validate hex string
	color = new String(color).replace(/[^0-9a-f]/gi, '');
	if (color.length < 6) {
		color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
	}
	luminosity = luminosity || 0;

	// convert to decimal and change luminosity
	var newColor = "#", c, i, black = 0, white = 255;
	for (i = 0; i < 3; i++) {
		c = parseInt(color.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(black, c + (luminosity * white)), white)).toString(16);
		newColor += ("00"+c).substr(c.length);
	}
	return newColor; 
}