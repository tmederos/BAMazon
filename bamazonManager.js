var mysql = require("./mySQL.js");
var inquirer = require("inquirer");
//

function managerActions(){
  inquirer.prompt([{
    type: 'list',
    name: 'input',
    message: '\n\nWhat would you like to do?\n',
    choices: ["1) View Products for sale", "2) View low inventory", "3) Add to inventory", "4) Add new product" ]
  }]).then(function(answer){
    if ( answer.input === "1) View Products for sale" ){
      mysql.getProducts(newAction);
    }
    else if ( answer.input === "2) View low inventory" ){
      mysql.getLowInventory(newAction);
    }
    else if ( answer.input === "3) Add to inventory" ){
      inquirer.prompt([{
        name: 'item',
        message: 'Enter the ID of the item you wish to update: ',
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if (valid){
            return true;
          }
            return "Please enter a valid item ID number.";
        }
      },{
        name: 'quantity',
        message: 'How many items would you like to add to the current inventory? ',
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if (valid){
            return true;
          }
            return "Please enter a valid number.";
          }
      }]).then( function(answer){
        mysql.updateProductInventory( answer.item, answer.quantity, newAction);
        console.log('Inventory updated');
      })
    }
    else if( answer.input === "4) Add new product" ){
      inquirer.prompt([{
        name: "product",
        message: "Enter name of product: "
      },{
        name: "department",
        message: "Enter a department for this product: "
      },{
        name: "price",
        message: "Enter a price for this product: ",
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if (valid){
            return true;
          }
            return  "Please enter a valid number.";
          }
      },{
        name: "stock",
        message: "Please enter a stock quantity for this product: ",
        validate: function(value){
          var valid = value.match(/^[0-9]+$/)
          if (valid){
            return true;
          }
            return  "Please enter a valid number.";
          }
      }]).then(function(answer){
        mysql.insertNewProduct( answer.product, answer.department, answer.price, answer.stock, newAction);
        console.log('Product Added');
        console.log( "" );
      })

    }

  })

}

function newAction(){
  inquirer.prompt([{
    type: "confirm",
    name: "confirm",
    message: "Would you like to do anything else?"
  }]).then( function( answer ){
    if ( answer.confirm ){
      managerActions();
    }
    else{
      console.log( "" );
      console.log("----------------------------------------------------------------------");
      console.log("                                                                      ");
      console.log("                    Thank you for managing Bamazon                    ");
      console.log("                                                                      ");
      console.log("----------------------------------------------------------------------");
      process.exit(0);
    }
  })
}
managerActions();
