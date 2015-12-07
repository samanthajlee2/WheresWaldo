var image;
var ctx;
var canvas;

window.onload = function(){
    canvas = document.getElementById("CropCanvas");
    ctx = canvas.getContext('2d');
    image = new Image();
    image.src = "puzzle.jpg";
    image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0);
    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        console.log(imageData);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i]     = 255;     // red
            data[i + 1] = 255; // green
            data[i + 2] = 255; // blue
        }
        ctx.putImageData(imageData, 150, 150, 0, 0, 200, 200);
        ctx.putImageData(imageData, 0, 0, 0, 0, 150, 150);
    }
}
