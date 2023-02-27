
// api call data to fetch
const loadData = async(phone ,datalimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`
    const res = await fetch(url)
    const data = await res.json()
    singleData(data.data ,datalimit);
}
// loadData("iPhone")


const singleData = (phones,datalimit)=>{
    const phoneContainer = document.getElementById("phoneContainer");
    phoneContainer.innerHTML = ""

    // show more btn
    const showMoreBtn = document.getElementById("showMoreBtn");
    if( datalimit &&  phones.length > 6){
       phones =  phones.slice(0,6);
       showMoreBtn.classList.remove("d-none")
    }
    else{
       showMoreBtn.classList.add("d-none")
    }
    
    // search result condition
     const searchResult = document.getElementById("searchResult")
     if(phones.length === 0){
        searchResult.classList.remove("d-none")
     }else{
        searchResult.classList.add("d-none")
     }


    //  phone cards
    phones.forEach((phone)=>{
    console.log(phone);
    const {brand ,image ,slug} = phone
     const myDiv = document.createElement("col")
     myDiv.innerHTML = `
     
     <div class="card h-100 p-3">
     <img src="${image}" class="card-img-top h-75 " alt="...">
     <div class="card-body">
       <h5 class="card-title">${brand}</h5>
       <p class="card-text">${slug}</p>
       <button onclick="singlePhoneDetails('${slug}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      details
      </button>
     </div>
      </div>
     `
     
     phoneContainer.appendChild(myDiv);
    })

    spinner(false)
}

function procesSearch(datalimit){
    const inputFeild = document.getElementById("inputFeild")
    const inputFeildValu = inputFeild.value
    loadData(inputFeildValu,datalimit)
    spinner(true)
}
// sourch product btn
function searchBtn(){
   procesSearch(10)
}

// press enter

document.querySelector('#inputFeild').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procesSearch(10)
    }
});

// morePhoneBtn

const morePhoneBtn = document.getElementById("morePhoneBtn")
.addEventListener("click",function(){
    procesSearch()
})





// spiner
const spinner = (isSpiner)=>{
    const spinner = document.getElementById("spinner");
    if(isSpiner){
      spinner.classList.remove("d-none")
    }else{
        spinner.classList.add("d-none")
    }
}


const singlePhoneDetails=(id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(response=> response.json())
  .then(data=> singlePhoneDetailsDisplay(data.data))
}


function singlePhoneDetailsDisplay(getData){
  console.log(getData.mainFeatures.chipSet
    );
 const modalBody = document.getElementById("modalBody");
  const modalTitla = document.getElementById("modalTitla");
  modalTitla.innerText =getData.brand
 modalBody.innerHTML = `

  <h3>name:${getData.name}</h3>
  <img src="${getData.image}" alt="" class="image-fluid">
  <p>${getData.mainFeatures.chipSet}</p>
  <p>${getData.mainFeatures.memory}</p>
 `

}






