import { App } from "./app.js";
const app = new App();

var areaInvisible = document.getElementById('zonecombat');
areaInvisible.style.visibility = "hidden";

setTimeout(function(){
	alert("Bienvenue dans une nouvelle partie de NINJAWARRIOR Vs ZOMBIEBOY \n\nVoici les règles du jeu :\n\nBut du jeu : anéantir son adversaire à l'aide d'arme sur la carte ou bien à main nue.\n\nDéplacement : à l'aide de la souris de une à trois cases horizontalement ou verticalement.\n\nArmes : différentes armes sont éparpillées sur le terrain avec chacunes des caractéristiques différentes.\nSi le joueur possède déja une arme lorsqu'il en ramasse une nouvelle, il laisse la précédente arme sur place et garde la nouvelle dans son inventaire.\n\nCombat : Le combat commence quand les deux joueurs sont côte à côte.Le joueur peut soit attaquer ou bien se défendre.\nSi le joueur se défend, l'attaque de l'adversaire sera de 50% au prochain tour.\n\nLe jeu se finit lorsqu'un des joueurs voit ces points de vie à 0.\n\nVous pouvez choisir la taille de votre carte de combat en indiquant le nombre de lignes et de colonnes souhaitées.\n\nBON JEU !!!");
	choixLiCol();
},400);

function choixLiCol() { 
	var NbLigne = prompt("Veuillez indiquer le nombre de ligne(s) de votre carte de combat (chiffre compris entre 6 et 10)");
	var NbColonne = prompt("Veuillez indiquer le nombre de colonne(s) de votre carte de combat (chiffre compris entre 6 et 10)");
	if ((NbLigne >=6 && NbLigne <=10) && (NbColonne >=6 && NbColonne <=10)) {
		app.generateMAP(NbLigne, NbColonne);
		setTimeout(function(){
			app.startMoving("player1");
		},1000);

	} else {
		alert("Veuillez indiquer un chiffre compris entre 6 et 10 s'il vous plait.");
		choixLiCol();
	}
}





