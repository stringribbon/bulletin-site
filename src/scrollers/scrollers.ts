import $ from 'jquery';

let scrollWithin: JQuery;

export function registerScroller(scrollerId: string, scrolleeId: string, xOffset: number, yOffset: number) {
    let interval: any;
    $(scrollerId).on({
        mouseenter: () => {
            interval = setInterval(() => offsetScroll(scrolleeId, xOffset, yOffset), 25);
        },
        mouseleave: () => {
            interval && clearInterval(interval);
        }
    });
}

export function setScrollWithin(within: JQuery) {
    scrollWithin = within;
}

function offsetScroll(scrolleeId: string, x: number, y: number) {
    const el = $(scrolleeId);
    if (!el) return;

    el.scrollLeft(Math.min(el.scrollLeft() + x, scrollWithin.width() - $(window).width()));
    el.scrollTop(Math.min(el.scrollTop() + y, scrollWithin.height() - $(window).height()));
}