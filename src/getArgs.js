const {
    parseAmount,
    parseAddress,
    parsePrivateKey,
    wrapWithCustomError,
} = require("./parsers");
const { program, InvalidArgumentError } = require("commander");

function getArgs() {
    program
        .requiredOption(
            "-p, --private_key <string>",
            "Sender private key",
            wrapWithCustomError(parsePrivateKey, InvalidArgumentError)
        )
        .requiredOption(
            "-r, --receiver <string>",
            "Receiver public key",
            wrapWithCustomError(parseAddress, InvalidArgumentError)
        )
        .requiredOption(
            "-a, --amount <number>",
            "Transaction amount",
            wrapWithCustomError(parseAmount, InvalidArgumentError)
        );

    program.parse();

    return program.opts();
}

module.exports = getArgs;
