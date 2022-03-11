async function fetchPage(){
    const requestURL = '../pageList.json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const pageList = await response.json();            
    navigate(pageList)
}                
function navigate(pageLists){
    let articlePage = document.querySelector("#article");            
    let errorPage = document.querySelector(".page-not-found");
    let pageList = pageLists.pageList;
    if(pageList.includes(articlePage.value)){     
        console.log(`../${articlePage.value}/index.html`);
        this.location.href=`../${articlePage.value}/index.html`;
    }
    else{
        errorPage.style.display="block";
    }                        
}
async function fetchArticles(){
    const requestURL = '../articleList.json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const articles = await response.json();            
    createArticles(articles)
} 
function createArticles(articles){
    let articleContainer = document.querySelector(".article-list");
    console.log(articles)
    articles.articles.forEach( article => {
        articleContainer.innerHTML+=`
        <section class="section-item">
            <img src="../../img/${article.img}">
            <div>
                <h1>${article.header}</h1>
                <p>${article.content}</p>
            </div>
            <p class="date-item">${article.date}</p>
        </section>
        `
    });
}
function submitForm(){
    let userName = document.querySelector("#user-name");
    let comment = document.querySelector("#comment-section");
    let commentContainer = document.querySelector(".comment-article");
    let commentSection="";            
    if(userName.value=="" || comment.value==""){                
        if(userName.value==""){
            userName.style.backgroundColor ="red";
            userName.placeholder = "required";
        }                    
        if(comment.value==""){comment.style.backgroundColor ="red";}
    }
    else{
        userName.style.backgroundColor ="white";
        comment.style.backgroundColor ="white";                
        commentSection =`
        <article class="userComments">
            <strong>${userName.value}</strong>
            <p><i>“${comment.value}”</i></p>
        </article>
        `;
        commentContainer.innerHTML+=commentSection;
        userName.value="";
        comment.value="";
    }  
}

function openNav() {
    let side = document.querySelector(".sideContent");
    let arrow = document.querySelector(".arrow");    
    if(!side.classList.contains("open")){
        side.style.width = "50%";
        side.style.padding = "5%";
        side.classList.add("open");
        side.classList.remove("close");

        arrow.classList.remove("right");
        arrow.classList.add("left");
    }
    else{
        side.style.width = "0%";
        side.style.padding = "5% 0";
        side.classList.remove("open");
        side.classList.add("close");

        arrow.classList.add("right");
        arrow.classList.remove("left");
    }
  }