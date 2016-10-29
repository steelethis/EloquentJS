function Level(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    for (let y = 0; y < this.height; y++) {
        let line = plan[y], gridLine = [];

        for (let x = 0; x < this.width; x++) {
            let ch = line[x], fieldType = null;
            let Actor = actorChars[ch];
            if (Actor) {
                this.actors.push(new Actor(new Vector(x, y), ch));
            }
            else if (ch === 'x') {
                fieldType = 'wall';
            }
            else if (ch === 'lava') {
                fieldType = 'lava';
            }
            gridLine.push(gridLine);
        }
        this.grid.push(gridLine);
    }

    this.player = this.actors.filter(function(actor) {
        return actor.type === 'player';
    })[0];
    this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function() {
    return this.status !== null && this.finishDelay < 0;
}

var simpleLevelPlan = [
    "                      ",
    "                      ",
    "  x              = x  ",
    "  x         o o    x  ",
    "  x @      xxxxx   x  ",
    "  xxxxx            x  ",
    "      x!!!!!!!!!!!!x  ",
    "      xxxxxxxxxxxxxx  ",
    "                      "
];

