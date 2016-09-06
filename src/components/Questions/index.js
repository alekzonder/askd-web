var Abstract = require('../Abstract');

var moment = require('moment');

module.exports = {
    template: require('./questions.html'),

    props: {
        questionData: {
            questions: [],
            users: {},
            answerCounts: {}
        }
    },

    events: {

    },

    ready: function() {

    },

    methods: {

    },

    components: {
        question: {
            template: require('./question.html'),
            props: {
                question: null,
                user: null,
                answerCount: {
                    default: 0
                }
            },
            methods: {
                goQuestion: function ($event) {
                    $event.preventDefault();
                    this.$parent.$emit('goQuestion', this.question.id);
                }
            },
            computed: {
                datetime: function () {
                    return moment.unix(this.question.creationDate).fromNow();
                }
            }
        }
    }
};
