document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid')
    const scorePlay=document.querySelector('#score')
    const width=28      // 28 x 28 = 784 squers
    const squers=[]
    let score=0

    // layout of grid and what is in the squers
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    // draw the grid and render it
    function createBoard(){
        for(i=0;i<layout.length;i++){
            const squer=document.createElement('div')
            grid.appendChild(squer)
            squers.push(squer)

            // add layout to the board
            if(layout[i] === 0){
                squers[i].classList.add('pac-dot')
            }
            else if(layout[i] === 1){
                squers[i].classList.add('wall')
            }
            else if(layout[i] === 2){
                squers[i].classList.add('ghost-lair')
            }
            else if(layout[i] === 3){
                squers[i].classList.add('power-pellet')
            }
        }
    }
    createBoard()
    
    // starting position of pacman
    let pacmanCurrentIndex=490
    squers[pacmanCurrentIndex].classList.add('pac-man')

    // move pac-man
    function movePacman(e){
        squers[pacmanCurrentIndex].classList.remove('pac-man')
    
        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !== 0 &&
                    !squers[pacmanCurrentIndex -1].classList.contains('wall') &&
                    !squers[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                    ) 
                    pacmanCurrentIndex -=1
                    if(squers[pacmanCurrentIndex -1] === squers[363]){
                        pacmanCurrentIndex=391
                    }
                break
            case 38:
                if(pacmanCurrentIndex - width >=0 &&
                    !squers[pacmanCurrentIndex -width].classList.contains('wall') &&
                    !squers[pacmanCurrentIndex -width].classList.contains('ghost-lair')
                    ) 
                    pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width -1 &&
                    !squers[pacmanCurrentIndex +1].classList.contains('wall') &&
                    !squers[pacmanCurrentIndex +1].classList.contains('ghost-lair')
                    ) 
                    pacmanCurrentIndex +=1
                    if(squers[pacmanCurrentIndex +1] === squers[392]){
                        pacmanCurrentIndex=364
                    }
                break
            case 40:
                if(pacmanCurrentIndex + width < width * width &&
                    !squers[pacmanCurrentIndex +width].classList.contains('wall') &&
                    !squers[pacmanCurrentIndex +width].classList.contains('ghost-lair')
                    ) 
                    pacmanCurrentIndex +=width
                break 
        }

        squers[pacmanCurrentIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        CheckForWin()
    }

    document.addEventListener('keyup',movePacman)

    // what happen whene pac-man eats a pac-dots
    function pacDotEaten(){
        if(squers[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++
            scorePlay.innerHTML=score
            squers[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }

    // what happen whene you eat a powe-pellet
    function powerPelletEaten(){
        if(squers[pacmanCurrentIndex].classList.contains('power-pellet')){
            score+=10
            scorePlay.innerHTML=score
            ghosts.forEach(ghost => ghost.isScared=true)
            setTimeout(unScareGhost,1000)
            squers[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    // make the ghosts stop appearing as aquamrine
    function unScareGhost(){
        ghosts.forEach(ghost => ghost.isScared=false)
    }


    // create our ghost template
    class Ghost{
        constructor(className,startIndex,speed){
            this.className=className
            this.startIndex=startIndex
            this.speed=speed
            this.currentIndex=startIndex
            this.timerId=NaN
            this.isScared=false
        }
    }

    const ghosts=[
        new Ghost('blinky',348,250),
        new Ghost('pinky',376,400),
        new Ghost('inky',351,300),
        new Ghost('clyde',379,500),
    ]

    // draw my ghoosts onto the grid
    ghosts.forEach(ghost => {
        squers[ghost.currentIndex].classList.add(ghost.className)
        squers[ghost.currentIndex].classList.add('ghost')
    })

    // move ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    // write the function to move the ghost
    function moveGhost(ghost){
        const directions=[-1,+1,width,-width]
        let direction = directions[Math.floor(Math.random()*directions.length)]

        ghost.timerId=setInterval(function(){
            // if the next squers your ghosts is going to go in does NOT contain a wall and a ghost, you can go there
            if(!squers[ghost.currentIndex + direction].classList.contains('wall') &&
            !squers[ghost.currentIndex + direction].classList.contains('ghost')
            ){
                // you can go there
                // remove all the ghosts related classes
                squers[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                // change the currentIndex to the new safe squers
                ghost.currentIndex +=direction
                // redraw the ghost in the new safe space
                squers[ghost.currentIndex].classList.add(ghost.className,'ghost')
            }
            // else find a new direction to try
            else direction = directions[Math.floor(Math.random()*directions.length)]

            // if the ghost is currently scared
            if(ghost.isScared){
                squers[ghost.currentIndex].classList.add('scared-ghost')
            }

            // if the ghost is scared and pacman runs into it
            if(ghost.isScared && squers[ghost.currentIndex].classList.contains('pac-man')){
                squers[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                ghost.currentIndex=ghost.startIndex
                score+=100
                squers[ghost.currentIndex].classList.add(ghost.className,'ghost')
            }
            checkForGameOver()
        },ghost.speed)
    }

    // check for a game over
    function checkForGameOver(){
        if(squers[pacmanCurrentIndex].classList.contains('ghost') &&
        !squers[pacmanCurrentIndex].classList.contains('scared-ghost')
        ){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup',movePacman)
            setTimeout(function(){alert('Game Over')},500)
        }
    }

    // check for win
    function CheckForWin(){
        if(score >= 250){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup',movePacman)
            setTimeout(function(){alert('You Win the Game')},500)
        }
    }
})