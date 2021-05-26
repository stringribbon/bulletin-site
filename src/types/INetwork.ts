import { IGif } from '@giphy/js-types';
import { IResponse } from './IResponse';
import { IImage } from './IImage';

export interface INetwork {
    fetchGiphySearch(term: string, offset: number, limit: number): Promise<IGif[]>,
    fetchBoardImages(boardId: string, startTimestamp: number): Promise<IResponse<IImage[]>>
}