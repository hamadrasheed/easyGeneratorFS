import { Injectable } from '@nestjs/common';
import { User, UserI } from '../../schema/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto, SignInDto } from 'src/dto/users/user.dto';
import * as  bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { generateMessages } from 'src/utils/generateMessage';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    public signUp = async (data: SignUpDto) => {

        try {
            const {
                name,
                email,
                password,
            } = data;
    
            const doesEmailExits: UserI = this.shallowCopy(await this.userModel.findOne({ email: email }));
            
            if (doesEmailExits && Object.keys(doesEmailExits).length) {
                throw generateMessages('EMAIL_EXISTS');
            }

            const bcryptPassword: string = await bcrypt.hash(password, 1);
    
            const newUser = this.shallowCopy(await this.userModel.create(
                {
                    email,
                    name,
                    password: bcryptPassword,
                }
            ));

            const secretKey: string = process.env.JWT_SECRET_KEY;

            const userToken: string = jwt.sign(
                {
                    id: newUser._id,
                },
                secretKey,
                {
                    expiresIn: '24h',
                }
            );

            delete newUser.password;

            const response = {
                ...newUser,
                  token: userToken
            };

            return {
                ...response
            };

        } catch (error) {
            throw error
        }

    }

    public signIn = async (data: SignInDto) => {
        try {

            const {
                email,
                password,
            } = data;

            const signInUser: UserI = this.shallowCopy(await this.userModel.findOne({ email: email }));
            
            if (!signInUser || !Object.keys(signInUser).length) {
                throw generateMessages('EMAIL_NOT_FOUND');
            }
            
            const { password: userPassword } = signInUser;
            
            const bcryptedPassword: boolean = await bcrypt.compare(password, userPassword);

            if (!bcryptedPassword) {
                throw generateMessages('WRONG_PASSWORD');
            }

            const secretKey: string = process.env.JWT_SECRET_KEY;

            const userToken: string = jwt.sign(
                {
                    id: signInUser._id,
                },
                secretKey,
                {
                    expiresIn: '24h',
                }
            );

            delete signInUser.password;

            const response = {
                ...signInUser,
                  token: userToken
            };

            return {
                ...response
            };

        } catch (error) {
            throw error;
        }

    }

  private readonly shallowCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data));



}
