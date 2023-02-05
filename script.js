// game elements
var car = document.getElementById("car")
var rock = document.getElementById("rock")
var points = document.getElementById("points")
var fact = document.getElementById("fact")
var game_over_txt = document.getElementById("game_over_text")
var conclusion = document.getElementById("conclusion")

var point_added = false
var num_points = 0

var rock_speed = 2
var facts = 0
var facts_collected = 0

fact.style.display = "none";

function jump() {
  if (car.classList != "jump"){
    car.classList.add("jump")

    setTimeout(function() {
      car.classList.remove("jump")
    }, 500)
  }
}

function stillAlive(rockPos) {
  if (rockPos <= 0 && point_added == false) {
    // increment points
    point_added = true
    num_points += 1
    points.innerHTML = "Points: " + num_points

    // increase rock speed
    rock_speed -= 0.01
    rock_speed_string = rock_speed.toString() + "s"
    rock.style.animationDuration = rock_speed_string;
  } else if (rockPos > 0){
    // prevents more points from being added
    // until the car returns to the far-right
    point_added = false
  }
}

function releaseFact() {
  rand_num = Math.random()
  if (facts <= 6 && rand_num < 0.005 && rock.classList == "glideLeft") {
    fact.style.display = "block";
    fact.classList.add("glideLeft")
    facts += 1

    setTimeout(function() {
      fact.classList.remove("glideLeft")
      fact.style.display = "none";
    }, 2000)
  }
}

function game_over() {
  rock.classList.remove("glideLeft")
  clearInterval(game_loop)
  game_over_txt.innerHTML = "Game Over! You gained " + num_points + " points by driving green. <br /> Take a look at " + facts_collected + " fact(s) about the future of electric vehicles!"

  var fact_num = 1
  var fact_paragraph = ""
  
  for (var i = 0; i < facts_collected; i++) {
    var element_name = "fact"+fact_num
    var my_fact = localStorage.getItem(element_name)
    console.log(my_fact)
    fact_paragraph += (my_fact + "<br /> <br />")
    fact_num += 1
  }
  conclusion.innerHTML = (fact_paragraph + "For more information visit the Info Sheet Tab")
}
var game_loop = setInterval(function() {
  let carPos = parseInt(window.getComputedStyle(car).getPropertyValue("top"))
  let rockPos = parseInt(window.getComputedStyle(rock).getPropertyValue("left"))
  let factPos = parseInt(window.getComputedStyle(fact).getPropertyValue("left"))
  
  // game over
  if (carPos >= 100 && (rockPos >= 0 && rockPos <= 50)) {
    game_over()
  }
  if (carPos <= 60 && (factPos >= 0 && factPos <= 50)) {
    facts_collected += 1;
    fact.style.display = "none";
  }
  
  stillAlive(rockPos)
  if (fact.style.display == "none") {
    releaseFact()
  }
}, 10)

document.addEventListener("keydown", function(event){
  if (rock.classList != "glideLeft") {
    rock.classList.add("glideLeft")
  }
  if (event.code == "Space") {
    jump()
  }
})

