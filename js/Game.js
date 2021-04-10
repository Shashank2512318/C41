class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    })
  }

  start(){
    if(gameState === 0){
      player = new Player()
      player.getCount()
      form = new Form()
      form.display()
    }

    cars[0]= createSprite(windowWidth/3, windowHeight-100, 50, 50)
    cars[1]= createSprite(windowWidth/3+200, windowHeight-100, 50, 50)
    cars[2]= createSprite(windowWidth/3+400, windowHeight-100, 50, 50)
    cars[0].addImage(car1Image)
    cars[1].addImage(car2Image)
    cars[2].addImage(car3Image)
  }

  play(){
    form.hideD()
    //textSize(20)
    //text("Game Start", windowWidth/2-100, windowHeight/2)
    Player.getPlayerInfo()
    player.readfinish()
    if(allPlayers!== undefined){
      imageMode(CENTER)
      image(trackImage, windowWidth/2, -windowHeight*4, windowWidth, windowHeight*10)
      //var pos= 100
      var j= 0
      var x= windowWidth/3
      var y= windowHeight-100
      for(var i in allPlayers){
      y= windowHeight-100-allPlayers[i].distance
      cars[j].x= x
      cars[j].y= y

      if(j === player.index-1) {
        //cars[j].shapeColor= "red"
        fill("red")
        ellipse(x, y, 100, 100)

        camera.position.x= windowWidth/2
        camera.position.y= cars[j].y
      }

      j = j+1
      x= x+200
    }
  }
    if(keyDown("UP_ARROW") && player.index!== null) {

      player.distance= player.distance+100
      player.update()
    }
    if(player.distance>6000) {

      gameState= 2
      player.rank= player.rank+1
      player.update()
      player.writefinish(player.rank)
    }

    

  }
  end() {
    console.log("End")

  }

  displayrank() {
    camera.position.x= windowWidth/2
    camera.position.y= windowHeight/3
    Player.getPlayerInfo()
    textSize(20)
    fill("red")

    for(var i in allPlayers) {
      if(allPlayers[i].rank === 1) {
        text("1st Price goes to"+ allPlayers[i].name, windowWidth/2, windowHeight/3)
      }
      if(allPlayers[i].rank === 2) {
        text("2nd Price goes to"+ allPlayers[i].name, windowWidth/2, windowHeight/3+100)
      }
      if(allPlayers[i].rank === 3) {
        text("3rd Price goes to"+ allPlayers[i].name, windowWidth/2, windowHeight/3+200)
      }
    }
  }
}
