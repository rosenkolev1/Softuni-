import commonHandler from './commonController.js';
import {homeHandler} from './articleController.js';
import {loginHandler} from './loginRegisterLogoutController.js';

export default async function homeViewHandler(){
    this.isLogged = !!sessionStorage.getItem('token');
    await commonHandler.call(this);
    if(this.isLogged === true){
        await homeHandler.call(this);
    }
    else{
        await loginHandler.call(this);
    }
}