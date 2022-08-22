// VARIABLES GLO

const formularioUsuario = document.getElementById("formularioUsuario")
const listaActividadesUsuario = document.getElementById("listaActividades")
let arrayActividades = []

// FUNCIONES

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    return item
}

const GuardarDB = () => {
    localStorage.setItem("tareas", JSON.stringify(arrayActividades))
    PintarDB()

}

const PintarDB = () => {

    listaActividadesUsuario.innerHTML = "";
    arrayActividades = JSON.parse(localStorage.getItem("tareas"));
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(elemento => {

            if (elemento.estado) {
                listaActividadesUsuario.innerHTML += `
        <div class="alert alert-success my-3" role="alert">
         <span class="float-end"><button class="btn btn-success">Realizado</button>
         <button class="btn btn-danger">descartar</button></span>
         <b>${elemento.actividad}</b> - ${elemento.estado}</div></div>`
            } else {
                listaActividadesUsuario.innerHTML += `
        <div class="alert alert-dark my-3" role="alert">
         <span class="float-end"><button class="btn btn-success">Realizado</button>
         <button class="btn btn-danger">descartar</button></span>
         <b>${elemento.actividad}</b> - ${elemento.estado}</div></div>`
            }
        });
    }
}


const EliminarDB = (actividad) => {

    let indexArray
    arrayActividades.forEach((elemento, index) => {

        if (elemento.actividad === actividad) {
            indexArray = index;
           }

        });

        arrayActividades.splice(indexArray,1)
        GuardarDB();

        }

        const EditarDB = (actividad) => {

            let indexArray = arrayActividades.findIndex((elemento) =>elemento.actividad === actividad
            );
            arrayActividades[indexArray].estado = true

            GuardarDB();

        }


// addEventListener

formularioUsuario.addEventListener("submit", (e) => {

    Toastify({
  text: "Actividad agregada",
  duration: 3000,
//   destination: "https://github.com/apvarun/toastify-js",
//   newWindow: true,
  close: true,
  gravity: "bottom", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "rgb(179, 54, 54)",
  },
  onClick: function(){} // Callback after click
}).showToast();

    e.preventDefault();
    let actividadUsuario = document.getElementById("actividadUsuario").value

    CrearItem(actividadUsuario);
    GuardarDB()

    formularioUsuario.reset();

});

document.addEventListener("DOMContentLoaded", PintarDB)

listaActividadesUsuario.addEventListener("click", (e) => {
    
    e.preventDefault();

    if (e.target.innerHTML === "realizado" || e.target.innerHTML === "descartar") {
            Toastify({
  text: "Actividad eliminada",
  duration: 3000,
//   destination: "https://github.com/apvarun/toastify-js",
//   newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "rgb(179, 54, 54)",
  },
  onClick: function(){} // Callback after click
}).showToast();
        let texto = e.path[2].childNodes[3].innerHTML
        if (e.target.innerHTML === "descartar") {
            EliminarDB(texto);
        }
        if (e.target.innerHTML === "realizado") {

            EditarDB(texto);

        }
    }

})