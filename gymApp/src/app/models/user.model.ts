export interface IUser {
    firstName: string,
    lastName: string,
    displayName: string,
    email: string,
    password: string,
    location?: {
        country: string,
        state: string,
    }
}