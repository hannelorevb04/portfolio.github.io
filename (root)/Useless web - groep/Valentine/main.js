const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const question = document.querySelector(".question");
const container = document.querySelector(".container");
const sorry = document.querySelector("#sorryScreen");
// const aYes = document.querySelector("#yes a");

no.addEventListener("click", function (event) {
  event.preventDefault();

  if (no.textContent === "NO") {
    yes.style.fontSize = "50px";
    no.textContent = "why not?";

  } else if (no.textContent === "why not?") {
    yes.style.fontSize = "85px";
    no.textContent = "are you sure?";

  } else if (no.textContent === "are you sure?") {
    yes.style.fontSize = "125px";
    no.textContent = "are you very very sure?";

  } else if (no.textContent === "are you very very sure?") {
    yes.style.fontSize = "175px";
    no.textContent = "I have a gift for you";

  } else if (no.textContent === "I have a gift for you") {
    yes.style.fontSize = "250px";
    no.textContent = "You will love it!";

  } else if (no.textContent === "You will love it!") {
    yes.style.fontSize = "400px";
    no.textContent = "I have planned our date :)";
    yes.style.marginLeft = "20%";
    yes.style.padding = "30px 55px";
    
  }
    else if (no.textContent === "I have planned our date :)") {
      question.style.display = "none";
      yes.style.fontSize = "600px";
      no.textContent = "Please...";
      yes.style.marginLeft = "10%";
      yes.style.zIndex = "1";
      no.style.marginTop = "-200px";
      yes.style.padding = "30px 55px";
      // aYes.style.marginTop = "10%";

    }

    else if (no.textContent === "Please...") {
      // question.style.display = "none"; // Hier wordt de titel verborgen
      // yes.style.fontSize = "600px";
      // yes.style.display = "block";
      // yes.style.width = "800px"; // Maak de YES-link zo breed als het viewport
      // yes.style.height = "600px"; // Maak de YES-link zo hoog als het viewport
      // yes.style.textAlign = "center"; // Centreer de tekst in het midden van het scherm
      // yes.style.margin = "0"; // Verwijder marges om de YES-link overal te centreren
      // no.textContent = "Yes";
 
      question.style.display = "none"; // Hier wordt de titel verborgen
      no.style.display = "none"; // Hier wordt de titel verborgen
      
      // yes.style.fontSize = "px";
      // //  yes.style.display = "block";
      // yes.style.width = "2500px"; // Maak de YES-link zo breed als het viewport
      // yes.style.height = "1200px"; // Maak de YES-link zo hoog als het viewport
      // // yes.style.textAlign = "center"; // Centreer de tekst in het midden van het scherm
      // yes.style.padding = "120px 300px;"// Verwijder marges om de YES-link overal te centreren
      // no.textContent = "Yes";
    
      yes.style.left = "0px";
      yes.style.top = "0px";
      yes.style.marginRight = "0px";
      // yes.style.width = "100%";
      // yes.style.height = "100%";
      yes.style.fontSize = "800px";
      yes.style.padding = "20px";
      // yes.style.width = "250px";



    //   .yes {
    //     left: 0px;
    //     top: 0px;
    //     margin-right: 0;
    //     width: 100%;
    //     height: 100%;
    //     font-size: 800px;
    //     padding: 0px 55px;
    // } 
    }

      if (no.textContent === "I have planned our date :)") {
        question.style.display = "none"; // Hier wordt de titel verborgen
        no.style.display = "none"; // Hier wordt de titel verborgen
        
        yes.style.fontSize = "800px";
        // yes.style.display = "block";
        yes.style.width = "1500px"; // Maak de YES-link zo breed als het viewport
        yes.style.height = "1000px"; // Maak de YES-link zo hoog als het viewport
        // yes.style.textAlign = "center"; // Centreer de tekst in het midden van het scherm
        yes.style.padding = "105px 200px;"
        yes.style.margin = "0"; // Verwijder marges om de YES-link overal te centreren
        no.textContent = "Yes";
      }
    
  
});

document.getElementById("yes").addEventListener("click", function(event) {
  event.preventDefault();

  question.style.display = "none";
  yes.style.display = "none";
  no.style.display = "none";
  container.style.display = "none";

  sorry.style.display = "block";
});


