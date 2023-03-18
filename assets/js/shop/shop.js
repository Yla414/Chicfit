let navbar = document.getElementById("topHeader");

window.onscroll = () => {
    if(window.scrollY > 0) {
        navbar.classList.add("navbar-fixed");
    }
    else {
        navbar.classList.remove("navbar-fixed");
    }
};

window.onload = () => {
    if(window.scrollY > 0) {
        navbar.classList.add("navbar-fixed");
    }
    else {
        navbar.classList.remove("navbar-fixed")
    }
};

document.addEventListener("click", e => {
    //Dropdown Category Menu
    var isDropdownButton = e.target.matches("[data-dropdown-button]");
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("menuactive");
    };

    document.querySelectorAll("[data-dropdown].menuactive").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("menuactive");
    });
});

// Category Open and Close
const catBtn = document.getElementById('category-btn');
const dptBanner = document.getElementById('cat-container');
const catTitle = document.getElementById('cat-title');
const dptDivision = document.getElementById('division');

catBtn.addEventListener('click', () => {
    catBtn.classList.toggle('active');
    catTitle.classList.toggle('remove-title');
    dptBanner.classList.toggle('reduce');

    const allP = document.querySelectorAll('.p');
    const iExpand = document.querySelectorAll('.i-expand');

    allP.forEach(item => {
        item.classList.toggle('remove-header')
    });

    iExpand.forEach(item => {
        item.classList.toggle('remove-icon');
    });

    dptDivision.classList.toggle('increase');
})

//Mobile Bottom Navbar
var submenu = document.querySelectorAll(".has-child .fa-chevron-right");
submenu.forEach((menu) => menu.addEventListener("click", toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest(".has-child").classList.remove('expand') : null)
    if (this.closest(".has-child").classList != "expand");
    this.closest(".has-child").classList.toggle("expand");    
}
// Sidebar Open & Close Function
let sidebar = document.getElementById("sidebar");
    menuBtn = document.getElementById("menuBtn");
    closeBtn = document.getElementById("sidebarClose");
//Open the sidemenu
menuBtn.addEventListener("click", function(){
    sidebar.classList.toggle("sidemenuActive");
});
//This statement closes the sidemenu
closeBtn.addEventListener("click", function(){
    sidebar.classList.remove("sidemenuActive");
});

// countdown
let countdown = () => {
    let today = new Date();
    var offerDate = new Date("1 mar 2023 12:30:00");

    // offer time will be in milliseconds total
    let offerTime = offerDate - today;

    // calculate the time(in milliseconds) for days, hours, minutes, and seconds
    let offerDays = Math.floor(offerTime / (1000 * 60 * 60 * 24));
    let offerHours = Math.floor((offerTime / (1000 * 60 * 60) % 24));
    let offerMinutes = Math.floor((offerTime / (1000 * 60) % 60));
    let offerSeconds = Math.floor((offerTime / 1000) % 60);

    let days = document.getElementById("days");
    days.innerHTML = offerDays;

    let hours = document.getElementById("hours");
    hours.innerHTML = offerHours;

    let minutes = document.getElementById("minutes");
    minutes.innerHTML = offerMinutes;

    let seconds = document.getElementById("seconds");
    seconds.innerHTML = offerSeconds

    let resetOfferDate = () => {
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 15);
        return futureDate;
    }

    //if offer ends, reset to a new value
    if (today.getSeconds() == offerDate.getSeconds()) {
        offerDate = resetOfferDate();
    }
}
setInterval(countdown, 1000);