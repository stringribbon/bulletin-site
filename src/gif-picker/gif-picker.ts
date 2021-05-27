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

    if ($('#gif-picker').length === 0) {
        $(pickerHtml).appendTo('#board');
        $('#search-input').on( "keydown", event => {
            if (event.key === "Enter") doSearch();
        });
        $('#search-button').on("click", () => {
            doSearch();
        });
    } else {
        $('#gif-picker').show();
    }

    $('#board-overlay').show();
    $('#board-overlay').on('click', () => hide(true));
}

async function doSearch() {
    const term = ($('#search-input').val() as string).trim();
    if (!term) return;

    $('#search-button-text').hide();
    $('#search-button-spinner').show();
    const searchResult = await network.fetchGiphySearch(term, 0, 10);
    $('#search-button-text').show();
    $('#search-button-spinner').hide();
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
    $('#gif-picker').hide();
    if (cancel) $('#board-overlay').hide();
}