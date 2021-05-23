import $ from 'jquery';
import pickerHtml from './gif-picker.html';
import { GiphyFetch } from "@giphy/js-fetch-api";
import { giphyApiKey } from "../../config";
import "./gif-picker.css";

export function showGifPicker() {
    $(pickerHtml).appendTo('body');

    // const gf = new GiphyFetch(giphyApiKey);
    // gf.search("dogs", { offset: 0, limit: 10 });
}