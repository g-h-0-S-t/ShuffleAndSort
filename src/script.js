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

        // Generate Tile Container DOM based on device screen width
        let browserWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
        document.querySelector('.main').innerHTML = (browserWidth > 540) ? `
            <div class="tiles">
            </div>
            <div class="actionButtons">
                <button onclick="shuffleTiles();">Shuffle</button>
                <button onclick="sortTiles();">Sort</button>
            </div>
            ` : `
            <div class="actionButtons">
                <button onclick="shuffleTiles();">Shuffle</button>
                <button onclick="sortTiles();">Sort</button>
            </div>
            <div class="tiles">
            </div>
            `;

        // Generate Tiles DOM and style tags for respective tiles
        let parentNode = document.getElementsByClassName('tiles')[0];
        parentNode.innerHTML = '';
        let styleTag = document.createElement('STYLE');
        styleTag.id = 'dynamicStyles';
        document.head.appendChild(styleTag);
        for (let i in tiles) {
            let childMetadata = tiles[i];
            let childNode = document.createElement('DIV');
            childNode.textContent = childMetadata.data;
            childNode.className = 'tile tile-' + childMetadata.data;
            childNode.title = 'TRY CLICKING ME TO SEE THE FUN STUFFS!!! THERE\'S A BONUS VID IN ONE OF THE TILES!!!';

            let funStuff = document.createElement('A');
            funStuff.href = 'funStuffs/' + childMetadata.data + ((childMetadata.data === 9) ? '.mp4' : '.gif');

            let browserWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
            if (browserWidth > 540) {
                styleTag.innerHTML += `
                .tile-${childMetadata.data} {
                    background-color: ${childMetadata.color};
                }`;
            } else {
                styleTag.innerHTML += `
                .tile-${childMetadata.data} {
                    background-color: #EFEFEF;
                    border-left: 5px solid ${childMetadata.color};
                }`;
            }
            parentNode.appendChild(funStuff);
            funStuff.appendChild(childNode);
        }
    }

    // Resize UI based on device screen width
    const resizeTiles = () => {
        let browserWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
        if (browserWidth > 540) {
            var height = document.querySelector('.tile').offsetWidth + 'px';
            document.querySelectorAll('.tile').forEach(function (v) {
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

    // Make Tiles and resize UI on load
    tileMaker(tiles);
    resizeTiles();
})(window);
