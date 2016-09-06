var Abstract = require('../Abstract');
var moment = require('moment');

module.exports = Abstract.extend({
    template: require('./main.html'),

    data: function() {
        return {
            loading: false,
            questionData: null
        };
    },

    ready: function() {
        var that = this;

        var req = this.getRequest();

        this.getApi().questions.find()
            .then(function (result) {
                that.questionData = result;
            })
            .catch(function (error) {
                that.logError(error);
            });

        this.$refs.questions.$on('goQuestion', function (questionId) {
            that.loadUrl('/q/' + questionId);
        });

    },

    beforeDestroy: function () {

    },

    methods: {

    },

    components: {
        questions: require('../Questions'),
    }
});
