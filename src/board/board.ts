import $ from 'jquery';
import boardHtml from './board.html';
import "./board.css";

export function displayBoard(): void {
    $(boardHtml).appendTo('body');

    $('#add-button').on('click', () => {
        alert("hi")
    });
}
