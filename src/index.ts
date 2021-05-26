import giphyFetchMock from './api/mocks/giphy-fetch-mock';
import { Network } from './api/requests';
import { displayBoard } from './board/board';
import { mockPost } from './api/mocks/post-mock';
import "./index.css";
import { mockGiphy, mockServer } from '../config';

displayBoard("0", new Network(mockGiphy && giphyFetchMock, mockServer && mockPost));