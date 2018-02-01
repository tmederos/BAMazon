var mysql = require("./mySQL.js");
var inquirer = require("inquirer");


function supervisorActions(){
  inquirer.prompt([{
    name: "input",
    type: "list",
    message: "What would you like to do? ",
    choices: ["1) View Product Sales by Department", "2) Create New Department"]
  }]).then( function(answer){
    if (answer.input === "1) View Product Sales by Department"){
      mysql.getDepartments(newAction);
    }
    else {
      inquirer.prompt([{
        name: "department",
        message: "Enter the department name: "
      },{
        name: "overhead",
        message: "Enter the overhead costs: ",
        validate: function(value){
        var valid = value.match(/^[0-9]+$/)
        if (valid){
          return true;
        }
          return  "Please enter a valid number.";
        }
      }]).then( function(answer){
        mysql.insertDepartment( answer.department, answer.overhead, newAction );
      })
    }
  })
};

function newAction(){
  inquirer.prompt([{
    type: "confirm",
    name: "confirm",
    message: "Would you like to do anything else?"
  }]).then( function( answer ){
    if ( answer.confirm ){
      supervisorActions();
    }
    else{
      console.log( "" );
      console.log("----------------------------------------------------------------------");
      console.log("                                                                      ");
      console.log("                    Thank you for supervising Bamazon                 ");
      console.log("                                                                      ");
      console.log("----------------------------------------------------------------------");
      process.exit(0);
    }
  })
}
supervisorActions();
