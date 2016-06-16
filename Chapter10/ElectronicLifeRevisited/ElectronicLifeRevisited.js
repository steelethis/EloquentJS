
//
//  grid module
//
(function(exports) {
    "use strict";

    exports.Vector = function(x, y) {
        this.x = x;
        this.y = y;
    };
    exports.Vector.prototype.plus = function(other) {
        return new exports.Vector(this.x + other.x, this.y + other.y);
    };

    exports.Grid = function(width, height) {
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
    };
    exports.Grid.prototype.isInside = function(vector) {
        return vector.x >= 0 && vector.x < this.width &&
                vector.y >= 0 && vector.y < this.height;
    };
    exports.Grid.prototype.get = function(vector) {
        return this.space[vector.x + this.width * vector.y];
    };
    exports.Grid.prototype.set = function(vector, value) {
        this.space[vector.x + this.width * vector.y] = value;
    };

    exports.directions = {
        "n":  new exports.Vector( 0, -1),
        "ne": new exports.Vector( 1, -1),
        "e":  new exports.Vector( 1,  0),
        "se": new exports.Vector( 1,  1),
        "s":  new exports.Vector( 0,  1),
        "sw": new exports.Vector(-1,  1),
        "w":  new exports.Vector(-1,  0),
        "nw": new exports.Vector(-1, -1)
    };
    exports.directionNames = "n ne e se s sw w nw".split(" ");
})(this.grid = {});

//
//  world module
//