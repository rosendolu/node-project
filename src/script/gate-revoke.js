async function main() {}
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
function isBrowser() {
    return typeof window !== 'undefined';
}
main(0.3015, 1.02, 1.02, 150, 1.05, 1e4);
