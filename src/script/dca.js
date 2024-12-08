new Array(5).fill(0).forEach((val, i) => {
    let index = i + 1;
    const tokenBaseRate = index * 0.01;

    new Array(5).fill(0).forEach((val, i1) => {
        const priceBaseRate = (i1 + 1) * 0.01;
        const data = [];
        let accToken = 0;

        new Array(20).fill(0).forEach((val, i) => {
            const token = 50 * (1 + tokenBaseRate) ** i;
            const price = 1 * (1 - priceBaseRate) ** i;

            accToken += token;

            data.push({
                tokenBaseRate,
                priceBaseRate,
                token,
                price,
                accToken,
                priceDiff: ((i == 0 ? 0 : (data.at(0).price - price) / data.at(0).price) * 100).toFixed(2) + '%',
            });
        });
        console.table(data);
    });
});
