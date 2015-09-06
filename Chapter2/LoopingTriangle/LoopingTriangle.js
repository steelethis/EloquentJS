// Looping a triangle
// Write a loop that makes seven calls to console.log
// to output the following triangle:
// #
// ##
// ###
// ####
// #####
// ######
// #######

var octothorpe = "";

// While the length of octothorpe is less than 7 (currently 0)
// Add another octothorpe and print the result to console
while(octothorpe.length < 7) {
    octothorpe += "#";
    console.log(octothorpe);
}
