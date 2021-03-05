export class Arme {
	constructor (nom, pointAttaque, skin){

		this.nom = nom;
		this.pointAttaque = pointAttaque;
		this.skin = skin;
	}

	changeWeapon(currentPlayer, event, classname, woodsword, axe, hammer, kingsword) {
		var armes = ['Wood Sword', 'Axe', 'Hammer','King Sword'];
		var armesAncienne = ['Wood Sword', 'Axe', 'Hammer','King Sword'];	
		var that = this;
		if(currentPlayer.arme == "poing"){
			armes.forEach(function (arme){
				if($("#"+event.id).hasClass(arme)){
					Object.defineProperty(currentPlayer, 'arme', {
					value:that.nom});
					Object.defineProperty(currentPlayer, 'pointAttaque', {
					value:that.pointAttaque});
					Object.defineProperty(currentPlayer, 'skinArme', {
					value:that.skin});
					$("#"+event.id).removeClass(arme);
					currentPlayer.playSound('blopSound');
				}
			}) 
		}
		else {
			armes.forEach(function (arme){
				if(arme == "Wood Sword") {
					var nouvelleArme = woodsword;
				}
				else if(arme == "Axe") {
					var nouvelleArme = axe;
				}
				else if(arme == "Hammer") {
					var nouvelleArme = hammer;
				}
				else if(arme == "King Sword") {
					var nouvelleArme = kingsword;
				}
				armesAncienne.forEach(function (arme2){
					if(($("#"+event.id).hasClass(arme)) && (currentPlayer.arme == arme2)) {
						if(arme2 == "Wood Sword") {
							var ancienneArme = woodsword;
						}
						else if(arme2 == "Axe") {
							var ancienneArme = axe;
						}
						else if(arme2 == "Hammer") {
							var ancienneArme = hammer;
						}
						else if(arme2 == "King Sword") {
							var ancienneArme = kingsword;
						}
						document.getElementById(classname).innerHTML = ancienneArme.skin;
						$("#"+classname).addClass(ancienneArme.nom);
						Object.defineProperty(currentPlayer, 'arme', {
						value:nouvelleArme.nom});
						Object.defineProperty(currentPlayer, 'pointAttaque', {
						value:nouvelleArme.pointAttaque});
						Object.defineProperty(currentPlayer, 'skinArme', {
						value:nouvelleArme.skin});
						$("#"+event.id).removeClass(nouvelleArme.nom);
						currentPlayer.playSound('blopSound');	
						alert("Changement d'arme");
					}				
				})
			})
		}
	}
}