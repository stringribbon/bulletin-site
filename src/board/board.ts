import $ from 'jquery';
import boardHtml from './board.html';
import "./board.css";
import { showGifPicker } from '../gif-picker/gif-picker';
import { useMockApis } from '../../config';
import giphyFetchMock from '../api/mocks/giphy-fetch-mock';
import { mockPost } from '../api/mocks/post-mock';
import { Network } from '../api/requests';
import { IImage } from '../types/IImage';
import { registerScroller } from '../scrollers/scrollers';

let network: Network;
let boardId: string;
let lastUpdateTimestamp: number;

export function displayBoard(id: string): void {
    network = new Network(useMockApis && giphyFetchMock, useMockApis && mockPost);
    boardId = id;
    lastUpdateTimestamp = 0;

    $(boardHtml).appendTo('body');

    $('#add-button').on('click', () => {
        showGifPicker();
    });

    registerScroller('#top-scroller', '#image-area', 0, -6);
    registerScroller('#right-scroller', '#image-area', 6, 0);
    registerScroller('#bottom-scroller', '#image-area', 0, 6);
    registerScroller('#left-scroller', '#image-area', -6, 0);

    updateBoard();
    // setInterval(updateBoard, 5000);
}

async function updateBoard() {
    try {
        addNewImages(await network.fetchBoardImages(boardId, lastUpdateTimestamp));
    } catch(err) {
        console.log("Board refresh request failed.");
    }
}

function addNewImages(newImages: IImage[]) {
    newImages.forEach(img => {
        $('#image-area').append(`<img src=${img.url} style="width: ${img.width}px; left: ${img.x}px; top: ${img.y}px">`);
    });
}