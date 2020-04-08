import commonHandler from './commonController.js';
import { requester } from '../app-service.js';
import {createFormEntity} from '../form-helpers.js';
export function filterArticlesByCategory(allArticles, category){
    let articlesFiltered = Object.keys(allArticles).reduce((acc, x)=>{
        if(allArticles[x].category === category) {
            let article = allArticles[x];
            let articleData = {
                articleId: x,
                title: article.title,
                category: article.category,
                content: article.content,
                creatorName: article.creatorName,
                creatorUID: article.creatorUID,
            }
            acc.push(articleData);
        }
        return acc;
    },[]) || [];
    return articlesFiltered;
}

export async function homeHandler(){
    await commonHandler.call(this);
    let allArticles = await requester.articles.getAll() || {};
    let simpleSortFunc = (a, b)=>{
        if(a.title > b.title) return 1;
        else if(a.title < b.title) return -1;
        else return 0;
    };
    //Javascript
    this.javascriptArticles = filterArticlesByCategory(allArticles, 'Javascript');
    this.javascriptArticles = this.javascriptArticles.sort(simpleSortFunc);
    this.anyJavascriptArticles = this.javascriptArticles.length > 0;

    //CSharp
    this.CSharpArticles = filterArticlesByCategory(allArticles, 'CSharp');
    this.CSharpArticles = this.CSharpArticles.sort(simpleSortFunc);
    this.anyCSharpArticles = this.CSharpArticles.length > 0;

    //Java
    this.javaArticles = filterArticlesByCategory(allArticles, 'Java');
    this.javaArticles = this.javaArticles.sort(simpleSortFunc);
    this.anyJavaArticles = this.javaArticles.length > 0;

    //Python
    this.pythonArticles = filterArticlesByCategory(allArticles, 'Python');
    this.pythonArticles = this.pythonArticles.sort(simpleSortFunc);
    this.anyPythonArticles = this.pythonArticles.length > 0;

    await this.partial('templates/home.hbs');
}

export function validateCategory(formData){
    if(formData.category !== 'Javascript' && 
    formData.category !== 'CSharp' &&
    formData.category !== 'C#' &&
    formData.category !== 'Java' && 
    formData.category !== 'Python'
    ){
        alert('TODO error. Category is incorrect. Must be "Javascript", "CSharp", "C#", "Java", "Python"');
        return false;
    }
    if(formData.category === 'C#') formData.category = 'CSharp';
    return true;
}
export async function createHandler(){
    await commonHandler.call(this);
    await this.partial('templates/create.hbs');
    
    let formRef = document.querySelector('form');

    formRef.addEventListener('submit',async (e)=>{
        e.preventDefault();
        e.stopPropagation();

        let formController = createFormEntity(formRef,['title', 'category', 'content']);
        let formData = formController.getValue();
        
        if(validateCategory(formData) === false) return;

        formData.creatorUID = sessionStorage.getItem('uid');
        formData.creatorName = sessionStorage.getItem('username'); 
        await requester.articles.createEntity(formData);

        this.redirect('#/home');
    })
}

export async function detailsHandler(){
    await commonHandler.call(this);
    let articleId = this.params.articleId;
    let articleInfo = await requester.articles.getById(articleId);
    Object.keys(articleInfo).forEach(x =>{
        this[x] = articleInfo[x];
    })
    this.articleId = articleId;
    this.isCreator = articleInfo.creatorUID === sessionStorage.getItem('uid');
    await this.partial('templates/details.hbs', articleInfo);
 
    if(this.isCreator === true){
        let deleteBtn = document.querySelector('[class="btn delete"]');
        deleteBtn.addEventListener('click', async (e)=>{
            e.preventDefault();
            e.stopPropagation();
            await requester.articles.deleteEntity(articleId);
            this.redirect('#/home');
        })
    }
}

export async function editHandler(){
    await commonHandler.call(this);
    let articleId = this.params.articleId;
    let existingArticleInfo = await requester.articles.getById(articleId);
    await this.partial('templates/edit.hbs');

    let formRef = document.querySelector('form');
    let formController = createFormEntity(formRef,['title', 'category', 'content']);
    formController.setValue({title: existingArticleInfo.title, category: existingArticleInfo.category, content: existingArticleInfo.content});

    formRef.addEventListener('submit', async (e)=>{
        e.preventDefault();
        e.stopPropagation();

        let formData = formController.getValue();
        if(validateCategory(formData) === false) return;

        await requester.articles.patchEntity(formData, articleId);
        this.redirect('#/home');
    })
}
