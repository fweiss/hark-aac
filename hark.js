(function() {
    var settingsPanel;
    var counters = {};
    document.addEventListener("DOMContentLoaded", function(event) {
        createUtterances(vocabulary);
        createControlPanel();
        settingsPanel = document.getElementById('settings');
        createCategoryButtons(categories);
        _.each(categories, function(properties, category) {
            createCategoryPanel(vocabulary, category, properties);
        });
    });
    function createButton() {
        var button = document.createElement('button');
        var label = document.createTextNode('counters');
        button.appendChild(label);
        button.addEventListener('click', function() {
            createSettingsPanel();
            settingsPanel.style.display = 'block';
        });
        return button;
    }
    function createControlPanel() {
        var panel = document.getElementById('control');
        panel.appendChild(createButton());
    }
    function createSettingsPanel() {
        var st = {
            foo: 2,
            bar: 45,
            baz: 12
        };
        function createRow(label, value) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var cell1 = document.createTextNode(label);
            var td2 = document.createElement('td');
            var cell2 = document.createTextNode(value);
            td1.appendChild(cell1);
            tr.appendChild(td1);
            td2.appendChild(cell2);
            td2.setAttribute('class', 'number');
            tr.appendChild(td2)
            return tr;
        }
        var settingsPanel = document.getElementById('settings');
        var tbody = settingsPanel.getElementsByTagName('tbody')[0];
        _.each(counters, function(value, key) {
            tbody.appendChild(createRow(key, value));
        });
        return settingsPanel;
    }
    var categories = {
        'action': {},
        'animal': {},
        'body': {},
        'color': {},
        'direction': {},
        'dwelling': {},
        'feeling': {},
        'food': {},
        'number': {},
        'person': {},
        'preposition': {},
        'quantifier': {},
        'question': {},
        'temporal': {},
        'greeting': {},
        'location': {},
        'travel': {},
        'exclamation': {},
        'comfort': {}
    };
    // on the fly
    function utter(target) {
        var utterance = target.toElement.getAttribute('utter');
        console.log(utterance);
        var msg = new SpeechSynthesisUtterance(utterance);
        window.speechSynthesis.speak(msg);
    }
    // stored with word
    function utter2(target) {
        var word = target.toElement.getAttribute('utter');
        var props = vocabulary[word];
        window.speechSynthesis.speak(props.utterance);
    }
    function countSpeechButton(button) {
        var word = button.getAttribute('utter');
        var key = 'word.' + word;
        if (counters[key] === undefined) {
            counters[key] = 1;
        } else {
            counters[key]++;
        }
    }
    function createSpeechButton(word) {
        var button = document.createElement('button');
        button.setAttribute('utter', word);
        var text = document.createTextNode(word);
        button.appendChild(text);
        button.addEventListener('click', utter2);
        button.addEventListener('click', function(event) {
            countSpeechButton(event.toElement);
        });
        return button;
    }
    /**
     * Decorate each word in the vocabulary with the TTS object and the word label for the button.
     * @param vocabulary
     */
    function createUtterances(vocabulary) {
        _.each(vocabulary, function(properties, word) {
            var utterance = new SpeechSynthesisUtterance(word);
            properties.utterance = utterance;
            properties.word = word;
        });
    }
    function createCategoryPanel(vocabulary, category, properties) {
        var subVocabulary = _.filter(_.toArray(vocabulary), function(word) {
            return _.contains(word.categories, category);
        });
        var container = document.getElementById('panels');
        var panel = document.createElement('div');
        panel.setAttribute('class', 'panel');
        container.appendChild(panel);
        properties.panel = panel;
        _.each(subVocabulary, function(word) {
            panel.appendChild(createSpeechButton(word.word));
        })
    }
    function createCategoryButtons(categories) {
        var container = document.getElementById('categories');
        _.each(categories, function(properties, category) {
             var button = document.createElement('button');
             var label = document.createTextNode(category);
             button.appendChild(label);
             button.addEventListener('click', function(event) {
             showCategory(category);
             });
             container.appendChild(button);
        });
    }
    function showCategory(category) {
        var selected = categories[category];
        if (selected && selected.panel) {
            _.each(categories, function (properties, category) {
                 var panel = properties.panel;
                 panel.style.display = 'none';
            });
            selected.panel.style.display = 'block';
        }
    }
})();
