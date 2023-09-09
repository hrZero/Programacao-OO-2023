export class User {
    static id: string;
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string
    ) {}
}