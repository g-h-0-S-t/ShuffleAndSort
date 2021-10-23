# ShuffleAndSort
A demo for shuffling and sorting Numbered Tiles.

**Shuffle Algorithm:**  **The algorithm is based on Fisher–Yates shuffle - Source : https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle**
Step 1 - While looping in a descending order...  
Step 2 - I am taking a random index between (including) the loop index and the lowest index (0).  
Step 3 - Then swap the elements between the random index and the loop index.  
Step 4 - In the next loop, ignore the previous index and continue from Step 2.  
Step 5 - After the whole Tiles array is shuffled, generate the DOM (tileMaker) and resize UI (resizeTiles).  

**Sorting Algorithm:** I am using the **Compare Function** logic.

**Screenshots:**  
_**Mobile**_  
![image](https://user-images.githubusercontent.com/6196046/138571850-c16caf47-d929-44ab-a117-a9633daba069.png)  
_**Desktop**_  
![image](https://user-images.githubusercontent.com/6196046/138571866-1f5e8f8c-2cb5-4090-b0b9-cddf499d02c7.png)  
