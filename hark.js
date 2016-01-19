(function() {
    var settingsPanel;
    var counters = {};
    var utteranceSettings = {
        voicesModel: [],
        volume: 1,
        rate: 0.7
    };
    document.addEventListener("DOMContentLoaded", loadDom);
    document.addEventListener('deviceready', getVoices);
    // no event listener in safari
    if (window.speechSynthesis.addEventListener) {
        window.speechSynthesis.addEventListener('voiceschanged', getVoices);
    } else {
        getVoices();
    }
    function loadDom() {
        var container = document.getElementById('container');
        var templateUrl = container.getAttribute('template');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            console.log('template loaded: readystate: ' + xmlhttp.readyState + 'status:' + xmlhttp.status);
            if (xmlhttp.readyState == 4) {
                // file system returns status 0
                if (xmlhttp.status == 200 || xmlhttp.status == 0) {
                    document.getElementById('container').innerHTML = xmlhttp.responseText;
                    init();
                }
            }
        };
        console.log('loading template: ' + templateUrl);
        // could use sync here
        xmlhttp.open('GET', templateUrl, true);
        xmlhttp.send();
    }
    function init() {
        createUtterances(vocabulary);
        createControlPanel();
        createUtteranceSettingsPanel();
        settingsPanel = document.getElementById('settings');
        createCategoryButtons(categories);
        _.each(categories, function(properties, category) {
            createCategoryPanel(vocabulary, category, properties);
        });
    }
    function updateVoiceSelect() {
        var voicesSelect = document.getElementById('voice');
        if (voicesSelect) {
            emptyElement(voicesSelect);
            _.each(utteranceSettings.voicesModel, function(voiceModel) {
                var option = document.createElement('option');
                var optionText = document.createTextNode(voiceModel.name);
                option.appendChild(optionText);
                voicesSelect.appendChild(option);
            });
        }
    }
    function getVoices() {
        var voices = window.harkPlatform ? window.harkPlatform.getVoices() : window.speechSynthesis.getVoices();
        utteranceSettings.voicesModel = _.filter(voices, function(voiceModel) {
            return voiceModel.lang == 'en-US';
        });
        updateVoiceSelect();
    }
    function createUtteranceSettingsPanel() {
        updateVoiceSelect();
        var voicesSelect = document.getElementById('voice');
        voicesSelect.addEventListener('change', function(event) {
            var selectedVoiceName = event.target.selectedOptions[0].text;
            utteranceSettings.voice = _.find(utteranceSettings.voicesModel, function(voiceModel) {
                return voiceModel.name == selectedVoiceName;
            });
            createUtterances(vocabulary);
        });
        document.getElementById('volume').addEventListener('change', function(event) {
            utteranceSettings.volume = event.target.value;
            createUtterances(vocabulary);
        });
        document.getElementById('rate').addEventListener('change', function(event) {
            utteranceSettings.rate = event.target.value;
            createUtterances(vocabulary);
        });
        document.getElementById('pitch').addEventListener('change', function(event) {
            utteranceSettings.pitch = event.target.value;
            createUtterances(vocabulary);
        });
        document.getElementById('testUtteranceButton').addEventListener('click', function(event) {
            var testUtteranceText = document.getElementById('testUtteranceText');
            var testUtterance = utteranceFactory(testUtteranceText.value);
            window.speechSynthesis.speak(testUtterance);
        });
     }
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
    function togglePanel(settingsPanel) {
        var shown = settingsPanel.style.display == 'block';
        if (shown) {
            settingsPanel.style.display = 'none';
        } else {
            createSettingsPanel();
            settingsPanel.style.display = 'block';
        }
    }
    function createCountersButton() {
        var button = createButton('counters');
        var settingsPanel = document.getElementById('settings');
        button.addEventListener('click', function() {
            togglePanel(settingsPanel)
        });
        return button;
    }
    function createControlPanel() {
        var panel = document.getElementById('control');
        panel.appendChild(createCountersButton());
        panel.appendChild(createSettingsButton());
    }
    function createSettingsButton() {
        var button = createButton('Settings');
        var settingsPanel = document.getElementById('utterance-settings');
        button.addEventListener('click', function() {
            var shown = settingsPanel.style.display == 'block';
            if (shown) {
                settingsPanel.style.display = 'none';
            } else {
                settingsPanel.style.display = 'block';
            }
        });
        return button;
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
        utterance.volume = utteranceSettings.volume;
        utterance.rate = utteranceSettings.rate;
        if (utteranceSettings.pitch) {
            utterance.pitch = utteranceSettings.pitch;
        }
        if (utteranceSettings.voice) {
            utterance.voice = utteranceSettings.voice;
        }
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
