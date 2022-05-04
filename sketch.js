const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var corda
var fruta_opcoes
let engine;
let world;
var ground;
var fruta_com
var fruta_com2
var fruta_com3
var coelhofoto
var frutafoto
var fundofoto 
var coelho
var botao
var piscando, comendo, triste
var somfundo
var coelhotriste
var coelhocomendo
var cortecorda
var somar
var balaodear
var mutebt
var botao2
var botao3
var corda2 
var corda3
function preload(){

  coelhofoto = loadImage("Rabbit-01.png")
  frutafoto = loadImage("melon.png")
  fundofoto = loadImage("background.png")
piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
comendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
triste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
somfundo = loadSound("sound1.mp3")
coelhocomendo = loadSound("eating_sound.mp3")
cortecorda = loadSound("rope_cut.mp3")
somar = loadSound("air.wav")
coelhotriste = loadSound("sad.wav")
comendo.playing = true
comendo .looping = false
piscando. playing = true
triste.playing = true
triste.looping= false
}
function setup() 
{
  var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(ismobile){
    canW= displayWidth
canH=displayHeight
createCanvas(displayWidth+80, displayHeight)
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth, windowHeight);
  }
  
  frameRate(80);
  somfundo.play()
  somfundo.setVolume(0.5)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);
corda = new Rope(6,{x:245,y:30})
corda2 = new Rope(7,{x:370, y:40})
corda3 = new Rope(4,{x:400, y:225})
coelho = createSprite(250,canH-80,100,100)
coelho.addImage(coelhofoto)
coelho.scale= 0.2
comendo.frameDelay = 20
piscando.frameDelay = 20
triste.frameDelay = 20
coelho.addAnimation("comendo",comendo)
coelho.addAnimation("piscando", piscando)
coelho.addAnimation("triste", triste)
coelho.changeAnimation ("piscando")
var fruta_opcoes={
  density : 0.001
}
fruta = Bodies.circle(300,300,15,fruta_opcoes)

Matter.Composite.add(corda.body,fruta)
fruta_com=new Link (corda,fruta )
fruta_com2=new Link (corda2,fruta )
fruta_com3=new Link (corda3,fruta )
botao=createImg('cut_btn.png')
botao.position(220,30)
botao.size(50,50)
botao.mouseClicked(drop)
botao2=createImg('cut_btn.png')
botao2.position(330,35)
botao2.size(50,50)
botao2.mouseClicked(drop2)
botao3=createImg('cut_btn.png')
botao3.position(360, 200)
botao3.size(50,50)
botao3.mouseClicked(drop3)
balaodear = createImg("blower.png") 
balaodear.position(10,250)
balaodear.size(150,100)
balaodear.mouseClicked(balaodeAr)
mutebt = createImg("mute.png") 
mutebt.position(450,20)
mutebt.size(50,50)
mutebt.mouseClicked(mute)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(fundofoto,0,0, canW+80,canH)
  ground.show();
  corda2.show();
  corda3.show();
  corda.show();
  Engine.update(engine);
  if (fruta!= null){
  image(frutafoto, fruta.position.x,fruta.position.y,60,60)}
if (collide(fruta,coelho)===true){
  coelho.changeAnimation("comendo")
coelhocomendo.play()}

 if (fruta!= null &&fruta.position.y>= 600){
   coelho.changeAnimation("triste")
somfundo.stop()
  coelhotriste.play()
  fruta = null 

 }
  drawSprites() 
}

function drop(){
  corda.break();
  fruta_com.detach()
  fruta_com = null
  cortecorda.play()
}
function drop2(){
  corda2.break();
  fruta_com2.detach()
  fruta_com2 = null
  cortecorda.play()
}
function drop3(){
  corda3.break();
  fruta_com3.detach()
  fruta_com3 = null
  cortecorda.play()
}
function collide(body,sprite){
  if (body != null){
    var d = dist (body.position.x, body.position.y, sprite.position.x, sprite.position.y) 
    if (d<=80){
      World.remove(world,fruta)
      fruta= null
      return true 
    
    
  }
  else {
    return false 
  }
  }
}
function balaodeAr(){
Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0})
somar.play()
}

function mute(){
  if (somfundo.isPlaying()){
    somfundo.stop()
  
  }
  else {
    somfundo.play()
  }
}
