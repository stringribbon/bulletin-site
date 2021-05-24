import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import "./gif-picker.css";
import { fetchGiphySearch } from '../api/requests';

export async function showGifPicker() {
    $(pickerHtml).appendTo('body');

    const result = await fetchGiphySearch("rat");
    console.log(result.data);
}