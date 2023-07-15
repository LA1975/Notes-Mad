// Check if the current page is the login page
if (window.location.pathname === "/") {
  // Get the "modalLogin" element and set its display property to "none"
  const modalLogin = document.querySelector("#modalLogin");
  if (modalLogin) {
    modalLogin.style.display = "none";
  }
}
//add event listeners for hide icons in new note modal
const hideButton = document.querySelector("#hide");
if (hideButton) {
  hideButton.addEventListener("click", () => {
    document.querySelector("#modal").style.display = "none";
  });
}

//add eventlistener to parent of login / addnote icons 
// Check if the current page is the login page
if (window.location.pathname === "/") {
  // Get the "modalLogin" element and set its display property to "none"
  const modalHeader = document.querySelector('#header');
  if (modalHeader) {
    modalHeader.addEventListener('click', handleHeaderClick);
  }
}


//checks which icon is the even target 
function handleHeaderClick(event) {
  if (event.target.matches(".la-plus-square")) {
    openModal();
  } else if (event.target.matches('.la-sign-in-alt')){
    toggleModalLogin();
  }
}
//opens the modal for login
function toggleModalLogin() {
  let modalLogin = document.querySelector("#modalLogin");
  let modalDisplay = modalLogin.style.display;
  
  
  if (modalDisplay === "block") {
    modalLogin.style.display = "none";
  } else {
    modalLogin.style.display = "block";
  }
}
//opens the modal for creating a note
function openModal() {
  document.querySelector("#modal").style.display = "flex";
  document.querySelector("#user_input").select();
}
// login and signup forms
const forms = document.querySelector(".forms");
const showHidePassword = document.querySelectorAll(".la-eye-slash");
const links = document.querySelectorAll(".link");

// for testing
// console.log(forms,showHidePassword,links);  
showHidePassword.forEach(eyeIcon =>{
  eyeIcon.addEventListener("click", ()=>{
    let passwordFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    // for testing
    // console.log(passwordFields);

    passwordFields.forEach(password =>{
      if (password.type === "password"){
        password.type ="text";
        eyeIcon.classList.replace("la-eye-slash" , "la-eye");
        return;
      }
      password.type ="password";
      eyeIcon.classList.replace("la-eye", "la-eye-slash" );
    })
  });
});

links.forEach(link =>{
  link.addEventListener("click", e=>{
    e.preventDefault(); //prevents the formsubmit
    forms.classList.toggle("show-signup");
  })
});

//setting random note attributes
const random_margin = ["-5px", "1px", "5px", "10px", "7px"];
const random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
const random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];

let note = document.querySelectorAll(".note");

for(let i = 0; i < note.length; i++) {
  const colorIndex = i % random_colors.length;
  const marginIndex = Math.floor(Math.random() * random_margin.length);
  const degreeIndex = Math.floor(Math.random() * random_degree.length);
  
  const style = `margin:${random_margin[marginIndex]}; background-color:${random_colors[colorIndex]}; transform:${random_degree[degreeIndex]}`;
  
  note[i].setAttribute("style", style);

}
//edit icon functions
// Find all edit icons on the page
// Find all edit icons on the page
const editIcons = document.querySelectorAll('.las.la-edit');
const editModal = document.getElementById('editModal');
const noteInput = document.getElementById('note_input');
const noteIdInput = document.getElementById('noteIdInput');

// Add event listener to each edit icon
editIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Retrieve the note_id and text values
    const noteId = icon.parentNode.querySelector('input[name="note_id"]').value;
    const noteText = icon.parentNode.parentNode.querySelector('p').textContent;

    // Set the noteId and noteText in the modal
    noteInput.value = noteText;
    noteIdInput.value = noteId;

    // Show the modal
    editModal.style.display = 'block';
  });
});

// Hide the modal when the "X" icon is clicked
const hideIcon = document.getElementById('edit-hide');
if(hideIcon){
  hideIcon.addEventListener('click', () => {
    editModal.style.display = 'none';


});
}

