import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";



const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword }= formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField)
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
    
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const {user } = await createAuthUserWithEmailAndPassword(email, password);
             await createUserDocumentFromAuth(user, {displayName})
             resetFormField();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else {
                console.log('user creation encountered an error', error)
            }
            
        }
    }
    
    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
        
    }
    return(
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label >Display Name</label>
                <input required type="text" name="displayName" onChange={handleChange} value={displayName}/>

                <label >Email</label>
                <input required type="email" name="email" onChange={handleChange} value={email}/>

                <label >Password</label>
                <input required type="password" name="password" onChange={handleChange} value={password}/>

                <label >Confirm Password</label>
                <input required type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;