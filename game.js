let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false; 


$(document).keydown(() =>{
    if(!started){
        $("h1").text(`Level ${level}`)
        nextSequence();
        started= true;
    }
})

$(document).on('tap', () => {
    if(!started){
        $("h1").text(`Level ${level}`)
        nextSequence();
        started= true;
    }
})

$(".mobile").click((e) => {
    if(!started){
        $('.mobile').addClass('pressed');
        setTimeout(()=> {
            $('.mobile').removeClass('pressed');
            $("h1").text(`Level ${level}`)
            nextSequence();
            started=true;
        }, 100)
        
    }
})

$('.btn').click((e) => {
    userClickedPattern.push(e.target.id)
    animatePress(e.target.id);
    playSound(e.target.id);
    checkAnswer(userClickedPattern.length - 1);
});

//  Functions
const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
};

const playSound = (name) => {
    new Audio(`sounds/${name}.mp3`).play();
}

const animatePress = (currentColor) => {
    $('#' + currentColor).addClass('pressed');
    setTimeout(()=> {
        $('#' + currentColor).removeClass('pressed');
    }, 100)
}

const startOver = () => {
    level = 0;
    started = false;
    gamePattern = [];
}

const checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('sucess');
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() =>{
                nextSequence();
            }, 1000)
        }
    }else {
        $("h1").text('Game OVER! Press any key to Restart');
        $("body").addClass('game-over');
        setTimeout(()=>{
            $("body").removeClass('game-over')
        }, 200);
        startOver();
    }
}


