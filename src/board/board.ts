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

    const scrollSpeed = 10;
    registerScroller('#top-scroller', '#board', 0, -scrollSpeed);
    registerScroller('#right-scroller', '#board', scrollSpeed, 0);
    registerScroller('#bottom-scroller', '#board', 0, scrollSpeed);
    registerScroller('#left-scroller', '#board', -scrollSpeed, 0);

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