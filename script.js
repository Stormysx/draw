var items = [];
var itemInput = document.getElementById('itemInput');
var percentageElement = document.getElementById('percentage');

itemInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var newItem = itemInput.value.trim();
        if (newItem !== "") {
            items.push({ name: newItem, count: 0 });
            itemInput.value = "";
            displayItems();
        }
    }
});

var addItemButton = document.getElementById('addItemButton');
var wheel = document.getElementById('wheel');
var spinButton = document.getElementById('spinButton');
var resultDiv = document.getElementById('result');
var clearButton = document.getElementById('clearItems');
var removeOnSpinCheckbox = document.getElementById('removeOnSpin');

addItemButton.addEventListener('click', function() {
    var newItem = itemInput.value.trim();
    if (newItem !== "") {
        items.push({ name: newItem, count: 0 });
        itemInput.value = "";
        displayItems();
    }
});

clearButton.addEventListener('click', function() {
    items = [];
    displayItems();
});

function displayItems() {
    wheel.innerHTML = "";
    var totalOccurrences = 0;
    for (var i = 0; i < items.length; i++) {
        totalOccurrences += items[i].count;
    }
    for (var i = 0; i < items.length; i++) {
        var item = document.createElement('div');
        item.className = 'item';
        var occurrenceRate = totalOccurrences !== 0 ? (items[i].count / totalOccurrences * 100).toFixed(2) : 0;
        item.innerText = items[i].name + "";
        item.dataset.index = i;
        item.addEventListener('mouseover', function(event) {
            event.target.style.color = 'red';
        });
        item.addEventListener('mouseout', function(event) {
            event.target.style.color = '';
        });
        item.addEventListener('click', function(event) {
            var index = event.target.dataset.index;
            items.splice(index, 1);
            displayItems();
        });
        wheel.appendChild(item);
    }
    updatePercentage(totalOccurrences);
}

function updatePercentage(totalOccurrences) {
    var percentage = totalOccurrences !== 0 ? (items.length / totalOccurrences * 100).toFixed(2) : 0;
    percentageElement.innerText = percentage + "%";
}

spinButton.addEventListener('click', function() {
    if (items.length > 0) {
        var totalOccurrences = 0;
        for (var i = 0; i < items.length; i++) {
            totalOccurrences += items[i].count;
        }
        var randomIndex = Math.floor(Math.random() * items.length);
        var selectedItem = items[randomIndex];
        selectedItem.count++;
        var occurrenceRate = totalOccurrences !== 0 ? ((selectedItem.count - 1) / totalOccurrences * 100).toFixed(2) : 0;
        resultDiv.innerText = "Seçilen öğe: " + selectedItem.name + "";

        if (removeOnSpinCheckbox.checked) {
            if (selectedItem.count >= 2) {
                items.splice(randomIndex, 1);
            }
            displayItems();
        }

        updatePercentage(totalOccurrences);
    } else {
        resultDiv.innerText = "Öğe bulunmuyor.";
    }
});

// İlk öğeleri görüntüleyin
displayItems();
