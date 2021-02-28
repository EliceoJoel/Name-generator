
document.getElementById("form-names").addEventListener('submit', loadNames);

//Call AJAX and print results
function loadNames(e){
   e.preventDefault();
   //read the variables
   const origin = document.getElementById("origin");
   const selectedOrigin = origin.options[origin.selectedIndex].value;
   const gender = document.getElementById('gender');
   const selectedGender = gender.options[gender.selectedIndex].value;
   const amount = document.getElementById("names-to-generate").value;

   let endPoint = '';
   endPoint += "https://randomuser.me/api/?inc=name";
   
   if(selectedOrigin !== ''){
      endPoint += `&nat=${selectedOrigin}`;
   }

   if(selectedGender !== ''){
      endPoint += `&gender=${selectedGender}`;
   }

   if(amount !== ''){
      endPoint += `&results=${amount}`;
   }

   conectAjax(endPoint);
}

function conectAjax(url){
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onload = function(){
      if(this.status === 200){
         const names = JSON.parse(this.responseText).results;
         let namesHtml = `<h3>Names generated</h3>
                          <div class="grid-container-names">`;
         names.forEach(element => {
            if(element.name.title === "Mr"){
               namesHtml += `
               <div class="grid-item-name">
                  <img class="image-name" src="img/boy.svg" alt="girl">
                  <p class="name">${element.name.first}</p>
               </div>`
            }else{
               namesHtml += `
               <div class="grid-item-name">
                  <img class="image-name" src="img/girl.svg" alt="girl">
                  <p class="name">${element.name.first}</p>
               </div>`
            }
         });
         namesHtml += `</div>`;
         document.querySelector('.down').innerHTML = namesHtml;
      }
   }
   xhr.send();
}