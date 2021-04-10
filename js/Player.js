class Player {
  constructor(){
    this.name= null
    this.distance= 0
    this.index= null
    this.rank= 0



  }

  getCount(){
    var playerCountRef = database.ref('playerCount')
    playerCountRef.on("value",function(data){
      playerCount = data.val()
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    })
  }

  update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).set({
    name:this.name,
    distance:this.distance,
    rank:this.rank
    })
  }

  static getPlayerInfo() {
    var Pageno= database.ref("players")
    Pageno.on("value", function(data) {
      allPlayers= data.val()
      //console.log(allPlayers)
    })


  }

  readfinish() {
    var Pageno= database.ref("Finish")
    Pageno.on("value", (data)=>{
    this.rank= data.val()
    finish= data.val()
    }) 
  }

  writefinish(rank) {
    var Pageno= database.ref('/')
    Pageno.update({
      Finish:rank
    })
  }
}
