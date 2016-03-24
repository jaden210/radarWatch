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
var bCounter = 0;
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

function renderTime(hour, hb, minute, mb, second, sb, bLevel, bs) {
    'use strict';

    var angle = null,
    	hxangle = null,
    	hyangle = null,
    	mxangle = null,
    	myangle = null,
    	sxangle = null,
    	syangle = null,
        radius = null;

    hxangle = 50* Math.cos(((hour-3)*-1) * (Math.PI * 2) / 12);
    hyangle = 50* Math.sin(((hour-3)   ) * (Math.PI * 2) / 12);
    mxangle = 94* Math.cos(((minute-15)*-1) * (Math.PI * 2) / 60);
    myangle = 94* Math.sin(((minute-15)   ) * (Math.PI * 2) / 60);
    sxangle = 150* Math.cos(((second-15)*-1) * (Math.PI * 2) / 60);
    syangle = 150* Math.sin(((second-15)   ) * (Math.PI * 2) / 60);
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
    context.arc(mxangle,myangle,20,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.globalAlpha = hb;    
    context.arc(hxangle,hyangle,20,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.globalAlpha = sb;
    context.arc(sxangle,syangle,20,0,Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.strokeStyle = bs;
    context.globalAlpha = 1;
    context.lineWidth = 7;
    context.arc(0,0,178,1.5 * Math.PI,bLevel * (Math.PI / 180) + 1.5 * Math.PI);
    context.stroke();
    context.restore();
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
        nextMove = 95;

    if (hour >= 12) {
    	tempHour = hour - 12;
    }else {
    	tempHour = hour;
    }
    //battery stuff
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
    if (battery) {
    	   // battery status for firefox 
    			var bLevel = (battery.level * 360);
    	} else if (navigator.getBattery) {
    	   //battery status for chrome
    	   navigator.getBattery().then(function(battery) {
    		   var bLevel = (battery.level * 360);
    	   });
    	}
    
    //blip counter
    var hourBlip = tempHour*5,
    	minuteBlip = minute,
    	secondBlip = second,
    	hb = .5,
    	mb = .5,
    	sb = .5,
    	bs = "#00ff00";
    	
    
    // Erase the previous time
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    renderDots();
    
    if (bCounter > hourBlip && bCounter < hourBlip + 7) {
    	hb = .8;
    }else {
    	hb = .3;
    }
    if (bCounter > minuteBlip && bCounter < minuteBlip + 7) {
    	mb = .8;
    }else {
    	mb = .3;
    }
    if (bCounter > secondBlip && bCounter < secondBlip + 7) {
    	sb = .8;
    }else {
    	sb = .3;
    }
 
    //find the rotation of the div
    var el = document.getElementById("main");
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
     var angle1 = Math.round(Math.atan2(b, a) * (180/Math.PI));

     if (bLevel < 75) {
    	 bs = "#ff0000"
     }
    
    if ( angle1 > - 7 && angle1 < 7) {
    	bCounter = 0;
    }else {
    	bCounter ++;
    }
    
    renderTime(hour, hb, minute, mb, second, sb, bLevel, bs);
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

    canvas = document.querySelector('canvas');
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
