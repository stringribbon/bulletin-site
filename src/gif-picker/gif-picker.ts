import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import "./gif-picker.css";
import { IGif } from '@giphy/js-types';
import { INetwork } from '../types/INetwork';

type Callback = (selectedUrl: string) => any;
let selectedCallback: Callback;
let network: INetwork;

export async function showGifPicker(networkObj: INetwork, callback: Callback) {
    network = networkObj;
    selectedCallback = callback;

    hide();
    $('#board-overlay').show();
    $(pickerHtml).appendTo('#board');

    $('#board-overlay').on('click', () => hide(true));
    $('#search-input').on( "keydown", event => {
        if (event.key === "Enter") doSearch();
    });
    $('#search-button').on("click", () => {
        doSearch();
    });
}

async function doSearch() {
    console.log("Doin thangs")
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

function hide(cancel=false) {
    $('#board-overlay').off('click');
    $('#gif-picker').remove();
    if (cancel) $('#board-overlay').hide();
}