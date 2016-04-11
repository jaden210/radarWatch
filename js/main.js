var canvas, context, clockRadius, isAmbientMode;

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        'use strict';
        window.setTimeout(callback, 1000 / 60);
    };
var hcounter = 0,
	mcounter = 0,
	scounter = 0;
var hb = 0.3,
	mb = 0.3,
	sb = 0.3,
	hnc = '#FFF',
	mnc = '#FFF',
	snc = '#FFF';

	
function renderDots() {
    'use strict';

    
    context.save();

    // Assigns the clock creation location in the middle of the canvas
    context.translate(canvas.width / 2, canvas.height / 2);
}

function renderTime(hour, minute, second, time) {
    'use strict';

    var hxangle = null,
    	hyangle = null,
    	mxangle = null,
    	myangle = null,
    	sxangle = null,
    	syangle = null,
        radius = null;

    hxangle = 116* Math.cos(((hour-3)*-1) * (Math.PI * 2) / 12);
    hyangle = 116* Math.sin((hour-3)      * (Math.PI * 2) / 12);
    mxangle = 142* Math.cos(((minute-15)*-1) * (Math.PI * 2) / 60);
    myangle = 142* Math.sin((minute-15)      * (Math.PI * 2) / 60);
    sxangle = 166* Math.cos(((second-15)*-1) * (Math.PI * 2) / 60);
    syangle = 166* Math.sin((second-15)      * (Math.PI * 2) / 60);
    radius = clockRadius * 0.55;
    //RENDER

    drawStar(hxangle, hyangle, 5, 9, 5, hnc, hb);
    drawStar1(mxangle, myangle, 5, 9, 5, mnc, mb);
    drawStar2(sxangle, syangle, 5, 9, 5, snc, sb);

    document.getElementById("clock").innerHTML = time;
    document.getElementById("clock").style.color="#22ef0c";
    document.getElementById("clock").style.opacity=0.8;
    document.getElementById("clock").style.fontSize="xx-large";
}
//hour
function drawStar(cx, cy, spikes, outerRadius, innerRadius, hnc, hb) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = hnc;
    context.beginPath();
    context.moveTo(cx, cy - outerRadius);
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.globalAlpha = hb; 
    context.lineWidth=5;
    context.strokeStyle= hnc;
    context.stroke();
    context.globalAlpha = hb; 
    context.fillStyle= hnc;
    context.fill();

}
//minute
function drawStar1(cx, cy, spikes, outerRadius, innerRadius, mnc, mb) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = mnc;
    context.beginPath();
    context.moveTo(cx, cy - outerRadius);
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.lineWidth=5;
    context.globalAlpha = mb; 
    context.strokeStyle= mnc;
    context.stroke();
    context.globalAlpha = mb; 
    context.fillStyle= mnc;
    context.fill();

}
//second
function drawStar2(cx, cy, spikes, outerRadius, innerRadius, snc, sb) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(cx, cy - outerRadius);
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.lineWidth=5;
    context.globalAlpha = sb; 
    context.strokeStyle= snc;
    context.stroke();
    context.globalAlpha = sb; 
    context.fillStyle= snc;
    context.fill();

}


function getDate() {
    'use strict';

    var date;
    try {
    	date = new Date();
    } catch (err) {
        console.error('Error: ', err.message);
        date = new Date();
    }

    return date;
}

function watch() {
    'use strict';
    if (isAmbientMode === true) {
        return;
    }
    // Import the current time
    var date = getDate(),
        hours = date.getHours(),
        tempHour,
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        mili = date.getMilliseconds()*3.45,
        hour = hours + (minutes /100),
        minute = minutes + seconds / 60,
        second = seconds + mili/3600,
        nextMove = 100;

    if (hour >= 12) {
    	tempHour = hour - 12;
    }else {
    	tempHour = hour;
    }
    
    
  //find the rotation of the radar
    var el = document.getElementById("spinner");
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "fail...";
    // With rotate(30deg)...
    var values = tr.split('(')[1];
         values = values.split(')')[0];
         values = values.split(',');
     var a = values[0];
     var b = values[1];

     //fix radar angle
     var radarAngle = Math.round(Math.atan2(b, a) * (180/Math.PI));
     if (radarAngle <= 0) {
    	 radarAngle = (radarAngle + 180) + 180;
     }
     var hourAngle = tempHour * 30,
     	 minuteAngle = minute * 6,
     secondAngle = Math.floor(second) * 6;
    	
    
    // Erase the previous time
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    renderDots();
    
    //hour blip fade
    if (radarAngle > hourAngle && radarAngle < hourAngle + 20) {
    	hb =1;
    	//hnc = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
    	hnc ='#750787';
    }
    if (hb > 0.3) {
    	hcounter ++;
    }
    switch (hcounter) {
    case 2:
    	hb = 0.80;
    	break;
    case 4:
    	hb = 0.78;
    	break;
    case 6:
    	hb = 0.74;
    	break;
    case 8:
    	hb = 0.70;
    	break;
    case 10:
    	hb = 0.66;
    	break;
    case 12:
    	hb = 0.62;
    	break;
    case 14:
    	hb = 0.58;
    	break;
    case 16:
    	hb = 0.54;
    	break;
    case 18:
    	hb = 0.50;
    	break;
    case 20:
    	hb = 0.46;
    	break;
    case 22:
    	hb = 0.42;
    	break;
    case 24:
    	hb = 0.38;
    	break;
    case 26:
    	hb = 0.34;
    	break;
    case 28:
    	hb = 0.3;
    	hcounter = 0;
    	break;
    }
    
    //minute blip fade
    if (radarAngle > minuteAngle && radarAngle < minuteAngle + 20) {
    	mb =0.9;
    	//mnc = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
    	mnc = '#004dff';
    }
    if (mb > 0.3) {
    	mcounter ++;
    }
    switch (mcounter) {
    case 2:
    	mb = 0.80;
    	break;
    case 4:
    	mb = 0.78;
    	break;
    case 6:
    	mb = 0.74;
    	break;
    case 8:
    	mb = 0.70;
    	break;
    case 10:
    	mb = 0.66;
    	break;
    case 12:
    	mb = 0.62;
    	break;
    case 14:
    	mb = 0.58;
    	break;
    case 16:
    	mb = 0.54;
    	break;
    case 18:
    	mb = 0.50;
    	break;
    case 20:
    	mb = 0.46;
    	break;
    case 22:
    	mb = 0.42;
    	break;
    case 24:
    	mb = 0.38;
    	break;
    case 26:
    	mb = 0.34;
    	break;
    case 28:
    	mb = 0.3;
    	mcounter = 0;
    	break;
    }
    
    //second blib fade
    if (radarAngle > secondAngle && radarAngle < secondAngle + 20) {
    	sb =0.9;
    	//snc = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
    	snc = '#008026';
    }
    if (sb > 0.3) {
    	scounter ++;
    }
    switch (scounter) {
    case 2:
    	sb = 0.80;
    	break;
    case 4:
    	sb = 0.78;
    	break;
    case 6:
    	sb = 0.74;
    	break;
    case 8:
    	sb = 0.70;
    	break;
    case 10:
    	sb = 0.66;
    	break;
    case 12:
    	sb = 0.62;
    	break;
    case 14:
    	sb = 0.58;
    	break;
    case 16:
    	sb = 0.54;
    	break;
    case 18:
    	sb = 0.50;
    	break;
    case 20:
    	sb = 0.46;
    	break;
    case 22:
    	sb = 0.42;
    	break;
    case 24:
    	sb = 0.38;
    	break;
    case 26:
    	sb = 0.34;
    	break;
    case 28:
    	sb = 0.3;
    	scounter = 0;
    	break;
    }
    
    
    if	(hours > 12) {
    	var thour = hours - 12;
    }else {
    	var thour = hours;
    }
   var time =  ("00" + thour).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2); 
    
    renderTime(hour, minute, second, time);
    context.restore();

    setTimeout(function() {
        window.requestAnimationFrame(watch);
    }, nextMove);
}

//ambient watch

function renderAmbientHourNeedle(hour) {
    'use strict';

    var angle = null,
        radius = null;

    angle = ((hour-3)*-1) * (Math.PI * 2) / 12;
    radius = clockRadius * 0.55;
    //RENDER
    context.save();
    context.beginPath();
    context.arc(50* Math.cos(angle),
 		   ((50* Math.sin((hour-3)*(Math.PI * 2)/12))-11),
 		   20,0,Math.PI * 2, true);
    context.lineWidth = 4;
    context.fillStyle = '#000000';
    context.fill();
    context.closePath();
    context.restore();
}

function renderAmbientMinuteNeedle(minute) {
    'use strict';

    var angle = null,
        radius = null;
    	
    angle = ((minute - 15)*-1) * (Math.PI * 2) / 60;
    radius = clockRadius * 0.85;
    //RENDER
    context.save();
    context.beginPath();
    context.arc(94* Math.cos(angle),
    		   ((94* Math.sin((minute-15)*(Math.PI * 2)/60))-11),
    		   22.5,0,Math.PI * 2, true);
    context.lineWidth = 4;
    context.fillStyle = '#000000';
    context.fill();
    context.closePath();
    context.restore();
}
function showClock() {
	if (document.getElementById("clock").style.display == 'none') {
		document.getElementById("clock").style.display = 'inline';
	}else {
		document.getElementById("clock").style.display = 'none';
	}	
}


function ambientWatch() {
    'use strict';

    var date = getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        hour = hours + minutes / 60,
        minute = minutes + seconds / 60;

    // Erase the previous time
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    renderDots();
    renderAmbientHourNeedle(hour);
    renderAmbientMinuteNeedle(minute);
    context.restore();
}

window.onload = function onLoad() {
    'use strict';

    canvas = document.getElementById("dots");
    context = canvas.getContext('2d');
    
    clockRadius = document.body.clientWidth / 2;
    
    // Assigns the area that will use Canvas
    canvas.width = document.body.clientWidth;
    canvas.height = canvas.width;
    
    // add eventListener for tizenhwkey
    window.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === 'back') {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (err) {
                console.error('Error: ', err.message);
            }
        }
    });

    // add eventListener for timetick
    window.addEventListener('timetick', function() {
        console.log("timetick is called");
        ambientWatch();
    });

    // add eventListener for ambientmodechanged
    window.addEventListener('ambientmodechanged', function(e) {
        console.log("ambientmodechanged : " + e.detail.ambientMode);
        if (e.detail.ambientMode === true) {
            // rendering ambient mode case
            isAmbientMode = true;
            ambientWatch();

        } else {
            // rendering normal case
            isAmbientMode = false;
            window.requestAnimationFrame(watch);
        }
    });

    // normal case
    isAmbientMode = false;
    window.requestAnimationFrame(watch);
};
