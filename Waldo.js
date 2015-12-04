
function msg() {
    var input_im = document.getElementById("newpuzzle");
    console.log(input_im.value);

    var image = document.getElementById("puzzle"); 
    var width = image.clientWidth;
    console.log(width);
    image.src = input_im.value;
    width = image.clientWidth;
    console.log(width);
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


