var count = 0;
var topx;       //for clicking function
var topy;       //for clicking function
var bottom;     //for clicking function
var image = null;          // The image that the user interacts with
var modified_image = null;
var ctx;            // canvas context
var canvas;
var filter = null;
var val = 0;
var safe_color = [0, 0, 0];
var filters = [false, false, false]
var tests = [
    testForRed,
    testForBlue, 
    testForYellow
    ];


//----------------------------------------------------------------
//  INITIALIZATION
//----------------------------------------------------------------
window.onload = function() {
	canvas = document.getElementById("image_canvas");
	ctx = canvas.getContext('2d');
    image = new Image();
    image.src = "img/puzzle.jpg";
    image.onload = function(){
        // Resize the image and draw it at the origin
        ctx.scale(0.1, 0.1)
        canvas.width = image.width;
        canvas.height = image.height;
        reset();
    }
    console.log("Default image loaded.");
}

//----------------------------------------------------------------
//  UPLOAD PICTURE
//----------------------------------------------------------------

function uploadpic() {
    input_im = document.getElementById("inp");
    console.log(input_im.value);
    
    image.src = 'img/' + input_im.value;
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        reset();
    }
}

//----------------------------------------------------------------
//  MASKING FUNCTIONS
//----------------------------------------------------------------
notgray = function(event){
        count++
        if(count%2 == 0){
            bottom = [event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop];
            console.log(bottom);
            crop([topx, topy],bottom);
            count = 0
            canvas.removeEventListener('click', notgray);
            document.getElementById("cursor").setAttribute("class", "");
        }
        else{
            topx = event.pageX-canvas.offsetLeft;
            topy = event.pageY-canvas.offsetTop;
            console.log(topx, topy);
        }
    }

gray = function(event){
        count++
        if(count%2 == 0){
            bottom = [event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop];
            console.log(bottom);
            oppositeCrop([topx, topy],bottom);
            count = 0
            canvas.removeEventListener('click',gray);
            document.getElementById("cursor").setAttribute("class", "");
        }
        else{
            topx = event.pageX-canvas.offsetLeft;
            topy = event.pageY-canvas.offsetTop;
            console.log(topx, topy);
        }
    }

function grayOut() {
        count = 0;
    document.getElementById("cursor").setAttribute("class", "crosshair");
        canvas.addEventListener('click', gray);
}

function notGrayOut() {
        count = 0;
    document.getElementById("cursor").setAttribute("class", "crosshair");
    canvas.addEventListener('click', notgray);    
}


function crop(top,bottom) {
    modified_image = image;
    imageData = ctx.getImageData(0,0,modified_image.width, modified_image.height);
    //copy pasta from alex's masking.js
    console.log(imageData);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = data[i];     // red
        data[i + 1] = data[i+1]; // green
        data[i + 2] = data[i+2]; // blue
        data[i + 3] = 100;
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, top[0], modified_image.height);
    ctx.putImageData(imageData, 0, 0, 0, 0, modified_image.width, top[1]);
    var imageData = ctx.getImageData(top[0],bottom[1],modified_image.width,modified_image.height);
    console.log(imageData);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = data[i];     // red
        data[i + 1] = data[i+1]; // green
        data[i + 2] = data[i+2]; // blue
        data[i + 3] = 100;
    }
    ctx.putImageData(imageData, top[0],bottom[1], 0, 0, modified_image.width, modified_image.height);
    
            var imageData = ctx.getImageData(bottom[0],top[1],modified_image.width,bottom[1]);
    console.log(imageData);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = data[i];     // red
        data[i + 1] = data[i+1]; // green
        data[i + 2] = data[i+2]; // blue
        data[i + 3] = 100;
    }
    ctx.putImageData(imageData, bottom[0], top[1], 0, 0, modified_image.width, bottom[1]-top[1]);
}

function oppositeCrop(top,bottom){
    modified_image = image;
    var imageData = ctx.getImageData(top[0],top[1],bottom[0],bottom[1]);
    console.log(imageData);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = data[i];     // red
        data[i + 1] = data[i+1]; // green
        data[i + 2] = data[i+2]; // blue
        data[i + 3] = 100;
    }
    ctx.putImageData(imageData, top[0], top[1], 0, 0, bottom[0]-top[0], bottom[1]-top[1]);
}

function ungray(top,bottom){
    modified_image = image;
    var imageData = ctx.getImageData(top[0],top[1],bottom[0],bottom[1]);
    console.log(imageData);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = data[i];     // red
        data[i + 1] = data[i+1]; // green
        data[i + 2] = data[i+2]; // blue
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, top[0], top[1], 0, 0, bottom[0]-top[0], bottom[1]-top[1]);  
}

//----------------------------------------------------------------
//  FILTER FUNCTIONS
//----------------------------------------------------------------

function updateCheckbox(thing, num){
    filters[num] = thing.checked;
    filterAll();
}

function testForRed(col, hsl){
    return (hsl[0] > 340/360 || hsl[0] < 20/360);
}

function testForBlue(col, hsl){
    return (hsl[0] > 180/360 && hsl[0] < 280/360);
}

function testForYellow(col, hsl){
    return(hsl[0] > 45/360 && hsl[0] < 110/360);
}

function filterAll(){
    console.log("Running filters!");
    var no_filter_check = true;
    ctx.drawImage(image, 0, 0);
    for (i = 0; i < filters.length; i ++){
        if (filters[i]){
            no_filter_check = false;
            break;
        }
    } 
    if (!no_filter_check){
        modified_image = image;
        imageData = ctx.getImageData(0,0,image.width, image.height);

        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var hsl = rgbToHsl(data[i], data[i+1], data[i+2]);
            var rgb = [data[i], data[i+1], data[i+2]];
            var test = false;
            for (j = 0; j < filters.length; j ++) {
                if (filters[j])
                    test = test || tests[j](rgb, hsl); 
            }
                if (test){
                    //data[i] = 0;
                    //data[i+1] = 0;
                    //data[i+2] = 0;
                } 
                else {
                  data[i]     = 255;     // red
                  data[i + 1] = 255;
                  data[i + 2] = 255;
                }
        }
        ctx.putImageData(imageData, 0, 0);
    }
}


// hsl converter from stackoverflow:
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


//----------------------------------------------------------------
//  RESET FUNCTIONS
//----------------------------------------------------------------

function reset() {
    ctx.drawImage(image, 0, 0);
    var elems = document.getElementsByClassName("checkboxes")
    for (i = 0; i < elems.length; i ++){
        elems[i].checked = false;
    }
    for (i = 0; i < filters.length; i ++){
        filters[i] = false;
    }
}
