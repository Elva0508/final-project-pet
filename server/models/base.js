const pool = require('../config/mysql.js').promisePool
//const util = require('./util.js')

const sqlString = require('sqlstring');

const dotenv = require('dotenv');
dotenv.config();
 const debug = process.env.NODE_ENV === 'development'


/**
 * execute sql with pool(promise wrapper), log the sql and error by default
 * @param {string} sql
 * @param {boolean} [logRows=false] If true, log rows
 * @param {boolean} [logFields=false]  If true, log fields
 * @returns {Promise<{rows: array, fields: array}>}
 */
const executeQuery = async (sql, logRows = false, logFields = false) => {
    // limit log string string length
    const sqlLog = sql.length < 1500 ? sql : sql.slice(0, 1500) + '...'
    debug && console.log(sqlLog.bgWhite)
  
    try {
      const [rows, fields] = await pool.execute(sql)
      debug && logRows && console.log(rows)
      debug && logFields && console.log(fields)
      return { rows, fields }
    } catch (error) {
      console.log('error occurred: ', error)
    }
  }

//----------------------------------------------------------


//insert one
/**
 * insert one row
 * @param {string} table
 * @param {object} obj
 * @returns {object}
 */
// FIXME: array value should convert to csv string, but...object value?
const insertOne = async (table, obj) => {
    const columns = Object.keys(obj)
    // array value convert to csv string
    const data = Object.values(obj).map((v) =>
      Array.isArray(v) ? v.join(',') : v
    )
  
    const { rows } = await executeQuery(
      sqlString.format(`INSERT INTO ${table} (??) VALUES (?)`, [columns, data])
    )
  
    return rows
  }

//----------------------------------------------------------

// find one
/**
 * select return just one row
 * @param {string} table - table name
 * @param {object|string} where - ex. {id:1, name:'Eddy'}, string is for custom where clause ex.'WHERE id > 0'
 * @param {object} order - ex. {id: 'asc', name: 'desc', username: ''}
 * @returns {object}
 */
const findOne = async (table, where = {}, order = {}) => {
    const sql = sqlString.format(
      `SELECT * FROM ${table} ${whereSql(where)} ${orderbySql(order)} LIMIT 0,1`
    )
    const { rows } = await executeQuery(sql)
    //  need only one
    return rows.length ? rows[0] : {}
  }

//----------------------------------------------------------
  
// update by id 
/**
 * standard update query
 * @param {string} table
 * @param {object} obj
 * @param {object} where
 * @returns {Array}
 */
const update = async (table, obj, where) => {
    const { rows } = await executeQuery(
      sqlString.format(`UPDATE ${table} SET ? ${whereSql(where)}`, [obj])
    )
    return rows
  }
  
  /**
   * update query by id
   * @param {string} table
   * @param {object} obj
   * @param {string|number} id
   * @returns {object}
   */
  const updateById = async (table, obj, id) => {
    return update(table, obj, { id })
  }

//----------------------------------------------------------

/**
 * standard delete query
 * @param {string} table
 * @param {object} where
 * @returns {object}
 */
const remove = async (table, where) => {
    const { rows } = await executeQuery(
      sqlString.format(`DELETE FROM ${table} ${whereSql(where)}`)
    )
  
    return rows
  }
  
  const removeById = async (table, id) => {
    return remove(table, { id })
  }
  
  module.exports = {
  
    findOne,  
    insertOne, 
    removeById,
    updateById,
  };