// Variables del carrito
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Variables lista de cursos
const listaCursos = document.querySelector("#lista-cursos");

// Cargar addEventListener
cargarAddEventListeners();

function cargarAddEventListeners(){
	// Cuando agregas un curso presionando 'Agregar al carrito'
	listaCursos.addEventListener("click", agregarCurso);
    carrito.addEventListener("click", eliminarCurso);
    vaciarCarrito.addEventListener("click", () => {
        console.log("HELLOOOO????")
        articulosCarrito = [];
        limpiarHTML();
    })
}

// Funciones
function agregarCurso(curso){
	curso.preventDefault();
	// Verificamos si el elemento al que le damos click contiene la clase 'agregar-carrito'
	const cursoSeleccionado = curso.target.parentElement.parentElement;
	if(curso.target.classList.contains("agregar-carrito")){
		mostrarInfo(cursoSeleccionado);
	}
}

// Eliminamos un curso
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');
        // Elimina el elemento de articulosCarrito por el data-id usando filter
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        console.log(articulosCarrito);
        carritoHTML();
    }
}

// Extrae y muestra la información del curso
function mostrarInfo(curso){

	// console.log(curso)
	// Crea un objeto con el contenido del curso actual
	const infoCurso = {
		imagen: curso.querySelector("img").src,
		nombreCurso: curso.querySelector("h4").textContent,
		precioCurso: curso.querySelector(".precio span").textContent,
		id: curso.querySelector("a").getAttribute("data-id"),
		cantidad: 1
	};

    // Validamos si existe más de la cantidad de un curso
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...cursos]
    }else{
        // Agrega elementos en el carrito de compras
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

	console.log(articulosCarrito);
    carritoHTML();

}


// Muestra el carrito de compras en el HTML
function carritoHTML () {

    // Limpia el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, nombreCurso, precioCurso, cantidad, id} = curso;

        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src="${imagen}" width=100></td>
            <td>${nombreCurso}</td>
            <td>${precioCurso}</td>
            <td>${cantidad}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row); 
    })

}



function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}