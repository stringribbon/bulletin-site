import $ from 'jquery';

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

function offsetScroll(scrolleeId: string, x: number, y: number) {
    const el = $(scrolleeId);
    if (!el) return;

    el.scrollLeft(el.scrollLeft() + x);
    el.scrollTop(el.scrollTop() + y);
}