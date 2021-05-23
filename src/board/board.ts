import $ from 'jquery';
import boardHtml from './board.html';

export function displayBoard(): void {
    $(boardHtml).appendTo('body');

}
