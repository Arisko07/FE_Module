const articleListContainer = '../json/articleList.json';

async function fetchArticles(){
    const request = new Request(articleListContainer);
    const response = await fetch(request);
    const articles = await response.json();            
    createArticles(articles)
} 
function createArticles(articles){
    let articleContainer = document.querySelector(".article-list");    
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