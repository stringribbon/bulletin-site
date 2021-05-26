import { displayBoard } from "./board";


describe("board - displays images from server and lets user add more", () => {
    let networkMock;

    beforeEach(() => {
        jest.useFakeTimers();
        networkMock = {
            fetchGiphySearch: jest.fn(),
            fetchBoardImages: jest.fn()
        };
    })

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should refresh data every X seconds, sending timestamp of previous success', async () => {
        networkMock.fetchBoardImages.mockReturnValueOnce(new Promise(resolve => {
            resolve({
                data: [],
                timestamp: 350
            });
        })).mockReturnValue(new Promise(resolve => {
            resolve({
                data: [],
                timestamp: 5123
            });
        }))

        // First request        
        displayBoard("board_three", networkMock);

        await
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(1);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 0);

        // Second request
        await
        jest.runOnlyPendingTimers();
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(2);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 350);

        // Third request
        await
        jest.runOnlyPendingTimers();
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(3);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 5123);
    });

    it("should request images again after X seconds if prev request failed", async () => {
        networkMock.fetchBoardImages
        .mockReturnValueOnce(new Promise(resolve => {
            resolve({
                data: [],
                timestamp: 350
            });
        }))
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            reject();
        }))
        .mockReturnValueOnce(new Promise(resolve => {
            resolve({
                data: [],
                timestamp: 500
            });
        }));

        displayBoard("board_three", networkMock);

        // Should succeed
        await
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(1);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 0);

        // Should fail
        await
        jest.runOnlyPendingTimers();
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(2);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 350);

        // Should use same timestamp and succeed
        await
        jest.runOnlyPendingTimers();
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(3);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 350);

        // Should succeed
        await
        jest.runOnlyPendingTimers();
        expect(networkMock.fetchBoardImages).toHaveBeenCalledTimes(4);
        expect(networkMock.fetchBoardImages).toHaveBeenCalledWith("board_three", 500);
    })
})