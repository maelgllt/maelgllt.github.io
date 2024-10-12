/* === Animation du texte === */
var typed = new Typed(".typing", {
    strings:["développeur web junior.", "étudiant à MyDigitalSchool.", "alternant chez Parker Meggitt."],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})


/* === Animation des slides === */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
for(let i=0; i<totalNavList; i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        removeBackSection();
        for(let j=0; j<totalNavList; j++){
            if(navList[j].querySelector("a").classList.contains("active")){
                addBackSection(j);
                //allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })
}
function removeBackSection(){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num){
    allSection[num].classList.add("back-section");
}
function showSection(elt){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("active");
    }
    const target = elt.getAttribute("href").substring(1); //substring pour enlever le #
    document.querySelector("#" + target).classList.add("active");
}
function updateNav(elt){
    for(let i=0; i<totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = elt.getAttribute("href").substring(1);
        if(target === navList[i].querySelector("a").getAttribute("href").substring(1)){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".contact-me").addEventListener("click", function(){
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex)
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");
      navTogglerBtn.addEventListener("click", () => {
        asideSectionTogglerBtn();
      })
      function asideSectionTogglerBtn(){
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.toggle("open");
        }
      }

/* === Ouvrir le CV === */
document.querySelector("#cv").addEventListener("click", () => {
    let pdfPath = "Mael_GUILLOTEAU_CV.pdf";
    window.open(pdfPath, '_blank');
})

/* === Formulaire de contact === */
window.onload = function() {
    // Réinitialise le formulaire de contact après l'envoi d'un message
    document.querySelector("#form").reset();
};

// Message de confirmation d'envoi du message
const form = document.querySelector('#form');
const result = document.querySelector('#result');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "En cours d'envoi..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Email envoyé avec succès. Merci pour votre message !";
            } else {
                console.log(response);
                result.innerHTML = "Une erreur est survenue...";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Une erreur est survenue...";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 4000);
        });
});
