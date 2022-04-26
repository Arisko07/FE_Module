const nationContainer = '../json/majorNation.json'

async function fetchNations(){
    const request = new Request(nationContainer);
    const response = await fetch(request);
    const nations = await response.json();            
    createNation(nations)
}
function createNation(nations){
    let nationContainer = document.querySelector(".nation-list");
    console.log(nations);
    nations.majorNation.forEach( nation => {
        nationContainer.innerHTML +=`
        <div class="nation">
            <div class="emblem"><img src="../../img/${nation.nation[0]}"><h1>${nation.nation[1]}</h1></div>
            <div class="element"><img src="../../img/${nation.element[0]}"><h1>${nation.element[1]}</h1></div>
            <div class="archon">${nation.archon}</div>
            <div class="ideal">${nation.ideal}</div>
            <div class="government">${nation.government}</div>
        </div>
        `
    })
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