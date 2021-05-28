import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from '@giphy/js-types';
import { giphyApiKey } from "../../config";
import { serverEndpoint } from '../../config';
import { IImage } from "../types/IImage";
import { INetwork } from "../types/INetwork";
import { IResponse } from "../types/IResponse";

export class Network implements INetwork {
    private giphyFetch;
    private post;

    constructor(giphyFetch?: any, post?: any) {
        this.giphyFetch = giphyFetch || new GiphyFetch(giphyApiKey);
        this.post = post || xhrPost;
    }

    async fetchGiphySearch(term: string, offset: number, limit: number): Promise<IGif[]> {
        try {
            const response = await this.giphyFetch.search(term, { offset, limit });
            return (response.data as IGif[]);
        } catch(err) {
            throw err;
        }
    }

    async fetchBoardImages(boardId: string, startTimestamp: number): Promise<IResponse<IImage[]>> {
        try {
            const progressEvent = await this.post("getImages", { boardId, startTimestamp });
            const target: any = progressEvent.currentTarget;
            const response = JSON.parse(target.response)
            return {
                data: response.images,
                timestamp: response.timestamp
            }
        } catch(err) {
            throw err;
        }
    }

    async addImage(boardId: string, image: IImage): Promise<boolean> {
        try {
            await this.post("addImage", { boardId, ...image });
            return true;
        } catch(err) {
            return false;
        }
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