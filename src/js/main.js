
//Funktion för att lägga till ett inlägg i CV från formulär
async function addExperience() {

    //Hämta information från HTML-formulär
    let companyName = document.getElementById("companyName");
    let jobTitle = document.getElementById("jobTitle");
    let place = document.getElementById("place");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");
    let jobDescription = document.getElementById("jobDescription");

    //Hämtar värden inmatade i formuläret
    let experience = {
        companyName: companyName.value,
        jobTitle: jobTitle.value,
        place: place.value,
        startDate: startDate.value,
        endDate: endDate.value,
        jobDescription: jobDescription.value
    }

    //Kopplar till API och lägger till ny data i databas
    let response = await fetch('http://localhost:3000/jobexperiences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(experience)
    });

    let data = await response.json();
    console.log(data);
}

//Hämtar formulär-knapp för att lägga till information
let submitButton = document.getElementById("cvsubmit-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
submitButton.onclick = addExperience;





