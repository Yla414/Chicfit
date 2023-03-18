$("#country").countrySelect();

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

let paymentButton = document.getElementById("paymentBtn");
let shoppingCart = document.getElementById("shopping-cart");
let summaryPageHeader = document.getElementById("summaryPageHeader");


let dataBasket = JSON.parse(localStorage.getItem("data")) || [];

console.log(dataBasket);

//create a function that sums up all the number of the selectedProduct
let cartSum = () => {
    let cartTotal = document.getElementById("cartCount");
    // Use the reduce function to calculate the sum total of the cart items
    cartTotal.innerHTML = dataBasket.map((investigator) => investigator.item).reduce((a, b) => a+b,0);
};
cartSum();


let generateCartItems = () => {
    //check if there ia data in the dataBasket
    //If there is an item in the dataBasket, the if statement will run
    if(dataBasket.length !== 0) {
        // the investigator will target the objects in the data one by one, and then prints out the result on the page
        return (shoppingCart.innerHTML = dataBasket
            .map((investigator) => {
                let {id, item} = investigator
                // creat a search function thar checks to see if the id from the basket
                // matches that in the database(shopData.js)
                let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-items">
                <div class="cart-item">
                    <div class="product">
                        <div class="product-img">
                            <a href="#">
                                <img width="130" src="${search.img}" alt="">
                            </a>    
                        </div>
                        <div class="product-details">
                            <p class="brand">${search.brand}</p>
                            <h4 class="name">${search.name}</h4>
                            <p>Size: <span class="text-muted">XXL</span></p>
                            <div class="total-price">
                                <p class="text">Sub-total :<span class="text-muted subtotal-price">$ ${item * search.price}</span></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join(""));
    }
    //the else stament will run, if the cart is empty
    else{
        console.log("basket is empty");
        // shoppingCart.innerHTML = ``;
;
        shoppingCart.innerHTML=``;
    };
};
generateCartItems();


let updateCartQuantity = (id) => {
    //if the item exists, and matches the id, the number will increase
    let search = dataBasket.find((investigator) => investigator.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    //Note: the cartSum function will only work, when the updateCartQuantity function works
    cartSum();
    TotalAmount();
};


let TotalAmount = () => {
    // If the basket is not empty, then the following code will run
    if(dataBasket.length !== 0) {
        let amount = dataBasket.map((investigator) => {
            let {id, item} = investigator;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price + search.discount;
        }).reduce((x,y) => x+y,0);
        summaryPageHeader.innerHTML = `
        <h2>My Orders</h2>
        <p class="text-muted">Summary</p>
        `

        paymentButton.innerHTML = `
        <button type="submit" id="payBtn" class="pay-btn">Pay : <h3>$ ${amount}</h3></button>
        `;
        
    }
    else return;
};
TotalAmount();