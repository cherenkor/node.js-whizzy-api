const config = {
    app: {
        port: 2999,
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'db',
        url: 'mongodb://localhost:2998'
    },
    status: {
        notFound : 404,
        success : 500
    }
};

module.exports = config;