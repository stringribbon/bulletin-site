import getImagesMock from './get-images.mock.json';

export async function mockPost(method: string) {
    let response = "";
    switch (method) {
        case "getImages":
            response = JSON.stringify(getImagesMock);
    }

    return {
        currentTarget: {
            response
        }
    };
}