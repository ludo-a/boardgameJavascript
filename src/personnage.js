export class Personnage {
	constructor (nom, arme, skinArme, pointAttaque, sante, row, col, skin) {
		
		this.nom = nom;
		this.arme= arme;
		this.skinArme = skinArme
		this.pointAttaque = pointAttaque;
		this.sante = sante;
		this.row = row;
		this.col = col;
		this.skin = skin;	
	}

	isNear(row, col){
		
		if((row == this.row) && (col == this.col-1)) {
			return true;
		} 
		else if((row == this.row) && (col == this.col+1)) {
			return true;
		}
		else if((col == this.col) && (row == this.row-1)) {
			return true
		}
		else if((col == this.col) && (row == this.row+1)) {
			return true;
		}
	}

	showAvailableCases(map){

		var ligneId = this.row;
		var colonneId = this.col;
		var carte = map.carte;

		if($("#"+''+(ligneId-1)+colonneId+'').hasClass('pierre')) {
		}
		else if(($("#"+''+(ligneId-2)+colonneId+'').hasClass('pierre')) || ($("#"+''+(ligneId-2)+colonneId+'').hasClass('player1')) || ($("#"+''+(ligneId-2)+colonneId+'').hasClass('player2'))) {
			$("#"+''+(ligneId-1)+colonneId+'').addClass('jaune');
		}
		else if(($("#"+''+(ligneId-3)+colonneId+'').hasClass('pierre')) || ($("#"+''+(ligneId-3)+colonneId+'').hasClass('player1')) || ($("#"+''+(ligneId-3)+colonneId+'').hasClass('player2'))) {
			$("#"+''+(ligneId-1)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId-2)+colonneId+'').addClass('jaune');
		}	else {
			$("#"+''+(ligneId-1)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId-2)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId-3)+colonneId+'').addClass('jaune');
		}
		
		if($("#"+''+(ligneId+1)+colonneId+'').hasClass('pierre')) {
		}
		else if(($("#"+''+(ligneId+2)+colonneId+'').hasClass('pierre')) || ($("#"+''+(ligneId+2)+colonneId+'').hasClass('player1')) || ($("#"+''+(ligneId+2)+colonneId+'').hasClass('player2'))) {
			$("#"+''+(ligneId+1)+colonneId+'').addClass('jaune');
		}
		else if(($("#"+''+(ligneId+3)+colonneId+'').hasClass('pierre')) || ($("#"+''+(ligneId+3)+colonneId+'').hasClass('player1')) || ($("#"+''+(ligneId+3)+colonneId+'').hasClass('player2'))) {
			$("#"+''+(ligneId+1)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId+2)+colonneId+'').addClass('jaune');
		}	else {
			$("#"+''+(ligneId+1)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId+2)+colonneId+'').addClass('jaune');
			$("#"+''+(ligneId+3)+colonneId+'').addClass('jaune');
		}
		
		if($("#"+''+ligneId+(colonneId-1)+'').hasClass('pierre')) {
		}
		else if(($("#"+''+ligneId+(colonneId-2)+'').hasClass('pierre')) || ($("#"+''+ligneId+(colonneId-2)+'').hasClass('player1')) || ($("#"+''+ligneId+(colonneId-2)+'').hasClass('player2'))) {
			$("#"+''+ligneId+(colonneId-1)+'').addClass('jaune');
		}
		else if(($("#"+''+ligneId+(colonneId-3)+'').hasClass('pierre')) || ($("#"+''+ligneId+(colonneId-3)+'').hasClass('player1')) || ($("#"+''+ligneId+(colonneId-3)+'').hasClass('player2'))) {
			$("#"+''+ligneId+(colonneId-1)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId-2)+'').addClass('jaune');
		}	else {
			$("#"+''+ligneId+(colonneId-1)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId-2)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId-3)+'').addClass('jaune');
		}

		if($("#"+''+ligneId+(colonneId+1)+'').hasClass('pierre')) {
		}
		else if(($("#"+''+ligneId+(colonneId+2)+'').hasClass('pierre')) || ($("#"+''+ligneId+(colonneId+2)+'').hasClass('player1')) || ($("#"+''+ligneId+(colonneId+2)+'').hasClass('player2'))) {
			$("#"+''+ligneId+(colonneId+1)+'').addClass('jaune');
		}
		else if(($("#"+''+ligneId+(colonneId+3)+'').hasClass('pierre')) || ($("#"+''+ligneId+(colonneId+3)+'').hasClass('player1')) || ($("#"+''+ligneId+(colonneId+3)+'').hasClass('player2'))) {
			$("#"+''+ligneId+(colonneId+1)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId+2)+'').addClass('jaune');
		}	else {
			$("#"+''+ligneId+(colonneId+1)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId+2)+'').addClass('jaune');
			$("#"+''+ligneId+(colonneId+3)+'').addClass('jaune');
		}
	}

	combat(playername, attaquereduit, areaInvisible, p1, p2) {
		this.player1 = p1;
		this.player2 = p2;
		if((playername == "player1") || (playername == this.player1)){
			var currentPlayer = this.player1;
			var secondPlayer = this.player2;	
			document.getElementById('fightingplayer').innerHTML = currentPlayer.skin;
		} else if((playername == "player2") || (playername == this.player2)){
			var currentPlayer = this.player2;
			var secondPlayer = this.player1;
			document.getElementById('fightingplayer').innerHTML = currentPlayer.skin;
		}
		var that = this;	
		var btnAttaque = document.getElementById('attaque');
		btnAttaque.onclick = makeAttack;

		var btnDefense = document.getElementById('defense');
		btnDefense.onclick = doDefense;

		function makeAttack(){
	
			if(attaquereduit == false){			//Attaque normal
	 			var santeAfterAttack = secondPlayer.sante-currentPlayer.pointAttaque;
			}
			else if(attaquereduit == true) {	//Attaque réduite
	 			var santeAfterAttack = secondPlayer.sante-(currentPlayer.pointAttaque/2);
	 		}
	 		Object.defineProperty(secondPlayer, 'sante', {
	 			value:santeAfterAttack
	 		});
	 		that.playSound('attackSound');
	 		that.damage(secondPlayer);
			that.refreshPlayer(secondPlayer);
			
	 		if(currentPlayer.nom == "player1") {
	 			var id = "pictBouclierP1"
			} else if(currentPlayer.nom == "player2"){
				var id = "pictBouclierP2"
			}
			document.getElementById(id).innerHTML = '';	
	 		if(secondPlayer.sante <=0) {
	 			alert("Votre adversaire est mort , GAME OVER");
	 			that.playSound('dieSound');
	 			document.getElementById('tableau').getElementsByTagName('tr')[secondPlayer.row].cells[secondPlayer.col].innerHTML = '<img src="img/skull.png"/>';
				areaInvisible.style.visibility = "hidden";
				setTimeout(function(){
					    if ( confirm( "ANOTHER GAME ?" ) ) {
        				document.location.reload(true);
    					} else {
       					location.href = "gameover.html";
    					}
				},4000);

			}else{
	 			attaquereduit = false;
	 			that.combat(secondPlayer, attaquereduit, areaInvisible, p1, p2);
			}
		}

		function doDefense(){
			if(currentPlayer.nom == "player1") {
				document.getElementById('pictBouclierP1').innerHTML = '<img src="img/bouclier.png"/>';
			} else if(currentPlayer.nom == "player2"){
				document.getElementById('pictBouclierP2').innerHTML = '<img src="img/bouclier.png"/>';
			}
			attaquereduit = true;
			that.playSound('shieldSound');
			that.combat(secondPlayer, attaquereduit, areaInvisible, p1, p2);
		}
	}

	damage(currentPlayer) {
		var degats = document.querySelector("."+currentPlayer.nom);
		degats.style.filter = "saturate(800%)";
		setTimeout(function(){
		degats.style.filter = "saturate(0%)";
		},100);	
		setTimeout(function(){
		degats.style.filter = "saturate(800%)";
		},200);
		setTimeout(function(){
		degats.style.filter = "saturate(0%)";
		},300);
		setTimeout(function(){
		degats.style.filter = "saturate(800%)";
		},400);
		setTimeout(function(){
		degats.style.filter = "saturate(100%)";
		},500);		
	}

	refreshPlayer(currentPlayer) {
	
		if(currentPlayer.nom == "player1") {
			document.getElementById('pointattackplayer1').innerHTML = " "+currentPlayer.pointAttaque;
			document.getElementById('pointvieplayer1').innerHTML = " "+currentPlayer.sante;
			document.getElementById('imageweaponplayer1').innerHTML = " "+currentPlayer.skinArme;
			
		}
	 	else if(currentPlayer.nom == "player2"){
	 		document.getElementById('pointattackplayer2').innerHTML = " "+currentPlayer.pointAttaque;
			document.getElementById('pointvieplayer2').innerHTML = " "+currentPlayer.sante;
			document.getElementById('imageweaponplayer2').innerHTML = " "+currentPlayer.skinArme;
			
	 	}
	}
	playSound(idSon) {
		var sound = document.getElementById(idSon);
		sound.play();
	}
}

