#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.italic.blue.underline("\n\t Welcome to CountDown Timer \n"));
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: (chalk.bold.italic.green("Please enter the amount of second")),
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter invalid number";
        }
        else if (input > 60) {
            return "Seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timDiff = differenceInSeconds(intervalTime, currentTime);
        if (timDiff <= 0) {
            console.log(chalk.bold.italic.yellow('Time has expired'));
            process.exit();
        }
        const min = Math.floor((timDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
