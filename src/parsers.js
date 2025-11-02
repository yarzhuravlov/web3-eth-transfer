const ethers = require("ethers");

function parseAmount(value) {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        throw new Error("Not a number");
    }

    if (parsedValue <= 0) {
        throw new Error("Amount should be greater than 0");
    }

    return parsedValue;
}

function parseAddress(value) {
    if (!ethers.isAddress(value)) {
        throw new Error("Not a valid address");
    }
    return value;
}

function parsePrivateKey(value) {
    if (!/^[0-9a-fA-F]{64}$/.test(value)) {
        throw new Error("Invalid private key format");
    }

    return value;
}

function wrapWithCustomError(parser, errorToRaise) {
    return (value) => {
        try {
            const parsed = parser(value);
            return parsed;
        } catch (error) {
            throw new errorToRaise(error.message);
        }
    };
}

module.exports = {
    parseAmount,
    parseAddress,
    parsePrivateKey,
    wrapWithCustomError,
};
