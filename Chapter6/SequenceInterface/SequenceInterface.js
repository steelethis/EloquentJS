// Interface for iteration
// getNextElement
// lastElementReached

function ArraySeq(array) {
    this.array = array;
    this.length = array.length;
    this.index = 0;
    this.nextElement = this.array[0];
}
ArraySeq.prototype.getNextElement = function() {
    if (this.index !== 0) {
        this.nextElement = this.array[this.index];
    }
    this.index++;
    return this.nextElement;
};
ArraySeq.prototype.lastElementReached = function() {
    if (this.index < this.length) {
        return false;
    }
    return true;
};

function RangeSeq(from, to) {
    this.from = from;
    this.to = to;
    this.index = 0;
    this.nextElement = from;
}
RangeSeq.prototype.getNextElement = function() {
    this.nextElement = this.from + this.index;
    this.index++;
    return this.nextElement;
};
RangeSeq.prototype.lastElementReached = function() {
    if(this.nextElement <= this.to) {
        return false;
    }
    return true;
};

function logFive(collection) {
    for(var i = 0; i < 5; i++) {
        if(collection.lastElementReached()) {
            break;
        }
        console.log(collection.getNextElement());
    }
}


logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
