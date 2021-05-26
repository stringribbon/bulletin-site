import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import "./gif-picker.css";
import { IGif } from '@giphy/js-types';
import { INetwork } from '../types/INetwork';

type Callback = (selectedUrl: string) => any;
let selectedCallback: Callback;

export async function showGifPicker(network: INetwork, callback: Callback) {
    $('#board-overlay').show();
    $(pickerHtml).appendTo('#board-overlay');
    selectedCallback = callback;

    const searchResult = await network.fetchGiphySearch("rat", 0, 10);
    showSelection(searchResult);
}

function showSelection(gifSelection: IGif[]) {
    const grid = $('#gif-grid').empty();

    gifSelection.forEach(gif => {
        const url = gif.images.downsized_large.url.split('?')[0];
        grid.append(`<img id=${gif.id} src=${url}></img>`);
        $(`#${gif.id}`).on('click', () => { selectedCallback(url); hide(); });
    });

}

function hide() {
    $('#gif-picker').remove();
}