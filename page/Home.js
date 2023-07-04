import { panda } from "https://pandatown.fr/lib/pandalib.php";
let pagescript = {
    init:function(){
        let hi = document.querySelector("#page h3.word");
        panda.util.word.multiple(hi,hi.dataset.text.split("|"),200);
        document.querySelectorAll("#page > p.word,div.word").forEach(element => {
            panda.util.word.simple(element,element.innerHTML,50)
        });        
        
    }
}
export { pagescript };