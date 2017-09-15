import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SignupPage } from '../signup/signup';
interface ValidationResult {
    [key: string]: boolean;
}

export class CustomValidators {

    public static checkEmailValidator(control: FormGroup): ValidationResult {
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        
        if (!regExp.test(control.value)) {
            return { checkEmailValidator: true };
        }
        return null;
    }
    public static checkPwdValidator(control: FormGroup): ValidationResult {
        var valid = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(control.value);
        if (!valid) {
            return { checkPwdValidator: true };
        }
        return null;
    }

    public static checkPhoneValidator(control: FormGroup): ValidationResult {
        // console.log("phone number " + control.value);
        var valid = /^\d{3}\d{3,4}\d{4}$/.test(control.value);
        if (!valid) {
            return { checkPhoneValidator: true };
        }
        return null;
    }

    //비밀번호 재입력 확인
    public static checkPasswordsMatch(group: FormGroup) {

        let firstPassword = group.controls['user_password'].value;
        let secondPassword = group.controls['user_re_password'].value;
        if ((firstPassword && secondPassword) && (firstPassword != secondPassword)) {
            //다를경우
            group.controls['user_re_password'].setErrors({ "pw_mismatch": true });
            return { "pw_mismatch": true };
        } else {
            return null;
        }
    }

}