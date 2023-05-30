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
            pages(e.target.dataset.page)
        }
    },false);
});

// for mobile
document.querySelector("#nav").addEventListener("click",(e)=>{
    e.target.classList.toggle("actif");
},false)