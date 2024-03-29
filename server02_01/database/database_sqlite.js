'use strict';

var sqlite = require('sqlite3').verbose();
import config from'../config/config';
import sqlConfig from'../config/sql_config';
import logger from '../util/logger';


class DatabaseSqlite {

    constructor(dbName) {
        logger.debug('DatabaseSqlite initialized -> ' + dbName);
        
        this.isMaster = true;
        this.retryCount = 0;
        this.failoverCount = 0;
        this.pool = getPool();
    }
 
    getPool() {
        console.log('getPool called.');
    
        if (isMaster) {
            return new sqlite.Database(config.database[dbName].master.file);
        } else {
            return new sqlite.Database(config.database[dbName].slave.file);
        }
    }

    execute(sqlName, params) {
        return new Promise((resolve, reject) => {
            // check SQL definition
            if (!sqlConfig[sqlName]) {
                reject(`Sql definition for ${sqlName} not found in sql_config`);
            }

            let sql = sqlConfig[sqlName].sql;

            let sqlParams = [];
            sqlConfig[sqlName].params.forEach((item, index) => {
                sqlParams.push(params[item]);
            })

            this.executeRaw(sql, sqlParams, 0, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows);
            });
        });
    }


    executeSql(sqlName, params, callback) {
        // check SQL definition
        if (!sqlConfig[sqlName]) {
            callback(new Error(`Sql definition for ${sqlName} not found in sql_config`), null);
            return;
        }
        
        let sql = sqlConfig[sqlName].sql;

        let sqlParams = [];
        sqlConfig[sqlName].params.forEach((item, index) => {
            sqlParams.push(params[item]);
        })

        this.executeRaw(sql, sqlParams, 0, callback);
    }


    executeRaw(sql, sqlParams, retryCount, callback) {
            
        this.pool.serialize(() => {

            let stmt = this.pool.prepare(sql);
            stmt.run(sqlParams, (err, rows) => {
                stmt.finalize();

                if (err) {
                    console.log('Error in executing sql -> ' + JSON.stringify(err));
                    
                    if (err.code === 'ECONNREFUSED') {
                        retryCount += 1;
                        console.log('retryCount : ' + retryCount + '/' + config.database[dbName].retryStrategy.limit);

                        if (retryCount < config.database[dbName].retryStrategy.limit) {
                            console.log('Retrying #' + retryCount);
                            
                            if (this.failoverCount > config.database[dbName].retryStrategy.failoverLimit) {
                                callback(err, null);
                            } else {
                                this.executeRaw(sql, sqlParams, retryCount, callback);
                            }
                        } else {
                            // change database config
                            setTimeout(() => {
                                if (this.isMaster) {
                                    // only if config.slave exists
                                    if (config.database[dbName].slave) {
                                        this.isMaster = false;
                                    }
                                } else {
                                    this.isMaster = true;
                                }
            
                                this.pool.close(() => {
                                    console.log('existing pool ended.');
                                });

                                this.pool = getPool();
                                console.log('database connection pool is failovered to ');
                                if (this.isMaster) {
                                    console.log('master config -> ' + config.database[dbName].master.host + ':' + config.database[dbName].master.port);
                                } else {
                                    console.log('slave config -> ' + config.database[dbName].slave.host + ':' + config.database[dbName].slave.port);
                                }
                                this.failoverCount += 1;
                                console.log('failoverCount : ' + this.failoverCount + '/' + config.database[dbName].retryStrategy.failoverLimit);

                                if (this.failoverCount > config.database[dbName].retryStrategy.failoverLimit) {
                                    callback(err, null);
                                } else {
                                    const newRetryCount = 0;
                                    this.executeRaw(sql, sqlParams, newRetryCount, callback);
                                }
                            }, config.database[dbName].retryStrategy.interval);
                            
                        }
                    } else {
                        callback(err, null);
                    }

                    return;
                }
    
                callback(null, rows);

            });

        });

    }
        
}

module.exports = DatabaseSqlite;
