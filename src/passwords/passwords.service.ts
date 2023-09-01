// passwords.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as PasswordValidator from 'password-validator';
import { ValidationResult } from './passwords.types';


@Injectable()
export class PasswordsService {

    public getPasswordSchema(): PasswordValidator {
        const schema = new PasswordValidator();
        schema
            .is().min(8)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().not().spaces()
            // ... add more rules as needed
        ;
        return schema;
    }

    public validatePassword(password: string): ValidationResult {
        const schema = this.getPasswordSchema();
        const validationResult = schema.validate(password, { list: true });
    
        if (typeof validationResult === 'boolean' && validationResult) {
            return { isValid: true };
        } else if (Array.isArray(validationResult) && validationResult.length === 0) {
            return { isValid: true };
        } else if (Array.isArray(validationResult)) {
            return { isValid: false, errors: validationResult };
        }
    
        throw new Error('Unexpected validation result');
    }   
    
    public async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    
}
