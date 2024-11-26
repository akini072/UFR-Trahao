export interface Credentials {
    sub: string,
    name: string,
    profile: 'Customer' | 'Employee',
    exp: number
}
