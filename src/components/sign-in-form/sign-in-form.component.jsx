import { useState } from "react";
import { createAuthUserWithEmailAndPassword, 
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword,
        signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password }= formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();      
             
    };

    const resetFormField = () => {
        setFormFields(defaultFormField)
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
    

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
             resetFormField();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('wrong password for email');
                    break;
                case 'auth/user-not-found':
                    alert('wrong email');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    
    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
        
    }
    return(
        <div className="sign-in-container">
            <h2>Aleady have and Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                

                <FormInput label="Email" required type="email" name="email" onChange={handleChange} value={email}/>

                <FormInput label="Password" required type="password" name="password" onChange={handleChange} value={password}/>

                <div className="buttons-container">
                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
                <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </div>
               
            </form>
        </div>
    );
}

export default SignInForm;