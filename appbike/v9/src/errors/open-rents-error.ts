export class OpenRentsError extends Error {
    public readonly name = "OpenRentsError"

    constructor() {
        super("This user cannot be removed because it have open rents.")
    }
}