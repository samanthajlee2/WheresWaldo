var image;          // The image that the user interacts with
var modified_image = null;
//var filters = {};   // The filters that the user has applied
var ctx;            // canvas context
var canvas;
var filter = null;
val = 0;

window.onload = function() {
	canvas = document.getElementById("image_canvas");
	ctx = canvas.getContext('2d');
    //console.log(image.height);
    //console.log(image.width);
    try {
        filter = new WebGLImageFilter();
    }
    catch( error ) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillText("This browser doesn't have support for WegGL, or something else went wrong...\n"+error.message, canvas.width/2, canvas.height/2);
        return;
    }
    image = new Image();
    image.src = "img/puzzle.jpg";
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }

}

function uploadpic() {
    input_im = document.getElementById("inp");
    console.log(input_im.value);
    
    image.src = 'img/' + input_im.value;
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }
}

function ShowRed(){  // function to call test shader to show red in image more clearly
    //filter.addFilter( 'hue', val );
    //modified_image = filter.apply(img);
    //ctx.drawImage(modified_image, 0, 0);
    imageData = ctx.getImageData(0,0,image.width, image.height);
    var data = imageData.data;
    //for (var i = 0; i < data.length; i += 4) {
        for (var i = 0; i < data.length; i += 4) {
        var hsl = rgbToHsl(data[i], data[i+1], data[i+2]);  
            if (hsl[0] < 340/360 && hsl[0] > 30/360){
                // data[i+1] = 0;
                // data[i+2] = 0;
                // data[i] = 0;
            } 
            else {
              data[i]     = 255;     // red
              data[i + 1] = 0;
              data[i + 2] = 0;
            }
    }
    ctx.putImageData(imageData, 0, 0);
}


document.getElementById("image_canvas").addEventListener('click', function(event){
    console.log(event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
})

// Code ripped from stackoverflow
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function reset() {
    ctx.drawImage(image, 0, 0);
}


function onCheck(filter) {
    if (filter.checked){
        addFilter(filter.value);
    } else {
        removeFilter(filter.value);
    }
}

function crop() {
    alert("this is the crop function, will make greyed out boxes...");
}

function addFilter(filterName) {
    if (filterName == "crop") {
        crop();
    } else {
        alert("ADD filter: " + filterName);
    }
}


function removeFilter(filterName) {
    alert("REMOVE filter: " + filterName);
}


// Below is the realm of abandoned code:

/*
filters.getPixels = function(img) {
  return ctx.getImageData(0,0,c.width,c.height);
};

filters.filterImage = function(filter, img, var_args) {
    var args = [this.getPixels(img)];
    for (var i=2; i < arguments.length; i++){
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
}

filters.to_hsv = function(pixels, args) {
    var data = pixels.data;
    for (var i = 0; i < data.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        hsv = rgb2hsv(r,g,b);
        d[i] = hsv["h"];
        d[i+1] = hsv["s"];
        d[i+2] = hsv["v"];
    }
    return pixels;
}

document.getElementById("to_hsv").onclick = function(){
    console.log("Converting to hsv!\n");
    tmp = image;
    filters.filterImage(filter.to_hsv, temp);

}


function renderImage(img){
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(img, 0, 0);
}


// Thanks to Mic on stackoverflow for this function
function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

*/


