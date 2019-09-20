var mysql = require('mysql');
var inquirer = require("inquirer");
// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'products_db',
    port: 3306
});

connection.connect();

connection.query('SELECT * FROM products_db', function (error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        console.log('ID# ' + results[i].item_id + ' Name: ' + results[i].product_name + ' Dept: ' + results[i].department_name + ' Stock: ' + results[i].stock_quantity + ' Price: $' + results[i].price);
    }
});

prompter();

function prompter() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please select an item id followed by a space and quantity of item as an integer",
                name: "item"
            },
        ])
        .then(function (resp) {

            //console.log(JSON.stringify(resp));
            var choices = resp.item.split(" ");
            choices[0] = parseInt(choices[0]);
            choices[1] = parseInt(choices[1]);


            stockCheck(choices[0], choices[1]);


        });
}

function stockCheck(id, qty) {
    connection.query('SELECT * FROM products_db Where item_id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('---------')
        //console.log(results);
        //console.log(results[0].stock_quantity);
        if (results[0].stock_quantity < qty) {
            console.log("Insufficient inventory.  There are " + results[0].stock_quantity + '/' + qty + " available");
            connection.end();
        }
        else { selectItemAndAmount(id, results[0].stock_quantity - qty, qty) }
    });
}

function selectItemAndAmount(id, amount, qty) {
    var cost = 0;
    connection.query('UPDATE products_db SET stock_quantity = ? WHERE item_id = ?', [amount, id], function (error, results, fields) {
        if (error) throw error;
        console.log('---------')
        //console.log('---------')
        //console.log(results);
        //console.log(results);
        //console.log('---------')

    });
    connection.query('SELECT * FROM products_db Where item_id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        console.log('Your order costs ' + '$' + results[0].price * qty);
        console.log('---------');
        console.log('---------');
    });

    connection.end();
}


/*
function whatDoYouWantToDo(){
    inquirer
        .prompt([{
                type: "list",
                message: "Please Select a Product",
                choices: ["show all cars", "show one car", "insert a car", "update a car", "delete a car", "quit"],
                name: "what_to_do"
            }
        ])
        .then(function(resp) {
            switch (resp.what_to_do) {
                case "show all cars":
                    allCars();
                    break;
                case "insert a car":
                    insertCarPrompt();
                    break;
                case "update a car":
                    // code block
                    console.log('do this')
                    break;
                case "delete a car":
                    // code block
                    console.log('do this')
                    break;
                case "quit":
                    console.log('later');
                    connection.end();
                    break;
                default:
                    // code block
                    allCars();
                    break;
            }

        });
}
*/