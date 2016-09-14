var MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function buildTable(data) {
    var table = document.createElement("table");

    for (var i = 0; i <= data.length; i++) {
        if (i === 0) {
            var headerRow = document.createElement("tr");
            var keys = Object.keys(data[i]);
            for (var j = 0; j < keys.length; j++) {
                var header = document.createElement("th");
                header.appendChild(document.createTextNode(keys[j]));
                headerRow.appendChild(header);
            }

            table.appendChild(headerRow);
        }

        var row = document.createElement("tr");

        var dataObject = data[i];
        for (var key in dataObject) {
            if (dataObject.hasOwnProperty(key)) {
                var tableData = document.createElement("td");

                if (!isNaN(dataObject[key])) {
                    tableData.style.textAlign = "right";
                }
                var cellText = document.createTextNode(dataObject[key]);
                tableData.appendChild(cellText);
                row.appendChild(tableData);
            }
        }


        table.appendChild(row);
    }

    return table;
}

document.body.appendChild(buildTable(MOUNTAINS));