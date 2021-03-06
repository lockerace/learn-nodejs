// Update with your config settings.

module.exports = {

  development: {
    client: 'mssql',
    connection: {
      server : '127.0.0.1',
      user : 'mssql_user',
      password : 'mssql_password',
      database : 'mssql_database',
      options: {
        port: 14831
      }
    },
    migrations: {
      tableName: 'knex'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
