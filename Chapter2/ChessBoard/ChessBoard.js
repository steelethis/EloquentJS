/*
Creates a chess grid and logs it to the console.
*/

// 8x8 grid
// var chessboard = '# # # # \n' +
//                  ' # # # #\n' +
//                  '# # # # \n' +
//                  ' # # # #\n' +
//                  '# # # # \n' +
//                  ' # # # #\n' +
//                  '# # # # \n' +
//                  ' # # # #\n';

var size = 20;

var chessboard = "";

// Loops number of times listed by size, creating that many separate rows.
for (var i = 0; i < size; i = i + 1) {
    // If the row 'i' is an even number, execute this code.
    if (i % 2 == 0) {
        // Creates as many columns needed.
        for (var x = 0; x < size; x = x + 1) {
            // If column x is even, execute this.
            if(x % 2 == 0) {
                chessboard = chessboard + "#";
            }
            // If column x is odd, execute this.
            else {
                chessboard = chessboard + " ";
            }
        }
    }
    // If the row is an odd number, execute this code
    // It's the opposite of the above if statement.
    else {
        for (var x = 0; x < size; x = x + 1) {
            if(x % 2 == 0) {
                chessboard = chessboard + " ";
            }
            else {
                chessboard = chessboard + "#";
            }
        }
    }

    // Once the row is completed, add a newline character to create the next row.
    chessboard = chessboard + "\n";
}

// Print the board out to console.
console.log(chessboard);
