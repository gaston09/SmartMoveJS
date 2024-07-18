
//*?------funciones de carrito----- */
const funcionesCarrito = () =>{
    modalContainer.innerHTML= ""
    modalContainer.style.display="flex";
    const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
            <h1 class="modal-header-title"> Carrito </h1>
        `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("p");
    modalButton.innerText= "x"
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", ()=>{
        modalContainer.style.display= "none"
    });

    modalHeader.append(modalButton);

    carrito.forEach((suplemento) =>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML=`
        <img src="${suplemento.img}" alt="imagen de producto">
        <p>$${suplemento.precio}</p>
        <div>
            <span class="restar">-</span>
            <p>Cantidad: <span class="CantidadNum">${suplemento.cantidad}</span></p>
            <span class="sumar">+</span>
        </div>
        <p>Subtotal: $${suplemento.precio * suplemento.cantidad}</p>
        `;

        modalContainer.append(carritoContent)

        //*funcion de restar y sumar item */
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () =>{
            if (suplemento.cantidad !==1){
                suplemento.cantidad--
            }
            funcionesCarrito()
        });
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
            suplemento.cantidad++
            funcionesCarrito()
        });
        

        let eliminarItem = document.createElement("span")
        eliminarItem.innerText = "Quitar Producto"
        eliminarItem.className = "quitar-producto"
        carritoContent.append(eliminarItem)

        eliminarItem.addEventListener("click", eliminarProducto)
    });

    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `
    <p>Total a pagar: <span>$${total}</span></p>
    <button class="btn-comprar" id="btn-comprar">Comprar</button>
    `;

    modalContainer.append(totalCompra)

    let botonComprar = document.querySelector(".btn-comprar");
    botonComprar.addEventListener("click", () =>{
        // console.log("comprado")
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'En breve nos contactamos para enviarte tu pedido',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    });

    
};
//*?---le agrego la funcion de carrito al boton del header --*/
verCarrito.addEventListener("click", funcionesCarrito)

/*funcion eliminar items */
const eliminarProducto= () => {
    const encontrarId = carrito.find((el)=> el.id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== encontrarId;
    });
    funcionesCarrito()
    guardarInfo ()
    contadorCarrito()
};

const contadorCarrito = () => {
    cantidadCarrito.style.display ="block";
    //*captura info en localStorage */
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"))
};
contadorCarrito();
