var canvas;
var myShader;
var position;
var scaleVal;
var prevMousePos;
function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag");
}
function setup() {
    canvas = createCanvas(desiredCanvasWidth(), desiredCanvasHeight(), WEBGL);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    prevMousePos = createVector(0, 0);
    position = createVector(0, 0);
    scaleVal = 0.16608338398760678;
}
function draw() {
    shader(myShader);
    var ratio = width / height;
    myShader.setUniform("botLeft", [position.x - ratio * scaleVal, position.y - scaleVal]);
    myShader.setUniform("topRight", [position.x + ratio * scaleVal, position.y + scaleVal]);
    rect(0, 0, 0, 0);
}
function mouseWheel(event) {
    var scaleFactor = pow(0.95, -event.delta * 0.01);
    scaleVal *= scaleFactor;
}
function mousePressed() {
    prevMousePos.set(mouseX, mouseY);
}
function mouseDragged() {
    var delta = p5.Vector.sub(createVector(mouseX, mouseY), prevMousePos).mult(2 * scaleVal / height);
    delta.x = -delta.x;
    position.add(delta);
    prevMousePos.set(mouseX, mouseY);
}
function keyPressed() {
    if (key == 's')
        save();
}
function desiredCanvasWidth() {
    return windowWidth;
}
function desiredCanvasHeight() {
    return windowHeight;
}
function windowResized() {
    resizeCanvas(desiredCanvasWidth(), desiredCanvasHeight());
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
//# sourceMappingURL=../sketch/sketch/build.js.map