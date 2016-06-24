
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
    exports.Grid.prototype.forEach = function(f, context) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var value = this.space[x + y * this.width];
                if (value !== null) {
                    f.call(context, value, new exports.Vector(x, y));
                }
            }
        }
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
(function(exports, grid) {
    "use strict";

    var randomElement = function(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    var elementFromChar = function(legend, ch) {
        if (ch === " ") {
            return null;
        }
        var element = new legend[ch]();
        element.originChar = ch;
        return element;
    };

    var charFromElement = function(element) {
        if (element === null) {
            return " ";
        }
        else {
            return element.originChar;
        }
    };

    exports.directions = grid.directions;

    exports.World = function(map, legend) {
        var worldGrid = new grid.Grid(map[0].length, map.length);
        this.worldGrid = worldGrid;
        this.legend = legend;

        map.forEach(function(line, y) {
            for (var x = 0; x < line.length; x++) {
                worldGrid.set(new grid.Vector(x, y),
                        elementFromChar(legend, line[x]));
            }
        });
    };
    exports.World.prototype.toString = function() {
        var output = "";
        for (var y = 0; y < this.worldGrid.height; y++) {
            for(var x = 0; x < this.worldGrid.width; x++) {
                var element = this.worldGrid.get(new grid.Vector(x, y));
                output += charFromElement(element);
            }
            output += "\n";
        }
        return output;
    };
    exports.World.prototype.turn = function() {
        var acted = [];
        this.worldGrid.forEach(function(critter, vector) {
            if (critter.act && acted.indexOf(critter) === -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        }, this);
    };
    exports.World.prototype.letAct = function(critter, vector) {
        var action = critter.act(new exports.View(this, vector));
        if (action && action.type === "move") {
            var dest = this.worldGrid.plus(exports.directions[action.direction]);
            if (dest && this.worldGrid.get(dest) === null) {
                this.worldGrid.set(vector, null);
                this.worldGrid.set(dest, critter);
            }
        }
    };
    exports.World.prototype.checkDestination = function(action, vector) {
        if (exports.directions.hasOwnProperty(action.direction)) {
            var dest = this.worldGrid.plus(exports.directions[action.direction]);
            if (this.worldGrid.isInside(dest)) {
                return dest;
            }
        }
    };

    exports.LifelikeWorld = function(map, legend) {
        exports.World.call(this, map, legend);
    };
    exports.LifelikeWorld.prototype = Object.create(exports.World.prototype);
    var actionTypes = Object.create(null);
    exports.LifelikeWorld.prototype.letAct = function(critter, vector) {
        var action = critter.act(new exports.View(this, vector));
        var handled = action &&
                action.type in actionTypes &&
                actionTypes[action.type].call(this, critter, vector, action);
        if (!handled) {
            critter.energy -= 0.2;
            if (critter.energy <= 0) {
                this.worldGrid.set(vector, null);
            }
        }
    };

    actionTypes.grow = function(critter) {
        critter.energy += 0.5;
        return true;
    };
    actionTypes.move = function(critter, vector, action) {
        var dest = this.checkDestination(action, vector);
        if (dest === null || critter.energy <= 1 || this.worldGrid.get(dest) !== null) {
            return false;
        }
        critter.energy -= 1;
        this.worldGrid.set(vector, null);
        this.worldGrid.set(dest, critter);
        return true;
    };
    actionTypes.eat = function(critter, vector, action) {
        var dest = this.checkDestination(action, vector);
        var atDest = dest !== null && this.worldGrid.get(dest);
        if (!atDest || atDest.energy === null) {
            return false;
        }
        critter.energy += atDest.energy;
        this.worldGrid.set(dest, null);
        return true;
    };
    actionTypes.reproduce = function(critter, vector, action) {
        var baby = elementFromChar(this.legend, critter.originChar);
        var dest = this.checkDestination(action, vector);
        if (dest === null || critter.energy <= 2 * baby.energy || this.worldGrid.get(dest) !== null) {
            return false;
        }
        critter.energy -= 2 * baby.energy;
        this.worldGrid.set(dest, baby);
        return true;
    };

    exports.View = function(world, vector) {
        this.world = world;
        this.vector = vector;
    };
    exports.View.prototype.look = function(dir) {
        var target = this.vector.plus(exports.directions[dir]);
        if (this.world.grid.isInside(target)) {
            return charFromElement(this.world.grid.get(target));
        }
        else {
            return "#";
        }
    };
    exports.View.prototype.findAll = function(ch) {
        var found = [];
        for (var dir in exports.directions) {
            if (exports.View.look(dir) === ch) {
                found.push(dir);
            }
        }
        return found;
    };
    exports.View.prototype.find = function(ch) {
        var found = this.findAll(ch);
        if (found.length === 0) {
            return null;
        }
        return randomElement(found);
    };



})(this.world = {});

//
//  simple_ecosystem module
//
(function(exports, world) {
    "use strict";

    var randomElement = function(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    function dirPlus(dir, n) {
        var index = world.directionNames.indexOf(dir);
        return world.directionNames[(index + n + 8) % 8];
    }

    exports.Wall = function() {};

    exports.BouncingCritter = function() {
        this.direction = randomElement(world.directionNames);
    };
    exports.BouncingCritter.prototype.act = function(view) {
        if (view.look(this.direction) !== " ") {
            this.direction = view.find(" ") || "s";
        }
    };

    exports.WallFollower = function() {
        this.dir = "s";
    };
    exports.WallFollower.prototype.act = function(view) {
        var start = this.dir;
        if (view.look(dirPlus(this.dir, -3)) !== " ") {
            start = this.dir = dirPlus(this.dir, -2);
        }
        while (view.look(this.dir) !== " ") {
            this.dir = dirPlus(this.dir, 1);
            if (this.dir === start) {
                break;
            }
        }
    };

})(this.simple_ecosystem = {});

