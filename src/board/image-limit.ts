import imageLimitHtml from './image-limit.html';
import './image-limit.css';
import $ from 'jquery';

const imageLimitOptions = [
    { number: 6, description: "Like...5" },
    { number: 20, description: "Very few" },
    { number: 50, description: "A decent amount" },
    { number: 100, description: "Lots", default: true },
    { number: 300, description: "Many" },
    { number: 600, description: "Loads" },
    { number: 2000, description: "Tons" },
    { number: 9999999, description: "As many as you got!" },
];
let limitIndex = imageLimitOptions.findIndex((ops) => ops.default);
let onChange: any;

export function displayLimitSelector(callback: (limit: number) => any) {
    onChange = callback;
    $('#board').append(imageLimitHtml);
    setText();
    $('#image-limit-less').on('click', () => { changeLimit(-1) });
    $('#image-limit-more').on('click', () => { changeLimit(1) });
}

export function getImageLimit(): number {
    return imageLimitOptions[limitIndex].number;
}

function changeLimit(offset: number) {
    limitIndex = Math.min(Math.max(limitIndex + offset, 0), imageLimitOptions.length - 1);
    onChange(getImageLimit());
    setText();
}

function setText() {
    $('#image-limit-text').text("Image limit: " + imageLimitOptions[limitIndex].description );
}