var Abstract = require('../Abstract');

var moment = require('moment');

var markdown = require('markdown-it')();

module.exports = Abstract.extend({
    template: require('./ask.html'),

    data: function() {
        return {
            loading: true,

            question: {
                title: null,
                text: null
            }

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

        this.loading = false;


    },

    beforeDestroy: function () {

    },

    methods: {
        postQuestion: function (question) {

            var that = this;

            this.getApi().questions.post(question)
                .then(function (question) {
                    that.$refs.questionForm.$emit('questionSent', question);
                })
                .catch(function (error) {
                    this.loading = false;
                    that.logError(error);
                });

            // this.getApi().answers.postAnswer(this.question.id, text)
            //     .then(function (answer) {
            //         that.answersData.answers.push(answer);
            //         that.answerCount++;
            //         that.$refs.answerForm.$emit('answerSent');
            //     })
            //     .catch(function (error) {
            //         that.logError(error);
            //     });
        }
    },

    components: {
        questionForm: Abstract.extend({

            template: require('./questionForm.html'),

            data: function () {
                return {
                    loading: false,
                    title: null,
                    text: null,
                    error: null,
                    questionSent: false,
                    id: null
                };
            },

            events: {
                questionSent: function (question) {
                    this.loading = false;
                    this.title = null;
                    this.text = null;
                    this.error = null;
                    this.id = question.id;
                    this.questionSent = true;

                }
            },

            methods: {
                post: function (event) {
                    event.preventDefault();

                    if (typeof this.title === 'string') {
                        this.title = this.title.trim();
                    }

                    if (!this.title) {
                        this.error = 'Question title required';
                        return;
                    }

                    if (typeof this.text === 'string') {
                        this.text = this.text.trim();
                    }

                    if (!this.text) {
                        this.error = 'Question text required';
                        return;
                    }

                    this.loading = true;

                    this.$emit('question_post', {title: this.title, text: this.text});
                },
            }
        })
    }
});
