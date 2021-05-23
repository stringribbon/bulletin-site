import $ from 'jquery';
import boardHtml from './board.html';
import "./board.css";
import { showGifPicker } from '../gif-picker/gif-picker';

export function displayBoard(): void {
    $(boardHtml).appendTo('body');

    $('#add-button').on('click', () => {
        showGifPicker();
    });
}
