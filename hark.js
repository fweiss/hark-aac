(function() {
    document.addEventListener("DOMContentLoaded", function(event) {
        createUtterances(vocabulary);
        createCategoryButtons(categories);
        _.each(categories, function(properties, category) {
            createCategoryPanel(vocabulary, category, properties);
        });
    });
    var vocabulary = {
        'about': { categories: [ 'quantifier' ] },
        'after': { categories: [ 'temporal' ] },
        'again': { categories: [ 'temporal' ] },
        'ah': { categories: [ 'exclamation' ] },
        'all': { categories: [ 'quantifier' ] },
        'almost': { categories: [ 'quantifier' ] },
        'already': { categories: [ 'temporal' ] },
        'also': {},
        'an': {},
        'another': { categories: [ 'quantifier' ] },
        'ant': { categories: [ 'animal' ] },
        'any': { categories: [ 'quantifier' ] },
        'are': {},
        'aren\'t': {},
        'as': {},
        'at': { categories: [ 'temporal', 'location' ] },
        'away': {},
        'back': {},
        'bad': { categories: [ 'exclamation', 'feeling' ] },
        // bad
        'ball': { categories: [ 'toy' ]},
        'bathroom': { categories: [ 'comfort' ]},
        'be': {},
        'bean': { categories: [ 'food' ]},
        'because': {},
        'before': { categories: [ 'temporal' ] },
        'being': {},
        'bet': {},
        'better': { categories: [ 'quantifier' ] },
        'big': { categories: [ 'quantifier' ] },
        'bird': { categories: [ 'animal' ] },
        'birds': { categories: [ 'animal' ] },
        'bite': { categories: [ 'food' ] },
        'black': { categories: [ 'color' ] },
        'blue': { categories: [ 'color' ] },
        'both': { categories: [ 'quantifier' ] },
        'box': { categories: [ 'object' ] },
        'boy': { categories: [ 'person' ] },
        'bugs': { categories: [ 'animal' ] },
        'but': { categories: [ 'preposition' ] },
        'buy': { categories: [ 'action' ] },
        'by': { categories: [ 'temporal' ] },
        'bye': { categories: [ 'greeting' ]},
        'call': { categories: [ 'action' ] },
        'came': { categories: [ 'action' ] },
        'can\'t': { categories: [ 'action' ] },
        'candy': { categories: [ 'food' ] },
        'car': { categories: [ 'action', 'travel' ] },
        'catch': { categories: [ 'action' ] },
        'cause': { categories: [ 'action' ] },
        'chair': { categories: [ 'comfort', 'dwelling' ] },
        'come': { categories: [ 'action' ] },
        'comes': { categories: [ 'action' ] },
        'cookie': { categories: [ 'food' ] },
        'corn': { categories: [ 'food' ] },
        'could': { categories: [ 'action' ] },
        'couldn\'t': { categories: [ 'action' ] },
        'cup': { categories: [ 'food' ] },
        'cut': { categories: [ 'action', 'food', 'body' ] },
        'day': { categories: [ 'temporal' ] },
        'did': { categories: [ 'action' ] },
        'didn\'t': { categories: [ 'action' ] },
        'different': {},
        'do': { categories: [ 'action' ] },
        'does': { categories: [ 'action' ] },
        'doctor': { categories: [ 'person' ] },
        'doesn\'t': { categories: [ 'action' ] },
        'dog': { categories: [ 'animal' ] },
        'doing': { categories: [ 'action' ] },
        'don\'t': { categories: [ 'action' ] },
        'done': { categories: [ 'action' ] },
        'door': { categories: [ 'dwelling' ] },
        'down': { categories: [ 'direction', 'feeling' ] },
        'drink': { categories: [ 'action', 'food' ] },
        'duck': { categories: [ 'animal' ] },
        'eat': { categories: [ 'food' ] },
        'eating': { categories: [ 'food' ] },
        'else': { categories: [ 'preposition' ] },
        'even': { categories: [ 'preposition', 'number' ] },
        'everybody': { categories: [ 'quantifier' ] },
        'everything': { categories: [ 'quantifier' ] },
        'face': { categories: [ 'body' ] },
        'fall': { categories: [ 'action' ] },
        'find': { categories: [ 'action' ] },
        'finger': { categories: [ 'body' ] },
        'fire': { categories: [ 'dwelling' ] },
        'first': { categories: [ 'number' ] },
        'five': { categories: [ 'number' ] },
        'fixed': { categories: [ 'action' ] },
        'fly': { categories: [ 'animal', 'travel', 'action' ] },
        'foot': { categories: [ 'body' ] },
        'for': { categories: [ 'preposition' ] },
        'from': { categories: [ 'temporal' ] },
        'get': { categories: [ 'action' ] },
        'gets': { categories: [ 'action' ] },
        'getting': { categories: [ 'action' ] },
        'girl': { categories: [ 'person' ] },
        'girls': { categories: [ 'person' ] },
        'give': { categories: [ 'action' ] },
        'go': { categories: [ 'action' ] },
        'goes': { categories: [ 'action' ] },
        'going': { categories: [ 'action' ] },
        'gonna': { categories: [ 'action' ] },
        'good': { categories: [ 'feeling', 'food' ] },
        'great': { categories: [ 'feeling', 'food' ] },
        'green': { categories: [ 'color' ] },
        'guys': { categories: [ 'person' ] },
        'had': { categories: [ 'action' ] },
        'hair': { categories: [ 'body' ] },
        'hand': { categories: [ 'body' ] },
        'hands': { categories: [ 'body' ] },
        'has': { categories: [ 'action' ] },
        'have': { categories: [ 'action' ] },
        'haven\'t': { categories: [ 'action' ] },
        'he': { categories: [ 'person' ] },
        'he\'s': { categories: [ 'person' ] },
        'her': { categories: [ 'person' ] },
        'head': { categories: [ 'body' ] },
        'hear': { categories: [ 'action' ] },
        'hello': { categories: [ 'greeting' ] },
        'help': { categories: [ 'action' ] },
        'here': { categories: [ 'location', 'travel' ] },
        'here\'s': { categories: [ 'location', 'travel' ] },
        'hi': { categories: [ 'greeting' ] },
        'high': { categories: [ 'direction', 'location' ] },
        'hill': { categories: [ 'travel' ] },  //
        'him': { categories: [ 'person' ] },
        'his': { categories: [ 'person' ] },
        'hold': { categories: [ 'action' ] },
        'home': { categories: [ 'action', 'dwelling' ] },
        'horse': { categories: [ 'animal' ] },
        'hot': { categories: [ 'feeling', 'food' ] },
        'house': { categories: [ 'dwelling' ] },
        'how': { categories: [ 'action' ] },
        'huh': { categories: [ 'exclamation' ] },
        'hum': { categories: [ 'exclamation' ] },
        'I': { categories: [ 'person' ] },
        'I\'ll': { categories: [ 'person' ] },
        'I\'m': { categories: [ 'person' ] },
        'if': { categories: [ 'preposition' ] },
        'in': { categories: [ 'location', 'temporal' ] },
        'is': { categories: [ 'action' ] },
        'isn\'t': { categories: [ 'action' ] },
        'it': { categories: [ 'preposition' ] },  // pronoun
        'it\'s': { categories: [ 'action' ] },
        'juice': { categories: [ 'food', 'comfort' ] },
        'jump': { categories: [ 'action' ] },
        'jumped': { categories: [ 'action' ] },
        'jumping': { categories: [ 'action' ] },
        'just': { categories: [ 'preposition', 'number', 'temporal' ] },
        'kind': { categories: [ 'feeling' ] },
        'know': { categories: [ 'action' ] },
        'last': { categories: [ 'number', 'temporal' ] },
        'leaves': { categories: [ 'action', 'location', 'dwelling' ] },
        'let': { categories: [ 'action' ] },
        'let\'s': { categories: [ 'action' ] },
        'lift': { categories: [ 'action', 'direction' ] },
        'like': { categories: [ 'action', 'feeling', 'quantifier' ] },
        'little': { categories: [ 'quantifier', 'feeling', 'food' ] },
        'long': { categories: [ 'quantifier', 'body', 'temporal', 'travel' ] },
        'look': { categories: [ 'action', 'exclamation' ] },
        'looking': { categories: [ 'action' ] },
        'lot': { categories: [ 'quantifier', 'feeling' ] },
        'lunch': { categories: [ 'action', 'food', 'temporal', 'comfort' ] },
        'made': { categories: [ 'action' ] },
        'make': { categories: [ 'action', 'food', 'comfort', 'dwelling' ] },
        'man': { categories: [ 'person' ] },
        'many': { categories: [ 'number' ] },
        'may': { categories: [ 'action' ] },
        'maybe': { categories: [ 'action' ] },
        'me': { categories: [ 'person' ] },
        'mean': { categories: [ 'feeling' ] },
        'messy': { categories: [ 'body', 'feeling' ] },
        'middle': { categories: [ 'location', 'number', 'body' ] },
        'mine': { categories: [ 'person' ] },
        'mom': { categories: [ 'person' ] },
        'mommy': { categories: [ 'person' ] },
        'more': { categories: [ 'quantifier' ] },
        'most': { categories: [ 'quantifier' ] },
        'move': { categories: [ 'action' ] },
        'much': { categories: [ 'quantifier' ] },
        'must': { categories: [ 'action' ] },
        'my': { categories: [ 'person' ] },
        'myself': { categories: [ 'person' ] },
        'name': { categories: [ 'person' ] },
        'named': { categories: [ 'action', 'person' ] },
        'need': { categories: [ 'action' ] },
        'never': { categories: [ 'location', 'number', 'temporal' ] },
        'new': { categories: [ 'action' ] },
        'next': { categories: [ 'number', 'temporal', 'location' ] },
        'nice': { categories: [ 'feeling' ] },
        'no': { categories: [ 'exclamation' ] },
        'not': { categories: [ 'preposition' ] },
        'of': { categories: [ 'preposition' ] },
        'off': { categories: [ 'action' ] },
        'oh': { categories: [ 'exclamation' ] },
        'other': { categories: [ 'preposition' ] },
        'ok': { categories: [ 'exclamation', 'action', 'feeling' ] },
        'old': { categories: [ 'temporal', 'person' ] },
        'on': { categories: [ 'preposition', 'location', 'temporal' ] },
        'one': { categories: [ 'number' ] },
        'only': { categories: [ 'preposition' ] },
        'open': { categories: [ 'action' ] },
        'or': { categories: [ 'preposition' ] },
        'our': { categories: [ 'person' ] },
        'ours': { categories: [ 'person' ] },
        'out': { categories: [ 'location', 'food' ] },
        'over': { categories: [ 'location', 'action' ] },
        'paint': { categories: [ 'action', 'object' ] },
        'people': { categories: [ 'person' ] },
        'pet': { categories: [ 'animal' ] },
        'pick': { categories: [ 'action' ] },
        'piece': { categories: [ 'food', 'object' ] },
        'play': { categories: [ 'action' ] },
        'please': { categories: [ 'action', 'feeling' ] },
        'push': { categories: [ 'action' ] },
        'put': { categories: [ 'action' ] },
        'ready': { categories: [ 'action', 'exclamation' ] },
        'really': { categories: [ 'preposition' ] },
        'red': { categories: [ 'color' ] },
        'remember': { categories: [ 'action' ] },
        'ride': { categories: [ 'action', 'travel' ] },
        'right': { categories: [ 'preposition', 'direction' ] },
        'room': { categories: [ 'dwelling' ] },
        'run': { categories: [ 'action' ] },
        'said': { categories: [ 'action' ] },
        'same': { categories: [ 'quantifier' ] },
        'saw': { categories: [ 'action' ] },
        'say': { categories: [ 'action' ] },
        'see': { categories: [ 'action', 'exclamation' ] },
        'she': { categories: [ 'person' ] },
        'she\'s': { categories: [ 'person' ] },
        'show': { categories: [ 'action' ] },
        'shut': { categories: [ 'action' ] },
        'side': { categories: [ 'direction' ] },
        'sit': { categories: [ 'action', 'dwelling' ] },
        'so': { categories: [ 'preposition' ] },
        'still': { categories: [ 'action' ] },
        'some': { categories: [ 'quantifier' ] },
        'somebody': { categories: [ 'person' ] },
        'someone': { categories: [ 'person' ] },
        'something': { categories: [ 'object' ] },
        'sometimes': { categories: [ 'temporal' ] },
        'somewhere': { categories: [ 'location', 'travel' ] },
        'stop': { categories: [ 'action', 'exclamation' ] },
        'stuff': { categories: [ 'object' ] },
        'swing': { categories: [ 'action' ] }  // play
   };
    var categories = {
        'action': {},
        'animal': {},
        'body': {},
        'food': {},
        'number': {},
        'person': {},
        'quantifier': {},
        'preposition': {},
        'temporal': {},
        'direction': {},
        'color': {},
        'greeting': {},
        'location': {},
        'travel': {},
        'dwelling': {},
        'feeling': {},
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
    function render(container, word) {
        var button = document.createElement('button');
        button.setAttribute('utter', word);
        var text = document.createTextNode(word);
        button.appendChild(text);
        button.addEventListener('click', utter2);
        container.appendChild(button);
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
        container.appendChild(panel);
        properties.panel = panel;
        _.each(subVocabulary, function(word) {
            render(panel, word.word);
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
