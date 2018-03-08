var mysql = require("mysql");
var Table = require('cli-table');
//
//===================================================================
// The MySQL constructor contains all of the SQl database code for
// the Bamazon application. It has the following methods:
// getProducts
// placeOrder
// getLowInventory
// updateProductInventory
// insertNewProduct
// getDepartments
// insertDepartment

// There are two global funtions that could not be contained in the
// constuctor due to asynchronous calling problems. These functions
// are updateProducts and updateDeptSales.

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
});

// Update Products is a global function because I could not get it to
// work inside the MySQL constructor methods.
var updateProducts = function(itemID, quantity){
//
  connection.query('UPDATE products SET ? Where ?', [{
  stock_quantity: quantity},
  { item_id: itemID }], function(err, res){});
};

// Update Departments is a global function because I could not get it to
// work inside the MySQL constructor methods.
var updateDeptSales = function(dept, orderAmount){
//
  connection.query( "SELECT * FROM departments WHERE department_name = ?",
    [ dept ], function(err, res) {
      if (err) throw err;
      var totalSales = res[0].total_sales + orderAmount;
      // Update departments table
      connection.query( "UPDATE departments SET ? WHERE ?",
         [{total_sales: totalSales},{department_id : res[0].department_id}],
           function(err, res) { if (err) throw err; } );
  })
};

var MySQL = function(){
  //
  this.getProducts = function( callback ){
    connection.query( "SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log( "" );
      console.log("----------------------------------------------------------------------");
      console.log("                    Products for sale                                 ");
      console.log("----------------------------------------------------------------------");
      //
      for ( var i = 0; i < res.length; i++ ) {
        console.log('ID: ' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + parseFloat(res[i].price).toFixed(2) + ' Quantity: ' + res[i].stock_quantity);
      }
      console.log( "" );
      callback();
    })
  };
  //
  //
  this.placeOrder = function(itemID, quantity, callback){
    //
    connection.query( "SELECT * FROM products WHERE item_id = ?",
      [itemID], function(err, res) {
      if (err) throw err;
      if ( quantity > res[0].stock_quantity ){
        console.log( "" );
        console.log( "There is an insufficient quanity in stock to fill your order." );
        console.log( "We are unable to fill your order at this time." );
        console.log( "" );
      }
      else {
        //
        console.log( "" );
        console.log("----------------------------------------------------------------------");
        console.log( "" );
        console.log( "Thank you for your ordering: \n" + res[0].product_name );
        console.log( "Your order total is: " +  '$' + parseFloat( res[0].price * quantity ).toFixed(2));
        console.log( "" );
        console.log("----------------------------------------------------------------------");
        console.log( "" );
        //
        // Update products table to reduce the stock quantity.
        updateProducts(itemID, res[0].stock_quantity - quantity);
      }
      // Update Department table to Add to TotalSales for the product.
      updateDeptSales(res[0].department_name,  res[0].price * quantity);
     //
     callback();
   })
  };
  //
  this.getLowInventory = function( callback ){
    connection.query( "SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;
      console.log( "" );
      console.log("----------------------------------------------------------------------");
      console.log("                    Products with Low Inventory                       ");
      console.log("----------------------------------------------------------------------");
      console.log( "" );
      //
      for ( var i = 0; i < res.length; i++ ) {
        console.log('ID: ' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + parseFloat(res[i].price).toFixed(2) + ' Quantity: ' + res[i].stock_quantity);
      }
      console.log( "" );
      callback();
    })
  };
  //
  this.updateProductInventory = function( itemID, quantity, callback ){
    connection.query('SELECT * FROM products WHERE item_id = ?', [itemID], function(err, res){
      connection.query('UPDATE products SET ? Where ?', [{
        stock_quantity: parseInt(quantity) + res[0].stock_quantity },{ item_id: itemID }], function(err, res){});
      callback();
    })
  };
  //
  this.insertNewProduct = function( product, department, price, quantity , callback ) {
    connection.query('INSERT into products SET ?', {
      product_name: product, department_name: department, price: price, stock_quantity: quantity }, function(err, res){});
      callback();
  };
  //
  this.getDepartments = function( callback ){
      var table = new Table({
      head: ['Dept ID', 'Dept Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
      colWidths: [10, 18, 18, 15, 15]
      });
      console.log('');
      connection.query('SELECT * FROM departments', function(err, res){
      console.log("----------------------------------------------------------------------");
      console.log("                    Sales by Department                               ");
      console.log("----------------------------------------------------------------------");
        for (var i=0; i<res.length; i++){
          table.push([ res[i].department_id,
                       res[i].department_name,
                       "$"+parseFloat(res[i].overhead_cost).toFixed(2),
                       "$"+parseFloat(res[i].total_sales).toFixed(2),
                       "$"+parseFloat(res[i].total_sales - res[i].overhead_cost).toFixed(2)]);

        }
      console.log(table.toString());
      console.log("");
      callback();
      })
  };
  //
  this.insertDepartment = function( department, overhead, callback ){
    connection.query( 'INSERT INTO departments SET ?', {
      department_name: department, overhead_cost: overhead }, function(err, res){});
    callback();
  };

}

module.exports = new MySQL();
