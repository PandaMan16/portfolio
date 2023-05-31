import { panda } from "https://pandatown.fr/project/memory/pandalib.js";

let pagescript = {
    init:function(){
        document.querySelectorAll(".projectlist button").forEach(element => {
            element.addEventListener("click",(e)=>{
                document.querySelector("#project_"+e.target.dataset.id).style.display = "";
                document.querySelectorAll("#project_"+e.target.dataset.id+" .text > *").forEach(element2 => {
                    element2.dataset.innerHTML = element2.innerHTML;
                    panda.util.word.simple(element2,element2.innerHTML,50);
                });
                document.querySelector("#index_project").style.display = "none";
                document.querySelector("#project_"+e.target.dataset.id+" > .back").addEventListener("click",(g) => {
                    document.querySelectorAll("#project_"+e.target.dataset.id+" .text > *").forEach(element2 => {
                        clearInterval(element2.dataset.intervale);
                        element2.innerHTML = element2.dataset.innerHTML;
                    });
                    document.querySelector("#project_"+e.target.dataset.id).style.display = "none";
                    document.querySelector("#index_project").style.display = "";
                });
                
            },false);
        });
    }
}
export { pagescript };