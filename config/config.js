
module.exports = {
    development: {
        server: {
            host:'localhost',
            port:'33445'
        },
        database: {
            host: 'localhost',
            port: '27017',
            database: 'development',
            name: 'development'
        },
        log: {
            path: 'server.log',
            level: 'debug'
        }
    },

    production: {
        server: {
            host:'localhost',
            port:'33445'
        },
        database: {
            host: 'localhost',
            port: '27017',
            database: 'production',
            name: 'production'
        },
        log: {
            path: '/var/log/business-data.log',
            level: 'warn'
        }
    },

    test: {
        server: {
            host:'localhost',
            port:'33445'
        },
        database: {
            host: 'localhost',
            port: '27017',
            database: 'test',
            name: 'test-collection'
        },
        log: {
            path: 'server.log',
            level: 'debug'
        }
    },
};