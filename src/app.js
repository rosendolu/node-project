const { log } = require('./hepler');

main();
async function main() {
    try {
        log('start');
        log('end');
    } catch (err) {
        log('err:', err);
    }
}
