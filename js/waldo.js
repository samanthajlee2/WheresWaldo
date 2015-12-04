var image = null;          // The image that the user interacts with
var modified_image = null;
//var filters = {};   // The filters that the user has applied
var ctx;            // canvas context
var canvas;
var filter = null;
var val = 0;
var safe_color = [0, 0, 0];
var filters = [0, 0, 0]
var tests = [testForRed, testForBlue, testForYellow];

window.onload = function() {
	canvas = document.getElementById("image_canvas");
	ctx = canvas.getContext('2d');
    canvas.addEventListener('click', function(event){
        console.log(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop);
    });
    //console.log(image.height);
    //console.log(image.width);
    image = new Image();
    image.src = "img/puzzle.jpg";
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }
    console.log("The image should show up now...");

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

function toggle(thing, num){
    thing.value = Math.abs(thing.value-1);
    filters[num] = thing.value;
    //filterAll();
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
    modified_image = image;
    imageData = ctx.getImageData(0,0,modified_image.width, modified_image.height);

    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var hsl = rgbToHsl(data[i], data[i+1], data[i+2]);
        var rgb = [data[i], data[i+1], data[i+2]];
        var test = true;
        for (j = 0; j < filters.length; j ++) test | tests[j](rgb, hsl);
            if (test){
                // data[i+1] = 0;
                // data[i+2] = 0;
                // data[i] = 0;
            } 
            else {
              data[i]     = 0;     // red
              data[i + 1] = 0;
              data[i + 2] = 0;
            }
    }
    ctx.putImageData(imageData, 0, 0);
}


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
