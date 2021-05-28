import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import "./gif-picker.css";
import { IGif } from '@giphy/js-types';
import { INetwork } from '../types/INetwork';

type Callback = (selectedUrl: string) => any;
let selectedCallback: Callback;
let network: INetwork;
let searchOffset: number = 0;

export async function showGifPicker(networkObj: INetwork, callback: Callback) {
    network = networkObj;
    selectedCallback = callback;

    if ($('#gif-picker').length === 0) {
        $(pickerHtml).appendTo('#board');
        $('#search-input').on( "keydown", event => {
            if (event.key === "Enter") doSearch(true);
        });
        $('#search-button').on("click", () => {
            doSearch(true);
        });
        $('#gif-grid').on('scroll', function() {
            if(searchOffset > 0 && $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                doSearch(false);
            }
        });
    } else {
        $('#gif-picker').show();
    }

    $('#board-overlay').show();
    $('#board-overlay').on('click', () => hide(true));
}

async function doSearch(firstSearch: boolean) {
    const term = ($('#search-input').val() as string).trim();
    if (!term) return;

    if (firstSearch) {
        searchOffset = 0;
    }
    if (searchOffset > 200) return;

    const numToSearch = 40;
    $('#search-button-text').hide();
    $('#search-button-spinner').show();
    $('#search-button').attr('disabled', "true");
    const searchResult = await network.fetchGiphySearch(term, searchOffset, numToSearch);
    $('#search-button-text').show();
    $('#search-button-spinner').hide();
    $('#search-button').removeAttr('disabled');
    showSelection(searchResult, searchOffset === 0);
    searchOffset += numToSearch;
}

function showSelection(gifSelection: IGif[], emptyFirst: boolean) {
    const grid = $('#gif-grid');
    if (emptyFirst) grid.empty();

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