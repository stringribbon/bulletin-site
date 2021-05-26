import $ from 'jquery';
import boardHtml from './board.html';
import "./board.css";
import { showGifPicker } from '../gif-picker/gif-picker';
import { IImage } from '../types/IImage';
import { registerScroller } from '../scrollers/scrollers';
import { INetwork } from '../types/INetwork';
import { startPlacement } from '../image-placer/image-placer';

let network: INetwork;
let boardId: string;
let lastUpdateTimestamp: number;
let refreshTimeout: any;

$(document).on('mousemove', (e) => {
    (window as any).mouseX = e.pageX;
    (window as any).mouseY = e.pageY;
});

export function displayBoard(id: string, networkObj: INetwork): void {
    network = networkObj;
    boardId = id;
    lastUpdateTimestamp = 0;

    $(boardHtml).appendTo('body');

    $('#add-button').on('click', () => {
        showGifPicker(network, onImageSelected);
    });

    const scrollSpeed = 10;
    registerScroller('#top-scroller', '#board', 0, -scrollSpeed);
    registerScroller('#right-scroller', '#board', scrollSpeed, 0);
    registerScroller('#bottom-scroller', '#board', 0, scrollSpeed);
    registerScroller('#left-scroller', '#board', -scrollSpeed, 0);

    updateBoard();
}

async function updateBoard() {
    try {
        const response = await network.fetchBoardImages(boardId, lastUpdateTimestamp);
        addNewImages(response.data);
        lastUpdateTimestamp = response.timestamp;
        $('.temp-image').remove();
    } catch(err) {
        console.log("Board refresh request failed.", err);
    }

    rescheduleRefresh();
}

function rescheduleRefresh() {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(updateBoard, 5000);
}

function addNewImages(newImages: IImage[]) {
    newImages.forEach(img => {
        $('#image-area').append(`<img src=${img.url} style="width: ${img.width}px; left: ${img.x}px; top: ${img.y}px">`);
    });
}

function onImageSelected(url: string) {
    startPlacement(url, onImagePlaced);
}

function onImagePlaced(image: IImage) {
    rescheduleRefresh();
    network.addImage(boardId, image);
}