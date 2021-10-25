'use strict';

((window) => {

    // Tile number and color mapping
    const tiles = [
        { 'data': 1, 'color': '#6F98A8' },
        { 'data': 2, 'color': '#2B8EAD' },
        { 'data': 3, 'color': '#2F454E' },
        { 'data': 4, 'color': '#2B8EAD' },
        { 'data': 5, 'color': '#2F454E' },
        { 'data': 6, 'color': '#BFBFBF' },
        { 'data': 7, 'color': '#BFBFBF' },
        { 'data': 8, 'color': '#6F98A8' },
        { 'data': 9, 'color': '#2F454E' }
    ];

    // Generate the DOM for Tiles
    const tileMaker = (tiles) => {

        // Generate Tiles DOM and styles for respective tiles
        let parentNode1 = document.getElementsByClassName('tiles-1')[0];
        let parentNode2 = document.getElementsByClassName('tiles-2')[0];
        parentNode1.innerHTML = parentNode2.innerHTML = '';
        let styleTag = document.getElementById('dynamicStyles');
        styleTag.innerHTML = '';

        for (let i in tiles) {
            let childMetadata = tiles[i];

            let childNode1 = document.createElement('DIV');
            let childNode2 = document.createElement('DIV');
            childNode1.textContent = childNode2.textContent = childMetadata.data;
            childNode1.className = childNode2.className = 'tile tile-' + childMetadata.data;
            childNode1.title = childNode2.title = 'TRY CLICKING ME TO SEE THE FUN STUFFS!!! THERE\'S A BONUS VID IN ONE OF THE TILES!!!';

            let funStuff1 = document.createElement('A');
            let funStuff2 = document.createElement('A');
            funStuff1.href = funStuff2.href = 'funStuffs/' + childMetadata.data + ((childMetadata.data === 9) ? '.mp4' : '.gif');

            styleTag.innerHTML += `
            .tiles.tiles-1 .tile-${childMetadata.data} {
                background-color: ${childMetadata.color};
            }`;

            styleTag.innerHTML += `
            .tiles.tiles-2 .tile-${childMetadata.data} {
                background-color: #EFEFEF;
                border-left: 5px solid ${childMetadata.color};
            }`;

            parentNode1.appendChild(funStuff1);
            parentNode2.appendChild(funStuff2);

            funStuff1.appendChild(childNode1);
            funStuff2.appendChild(childNode2);
        }
    }

    // Resize UI based on device screen width
    const resizeTiles = () => {
        let browserWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
        if (browserWidth > 540) {
            let height = document.querySelector('.tiles-1 .tile').offsetWidth + 'px';
            document.querySelectorAll('.tiles-1 .tile').forEach((v) => {
                v.style.lineHeight = v.style.height = height;
            });
        }
    };

    // Tile Shuffling algorithm based on Fisher–Yates shuffle - Source : https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    /** Explanation : 
     * Step 1 - While looping in a descending order...
     * Step 2 - I am taking a random index between (including) the loop index and the lowest index (0).
     * Step 3 - Then swap the elements between the random index and the loop index.
     * Step 4 - In the next loop, ignore the previous index and continue from Step 2.
     * Step 5 - After the whole Tiles array is shuffled, generate the DOM (tileMaker) and resize UI (resizeTiles).
     */
    const shuffleTiles = () => {
        let i = tiles.length, randomIndex, swapper;
        while (--i > 0) {
            randomIndex = Math.floor(Math.random() * (i + 1));
            swapper = tiles[randomIndex];
            tiles[randomIndex] = tiles[i];
            tiles[i] = swapper;
        }
        tileMaker(tiles);
        resizeTiles();
    };

    // Tile Sorting Algorithm - Compare Function
    const sortTiles = () => {
        tiles.sort((a, b) => a.data - b.data);
        tileMaker(tiles);
        resizeTiles();
    };

    // Expose 'shuffleTiles' and 'sortTiles' to Window
    window.shuffleTiles = shuffleTiles;
    window.sortTiles = sortTiles;
    window.resizeTiles = resizeTiles;

    // Make Tiles and resize UI on load
    tileMaker(tiles);
    resizeTiles();
})(window);
