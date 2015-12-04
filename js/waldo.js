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
    image.src = "puzzle.jpg";
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }

}

function ShowRed(img){  // function to call test shader to show red in image more clearly
    filter.addFilter( 'hue', val );
    modified_image = filter.apply(img);
    ctx.drawImage(modified_image, 0, 0);
}

document.getElementById("image_canvas").addEventListener('click', function(event){
    console.log(event.pageX-document.getElementById("image_canvas"),event.pageY-document.getElementById("canvas"));
})







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


