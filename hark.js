(function() {
    var settingsPanel;
    var counters = {};
    document.addEventListener("DOMContentLoaded", function() {
        createUtterances(vocabulary);
        createControlPanel();
        settingsPanel = document.getElementById('settings');
        createCategoryButtons(categories);
        _.each(categories, function(properties, category) {
            createCategoryPanel(vocabulary, category, properties);
        });
    });
    function createButton(label) {
        var button = document.createElement('button');
        button.appendChild(document.createTextNode(label));
        return button;
    }
    function emptyElement(element) {
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
    }
    function createCountersButton() {
        var button = createButton('counters');
        button.addEventListener('click', function() {
            var shown = settingsPanel.style.display == 'block';
            if (shown) {
                settingsPanel.style.display = 'none';
            } else {
                createSettingsPanel();
                settingsPanel.style.display = 'block';
            }
        });
        return button;
    }
    function createControlPanel() {
        var panel = document.getElementById('control');
        panel.appendChild(createCountersButton());
    }
    function createSettingsPanel() {
        function createRow(label, value) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(label));
            var td2 = document.createElement('td');
            td2.appendChild(document.createTextNode(value));
            td2.setAttribute('class', 'number');
            tr.appendChild(td1);
            tr.appendChild(td2);
            return tr;
        }
        var settingsPanel = document.getElementById('settings');
        var tbody = settingsPanel.getElementsByTagName('tbody')[0];
        emptyElement(tbody);
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
        'comfort': {},
        'direction': {},
        'dwelling': {},
        'exclamation': {},
        'feeling': {},
        'food': {},
        'greeting': {},
        'location': {},
        'number': {},
        'person': {},
        'preposition': {},
        'quantifier': {},
        'question': {},
        'temporal': {},
        'travel': {}
    };
    function utteranceFactory(message) {
        var utterance = new SpeechSynthesisUtterance();
        utterance.text = message;
        utterance.lang = 'en-US';
        utterance.volume = 1;
        utterance.rate = 0.7;
        //utterance.voice = "";
        return utterance;
    }
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
        var button = createButton(word);
        button.setAttribute('utter', word);
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
            properties.utterance = utteranceFactory(word);
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
            var button = createButton(category);
            button.addEventListener('click', function() {
                showCategory(category);
            });
            container.appendChild(button);
        });
    }
    function showCategory(category) {
        var selected = categories[category];
        if (selected && selected.panel) {
            _.each(categories, function (properties) {
                 properties.panel.style.display = 'none';
            });
            selected.panel.style.display = 'block';
        }
    }
})();
