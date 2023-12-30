import chalk from "chalk"

const info = (...params: any) => {
  console.log(chalk.blue(...params));
};

const success = (...params: any) => {
  console.log(chalk.green(...params));
};

const error = (...params: any) => {
  console.log(chalk.red(...params));
};

export default {
  info,
  error,
  success,
};
