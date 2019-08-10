'use strict'

import util from '../util/util';
import param from '../util/param';
import logger from '../util/logger';
import Database from '../database/database_mysql';

/**
 * @Controller(path="/post")
 */
class Post {

    constructor() {
        this.database = new Database('database_mysql');
    }

    /**
     * @RequestMapping(path="/", method="get")
     */
    async list(req, res) {
        logger.debug('Post:list called for path /');

        const params = param.parse(req);
        
        try {
			const sqlName = 'post_list';
			const rows = await this.database.execute(sqlName, params);

			util.sendRes(res, 200, 'OK', rows);
		} catch(err) {
			util.sendError(res, 400, 'Error in execute -> ' + err);
		}
    }

    /**
     * @RequestMapping(path="/create", method="post")
     */
    async create(req, res) {
        logger.debug('Post:add called for path /create');

        const params = param.parse(req);
        
        try {
			const sqlName = 'post_create';
			const rows = await this.database.execute(sqlName, params);

			util.sendRes(res, 200, 'OK', rows);
		} catch(err) {
			util.sendError(res, 400, 'Error in execute -> ' + err);
		}
    }

    /**
     * @RequestMapping(path="/read/:id", method="get")
     */
    async read(req, res) {
        logger.debug('Post:read called for path /read/:id');

        const params = param.parse(req);
        
        try {
			const sqlName = 'post_read';
			const rows = await this.database.execute(sqlName, params);

			util.sendRes(res, 200, 'OK', rows);
		} catch(err) {
			util.sendError(res, 400, 'Error in execute -> ' + err);
		}
    }

    /**
     * @RequestMapping(path="/update/:id", method="post")
     */
    async update(req, res) {
        logger.debug('Post:update called for path /update/:id');

        const params = param.parse(req);
        
        try {
			const sqlName = 'post_update';
			const rows = await this.database.execute(sqlName, params);

			util.sendRes(res, 200, 'OK', rows);
		} catch(err) {
			util.sendError(res, 400, 'Error in execute -> ' + err);
		}
    }

    /**
     * @RequestMapping(path="/delete/:id", method="delete")
     */
    async delete(req, res) {
        logger.debug('Post:delete called for path /delete/:id');

        const params = param.parse(req);
        
        try {
			const sqlName = 'post_delete';
			const rows = await this.database.execute(sqlName, params);

			util.sendRes(res, 200, 'OK', rows);
		} catch(err) {
			util.sendError(res, 400, 'Error in execute -> ' + err);
		}
    }

}


module.exports = Post;
