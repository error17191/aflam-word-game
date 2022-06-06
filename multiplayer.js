let socket = io(env.socketServer);
let myID;
let players = [];
let isCreator = true;
let roomUUID;

function goToMultiplayer() {
	document.querySelector('#arena').classList.remove('hidden');
}


function createMultiplayerGame() {
	let myName = document.querySelector('.my-name').value;
	socket.emit('create-room', {
		name: myName
	});
	socket.on('room-created', data => {
		roomUUID = data.roomUUID;
		window.location.hash = roomUUID;
		document.querySelector('.share-game-box .body p').innerHTML = window.location.href;

		myID = data.playerID;
		players = [
			{
				id: myID,
				name: myName
			}
		];
		document.querySelector('.name-section').classList.add('hidden');
		document.querySelector('.share-game-section').classList.remove('hidden');
		document.querySelector('.waiting-list').classList.remove('hidden');

		renderPlayerList();
	});
}


function checkRoom() {
	roomUUID = window.location.hash.replace('#', '');
	if (!roomUUID) {
		return;
	}

	socket.emit('room-exists', roomUUID);

	socket.on('room-exists', data => {
		if (!data.exists) {
			window.location.href = '/';
		} else {
			myID = socket.id;
			isCreator = false;
			document.querySelector('#arena').classList.remove('hidden');
		}
	});
}

function joinMultiplayerGame() {
	let myName = document.querySelector('.my-name').value;
	socket.emit('join-room', {
		roomUUID,
		name: myName
	});
	document.querySelector('.share-game-box .body p').innerHTML = window.location.href;

	document.querySelector('.name-section').classList.add('hidden');
	document.querySelector('.share-game-section').classList.remove('hidden');
	document.querySelector('.waiting-list').classList.remove('hidden');

}

socket.on('update-players', newPlayers => {
	console.log('update-players')
	players = newPlayers;
	renderPlayerList();
});


function copyRoomLink() {
	navigator.clipboard.writeText(window.location.href);
}

function renderPlayerList() {
	let $ul = document.querySelector('.waiting-list ul');
	$ul.innerHTML = '';
	players.forEach(player => {
		let $li = document.createElement('li');
		$li.innerText = myID == player.id ? 'أنت' : player.name;
		$ul.appendChild($li);
	});
}

document.querySelector('.my-name-form').addEventListener('submit', event => {
	event.preventDefault();
	console.log('here');
	console.log(isCreator);
	if (isCreator) {
		createMultiplayerGame();
	} else {
		joinMultiplayerGame();
	}
});