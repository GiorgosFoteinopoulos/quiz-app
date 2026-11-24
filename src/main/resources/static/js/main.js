import { APP_NAME, SECONDS_PER_QUESTION } from "./config.js";
import { setStatus, setTitle } from "./ui.js";

console.log('main.js runs');

setTitle(APP_NAME);
setStatus(`Ready. You will have ${SECONDS_PER_QUESTION} seconds per question.`);