// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'condoit',
      username: 'john',
      password: 'al1son',
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
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
