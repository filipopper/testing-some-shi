export function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

export function getData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
}

export function sendMessageToSW(message) {
    const controller = navigator.serviceWorker.controller;
    if (controller) {
        controller.postMessage(message);
    } else {
        console.warn('No active service worker to send message.');
    }
}
