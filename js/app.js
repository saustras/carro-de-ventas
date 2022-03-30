const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let carritoCompras=[];

cargarEventListeners();

function cargarEventListeners(){
    //agregar curso al carrito
    listaCursos.addEventListener('click', agregarCursos);

    //eliminar curso
    carrito.addEventListener('click',eliminarCurso);

    //vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        carritoCompras=[];
        cursosHTML ();
    });

    document.addEventListener('DOMContentLoaded',()=>{
        carritoCompras =JSON.parse(localStorage.getItem('carritoCompras'))|| [];   
        console.log(carritoCompras);
        cursosHTML ();
    })

}

function agregarCursos(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        cursoSeleccionado = e.target.parentElement.parentElement
        leerCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        
        carritoCompras = carritoCompras.filter(curso => curso.id !== cursoId);
        console.log(carritoCompras)

        cursosHTML();
    }
}


//leer contenido del curso

function leerCurso(curso){

    const infocurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

   //agregando elemento al carro
   const existe = carritoCompras.some(curso=>curso.id === infocurso.id);
   if(existe){
       carritoCompras.map(c=>{
           if(c.id === infocurso.id){
               ++c.cantidad;
           }
       })
    }else{
        carritoCompras=[...carritoCompras,infocurso]
    }

   console.log(carritoCompras);
   cursosHTML();
}

function cursosHTML(){

    limpiarHTML ()
    carritoCompras.map(c=>{
        const {imagen,titulo,precio,cantidad,id} = c;
        const row = document.createElement('tr');
        row.innerHTML =` 
        <td>
            <img src='${imagen}' width='100' >
        </td>
        <td> ${titulo}</td>
        <td>${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}">X</a>
    `;
    contenedorCarrito.appendChild(row);
    sincronizarStorage();
})
}
function sincronizarStorage() {
    localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras));
}


function limpiarHTML (){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}