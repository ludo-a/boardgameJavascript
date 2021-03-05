import { Personnage } from "./personnage.js"

export class Carte {
	constructor (nbOfRows, nbOfCols) {
		this.nbOfCols = nbOfCols;
		this.nbOfRows = nbOfRows;
		this.carte = [];
		this.draw()
		this.player1 = null;
		this.player2 = null;
		this.putStoneAndStuff()
	}

	getRandomInt(max){
		return Math.floor(Math.random() * Math.floor(max));
	}

	draw(){ //creaton de la carte et affichage des éléments
		var id = "";
		for(let i = 0; i<this.nbOfRows; i++){ //Création des lignes
			this.carte.push([]);
			var ligne = document.createElement('tr'); 
			for(let j = 0; j<this.nbOfCols; j++){ // Création des colonnes
				this.carte[i].push('');
				var cell = document.createElement('td');
				cell.setAttribute('id', id + i + j); //attribution d'un id pour les cellules
				ligne.appendChild(cell); // On met la cellule td dans notre ligne tr
			}
			document.getElementById('tableau').appendChild(ligne); // on met la ligne tr dans notre tableau	
		}	
	}	

	putStoneAndStuff(){
		
		var that = this;
	//placement du player1	
		var oldrow = that.getRandomInt(that.nbOfRows);
		var oldcol = that.getRandomInt(that.nbOfCols); 
		that.carte[oldrow][oldcol] = "p1"; // placement player1 dans le tableau
		var player1 = new Personnage("player1", "poing", '<img src="img/poing.png"/>', 10, 100, oldrow, oldcol, '<img src="img/player1.png"/>');
		document.getElementById('tableau').getElementsByTagName('tr')[oldrow].cells[oldcol].innerHTML = player1.skin;
		document.getElementById('tableau').getElementsByTagName('tr')[oldrow].cells[oldcol].setAttribute('class', "player1");
		document.getElementById('imageweaponplayer1').innerHTML = " "+'<img src="img/poing.png"/>';
		document.getElementById('pointattackplayer1').innerHTML = " "+player1.pointAttaque;
		document.getElementById('pointvieplayer1').innerHTML = " "+player1.sante;
		that.player1 = player1;
	//placement du player2	
		for (let k = 0; k<1; k++) {
			var newrow = that.getRandomInt(that.nbOfRows)
			var newcol = that.getRandomInt(that.nbOfCols)
			if(that.carte[newrow][newcol] == "p1") {
				k--;
			}
			else if((newrow == oldrow) && (newcol > oldcol-1 || newcol < oldcol+1)) {
				k--;
			} 
			else if((newcol == oldcol) && (newrow > oldrow-1 || newrow < oldrow+1)) {
				k--;
			} 	else {						
				that.carte[newrow][newcol] = "p2";//player2 placé sur map
				var player2 = new Personnage("player2", "poing", '<img src="img/poing.png"/>', 10, 100, newrow, newcol, '<img src="img/player2.png"/>');
				document.getElementById('tableau').getElementsByTagName('tr')[newrow].cells[newcol].innerHTML = player2.skin;
				document.getElementById('tableau').getElementsByTagName('tr')[newrow].cells[newcol].setAttribute('class', "player2");
				document.getElementById('imageweaponplayer2').innerHTML = " "+'<img src="img/poing.png"/>';
				document.getElementById('pointattackplayer2').innerHTML = " "+player2.pointAttaque;
				document.getElementById('pointvieplayer2').innerHTML = " "+player2.sante;
				that.player2 = player2;
			}
		};
		

		//affichage des pierres
		for (let i = 0; i<8; i++) {
			var row2 = that.getRandomInt(that.nbOfRows)
			var col2 = that.getRandomInt(that.nbOfCols)
			if(that.carte[row2][col2] == "x" || that.carte[row2][col2] == "w" || that.carte[row2][col2] == "p1" || that.carte[row2][col2] == "p2") {
				i--;
			}	else {
					that.carte[row2][col2] = "x";
					document.getElementById('tableau').getElementsByTagName('tr')[row2].cells[col2].innerHTML = '<img src="img/pierre.png"/>';
					document.getElementById('tableau').getElementsByTagName('tr')[row2].cells[col2].setAttribute('class', "pierre");
			}	
		};

	}

	putWeapons(armes){
		//affichage des armes
		for (let j = 0; j<armes.length; j++) {
			var row3 = this.getRandomInt(this.nbOfRows)
			var col3 = this.getRandomInt(this.nbOfCols)
			if(this.carte[row3][col3] == "x" || this.carte[row3][col3] == "w" || this.carte[row3][col3] == "p1" || this.carte[row3][col3] == "p2") {
				j--;
			} 	else {
					this.carte[row3][col3] = "w";
					document.getElementById('tableau').getElementsByTagName('tr')[row3].cells[col3].innerHTML = armes[j].skin;
					document.getElementById('tableau').getElementsByTagName('tr')[row3].cells[col3].setAttribute('class', armes[j].nom);
			}
		};
	}
}	