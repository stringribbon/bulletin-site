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
    console.log(gifSelection);
}