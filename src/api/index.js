var _ = require('lodash');

module.exports = function(config) {

    var classes = {
        Questions: require('./Questions'),
        Answers: require('./Answers')
    };

    var api = {};

    api.questions = new classes.Questions(config, api);
    api.answers = new classes.Answers(config, api);

    return api;
};
