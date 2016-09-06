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
    }
];
