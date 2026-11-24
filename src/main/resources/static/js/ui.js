console.log('ui.js runs');

const titleHeading = document.getElementById('title');
const statusLabel = document.getElementById('status');

export function setTitle(text) {
    titleHeading.textContent = text;
    document.title = text;
}

export function setStatus(status) {
    statusLabel.textContent = status;
}



