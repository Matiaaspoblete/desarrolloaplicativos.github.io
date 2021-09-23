document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://6147d78565467e0017384c11.mockapi.io/Productospetshop';
        getProducts();

    document.querySelector("#crearProducts").addEventListener("click", () => {
        
        let Nombre = document.querySelector("#Nombre").value;
        let Precio = document.querySelector("#Precio").value;
        let Descripcion = document.querySelector("#Descripcion").value;
        let Imagen = document.querySelector("#Imagen").value;
        let id = document.querySelector("#id").value;
        crearProducts(Nombre,Precio,Descripcion,Imagen,id);
    })
    
    document.querySelector("#editProducts").addEventListener("click", () => {

        let Nombre = document.querySelector("#Nombre").value;
        let Precio = document.querySelector("#Precio").value;
        let Descripcion = document.querySelector("#Descripcion").value;
        let Imagen = document.querySelector("#Imagen").value;
        let id = document.querySelector("#id").value;
        editProducts(Nombre,Precio,Descripcion,Imagen,id);

    })
async function crearProducts(Nombre,Precio,Descripcion,Imagen,id) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Nombre": Nombre,
            "Precio": Precio,
            "Descripcion": Descripcion,
            "Imagen": Imagen,
            "id": id
        })
    }).then(response => {
        if (response.ok) {
            getProducts();
            console.log(response)
        } else {
            console.log("Si no funcione entro aca")
            throw new Error("no pude insertar")
        }
    }).catch((error) =>  {
        console.log("falle porque " + error);
    })
}

async function editProducts(Nombre,Precio,Descripcion,Imagen,id) {
    await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Nombre": Nombre,
            "Precio": Precio,
            "Descripcion": Descripcion,
            "Imagen": Imagen,
            "id": id
        })
    }).then(response => {
        if (response.ok) {
            getProducts();
            console.log(response)
        } else {
            console.log("Si no funcione entro aca")
            throw new Error("no pude insertar")
        }
    }).catch((error) =>  {
        console.log("falle porque " + error);
    })
}

async function getProducts() {
    await fetch(url)
        .then(response => {
        response.json().then(resp => {
            let tablePersona = document.querySelector("#info-row");
            tablePersona.innerHTML = "";

            console.log(Object.keys(resp[0]));

            resp.map(persona => {
                console.log(persona);
                let table = document.createElement("tr");
                let NombreColumna = document.createElement("td");
                let Nombre = document.createTextNode(persona.Nombre);
                NombreColumna.append(Nombre);
                table.append(NombreColumna);

                let Precio = document.createElement("td");
                Precio.append(document.createTextNode(persona.Precio))
                table.append(Precio)

                let Descripcion = document.createElement("td")
                Descripcion.append(document.createTextNode(persona.Descripcion));
                table.append(Descripcion)

                let Imagen = document.createElement("td")
                Imagen.append(document.createTextNode(persona.Imagen));
                let img = document.createElement("img");
                img.src = persona.Imagen;
                img.style.width = "200px";
                table.append(img)

                let id = document.createElement("td");
                id.append(document.createTextNode(persona.id))
                table.append(id)

                let eliminar = document.createElement("button");
                eliminar.setAttribute("value",persona.id);
                eliminar.append(document.createTextNode("Eliminar"));
                eliminar.style.color = "#fff";
                eliminar.style.background = "#f44336";
                eliminar.style.border = "none";
                table.append(eliminar);
                eliminar.addEventListener("click", ()=> {
                    eliminarPersona(eliminar.getAttribute("value"));
                })
                tablePersona.append(table);
            })
        })
    })
}

async function eliminarPersona(id) {
    await fetch(url + "/" + id, {
        method: "DELETE"
    }).then( (response)=> {
        if (response.ok) {
            getProducts();
        }
    })

}

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.mdb.modal', () => {
myInput.focus()
})

})




