# Simple Checkers
A really, *really* rudimentary implementation of hotseat checkers using JQuery.

## How to play
Wait, what? You don't know how to play checkers?

Checkers is a simple board game involving a checkerboard and an even number of checker pieces between two players. Though you can really use a checkerboard of any size and any number of pieces, this implementation opts for the standard 8x8 chess board, and 12 pieces per player.
The pieces are set up so they only rest on one checkersquare color. Pieces move diagonally in one direction, sort of like a chess pawn capturing.
If an enemy checkerpiece is located in the path of one of your checkerpieces, but in the same diagonal direction directly behind it is an empty square, you may "jump" over the enemy piece, capturing it.
In most rulesets, if a capture can be made by *any* piece, it *must*, however this has not been implemented in this implementation of the game due to time constraints. (Most simple JavaScript implementations of the game online don't enforce this anyway.)
Also in most rulesets, captures can be made in succession on the same turn if the checkerpiece moved lands on a checker square where it can make another capture, potentially allowing a checkerpiece to jump all the way past an opponent's poor setup to the other side of the board; however this too has not been implemented here due to ~~laziness~~ time constraints.
A checkerpiece that reaches the back row is "kinged", and can henceforth move and capture backwards as well as forwards (though due to the lack of implementation of successive jumps it's not as powerful here as it would normally be). Traditionally a kinged piece is indicated by flipping a checkerpiece over; in this implementation kinged checkerpieces get a yellow border.
To win the game, simply capture all your opponent's pieces, or force him into a position where they are unable to move any of their pieces (although that latter win condition has also not been implemented here due to ~~attention deficit~~ time constraints.)

## TODO LIST
 * Implement a win condition for leaving your opponent in a position where they can make no moves
 * Implement successive jumps
 * Force players to capture if they choose to move a piece that has a capture option available
 * Implement a button that resets the board so you don't have to refresh the page to restart
 * Force players to capture if *any* piece has a capture option available
 * Add sound effects
 * Add animation effects (this will probably require a complete refactoring of the code lmao)
