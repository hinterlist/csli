const main = commander => {
    commander
        .command('check')
        .description(
            "Analyze the current project and report errors, but don't compile contracts",
        )
        .action(() => {});
};

export default main;
