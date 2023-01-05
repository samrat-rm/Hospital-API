class CustomAPIError extends Error {
    // Error is Express's default class
    constructor(message) {
        super(message);
    }
}

module.exports = CustomAPIError;
