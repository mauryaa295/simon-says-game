let gameSeq=[];
let userSeq=[];
let btnArr=['yellow','red','green','blue'];
let h2=document.querySelector('h2');
let score=0;
let highestScore=0;

let started=false;
let level =0;

document.addEventListener('keypress',function(){
    if(!started){
        started=true;
        console.log('game is started');

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },450);
}


function levelUp(){
    userSeq=[];
    score=level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btnArr[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function userFlash(btn){
    btn.classList.add('user-flash');
    setTimeout(function(){
        btn.classList.remove('user-flash');
    },450);
}

function wrongGuess(){
    let body=document.querySelector('body');
    body.classList.add('wrongGuess');
    setTimeout(function(){
        body.classList.remove('wrongGuess');
    },900);
    if(highestScore<score){
        highestScore=score;
    }
    h2.innerText=`GAME OVER! Your Score was ${score}.\n Press Any Key to Restart game\n Your Highest Score was ${highestScore}`;
    started=false;
    level =0;
    score=0;
    gameSeq=[];
    userSeq=[];
}

function checkAns(idx){
    //console.log(`current level ${level}`);
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        wrongGuess();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=this.getAttribute('id');
    userSeq.push(userColor);
    //console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

