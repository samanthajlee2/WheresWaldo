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
var safe_color = [255, 255, 255];
var filter_ranges = [
    // Each filter has an toggle boolean, upper value, lower value, 
    // and inclusive/exclusive boolean flag
    [false, 340, 20],
    [false, 180, 280],
    [false, 45, 110],
    [false, 0, 255]
    ];
var slider_hsv = null;

//----------------------------------------------------------------
//  INITIALIZATION
//----------------------------------------------------------------
window.onload = function() {
    initColorPicker();
	canvas = document.getElementById("image_canvas");
	ctx = canvas.getContext('2d');
    image = new Image();
    image.src = "../static/img/puzzle.jpg";
    image.onload = function(){
        // Resize the image and draw it at the origin
        //ctx.scale(0.1, 0.1);
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
    input_im = document.getElementById("inp_select");
    console.log(input_im.value);
    
    image.src = '../static/img/' + input_im.value;
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        reset();
    }
}

//----------------------------------------------------------------
//  PATTERN MATCHING
//----------------------------------------------------------------

$(function() {
    var submit_form = function(e) {
      $.getJSON($SCRIPT_ROOT + '/_add_numbers', {
        a: $('select[name="a"]').val(),
        b: $('input[name="b"]').val(),
        c: $('select[name="c"]').val()
      }, function(data) {
        $('#result').text(data.result);
        alert(JSON.stringify(data.result));
        console.log(JSON.stringify(data.result));
        var str = JSON.stringify(data.result);
        str = str.slice(1, str.length-1);
        nicedata = str.split(',');
        for (i = 0; i < nicedata.length; i++){
            nicedata[i] = parseInt(nicedata[i], 10);
        }
        console.log(nicedata);
        $('input[name=a]').focus().select();
      });
      return false;
    };
    $('a#calculate').bind('click', submit_form);
    $('input[name=a]').focus();
  });


//----------------------------------------------------------------
//  MASKING FUNCTIONS
//----------------------------------------------------------------
notgray = function(event){
        count++
        if(count%2 == 0){
            bottom = [event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop];
            console.log(bottom);
            document.getElementById("cursor").setAttribute("class", "");
            crop([topx, topy],bottom);
            count = 0
            canvas.removeEventListener('click', notgray);
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
            document.getElementById("grayOut").innerHTML = "Gray Out Area";
            document.getElementById("cursor").setAttribute("class", "");
            oppositeCrop([topx, topy],bottom);
            count = 0
            canvas.removeEventListener('click',gray);
            canvas.removeEventListener('click',rgray);
        }
        else{
            topx = event.pageX-canvas.offsetLeft;
            topy = event.pageY-canvas.offsetTop;
            console.log(topx, topy);
        }
    }
    
rgray = function(event){
        count++
        if(count%2 == 0){
            bottom = [event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop];
            console.log(bottom);
            document.getElementById("removeGray").innerHTML = "Remove Gray"; document.getElementById("cursor").setAttribute("class", "");
            ungray([topx, topy],bottom);
            count = 0
            canvas.removeEventListener('click',rgray);
        }
        else{
            topx = event.pageX-canvas.offsetLeft;
            topy = event.pageY-canvas.offsetTop;
            console.log(topx, topy);
        }
}

function cancelFunction(strOriginal, button, cursor, functionToCancel) {
    button.innerHTML = strOriginal;
    canvas.removeEventListener('click', functionToCancel);
}

function removeGray(){
    
    count = 0;
    var button = document.getElementById("removeGray");
    var cursor = document.getElementById("cursor");
    var strCancel = "Click here to cancel";
    var strOriginal = "Remove Gray";
    
    cancelFunction("Gray Out Area", document.getElementById("grayOut"), cursor, gray);
    
    if(button.innerHTML == strCancel){
        cursor.setAttribute("class", "");
        cancelFunction(strOriginal, button, cursor, rgray);
        
    } else {
        button.innerHTML = strCancel;
        cursor.setAttribute("class", "crosshair");
        canvas.addEventListener('click', rgray);
    }
}

function grayOut() {
    count = 0;
    var button = document.getElementById("grayOut");
    var cursor = document.getElementById("cursor");
    var strCancel = "Click here to cancel";
    var strOriginal = "Gray Out Area";
    
    cancelFunction("Remove Gray", document.getElementById("removeGray"), cursor, rgray);
    
    if(button.innerHTML == strCancel){
        cursor.setAttribute("class", "");
        cancelFunction(strOriginal, button, cursor, gray);
        
    } else {
        button.innerHTML = strCancel;
        cursor.setAttribute("class", "crosshair");
        canvas.addEventListener('click', gray);
    }
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

function allGray(){
    modified_image = image;
    var imageData = ctx.getImageData(0,0,modified_image.width,modified_image.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = data[i];
        data[i + 1] = data[i+1];
        data[i + 2] = data[i+2];
        data[i + 3] = 100;
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, modified_image.width, modified_image.height);
}

//----------------------------------------------------------------
//  FILTER FUNCTIONS
//----------------------------------------------------------------

function updateCheckbox(thing, num){
    filter_ranges[num][0] = thing.checked;
    filterAll();
}

// Update nth filter's mth value (upper or lower range) with the value
// of the color picker
function updateHueRange(n, m){
    filter_ranges[n][m] = slider_hsv['h'];
}

function filterTest(col, hsl, i){
    if (filter_ranges[i][1] > filter_ranges[i][2]){
        return (hsl[0] > filter_ranges[i][1]/360 || 
        hsl[0] < filter_ranges[i][2]/360);
    } else {
        return (hsl[0] > filter_ranges[i][1]/360 && 
        hsl[0] < filter_ranges[i][2]/360);
    }
}

function filterAll(){
    console.log("Running filters!");
    var no_filter_check = true;
    var backup_data = ctx.getImageData(0,0,image.width, image.height);
    ctx.drawImage(image, 0, 0);
    for (i = 0; i < filter_ranges.length; i ++){
        if (filter_ranges[i][0]){
            no_filter_check = false;
            break;
        }
    }
    modified_image = image;
    imageData = ctx.getImageData(0,0,image.width, image.height);

    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (!no_filter_check) {
            var hsl = rgbToHsl(data[i], data[i+1], data[i+2]);
            var rgb = [data[i], data[i+1], data[i+2]];
            var test = false;
            for (j = 0; j < filter_ranges.length; j ++) {
                if (filter_ranges[j][0])
                    test = test || filterTest(rgb, hsl, j); 
            }
            if (!test){
              data[i]     = safe_color[0];     // red
              data[i + 1] = safe_color[1];
              data[i + 2] = safe_color[2];
            }
        }
        data[i +3] = backup_data.data[i+3];
    }
    ctx.putImageData(imageData, 0, 0);
}


function initColorPicker(){
    ColorPicker.fixIndicators(
                document.getElementById('slider-indicator'),
                document.getElementById('picker-indicator')
                );

        ColorPicker(
                document.getElementById('slider'), 
                document.getElementById('picker'), 

                function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {

                    ColorPicker.positionIndicators(
                        document.getElementById('slider-indicator'),
                        document.getElementById('picker-indicator'),
                        sliderCoordinate, pickerCoordinate
                    );

                    slider_hsv = hsv;
                    console.log(slider_hsv);
            });
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

function resetFilters() {
    var elems = document.getElementsByClassName("checkboxes")
    for (i = 0; i < elems.length; i ++){
        elems[i].checked = false;
    }
    for (i = 0; i < filter_ranges.length; i ++){
        filter_ranges[i][0] = false;
    }
}

function reset() {
    ctx.drawImage(image, 0, 0);
    resetFilters();
}

function resetColor() {
    resetFilters();
    filterAll();
}

function resetGray(){
    modified_image = image;
    var imageData = ctx.getImageData(0,0,modified_image.width,modified_image.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = data[i];
        data[i + 1] = data[i+1];
        data[i + 2] = data[i+2];
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, modified_image.width, modified_image.height);
}


function toggleInstructions(obj) {
      var obj=document.getElementById(obj);
      var obj2 = document.getElementById("infoheader");
      if (obj.style.display == "block") {
          obj2.innerHTML = "Show Instructions";
          obj.style.display = "none";
      } else {
          obj2.innerHTML = "Hide Instructions";
          obj.style.display = "block";
      }
}