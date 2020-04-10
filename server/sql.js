const mysql = require('mysql');

class SQLConnection {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  init() {
    return new Promise((resolve, reject) => {
      this.connection.connect(err => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }
  query(query, args) {
      return new Promise((resolve, reject) => {
          this.connection.query(query, args, (err, rows) => {
              if(err) {
                reject(err);
              } else {
                resolve(rows);
              }
          } );
      } );
  }
  close() {
      return new Promise((resolve, reject) => {
          this.connection.end(err => {
              if(err) {
                return reject( err );
              } else {
                resolve();
              }
          } );
      });
  }
}

module.exports = SQLConnection;
