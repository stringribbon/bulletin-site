import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from '@giphy/js-types';
import GiphyFetchMock from "./mocks/giphy-fetch-mock";
import { giphyApiKey, useMockApis } from "../../config";

const giphyFetch = useMockApis ? GiphyFetchMock : new GiphyFetch(giphyApiKey);

export async function fetchGiphySearch(term: string, offset: number, limit: number): Promise<IGif[]> {
    const response = await giphyFetch.search(term, { offset, limit });
    return (response.data as IGif[]);
}