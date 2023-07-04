import { panda } from "https://pandatown.fr/lib/pandalib.php";
let pagescript = {
    init:function(){
        document.querySelector("#sendcontact").addEventListener("click",this.send);
    },
    send:function(e){
        let name = document.querySelector(".contact #name");
        let email = document.querySelector(".contact #email");
        let phone = document.querySelector(".contact #phone");
        let desc = document.querySelector(".contact #description");
        
        let dialog = document.getElementById('dialog-rounded')
        let error = false;
        dialog.querySelector(".title").innerHTML = "ERREUR";
        dialog.querySelector("p").innerHTML = "Vous devez remplire.<br>";
        if(name.value == ""){
            name.classList.add("is-error");
            error = true;
            dialog.querySelector("p").innerHTML += "-le nom<br>";
        }else{
            name.classList.remove("is-error");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.value == ""){
            email.classList.add("is-error");
            dialog.querySelector("p").innerHTML += "-l'email<br>";
            error = true;
        }else{
            if(emailRegex.test(email.value)){
                email.classList.remove("is-error");
            }else{
                email.classList.add("is-error");
                dialog.querySelector("p").innerHTML += "-l'email valide<br>";
                error = true;
            }
        }
        if(phone.value == ""){
            dialog.querySelector("p").innerHTML += "-le numero de telephone<br>";
            phone.classList.add("is-error");
            error = true;
        }else{
            phone.classList.remove("is-error");
        }
        if(desc.value == "" || desc.value.length < 50){
            desc.classList.add("is-error");
            dialog.querySelector("p").innerHTML += "-description d'au moin 50 caractere<br>";
            error = true;
        }else{
            desc.classList.remove("is-error");
        }
        if(error){
            dialog.showModal();
        }else{
            let message = "nom:"+name.value+" \r\n email: "+email.value+" \r\n Numero: "+phone.value+" \r\n Déscription \r\n "+desc.value;
            pagescript.sendEmail(message,email.value);
        }
    },
    sendEmail:async function(intmessage,mail){
        const data = {
            to: 'jordan@pandatown.fr',
            from: 'abuse@pandatown.fr',
            subject: 'portfolio',
            reply:mail,
            message: intmessage
        };
      
        try {
          const response = await fetch('./sendmail.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            let dialog = document.getElementById('dialog-rounded');
            dialog.querySelector(".title").innerHTML = "Mail";
            dialog.querySelector("p").innerHTML = result.message;
            dialog.showModal();
          } else {
            console.log('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
          }
        } catch (error) {
          console.log('Une erreur s\'est produite lors de l\'envoi de l\'e-mail:', error);
        }
      }
}
export { pagescript };