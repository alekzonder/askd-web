var Abstract = require('../Abstract');

var moment = require('moment');

var markdown = require('markdown-it')();

module.exports = {
    template: require('./answers.html'),

    props: {
        data: {
            default: function () {
                return {
                    answers: [],
                    users: {},
                    resultset: {}
                };

            }
        }
    },

    events: {

    },

    ready: function() {

    },

    methods: {

    },

    components: {
        answer: {
            template: require('./answer.html'),
            props: {
                answer: null,
                user: null
            },
            methods: {
                // goQuestion: function ($event) {
                //     $event.preventDefault();
                //     this.$parent.$emit('goQuestion', this.question.id);
                // }
            },
            computed: {
                renderedText: function () {
                    if (!this.answer.text) {
                        return '';
                    }

                    return markdown.render(this.answer.text);
                },
                datetime: function () {
                    return moment.unix(this.answer.creationDate).fromNow();
                }
            }
        }
    }
};
