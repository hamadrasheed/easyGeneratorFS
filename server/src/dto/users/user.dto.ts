import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/utils/passwordValidator';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    public name: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}
