export class UserLoginVM{
    username: string;
    password: string;

    constructor(_username: string, _password: string){
        this.username = _username;
        this.password = _password;
    }
}