import getImagesMock from './get-images.mock.json';

export function mockPost(method: string) {
    let response = "";
    switch (method) {
        case "getImages":
            response = JSON.stringify(getImagesMock);
    }

    return new Promise((resolve, reject) => {
        resolve({
            currentTarget: {
                response
            }
        });
    });
}