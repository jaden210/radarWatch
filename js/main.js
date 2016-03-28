var canvas,bCanvas,bContext, context, clockRadius, isAmbientMode;

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        'use strict';
        window.setTimeout(callback, 1000 / 60);
    };
var bs = "#00ff00";
var hcounter = 0,
	mcounter = 0,
	scounter = 0,
	tcounter = 0;
var hb = 0.3,
	mb = 0.3,
	sb = 0.3,
	tb = 0.3;

	
function renderDots() {
    'use strict';

    var dx = 0,
        dy = 0,
        i = 1,
        angle = null;
    context.save();

    // Assigns the clock creation location in the middle of the canvas
    context.translate(canvas.width / 2, canvas.height / 2);
}

function renderTime(hour, hb, minute, mb, second, sb, time ,tb) {
    'use strict';

    var angle = null,
    	hxangle = null,
    	hyangle = null,
    	mxangle = null,
    	myangle = null,
    	sxangle = null,
    	syangle = null,
        radius = null;

    hxangle = 96* Math.cos(((hour-3)*-1) * (Math.PI * 2) / 12);
    hyangle = 96* Math.sin((hour-3)      * (Math.PI * 2) / 12);
    mxangle = 138* Math.cos(((minute-15)*-1) * (Math.PI * 2) / 60);
    myangle = 138* Math.sin((minute-15)      * (Math.PI * 2) / 60);
    sxangle = 160* Math.cos(((second-15)*-1) * (Math.PI * 2) / 60);
    syangle = 160* Math.sin((second-15)      * (Math.PI * 2) / 60);
    radius = clockRadius * 0.55;
    //RENDER
    context.save();
    context.beginPath();
    context.shadowOffsetX = canvas.width;    
    context.shadowOffsetY = 0;
    context.shadowColor = '#22ef0c';
    context.shadowBlur = 30;
    context.globalAlpha = mb;
    context.fillStyle = '#22ef0c';
    context.arc(mxangle,myangle,10,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.globalAlpha = hb;    
    context.arc(hxangle,hyangle,10,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.globalAlpha = sb;
    context.arc(sxangle,syangle,10,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.restore();

    document.getElementById("clock").innerHTML = time;
    document.getElementById("clock").style.color="#22ef0c";
    document.getElementById("clock").style.opacity=0.8;
    document.getElementById("clock").style.fontSize="xx-large";
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
    
    //blip counter
    var hourBlip = tempHour*5,
    	minuteBlip = minute,
    	secondBlip = second;
    
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
     var c = values[2];
     var d = values[3];

     var scale = Math.sqrt(a*a + b*b);
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
    	hb =0.9;
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
    
    //time fade
    if (radarAngle > 0 && radarAngle <  20) {
    	tb =0.9;
    }
    if (tb > 0.3) {
    	tcounter ++;
    }
    switch (tcounter) {
    case 2:
    	tb = 0.80;
    	break;
    case 4:
    	tb = 0.78;
    	break;
    case 6:
    	tb = 0.74;
    	break;
    case 8:
    	tb = 0.70;
    	break;
    case 10:
    	tb = 0.66;
    	break;
    case 12:
    	tb = 0.62;
    	break;
    case 14:
    	tb = 0.58;
    	break;
    case 16:
    	tb = 0.54;
    	break;
    case 18:
    	tb = 0.50;
    	break;
    case 20:
    	tb = 0.46;
    	break;
    case 22:
    	tb = 0.42;
    	break;
    case 24:
    	tb = 0.38;
    	break;
    case 26:
    	tb = 0.34;
    	break;
    case 28:
    	tb = 0.3;
    	tcounter = 0;
    	break;
    }
    
    
    if	(hours > 12) {
    	var thour = hours - 12;
    }else {
    	var thour = hours;
    }
   var time =  ("00" + thour).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2); 
    
    renderTime(hour, hb, minute, mb, second, sb, time, tb);
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
