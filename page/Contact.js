import { panda } from "https://pandatown.fr/project/memory/pandalib.js";
let pagescript = {
    init:function(){
        document.querySelector("#sendcontact").addEventListener("click",this.send);
    },
    send:function(e){
        let name = document.querySelector(".contact #name");
        let email = document.querySelector(".contact #email");
        let phone = document.querySelector(".contact #phone");
        let desc = document.querySelector(".contact #description");
        if(name.value == ""){
            name.classList.add("is-error");
        }else{
            name.classList.remove("is-error");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email.value == ""){
            email.classList.add("is-error");
        }else{
            if(emailRegex.test(email.value)){
                email.classList.remove("is-error");
            }else{
                email.classList.add("is-error");
            }
        }
        if(phone.value == ""){
            phone.classList.add("is-error");
        }else{
            phone.classList.remove("is-error");
        }
        if(desc.value == "" || desc.value.length < 50){
            desc.classList.add("is-error");
        }else{
            desc.classList.remove("is-error");
        }
    }
}
export { pagescript };