

function uploadpic() {
    var canvas = document.getElementById("image_canvas");
	ctx = canvas.getContext('2d');
    try {
        filter = new WebGLImageFilter();
    }
    catch( error ) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillText("This browser doesn't have support for WegGL, or something else went wrong...\n"+error.message, canvas.width/2, canvas.height/2);
        return;
    }
    
    input_im = document.getElementById("inp");
    console.log(input_im.value);
    
    image = new Image();
    image.src = 'img/' + input_im.value;
    image.onload = function(){
        // Resize the image and draw it at the origin
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }
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
    
/*function brightnessConstrast() {
    canvas.draw(texture).brightnessContrast(this.brightness, this.contrast).update();
})*/


function main() {
    // Read the KML file
        
    // Setup the Babylon system
    var canvas = document.getElementById("CropCanvas");
    
}


