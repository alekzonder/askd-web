var superagent = require('superagent');
var Abstract = require('./Abstract');

var _ = require('lodash');

var Chain = require('maf/Chain');

var Answers = Abstract.extends({

    constructor: function(config) {
        Abstract.class.call(this, config);
    },

    getQuestionAnswers(questionId) {

        var that = this;

        return new Promise(function (resolve, reject) {

            var request = superagent.get(that._base + '/answers');

            request.query({questionId: questionId});

            request.end(function (error, res) {

                if (error) {
                    return reject(error);
                }

                var body = res.body;

                resolve({
                    answers: body.result,
                    users: body.metadata.users,
                    resultset: body.metadata.resultset
                });

            });
        });

    },

    postAnswer(questionId, text) {

        var that = this;

        return new Promise(function (resolve, reject) {

            var request = superagent.post(that._base + '/answers');

            request.send({
                questionId: questionId,
                text: text
            });

            request.end(function (error, res) {
                if (error) {
                    return reject(error);
                }

                resolve(res.body.result);
            });

        });

    }

});

module.exports = Answers;
