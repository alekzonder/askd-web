module.exports = [
    {
        route: '/',
        method: 'get',
        component: 'main-page'
    },
    {
        route: '/q/:id',
        method: 'get',
        component: 'question-page'
    },
    {
        route: '/ask',
        method: 'get',
        component: 'ask-page'
    }
];
