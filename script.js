/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au bon fonctionnement 
 * du jeu !
 * 
 *********************************************************************************/

/**
 * Cette fonction s'occupe de la convertion du nombre en toutes lettres !
 * @param {number} number : Le nombre à convertir en lettres !
 * @returns {string} numberOut : Le resultat de la convertion (nombre en lettres) !
 *  */ 
function numberToLetters(number) {
    // Code de vérification de l'argument
    /* Si l'argument 'number' n'est pas un nombre ou s'il est inferieur à 0 
    ou superieur à 999, on arrête la fonction et on retourne un message d'erreur */
    if (isNaN(number) || number < 0 || 999 < number) { 
        return 'Veuillez entrer un nombre entier compris entre 0 et 999 !'; 
    }

    // On initialise toutes les variables necessaires au fonctionnement de la fonction
    // Chiffre des unités
    let units = number % 10; 
    // Chiffre des dizaines
    let tens = (number % 100 - units) / 10;
    // Chiffre des centaines
    let hundreds = (number % 1000 - number % 100) / 100;
    // Variables contenant les unités, dizaines et centaines en toute lettres
    let unitsOut, tensOut, hundredsOut;

    // Si number vaut 0 alors on retourne 'Zero'
    if (number === 0) {
        return 'Zéro';
    } else {
        // Traitement des unités
        /* On ajoute « et- » à l'unité quand elle vaut 1 et que la dizaine sera 
        supérieure à 0 et différente de 8. Pourquoi ? Parce qu'on dit « vingt-et-un » 
        et non « vingt-un » mais inversement on dit « quatre-vingt-un » (d'où le « tens !== 8 »). */
        unitsOut = (units === 1 && tens > 0 && tens !== 8 ? 'et-' : '') + units2Letters[units];

        // Traitement des dizaines
        /* On convertir les nombres allant de 11 à 19. Pourquoi ? Parce qu'ils ne peuvent pas
         se décomposer (et representent à la fois unité et dizaine) */
        if (tens === 1 && units > 0) {
            tensOut = units2Letters[10 + units];
            unitsOut = ''; // Cette variable ne sert plus à rien, on la vide
        } 
         /* Ici on s'occupe des dizaines 7 et 9. On dit bien « soixante-treize » et 
         « quatre-vingt-treize » et non pas « soixante-dix-trois »... On ajoute aussi 
         la conjonction « et- » si l'unité vaut 1, car on dit « soixante-et-onze » et non pas 
         « soixante-onze »  */
        else if (tens === 7 || tens === 9) {
            tensOut = tens2Letters[tens] +'-'+ (tens === 7 && units === 1 ? 'et-' : '') + units2Letters[10 + units];
            unitsOut = ''; // Cette variable ne sert plus à rien, on la vide
        } else {
            // On s'occupe des autres dizaines
            tensOut = tens2Letters[tens];
        }
        // Dernier cas, « quatre-vingt » sans unité prend un « s » à la fin : « quatre-vingts »
        tensOut += (units === 0 && tens === 8 ? 's' : '');

        // Traitement des centaines
        /* La conversion des centaines se fait avec trois ternaires. 
        1er ternaire: affiche un chiffre si nécessaire avant d'écrire « cent » (exemple : « trois-cents »)
        2è ternaire: affiche ou non la chaîne « cent » (si il n'y a pas de centaines par exemple)
        3è ternaire: ajoute un « s » à la chaîne « cent » si il n'y a ni dizaines, ni unités 
        et que les centaines sont supérieures à 1. */
        hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + '-' : '') + 
        (hundreds > 0 ? 'cent' : '') + (hundreds > 1 && tens === 0 && units === 0 ? 's' : '');
    }

    // Variable (chaîne) à retourner
    let numberOut = hundredsOut + (hundredsOut && tensOut ? '-' : '') +
    tensOut + (hundredsOut && unitsOut || tensOut && unitsOut ? '-' : '') + unitsOut;

    return numberOut;
}


/**
 * Cette fonction vérifie la validité du nombre entré !
 * @param {string} userEntry : l'entree de l'utilisateur 
 * @throws {Error} : Message d'erreur ! */ 
function valideNumber (userEntry) {
    if (parseInt(userEntry, 10) < 0 || parseInt(userEntry, 10) > 999) {
        throw new Error('Entrer un nombre compris entre 0 et 999 !');
    }
}


/**
 * Cette fonction affiche le résultat de la convertion dans la "zoneAffichage"
 * @param {string} message : le message à afficher ! 
 * */
function afficherResultat (message) {
    let zoneAffichage = document.querySelector(".zoneAffichage");
    zoneAffichage.innerHTML = "";
    zoneAffichage.innerHTML = message;
}


/**
 * Cette fonction prend une chaîne et la retourne avec le plemier caracter en majuscule !
 * @param {string} sentence : Chaîne initiale
 * @returns {string}  */
function firstCharToUpper (sentence) {
    let firstChar = sentence.charAt(0);
    let firstCharUpper = firstChar.toUpperCase();
    let Sentence = sentence.replace(firstChar, firstCharUpper);

    return Sentence;
}


/**
 * Cette fonction remplie les champs "zoneInput" et "zoneAffichage" par defaut !
 */
function defaultView () {
    let zoneAffichage = document.querySelector(".zoneAffichage");
    let zoneInput = document.getElementById("zoneInput");
    let defaultNumber = Math.floor(Math.random()*999);
    let chaîne = `${defaultNumber}`;
    zoneInput.placeholder = chaîne;
    zoneAffichage.innerHTML = firstCharToUpper(numberToLetters(defaultNumber));
}


/**
 * Cette fonction lance la boucle de jeu !
 */
function run (){
    let baliseform = document.querySelector('form');
    let zoneAffichage = document.querySelector(".zoneAffichage");
    baliseform.addEventListener('submit', (event) => {
        event.preventDefault();
        let userEntry = document.getElementById("zoneInput").value;
        try {
            valideNumber(userEntry);
            zoneAffichage.classList.remove('danger');
            let result = numberToLetters(userEntry);
            afficherResultat(firstCharToUpper(result)); 
        } catch (error) {
            zoneAffichage.classList.add('danger');
            afficherResultat(error.message);
        }
    })
}