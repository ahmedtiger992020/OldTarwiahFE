export class UserVM{
    id: number;
    email: string;
    phoneNumber: string;
    userName: string;
    role: string;
    roleId: number;

    constructor(_id: number, _email: string, _phoneNumber: string, _userName: string, _role: string, _roleId: number){
        this.id = _id;
        this.email = _email;
        this.phoneNumber = _phoneNumber;
        this.userName = _userName;
        this.role = _role;
        this.roleId = _roleId;
    }
}