import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from '@giphy/js-types';
import GiphyFetchMock from "./mocks/giphy-fetch-mock";
import { giphyApiKey, useMockApis } from "../../config";
import { serverEndpoint } from '../../config';
import { IImage } from "../types/IImage";
import { mockPost } from "./mocks/post-mock";

export class Network {
    private giphyFetch;
    private post;

    constructor(giphyFetch?: any, post?: any) {
        this.giphyFetch = giphyFetch || new GiphyFetch(giphyApiKey);
        this.post = post || xhrPost;
    }

    async fetchGiphySearch(term: string, offset: number, limit: number): Promise<IGif[]> {
        const response = await this.giphyFetch.search(term, { offset, limit });
        return (response.data as IGif[]);
    }

    async fetchBoardImages(startTimestamp: number): Promise<IImage[]> {
        return this.post("getImages").then((event: ProgressEvent) => {
            const target: any = event.currentTarget;
            return JSON.parse(target.response).images;
        });
    }
}

function xhrPost(method: string, data?: object) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${serverEndpoint}/${method}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send(JSON.stringify(data));
    });
}