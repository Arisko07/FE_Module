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