const { log } = require('./hepler');

main();
async function main() {
    try {
        require('./tests/index.test.js');
    } catch (err) {
        log('err:', err);
    }
}
