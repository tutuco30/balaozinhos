var ballon,balloonImage1,balloonImage2;
var database, height  


function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }


function setup() {
 //chamar db aqui
 database = firebase.database()
 



   
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBallon",balloonImage1);
  balloon.scale=0.5;

  //bd
  var ballonHeight = database.ref("ballon/height")
  ballonHeight.on ("value", readHeight,showError )  
  textSize(20); 
}

// função para exibir a interface do usuário
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   //imagem e direção do movimento
   updateHeight(-10,0)
  }
   
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
  //
    balloon.addAnimation("hotAirBallon",balloonImage2);
  }
   
  else if(keyDown(UP_ARROW)){
    updateHeight(0, -10)
    balloon.scale=balloon.scale -0.005;
    balloon.addAnimation("hotAirBallon",balloonImage2);
  }
   
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0, 10)
    balloon.addAnimation("hotAirBallon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);

}


//função updateHeight
 function updateHeight(x,y){
 database.ref("ballon/height").update({
 "x": height.x + x,
 "y": height.y + y,

 })



 }

function readHeight(data){
 // adicionar propriedades dessa função
 height = data.val();
 balloon.x = height.x;
 balloon.y = height.y;

 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
