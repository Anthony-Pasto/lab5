/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Recharge la page lorsque les items sont modifies via Socket.IO.
 */
const socket = io();

socket.on('items:updated', () => {
    window.location.reload();
});

// Trier le tableau en cliquant sur un titre de colonne.
let triCroissant = [false, false, false, false];
function trierTableau(colonne) { // A19 : permet de trier les items selon la colonne choisie
    const tableau = document.querySelector('table');
    const corps = tableau.tBodies[0];
    const lignes = Array.from(corps.rows);
    triCroissant[colonne] = !triCroissant[colonne];

    lignes.sort((a, b) => {
        const texteA = a.cells[colonne].textContent.trim();
        const texteB = b.cells[colonne].textContent.trim();
        let resultat;
        if (colonne === 0 || colonne === 3) {
            resultat = Number(texteA) - Number(texteB);
        } else if (colonne === 1) {
            resultat = new Date(texteA) - new Date(texteB);
        } else {
            resultat = texteA.localeCompare(texteB, 'fr');
        }
        return triCroissant[colonne] ? resultat : -resultat;
    });

    lignes.forEach(ligne => corps.appendChild(ligne));
}
