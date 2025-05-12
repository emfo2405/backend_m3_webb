//När sidan laddas körs funktionen för att skapa en lista över inlägg i databasen
onload = postExperience;

//Funktion för att visa information från databasen
async function postExperience() {
    //Hämtar in list-element från HTML
    let cvList = document.getElementById("cv");

    //Tömmer listan så det inte blir dubbletter
    cvList.innerHTML="";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('http://localhost:3000/jobexperiences', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.log(data);

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    data.forEach(input => {
        //Skapar ett li-element
        let li = document.createElement("li");
        li.innerHTML = `<h3 id="post-h3"> ${input.companyName} -  ${input.jobTitle}</h3> <br>  ${input.place}, (${input.startDate.split("T")[0]} - ${input.endDate.split("T")[0]}) <br> ${input.jobDescription}`

        //Skapar en radera-knapp så man kan radera inlägg
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Radera";
        deleteButton.id = "delete-button";
        let dataId = input._id;

        //Vid klick på knappen körs funktionen deletePost
        deleteButton.onclick = () => deletePost(dataId);

        //Lägger till li-element och radera-knapp till listan
        cvList.appendChild(li);
        cvList.appendChild(deleteButton);
    });
}


//Skapar funktion för att radera inlägg
async function deletePost(dataId) {
    
//Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`http://localhost:3000/jobexperiences/${dataId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.log(data);

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if(response.ok) {
        postExperience();
    } 

    

}