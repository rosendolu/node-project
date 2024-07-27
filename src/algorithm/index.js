const { log } = require('../hepler');

main();
async function main() {
    try {
        log('start');
        log('algorithm');
        log('end');
    } catch (err) {
        console.error('err:', err);
    }
}
