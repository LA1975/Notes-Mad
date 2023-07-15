window.addEventListener("load", function () {

    const editProfileButton = document.querySelector("#btn-editProfile");
    const deleteButton = document.querySelector("#btn-delete");
    const editProfileModal = document.querySelector(".editProfile");
    const deleteConfirmModal = document.querySelector("#deleteConfirm");
    const profileContainer = document.querySelector(".profile-container");
    const cancelEditProfile = document.querySelector("#profileUpdateCancel");
    const cancelDelete = document.querySelector("#btn-close");

    //Sets modal display to block
    if (editProfileButton != null) {
        editProfileButton.addEventListener("click", function (event) {
            event.preventDefault();
            editProfileModal.style.display = "block";
            profileContainer.style.display = "none";
        });
    }
    //sets modal display to none and profile containder to flex
    if (cancelEditProfile != null) {
        cancelEditProfile.addEventListener("click", function () {
            editProfileModal.style.display = "none";
            profileContainer.style.display = "flex";
        });
    }

    //sets delete confirmation modal display to block and user profile to none
    if (deleteButton != null) {
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            deleteConfirmModal.style.display = "block";
            profileContainer.style.display = "none";

        });
    }
    //sets delete confirmation modal display to none and user profile to flex
    if (cancelDelete != null) {
        cancelDelete.addEventListener("click", function (event) {
            event.preventDefault();
            deleteConfirmModal.style.display = "none";
            profileContainer.style.display = "flex";
        });
    }

});