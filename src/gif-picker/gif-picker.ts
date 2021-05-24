import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import "./gif-picker.css";
import { fetchGiphySearch } from '../api/requests';
import { IGif } from '@giphy/js-types';

export async function showGifPicker() {
    $(pickerHtml).appendTo('body');

    const searchResult = await fetchGiphySearch("rat", 0, 10);
    showSelection(searchResult);
}

function showSelection(gifSelection: IGif[]) {
    const grid = $('#gif-grid').empty();

    gifSelection.forEach(gif => {
        grid.append(`<img id=${gif.id} src=${gif.images.downsized_large.url.split('?')[0]}></img>`);
        $(`#${gif.id}`).on('click', () => { alert(gif.title); });
    });

}