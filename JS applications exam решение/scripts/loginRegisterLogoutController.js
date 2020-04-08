import commonHandler from './commonController.js';
import { requester } from '../app-service.js';
import {createFormEntity} from '../form-helpers.js';

export async function loginHandler(){
    await commonHandler.call(this);
	//Implement partials here if needed----
	
	//----
    await this.partial('templates/login.hbs');
    let formRef = document.querySelector('form');

    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let formController = createFormEntity(formRef, ['email', 'password']);
        let formData = formController.getValue();
        let userUID;
        try{
            userUID = await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).catch(err=>{
                throw err;
            });
        }catch(err){
            //TODO: add error message
            alert("Invalid credentials. User with same email and password doesn' exist");
            return;
        }
        sessionStorage.setItem('username', formData.email);
        sessionStorage.setItem('uid', userUID.user.uid);
        let userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('token', userToken);
        requester.setAuthToken(userToken);
        this.redirect('#/home');
    })
}

export async function registerHandler(){
    await commonHandler.call(this);
	//Implement partials here if needed----
	
	//----
    await this.partial('templates/register.hbs');

    let formRef = document.querySelector('form');

    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let formController = createFormEntity(formRef, ['email', 'password', 'rep-pass']);
        let formData = formController.getValue();
        if(formData.password !== formData['rep-pass']){
            //TODO: add error message
            alert('password dont match');
            return;
        }
        let userUID;
        try{
            userUID = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).catch(err=>{
                throw err;
            });
        }catch(err){
            //TODO: add error message
            alert('Invalid credentials. User with same email already exists or email or password are not in correct format');
            return;
        }
        sessionStorage.setItem('username', formData.email);
        sessionStorage.setItem('uid', userUID.user.uid);
        let userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('token', userToken);
        requester.setAuthToken(userToken);
        this.redirect('#/home');
    })
}

export async function logOutHandler(){
    await firebase.auth().signOut();
    sessionStorage.clear();
    this.redirect('#/login');
}