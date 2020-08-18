
const theCanvas = document.querySelector("canvas"); //Space to draw
theCanvas.width = window.innerWidth; // set the drawing space as big as the browser
theCanvas.height = window.innerHeight; //resize both width and height to match application
// theCanvas.width = 500;
// theCanvas.height = 500;
canvasSize = ((theCanvas.height * .15)+(theCanvas.width*.15))/2;
const contx = theCanvas.getContext("2d");

let curvy = true; //curve branch or not

let color1 = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"; //Random color for branches
let color2 = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"; //Random color for leaves
let shadow = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"; //Random shadow color

drawTree(theCanvas.width/2,theCanvas.height - 100, canvasSize, 0 , 20, color1, color2);


// starting x,y ... legnth...angle...branch width... branch color...leaf color
function drawTree(startx, starty, len, angle, bWidth, c1, c2){
    contx.beginPath();
    contx.save(); // save current state for backup
    contx.strokeStyle = c1; // branch color
    contx.fillStyle = c2; //leaf color
    contx.shadowBlur = 2;
    contx.shadowColor = shadow;
    contx.lineWidth = bWidth; //branch thickness
    contx.translate(startx, starty); //move drawing focus to starting points
    contx.rotate(angle *(Math.PI/180)); // rotate based on angle given multiplied by the radian 
    contx.moveTo(0,0);
    if(!curvy){ //if last branch was curvy draw straight line
        contx.lineTo(0,-len);
        curvy = true;
    }else //else draw cruvy line
    {
        contx.bezierCurveTo(10, -len/2,10,-len/2,0,-len);
        curvy=false;
    }
    contx.stroke();

    if(len < 13){//if branches reaching context limit draw leaves
        contx.beginPath();
        contx.arc(0,-len,10,0,Math.PI/.80);
        contx.arc(-len,0,10,0,Math.PI/1.25);//draw leaf
        contx.shadowBlur = 7;
        contx.shadowColor = shadow;
        contx.fill();
        contx.restore();
        return;
    };

    drawTree(0, -len, len*0.77, angle + 13, bWidth * 0.65, c1, c2);
    drawTree(0, -len, len*0.77, angle - 13, bWidth * 0.65, c1, c2);
    

    contx.restore();
}

//window.open("index.html","_parent");//reloads the page repeatedly on the open page