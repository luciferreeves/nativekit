// Dropdown Toggle

document.querySelector('.button-dropdown').addEventListener('click', function () {
    var element = this
    var id = element.getAttribute('name')
    document.getElementById(id).classList.toggle("showDropdown");
}, false);
