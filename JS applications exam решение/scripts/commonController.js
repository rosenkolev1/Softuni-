export default async function commonHandler(){
	this.partials = {};
	// Implement partials here //DO NOT FORGET TO PUT AWAIT BEFORE THE LOADING OF PARTIALS. PLEASE DONT SPEND ANOTHER 30 MINUTES TRYING TO FIGURE OUT THE ERROR YOU GET BY MISSING THIS LIKE YESTERDAY
    //IT GIVE A FUCKING "cannot call toString() of null" IN THE FUCKING SAMMY-HANDLEBARS PLUGIN AND DOESNT GIVE ANY USEFUL INFO ABOUT HOW TO FIX IT.
    this.partials.navBar = await this.load('templates/navBar.hbs');
    this.partials.footer = await this.load('templates/footer.hbs');
    this.isLogged = !!sessionStorage.getItem('token');
}