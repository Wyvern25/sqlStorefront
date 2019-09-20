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

function menu() {
    inquirer
        .prompt([{
            type: "list",
            message: "what do you want to do?",
            choices: ["Show all Products", "View low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "choice"
        }
        ])
        .then(function (resp) {
            switch (resp.choice) {
                case "Show all Products":
                    inventory();
                    break;
                case "View low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    console.log('End Session');
                    connection.end();
                    break;
            }

        });
}

menu();

function repeat() {
    console.log();
    inquirer
        .prompt([{
            type: "list",
            message: "Back to menu? ",
            choices: ["Main Menu", "End"],
            name: "choice"
        }
        ])
        .then(function (resp) {
            if (resp.choice == 'Main Menu') {
                menu();
            }
            else { connection.end(); }



        });
}

function lowInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What inventory value would you like to check?",
                name: "item"
            },
        ])
        .then(function (resp) {




            connection.query('SELECT * FROM products_db WHERE stock_quantity <= ?', [resp.item], function (error, results, fields) {
                if (error) throw error;
                console.log('---------')
                console.log('---------')
                console.log('-----Inventory ' + resp.item + ' or lower----')
                for (var i = 0; i < results.length; i++) {
                    console.log('Name: ' + results[i].product_name + ' Stock: ' + results[i].stock_quantity);
                }
                console.log('---------')

            });
            repeat();

        });
}

function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "To add inventory, enter name and amount separated by a comma",
                name: "item"
            },
        ])
        .then(function (resp) {
            var respArray = resp.item.split(',');

            if ((respArray[0] === undefined) || (respArray[1] === undefined)) {
                console.log('Not a proper format');
                addInventory();
            } else {
                connection.query('UPDATE products_db SET stock_quantity = ? WHERE product_name = ?', [respArray[1], respArray[0]], function (error, results, fields) {
                    if (error) throw error;
                    console.log('---------')
                    console.log('---------')
                    console.log('-----Inventory of ' + respArray[0] + ' updated to ' + respArray[1] + '----')
                    console.log('---------')

                });
                repeat();
            }
        });
}


function inventory() {

    connection.query('SELECT * FROM products_db', function (error, results, fields) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log('ID# ' + results[i].item_id + ' Name: ' + results[i].product_name + ' Dept: ' + results[i].department_name + ' Stock: ' + results[i].stock_quantity + ' Price: $' + results[i].price);
        }
    });
    repeat();
}


function addProduct() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter values separated by commas. Name, Dept, Stock, Price?",
                name: "item"
            },
        ])
        .then(function (resp) {
            var values = resp.item.split(',');
            if ((values[0] === undefined) || (values[1] === undefined) || (values[2] === undefined) || (values[3] === undefined)) {
                console.log('Not a valid format');
                addProduct();
            }
            else {
                values[2] = parseInt(values[2]);
                values[3] = parseFloat(values[3]);
                // console.log(values);
                connection.query('INSERT INTO products_db (product_name, department_name, stock_quantity, price) VALUES (?, ?, ?, ?)', [values[0], values[1], values[2], values[3]], function (error, results, fields) {
                    if (error) throw error;
                    console.log('');
                    console.log('---------');
                    console.log(values[0] + ' successfully added to inventory');
                    console.log('---------');



                });


                repeat();
            }
        });
}

