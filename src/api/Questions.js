var superagent = require('superagent');
var Abstract = require('./Abstract');

var _ = require('lodash');

var Chain = require('maf/Chain');

var Questions = Abstract.extends({

    constructor: function(config) {
        Abstract.class.call(this, config);
    },

    get(id) {

        var that = this;

        return new Promise(function (resolve, reject) {
            var request = superagent.get(that._base + '/questions/' + id);

            request.end(function (error, res) {

                if (error) {
                    return reject(error);
                }

                resolve(res.body);

            });
        });

    },

    find: function (filters) {

        var that = this;

        return new Promise(function (resolve, reject) {

            var request = superagent.get(that._base + '/questions');

            if (filters) {
                request.query(filters);
            }

            request.end(function (err, res) {

                if (err) {
                    return reject(err);
                }

                var body = res.body;

                resolve({
                    questions: body.result,
                    answerCounts: body.metadata.answerCounts,
                    users: body.metadata.users,
                    resultset: body.metadata.resultset
                });
            });

        });

    },

    post: function (question) {

        var that = this;

        return new Promise(function (resolve, reject) {
            var request = superagent.post(that._base + '/questions');

            request.send(question);

            request.end(function (err, res) {

                if (err) {
                    return reject(err);
                }

                var body = res.body;

                resolve(body.result);

            });
        });


    }

});

module.exports = Questions;
