import { displayBoard } from './board/board';

function getImages(): void {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://web-bulletin.herokuapp.com/getImages", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: "test"
    }));
}

displayBoard();