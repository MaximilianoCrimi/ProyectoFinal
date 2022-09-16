const listaTareas = document.querySelector('#lista-tareas');
const formulario =document.querySelector('#formulario');
let tareas = [];

eventos();

function eventos(){
    formulario.addEventListener('submit',agregarTareas);

    listaTareas.addEventListener('click', borrarTareas);

    document.addEventListener('DOMContentLoaded',() =>{
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        console.log(tareas);
        crearHTML();
    })
}

function agregarTareas(e){

    e.preventDefault();
    const tarea = document.querySelector('#tarea').value;

    if (tarea === '') {
        mostrarError('mensaje vacio');
        return
    }

    const  tareaObj ={
        id: Date.now(),
        texto: tarea
    }

    tareas = [...tareas, tareaObj];

    crearHTML();

    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p'); 
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}

function crearHTML(){
    limpiarHTML();

    if (tareas.length > 0) {
        tareas.forEach(tarea => {
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar';
            botonBorrar.innerText = 'X';

            const li = document.createElement('li');

            li.innerText = tarea.texto;

            li.appendChild(botonBorrar);

            li.dataset.tareaId = tarea.id;

            listaTareas.appendChild(li);
        });
    }

    sincronizarStorage();
}

function borrarTareas(e){


    const id = e.target.parentElement.dataset.tareaId;

    tareas = tareas.filter(tarea => tarea.id != id);
    crearHTML();
}

function sincronizarStorage(){
    localStorage.setItem('tareas',  JSON.stringify(tareas));
}

function limpiarHTML(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild)
    }
}