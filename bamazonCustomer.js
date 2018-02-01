var mysql = require("./mySQL.js");
var inquirer = require("inquirer");

//
console.log("----------------------------------------------------------------------");
console.log("                                                                      ");
console.log("                    WELCOME TO BAMAZON                                ");
console.log("                                                                      ");
console.log("----------------------------------------------------------------------");
console.log( "" );


function showProducts() {
//
  mysql.getProducts(placeOrder);

};

// This function askes the user to enter the Product and Quantity they want
// to order. If the stock quantity is less then the amount requested, the order
// will not be filled. Otherwise, the products table is updated to reduce the
// stock amount.
function placeOrder() {
inquirer.prompt([{
  name: "itemID",
  message: "Enter the Product ID of the item you would like to purchase.",
  validate: function( value ){
      var valid = value.match(/^[0-9]+$/)
      if ( valid ) {
        return true;
      }
      else
        return( "Please enter a valid product ID.");
      }
  },{
  name: "quantity",
  message: "Enter the quantity you would like to purchase.",
  validate: function( value ){
      var valid = value.match(/^[0-9]+$/)
      if ( valid ) {
        return true;
      }
      else
        return( "Please enter a valid quantity.");
      }
  }]).then( function( answer ){
    //
    mysql.placeOrder( answer.itemID, answer.quantity, newOrder );
  })
}
//
function newOrder(){
  inquirer.prompt([{
    type: "confirm",
    name: "confirm",
    message: "Would you like to place another order?"
  }]).then( function( answer ){
    if ( answer.confirm ){
      placeOrder();
    }
    else{
      console.log("----------------------------------------------------------------------");
      console.log("                                                                      ");
      console.log("                    Thank you for shopping at Bamazon                 ");
      console.log("                                                                      ");
      console.log("----------------------------------------------------------------------");
      process.exit(0);
    }
  })
}

showProducts();
