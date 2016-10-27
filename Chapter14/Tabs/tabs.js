function asTabs(node) {
    // node contains an HTMLElement
    // node.children is an HTMLCollection that contains 3 divs

    var tabDivs = [];
    // pulling the tab content into an array so that I can go over it later when creating buttons
    for (let i = 0; i < node.childNodes.length; i++) {
        let childNode = node.childNodes[i];
        if (childNode.nodeType === node.ELEMENT_NODE) {
            tabDivs.push(childNode);
        }
    }

    var tabList = document.createElement("div");
    tabDivs.forEach(function(tab, i) {
        let button = document.createElement("button");
        button.textContent = tab.getAttribute("data-tabname");
        button.addEventListener("click", function() {
            showTab(i);
        });

        tabList.appendChild(button);
    });
    node.insertBefore(tabList, node.firstChild);

    function showTab(tabNumber) {

        tabDivs.forEach(function(tab, i) {
            if (i === tabNumber) {
                tab.style.display = "";
            }
            else {
                tab.style.display = "none";
            }
        });

        for (let i = 0; i < tabList.childNodes.length; i++) {
            if (i === tabNumber) {
                tabList.childNodes[i].style.background = "violet";
            }
            else {
                tabList.childNodes[i].style.background = "";
            }
        }
    }

    showTab(0);
}

asTabs(document.querySelector("#wrapper"));