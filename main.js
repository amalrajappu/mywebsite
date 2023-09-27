const galleryImages=[
    {
        src:"./assets/gallery/image1.jpg",
        alt:"Thumbnail Image 1"
    },
    {
        src:"./assets/gallery/image2.jpg",
        alt:"Thumbnail Image 2"
    },
    {
        src:"./assets/gallery/image3.jpg",
        alt:"Thumbnail Image 3"
    }
];

const products=[
    {
        title:"AstroFiction",
        author:"John Doe",
        price:499,
        image:"./assets/products/img6.png"
    },
    {
        title:"space Odissey",
        author:"Marie Anna",
        price:560,
        image:"./assets/products/img1.png"
    },
    {
        title:"Doomed City",
        author:"Jason Cobert",
        price:0,
        image:"./assets/products/img2.png"
    },
    {
        title:"Black Dog",
        author:"John Doe",
        price:480,
        image:"./assets/products/img3.png"
    },
    {
        title:"Frankisten",
        author:"John kory",
        price:1099,
        image:"./assets/products/img5.png"
    },
    {
        title:"Garden Girl",
        author:"Jason Cobert",
        price:0,
        image:"./assets/products/img4.png"
    }
];


function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click",function(){
document.querySelector("header nav .wrapper").classList.add("nav-open");
});
document.querySelector("#close-nav-menu").addEventListener("click",function(){
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
});
}

function convertTemp(cel){
    var tempFahr=cel*(9/5)+32;
    return tempFahr;
}

function greetingHandler(){
var greetingText="Good evening";
const climateText="Rainy";
const locationText="Kerala";
let tempCel="22.90";

function convertTemp(cel){
    var tempFahr=cel*(9/5)+32;
    return tempFahr;
}

let celText="The weather is "+ climateText +" in " + locationText + " and it’s " + tempCel.toString() + " C outside.";
let fahrText="The weather is "+ climateText +" in " + locationText + " and it’s " + convertTemp(tempCel) + " F outside.";


//let fahr=convertTemp(tempCel);
//console.log(fahr);

//console.log(weatherText);
//document.querySelector("p#weather").innerHTML=weatherText;
let currentHour=new Date().getHours();

//console.log(currentHour);
if(currentHour<12){
    greetingText="Good Morning";
}else if(currentHour<19){
    greetingText="Good evening";
}else if(currentHour<24){
    greetingText="Good Night";
} else 
greetingText="Welcome";

document.querySelector("h1#greeting").innerHTML=greetingText;

document.querySelector(".weather-group").addEventListener("click",function(e){
    if(e.target.id=="celsius"){
        document.querySelector("p#weather").innerHTML=celText;
        //console.log("clicked cel");
         
    }else if(e.target.id=="fahr"){
        document.querySelector("p#weather").innerHTML=fahrText;
        //console.log("clicked fahr");
    }
    //console.log(e.target.id);
});
}

function dateHandler(){
var localTime=new Date();

setInterval(function(){
    let localTime=new Date();
document.querySelector("span[data-time=hours]").textContent=localTime.getHours();
document.querySelector("span[data-time=minutes]").textContent=localTime.getMinutes();
document.querySelector("span[data-time=seconds]").textContent=localTime.getSeconds();
},1000);
}

function galleryHandler(){


/* for(let i in galleryImages){
    console.log(galleryImages[i]);
} *

/*<img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true">*/

let mainImage=document.querySelector("#gallery > img");
let thumbImage=document.querySelector("#gallery .thumbnails");

mainImage.src=galleryImages[0].src;
mainImage.alt=galleryImages[0].alt;


galleryImages.forEach(function(image,index){
    let thumb=document.createElement("img");
    thumb.src=image.src;
    thumb.alt=image.alt;
    thumb.dataset.arrayIndex=index;
    thumb.dataset.selected=index===0?true:false;

    thumb.addEventListener("click",function(e){
        let selectedIndex=e.target.dataset.arrayIndex;
        let selectedImage=galleryImages[selectedIndex];
        mainImage.src=selectedImage.src;
        mainImage.alt=selectedImage.alt;

        thumbImage.querySelectorAll("img").forEach(function(img){
            img.dataset.selected=false
        });
        e.target.dataset.selected="true";
    });

    thumbImage.appendChild(thumb);
});
}

//page load

menuHandler();
greetingHandler();
dateHandler();
galleryHandler();

function populateProducts(productList){

    let productsSection=document.querySelector(".products-area");
    productsSection.textContent="";

    productList.forEach(function(product,index){
            
        let productsElm=document.createElement("div");
        productsElm.classList.add("product-item");
        
         
        let productImage=document.createElement("img");
        productImage.src=product.image;
        productImage.alt="image for"+product.title;
        
        let productDetails=document.createElement("div");
        productDetails.classList.add("product-details");

        //console.log(productDetails);

        let productTitle=document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent=product.title;
        //console.log(productTitle);

        let ProductAuthor=document.createElement("p");
        ProductAuthor.classList.add("product-author");
        ProductAuthor.textContent=product.author;

        let priceTitle=document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent="price";

        let productPrice=document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent=product.price>0 ? "$"+product.price:"Free";



        productsElm.append(productDetails);
        productsElm.append(productImage);
        productsSection.append(productsElm);
        productDetails.append(productTitle);
        productDetails.append(ProductAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);
    });
}



function productsHandler(){

        
        let freeProducts=products.filter(function(item){
            return item.price <=0 || item.price==undefined;
        });
        let paidProducts=products.filter(function(item){
            return item.price>0;
        });



    
        populateProducts(products);

        let totalProducts=products.length;
        document.querySelector(".products-filter label[for=all] span.product-amount").textContent=totalProducts;
        document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=paidProducts.length;
        document.querySelector(".products-filter label[for=free] span.product-amount").textContent=freeProducts.length;

        let productsFilter=document.querySelector(".products-filter");
        productsFilter.addEventListener("click",function(e){
            if(e.target.id=="all"){
                populateProducts(products);
            }else if(e.target.id=="free"){
                populateProducts(freeProducts);
            }else if(e.target.id=="paid"){
                populateProducts(paidProducts);
            }
        })
        
    }

    function footerHandler(){
        currentYear=new Date().getFullYear();
        document.querySelector("footer").textContent=` Ⓒ ${currentYear}- All rights reserved`;
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    });
    footerHandler();
    productsHandler();





