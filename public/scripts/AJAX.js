
//AJAX to get /logout router from logout link
document.addEventListener('DOMContentLoaded', function() {
     let myLink = document.getElementById('logout');
  if (myLink) {
    myLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
      
      // Send a GET request to the server
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/logout', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Handle the response here
          window.location.reload();
          console.log(xhr.responseText);
        } else {
          // Handle any errors here
          console.log('Error:', xhr.status);
        }
      };
      xhr.send();
    });
}
  });

 


  