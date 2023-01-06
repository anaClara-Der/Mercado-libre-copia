//Variables globales
const containerCards = document.querySelector(".container__productos");
const templateCard = document.querySelector("#template--card").content;
const fragment = document.createDocumentFragment();
const containerSlider = document.querySelector(".main__slider");
    const containerPagos = document.querySelector(".main__pagos");
//Se carga el html y se hace el fetch a la api
document.addEventListener("DOMContentLoaded", () =>{
    leerProducto();
    returnHome();
    returnHomeDesktop();
})

//Se lee lo ingresado por el usuario
const navContainer = document.querySelector(".nav--container");
const leerProducto = () =>{
    
    navContainer.addEventListener("submit", (e) =>{
        e.preventDefault();
        containerCards.innerHTML = ""; 
        containerPagos.classList.add("desaparecer");
        containerSlider.classList.add("desaparecer");
        const productoSearch = document.querySelector(".nav__search");
        buscarProddcuto(productoSearch.value);
        navContainer.reset(); //Borro lo escrito en el input
        
    })
}

//Pedido a Api
const buscarProddcuto = (producto) =>{
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${producto}`)
        .then((res) =>{
            return res.json();
        })
        .then((data =>{
          
            paintProduct(data)
        }))
        .catch((error) =>{
            console.log(error);
        })
}

//Pintar las cards con el producto buscado
const paintProduct = (producto) =>{
    const title = document.querySelector(".title--producto--buscado");
    title.textContent = producto.query
    producto.results.forEach(e => {
        const clone = templateCard.cloneNode(true);
        clone.querySelector(".producto__img").setAttribute("src", e.thumbnail);
        clone.querySelector(".producto__link").textContent = e.title;
        clone.querySelector(".producto__link").setAttribute('href', e.permalink);
        clone.querySelector(".producto__precio").textContent = `$ ${e.price}`;
        clone.querySelector(".producto__vendedor").textContent = e.seller.nickname;


        fragment.appendChild(clone);
    });
    containerCards.appendChild(fragment);
}
//volver al inicio
const returnHome = () =>{
    const title = document.querySelector(".title--producto--buscado");
    const btnLogo = document.querySelector(".header__logo-movil");
   
    btnLogo.addEventListener("click" , () =>{
        containerPagos.classList.remove("desaparecer");
        containerSlider.classList.remove("desaparecer");
        containerCards.innerHTML = ""; 
        title.innerHTML = "";
        
    })
}
const returnHomeDesktop = () =>{
    const title = document.querySelector(".title--producto--buscado");
    const btnLogo = document.querySelector(".header__logo-desktop");
   
    btnLogo.addEventListener("click" , () =>{
        containerPagos.classList.remove("desaparecer");
        containerSlider.classList.remove("desaparecer");
        containerCards.innerHTML = ""; 
        title.innerHTML = "";
        
    })

}