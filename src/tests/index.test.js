const { log } = require('console');

var iceBreakingGame = function (num, target) {
    const arr = Array.from({ length: num }).map((val, i) => i);
    let i = target;
    log(arr, i);
    while (arr.length > 1) {
        arr.splice(i, 1);
        i = (i + target - 1) % arr.length;
        log(arr, i);
    }
    return arr[0];
};
log(iceBreakingGame(7, 4));
