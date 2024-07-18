const productosContainer = document.getElementById("productos-container");
const verCarrito = document.getElementById("ver-carrito");
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("numeroCarrito")
//*variable que recupera storage o devuelve [] */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//*? --------  pushh a array y crear cards  -------- */

//*?--------  async y await  --------*/
const getProducts = async() => {
    const response = await fetch("../suplementos.json");
    const data = await response.json();
    console.log(data)

    data.forEach((suplemento) =>{
        let nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto-carrito";
        nuevoProducto.id = "tarjeta-producto-carrito"
        nuevoProducto.innerHTML = `
        <img src="../img/suplementos/suplemento${suplemento.id}.jpg" alt="">
        <h3 class="detalle">${suplemento.nombre}</h3>
        <h4>${suplemento.detalle}</h4>
        <span>$${suplemento.precio}</span>
        
        <button class="btn-Agregar">
            Agregar al carrito
        </button>
        `;
        productosContainer.append(nuevoProducto);
        
        let botonAgregar = nuevoProducto.querySelector(".btn-Agregar");
    
        botonAgregar.addEventListener("click", () =>{
    
        const repetidos = carrito.some((prodRepetido)=> prodRepetido.id === suplemento.id);
    
            if (repetidos) {
                carrito.map((suple)=>{
                    if (suple.id === suplemento.id){
                        suple.cantidad++;
                    }
                })
            }else{
                carrito.push({
                    id: suplemento.id,
                    img: suplemento.img,
                    nombre: suplemento.nombre,
                    detalle: suplemento.detalle,
                    precio: suplemento.precio,
                    cantidad: suplemento.cantidad
            });
        }
            console.log(carrito);
            contadorCarrito();
            guardarInfo();
        });
    });
    
};
getProducts();


//*?set item*/
//*captura info en localStorage */
const guardarInfo = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

