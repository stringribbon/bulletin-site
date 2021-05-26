import $ from 'jquery';
import { IImage } from '../types/IImage';
import "./image-placer.css";

type Callback = (image: IImage) => any;

export function startPlacement(imageUrl: string, callback: Callback): void {
    const image = $(`<img src=${imageUrl} class="being-placed" style="width: 300px;}px">`);
    $('#image-area').append(image);
    $('#board-overlay').show();
    
    const board = $('#board');

    function setPos() {
        image.css("left", (window as any).mouseX + board.scrollLeft() - image.outerWidth()/2);
        image.css("top", (window as any).mouseY + board.scrollTop() - image.outerHeight()/2);
    }
    setPos();
    const interval = setInterval(setPos, 30);

    $('body').css('cursor', 'none');

    setTimeout(() => {
        $(document).one('click', () => {
            callback(getFinalImage());
            image.removeClass('being-placed');
            image.addClass('temp-image');
            clearInterval(interval);
            $('body').css('cursor', 'auto');
            $('#board-overlay').hide();
        });
    }, 1);
}

function getFinalImage(): IImage {
    const image = $('.being-placed').first();

    return {
        url: image.attr('src'),
        width: parseInt(image.css('width')),
        x: parseInt(image.css('left')),
        y: parseInt(image.css('top'))
    }
}