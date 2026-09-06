 let displayName = document.getElementById("name") 
 let changeButton = document.getElementById("changeButton");
 let logButton = document.getElementById("logButton");

 changeButton.addEventListener("click" , () => {
   displayName.textContent = "The text has been changed";
 }
 )



  logButton.addEventListener("click", () => {
    console.log("Hello from Menna")
  });