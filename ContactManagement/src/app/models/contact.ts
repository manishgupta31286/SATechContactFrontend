export class Contact {
    id: number | 0;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;

    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
