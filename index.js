
var game = 0;
var level = 1;
var pattern = [];
var inputTime = 500;

jQuery(document).keypress(function(){
	if(game == 0){
	 	game++;
		startGame();
	}
});

function restart(x){
	level = 1;
	pattern = [];
	inputTime = 500;
	var start = x;
	jQuery(document).keypress(function(){
		if(start == 0){
		 	start++;
			startGame();
		}
	});
}	

function startGame(){
	
	buildPattern();
	setTimeout(function(){
		takeUserInput();	
	}, inputTime);
}

function buildPattern(){
	var title = 'Level '+level;
	jQuery('#level-title').text(title);

	var time = 500;
	var random = Math.floor(Math.random()*4);
	pattern.push(random);
	var x = 0;
	for(var i = 0; i < pattern.length; i++){
		x = pattern[i];
		if(x == 0){
			setTimeout(function(){ 
				showPattern('red');
			}, time);	
		}
		else if(x == 1){
			setTimeout(function(){ 
				showPattern('green');
			}, time);	
		}
		else if(x == 2){
			setTimeout(function(){ 
				showPattern('blue');
			}, time);	
		}
		else if(x == 3){
			setTimeout(function(){ 
				showPattern('yellow');
			}, time);	
		}
		time += 1000;
	}
	level++;
	inputTime = time;
}

function showPattern(s){
	makeSound(s);
	s = '#'+s;
	jQuery(s).addClass('pressed');
	setTimeout(function(){
		jQuery(s).removeClass('pressed');
	}, 300);
}

function makeSound(s){
	var audio = new Audio('sounds/'+s+'.mp3');
	audio.play();
}

function gameOver(){
	jQuery('.btn').off('click');
	makeSound('wrong');
	jQuery('body').addClass('game-over');
	setTimeout(function(){
		jQuery('body').removeClass('game-over');
	},200);
	jQuery('#level-title').text('Game over. Press any key to restart.');
	restart(0);
}

function takeUserInput(){
	var userPattern = [];
	var clicked = 0;
	var x = -1;
	jQuery('.btn').on('click',function(){
		showPattern(this.id);
		
		if(this.id == 'red'){
			x = 0;
		}
		else if(this.id == 'green'){
			x = 1;
		}
		else if(this.id == 'blue'){
			x = 2;
		}
		else if(this.id == 'yellow'){
			x = 3;
		}
		
		if(pattern[clicked] != x){
			gameOver();
		}
		else{
			clicked++;
			if(clicked == pattern.length){
				jQuery('.btn').off('click');
				setTimeout(function(){
					startGame();
				}, 500);
			}
		}
	});	
}
