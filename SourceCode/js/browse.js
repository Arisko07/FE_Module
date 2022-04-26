const pagelistContainer = '../json/pageList.json';

async function fetchPage(){
    const request = new Request(pagelistContainer);
    const response = await fetch(request);
    const pageList = await response.json();            
    navigate(pageList)
}                
function navigate(pageLists){
    let articlePage = document.querySelector("#article");            
    let errorPage = document.querySelector(".page-not-found");
    errorPage.classList.remove("show");
    let pageList = pageLists.pageList;

    if(pageList.includes(articlePage.value)){
        this.location.href=`../view/${articlePage.value}Page.html`;
    }
    else{
        errorPage.classList.add("show");
    }                        
}