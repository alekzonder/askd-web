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
        postAnswer: function (text) {

            var that = this;

            this.getApi().answers.postAnswer(this.question.id, text)
                .then(function (answer) {
                    that.answersData.answers.push(answer);
                    that.answerCount++;
                    that.$refs.answerForm.$emit('answerSent');
                })
                .catch(function (error) {
                    that.logError(error);
                });
        }
    },

    components: {
        answers: require('../Answers'),
        answerForm: {

            template: require('./answerForm.html'),

            data: function () {
                return {
                    text: null,
                    answerSent: false,
                    error: null
                };
            },

            events: {
                answerSent: function () {
                    this.text = null;
                    this.error = null;
                    this.answerSent = true;
                }
            },

            methods: {
                postAnswer: function (event) {
                    event.preventDefault();
                    this.error = null;

                    if (!this.text) {
                        this.error = 'Answer text required';
                        return;
                    }

                    this.$emit('answer-post', this.text);
                },
                oneMoreAnswer: function (event) {
                    event.preventDefault();
                    this.answerSent = false;
                }
            }
        }
    }
});
