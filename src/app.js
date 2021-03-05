import { Carte } from './carte.js';
import { Arme } from './arme.js';


export class App{
	constructor(){
		this.map = null
		this.player1 = null
		this.player2 = null
		this.woodsword = new Arme("Wood Sword", 20, '<img src="img/epeebois.png"/>')
		this.axe = new Arme("Axe", 30, '<img src="img/hache.png"/>')
		this.hammer = new Arme("Hammer", 30, '<img src="img/masse.png"/>')
		this.kingsword = new Arme("King Sword", 40, '<img src="img/epeelourde.png"/>')	
	}

	generateMAP(rows, cols){
		this.map = new Carte(rows, cols)
		this.player1 = this.map.player1
		this.player2 = this.map.player2
		this.map.putWeapons([this.woodsword, this.axe, this.hammer, this.kingsword]);
	}

	startMoving(playername) {			
		if(this.player1.isNear(this.player2.row, this.player2.col)) { //test de la position des joueurs
			var areaInvisible = document.getElementById('zonecombat');
			areaInvisible.style.visibility = "visible";
			var attaquereduit = false;
			if((playername == "player1") || (playername == this.player1)){
				var currentPlayer = this.player1;
			} else if((playername == "player2") || (playername == this.player2)){
				var currentPlayer = this.player2;
			}
			currentPlayer.playSound('fightSound');
			alert("FIGHT !!!");
			currentPlayer.combat(playername, attaquereduit, areaInvisible, this.player1, this.player2);
		}
		else { //tour joueur 1 ou 2
			if((playername == "player1") || (playername == this.player1)){
				var currentPlayer = this.player1;
				var secondPlayer = "player2";
			} else if ((playername == "player2") || (playername == this.player2)){
				var currentPlayer = this.player2;
				var secondPlayer = "player1";
			}
			var that = this
			currentPlayer.showAvailableCases(this.map); //affichage des cases de déplacement
			$('.jaune').on('click', function(){ //deplacement lors du clic sur une case jaune
				$('.jaune').off('click');
				that.moveBody(currentPlayer, this) // fonction déplacement
				that.startMoving(secondPlayer); //passage du tour au joueur suivant
			})
		}
	}

	moveBody(currentPlayer, event){
		if($("#"+event.id).hasClass('jaune')) {
			var classname = currentPlayer.row+''+currentPlayer.col; //déplacement
			$("#"+classname).removeClass(currentPlayer.nom); //suppression de la classe sur l'ancienne case
			document.getElementById(classname).innerHTML = ''; // suppression du html sur l'ancienne case
			if($("#"+event.id).hasClass('Wood Sword')){ //changement d'arme	si case arme selectionné
				this.woodsword.changeWeapon(currentPlayer, event, classname, this.woodsword, this.axe, this.hammer, this.kingsword);
			} else if($("#"+event.id).hasClass('Axe')){
			 	this.axe.changeWeapon(currentPlayer, event, classname, this.woodsword, this.axe, this.hammer, this.kingsword);
			} else if($("#"+event.id).hasClass('Hammer')){
				this.hammer.changeWeapon(currentPlayer, event, classname, this.woodsword, this.axe, this.hammer, this.kingsword);
			} else if($("#"+event.id).hasClass('King Sword')){
				this.kingsword.changeWeapon(currentPlayer, event, classname, this.woodsword, this.axe, this.hammer, this.kingsword);
			}
			var ligneId = event.id.substr(0,1);
			var colonneId = event.id.substr(1,1);
			currentPlayer.row = Number(ligneId);
			currentPlayer.col = Number(colonneId);
			$("#"+event.id).addClass(currentPlayer.nom); //Affectation de la class sur nouvelle case
			document.getElementById(event.id).innerHTML = currentPlayer.skin;//Affectation du skin sur nouvelle case	
			$('td').removeClass('jaune'); // suppression des cases jaunes
			currentPlayer.refreshPlayer(currentPlayer);
		}
	}
}