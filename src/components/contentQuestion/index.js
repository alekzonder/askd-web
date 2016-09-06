var Abstract = require('../Abstract');

var moment = require('moment');

var markdown = require('markdown-it')();

module.exports = Abstract.extend({
    template: require('./question.html'),

    data: function() {
        return {
            loading: true,
            question: {
                title: null,
                text: null
            },

            answersData: {
                answers: [],
                users: {},
                resultset: {}
            },

            user: {
                login: null
            },

            answerCount: 0
        };
    },

    computed: {
        renderedText: function () {
            if (!this.question.text) {
                return '';
            }

            return markdown.render(this.question.text);
        },
        datetime: function () {
            return moment.unix(this.question.creationDate).fromNow();
        }
    },

    ready: function() {
        var that = this;

        var req = this.getRequest();

        this.getApi().questions.get(req.params.id)
            .then(function (data) {
                that.loading = false;
                that.question = data.result;

                that.user = data.metadata.users[that.question.userId];

                if ((data.metadata.answerCounts[that.question.id])) {
                    that.answerCount = data.metadata.answerCounts[that.question.id];
                }

                return that.getApi().answers.getQuestionAnswers(that.question.id);

            })
            .then((data) => {
                that.answersData = data;
            })
            .catch(function (error) {
                that.loading = false;
                that.logError(error);
            });

    },

    beforeDestroy: function () {

    },

    methods: {

    },

    components: {
        answers: require('../Answers')
    }
});
