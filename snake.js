const canvas = document.querySelector(".pytonuch")
const canvasContext = canvas.getContext("2d")

const minSize = 32


const ground= new Image()
ground.src = "img/ground.png"

const foodImg = new Image()
foodImg.src = "img/food.png"

let pytonuch = []

pytonuch[0] = {
    x : Math.floor(Math.random()*17+1) * minSize,
    y : Math.floor(Math.random()*15+3) * minSize
}

let food= {
    x : Math.floor(Math.random()*17+1) * minSize,
    y : Math.floor(Math.random()*15+3) * minSize
}

let score = 0

let directory

document.addEventListener("keydown",direction)

function direction({keyCode}){
    directory= (keyCode == 37 && directory!= "RIGHT")? "LEFT":
        (keyCode == 38 && directory!= "DOWN")? "UP":
        (keyCode == 39 && directory!= "LEFT")? "RIGHT":
        (keyCode == 40 && directory!= "UP")? "DOWN" : directory
}//Sprawdza przycisk i jeżeli może to zmienia kierunek pytona

function collision(head,array){
    for(let i in array)
        if(head.x == array[i].x && head.y == array[i].y)
            return true
    return false
}//Sprawdza czy nie doszło do kilozji

function draw(){
    
    canvasContext.drawImage(ground,0,0)//daje tło
    
    for( let i = 0; i < pytonuch.length;  i++){
        canvasContext.fillStyle = "orange"
        canvasContext.fillRect(pytonuch[i].x,pytonuch[i].y,minSize,minSize)
        canvasContext.strokeStyle = "black"
        canvasContext.strokeRect(pytonuch[i].x,pytonuch[i].y,minSize,minSize)
    }//rysuje pytona
    
    canvasContext.drawImage(foodImg, food.x, food.y)//rysuje cegłe
    
    let pytonuchX = pytonuch[0].x
    let pytonuchY = pytonuch[0].y
    //ustala połozenie głowy 
    
    if( directory== "LEFT") pytonuchX -= minSize
    else if( directory== "UP") pytonuchY -= minSize
    else if( directory== "RIGHT") pytonuchX += minSize
    else if( directory== "DOWN") pytonuchY += minSize
    //ma podstawie kierunku zmienia miejsce w które rysuje sie pytonuch
    
    if(pytonuchX == food.x && pytonuchY == food.y){
        score++
        food= {
            x : Math.floor(Math.random()*17+1) * minSize,
            y : Math.floor(Math.random()*15+3) * minSize
        }
    }else{
        pytonuch.pop()
    }//jeżeli głowa pytonucha dotknie jedzonka to daje punkt
    
    
    let newHead= {
        x : pytonuchX,
        y : pytonuchY
    }
    
    
    if(pytonuchX < minSize || pytonuchX > 17 * minSize || pytonuchY < 3*minSize || pytonuchY > 17*minSize || collision(newHead,pytonuch)){
        clearInterval(game)
        document.querySelector('body').innerHTML = 
        `<div class="game-over">
            <p>GameOver</p>
            <p>Twój wynik to: ${score}</p>
            <p>Smakowały cegły?</p>
        </div>`//Wypisuje ekran końca gry
    }//Urucchamia się jeżeli dojdzie do kolizji itd.
    
    pytonuch.unshift(newHead)
    
    canvasContext.fillStyle = "white"
    canvasContext.font = "45px Changa one"
    canvasContext.fillText(score,2*minSize,1.6*minSize)//Wypisuje punkty
}


















