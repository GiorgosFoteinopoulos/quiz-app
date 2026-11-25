export function startCountdown(seconds, onTick, onTimeUp) {
    const deadline = Date.now() + seconds * 1000;

    function update() {
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 0) {
            clearInterval(intervalId);
            onTick(0);
            onTimeUp();
            return;
        }
        onTick(Math.ceil(remainingMs / 1000));
    }

    const intervalId = setInterval(update, 200);
    update();

    return function stop() {
        clearInterval(intervalId);
    };
}