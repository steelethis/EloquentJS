// I can't do includes in ES5 in the browser; you need something like node which
// I haven't gotten into yet.  Thus this js file has a ton of crap in it.

var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map(function(cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function(_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

// Interface requirements:
// minHeight() - returns a number indicating the minimum height htis cell requires (in lines)
// minWidth() - returns a number indicating this cell's minimum width (in characters)
// draw(width, height) returns an array of length height, which contains a series of strings
// that are each 'width' characters wide.  This represents the content of the cell.

// TextCell implementation of the interface.
function TextCell(text) {
    this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
        return Math.max(width, line.length);
    }, 0);
};
TextCell.prototype.minHeight = function() {
    return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
    var result = [];
    for(var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

// UnderlinedCell implementation of the interface.
function UnderlinedCell(inner) {
    this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

// StretchCell implementation of the interface (actual exercise from ex2 ch6)
function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function() {
    return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function() {
    return Math.max(this.height, this.inner.minHeight());
};
StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
};


// Testing the interface.
var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 === 0) {
            row.push(new TextCell("##"));
        }
        else {
            row.push(new TextCell("  "));
        }
    }
    rows.push(row);
}

console.log("Interface Test");
console.log(drawTable(rows));

// Using code to print out the object MOUNTAINS into a table.
function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
        return keys.map(function(name) {
            return new TextCell(String(row[name]));
        });
    });
    return [headers].concat(body);
}

console.log("MOUNTAINS OUTPUT");
console.log(drawTable(dataTable(MOUNTAINS)));

console.log("Testing StretchCell");
var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
