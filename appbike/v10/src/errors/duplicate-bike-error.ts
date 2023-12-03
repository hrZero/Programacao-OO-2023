export class DuplicateBikeError extends Error {
    public readonly name = "DuplicateBikeError"

    constructor() {
        super("Duplicate bike.")
    }
}