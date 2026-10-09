/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Recharge la page lorsque les items sont modifies via Socket.IO.
 */
const socket = io();

socket.on('items:updated', () => {
	window.location.reload();
});
