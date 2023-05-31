let nav = document.querySelectorAll("#nav > *");
let page = document.querySelector("#page");
let pagescript;

import("../../page/Home.js").then((module)=>{
    pagescript = module.pagescript;
    pagescript.init();
});

function pages(pageName,option){
    var c_option = "";
    if(option != undefined){
        var j = 0;
        for(var i in option){
            if(j == 0){
                c_option = c_option+"?"+i+"="+option[i];
            }else{
                c_option = c_option+"&"+i+"="+option[i];
            }
            j++; 
        }
    }
    fetch("./page/"+pageName+".php"+c_option).then(function (response) {
        if(response.status == 404){
            return "<style>h1{width: 99vw;padding: 0;margin: 0;text-align: center;}</style><h1>En cour de rédaction</h1>";
        }else {
            return response.text();
        }
    }).then((html) => {
        
        document.getElementById("page").innerHTML = html;
        import("../../page/"+pageName+".js").then((module)=>{
            pagescript = module.pagescript;
            pagescript.init();
        });
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
        document.getElementById("page").innerHTML = "";
    });
}

nav.forEach(element => {
    element.addEventListener("click",(e)=>{
        if(e.target.dataset.page){
            pages(e.target.dataset.page);
            document.querySelector("#nav").classList.remove("actif");
        }
    },false);
});

// for mobile

let fixElement = document.createElement('link');
fixElement.id = "navfix";
fixElement.rel = 'stylesheet';
let cssContent = '#nav { top: ' + (window.innerHeight - 60) + 'px; } @media screen and (max-width: 550px){ #nav.actif { top: ' + (window.innerHeight - 250) + 'px; }}';
let blob = new Blob([cssContent], { type: 'text/css' });
let url = URL.createObjectURL(blob);
fixElement.href = url;
document.head.appendChild(fixElement);
window.addEventListener("resize", ()=>{
    let fixElement = document.querySelector("#navfix");
    fixElement.id = "navfix";
    fixElement.rel = 'stylesheet';
    let cssContent = '#nav { top: ' + (window.innerHeight - 60) + 'px; } #nav.actif { top: ' + (window.innerHeight - 250) + 'px; }';
    let blob = new Blob([cssContent], { type: 'text/css' });
    let url = URL.createObjectURL(blob);
    fixElement.href = url;
});
document.querySelector("#nav").addEventListener("click",(e)=>{
    e.target.classList.toggle("actif");
},false)