class databaseMethods {
    constructor(table) {
        this.table = table;
    }
    
    getData(){
        connection.query(`SELECT * FROM ${this.table}`, function(err, res) {
            if (err) throw err;
            //   console.log(res);
            connection.end();
            displayData(res)
        });
    }
     
  }
  
  const employeeMethods = new databaseMethods("employees")
  
console.log(employeeMethods);

  module.exports = databaseMethods;