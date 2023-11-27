const config = {
    config1: {
        user: 'sa',
        password: 'sasql',
        server: 'localhost\\SQLEXPRESS',
        database: 'Milenio',
        port: 1433,
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }
}

module.exports = config