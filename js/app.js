// some variables to make the navbar.
const sections = Array.from(document.querySelectorAll('section'));
const mainMenu = document.getElementById('navbar__list');
let numberOfSections = sections.length;
//function for creating navbar items.
const createListItem = () => {
    for (section of sections) {
        sectionName = section.getAttribute('data-nav');
        sectionLink = section.getAttribute('id');
        // To create an item for each section.
        sectionList = document.createElement('li');
        // To add text to the item.
        sectionList.innerHTML = `<a class='menu__link' href='#${sectionLink}'>${sectionName}</a>`;
        // To add the item to the nav menu.
        mainMenu.appendChild(sectionList);
    }
}

// Build menu.
createListItem();
//if user is scrolling the navbar is showing
const nav = $('#nav');
$(window).scroll(function() {
    nav.show();
});
//Get the header
const header = document.querySelector('.page__header') && document.querySelector('.main__hero');
const isInViewport = function(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
//check if the time since last scroll is more than 4 seconds (4000ms).
$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        //if the header in the viewport show navbar.
        if (isInViewport(header)) {
            nav.show();
        }
        //else dont show the navbar.
        else {
            nav.hide();
        }
    }, 4000));

});
// make function to add or remove active class, and add id to the active section in the navbar.
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};
// remove the active class.
const removeActive = (section) => {
    section.classList.remove('active-class'); //remove the active class.
    sectionid = section.id.slice(7, 8) - 1;
    mainMenu.childNodes[sectionid].id = ''; // make the id in the active navbar empty.
};
// adding the active class.
const addActive = (conditional, section) => {
    if (conditional) {
        section.classList.add('active-class'); //add the active class.
        sectionid = section.id.slice(7, 8) - 1;
        mainMenu.childNodes[sectionid].id = 'active_navbar'; // add active_navbar to the active section.
    };
};
//implementating the actual function.
const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(section);
        inviewport = () => elementOffset < 150 && elementOffset >= -150;
        removeActive(section);
        addActive(inviewport(), section);
    });
};
window.addEventListener('scroll', sectionActivation);
// Scroll to anchor ID using scrollTO event.
const scrolling = () => {
    const links = document.querySelectorAll('.navbar__menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            for (i = 0; i < sections; i++) {
                sections[i].addEventListener("click", sectionScroll(link));
            }
        });
    });
};
// call the function.
scrolling();
// When the user scrolls down 300px from the top of the document, show the button.
const toTopButton = document.getElementById("btn"); // First get the button.
// Second make function to hide & show the button.
function hideButton() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {

        toTopButton.style.display = "block";
    } else {
        toTopButton.style.display = "none";
    }
}
// Finally call the function.
window.onscroll = function() { hideButton() };
// create to top button.
function goToTop() {
    document.body.scrollTop = 0; // FOR SAFARI.
    document.documentElement.scrollTop = 0; // FOR CHROME, FIRFOX and IE.
}
// ____________________________________________ END OF THE BUTTON.