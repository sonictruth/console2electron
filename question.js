'use strict';


process.stdout.isTTY = true;
process.env.COLORTERM =  true;
process.env.TERM = 'xterm';

// Let's try inquirerer

var inquirer = require('inquirer');

var yosay = require('yosay');

console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));


inquirer.prompt([
  {
    type: 'checkbox',
    message: 'Select toppings',
    name: 'toppings',
    choices: [
      new inquirer.Separator(' = The Meats = '),
      {
        name: 'Peperonni'
      },
      {
        name: 'Ham'
      },
      {
        name: 'Ground Meat'
      },
      {
        name: 'Bacon'
      },
      new inquirer.Separator(' = The Cheeses = '),
      {
        name: 'Mozzarella',
        checked: true
      },
      {
        name: 'Cheddar'
      },
      {
        name: 'Parmesan'
      },
      new inquirer.Separator(' = The usual ='),
      {
        name: 'Mushroom'
      },
      {
        name: 'Tomato'
      },
      new inquirer.Separator(' = The extras = '),
      {
        name: 'Pineapple'
      },
      {
        name: 'Olives',
        disabled: 'out of stock'
      },
      {
        name: 'Extra cheese'
      }
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topping.';
      }
      return true;
    }
  }
], function (answers) {
  console.log(JSON.stringify(answers, null, '  '));
  process.exit();
});