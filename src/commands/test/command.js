const main = commander => {
    commander
        .command('test')
        .description('Run the tests')
        .action(() => {});
};

export default main;
