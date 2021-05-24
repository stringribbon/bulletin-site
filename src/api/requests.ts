import { GiphyFetch } from "@giphy/js-fetch-api";
import GiphyFetchMock from "./mocks/giphy-fetch-mock";
import { giphyApiKey, useMockApis } from "../../config";

const giphyFetch = useMockApis ? GiphyFetchMock : new GiphyFetch(giphyApiKey);

export function fetchGiphySearch(term: string) {
    return giphyFetch.search(term, { offset: 0, limit: 10 });
}