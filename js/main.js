document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://6147d78565467e0017384c11.mockapi.io/Productospetshop';
        getProducts();

    document.querySelector("#crearProducts").addEventListener("click", () => {
        
        let nombre = document.querySelector("#nombre").value;
        let precio = document.querySelector("#precio").value;
        let descripcion = document.querySelector("#descripcion").value;
        let imagen = document.querySelector("#imagen").value;
        let id = document.querySelector("#id").value;
        crearProducts(nombre,precio,descripcion,imagen,id);
    })
    
    document.querySelector("#editProducts").addEventListener("click", () => {

        let nombre = document.querySelector("#nombre").value;
        let precio = document.querySelector("#precio").value;
        let descripcion = document.querySelector("#descripcion").value;
        let imagen = document.querySelector("#imagen").value;
        let id = document.querySelector("#id").value;
        editProducts(nombre,precio,descripcion,imagen,id);

    })
async function crearProducts(nombre,precio,descripcion,imagen,id) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "precio": precio,
            "descripcion": descripcion,
            "imagen": imagen,
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

async function editProducts(nombre,precio,descripcion,imagen,id) {
    await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "precio": precio,
            "descripcion": descripcion,
            "imagen": imagen,
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
                let nombre = document.createTextNode(persona.nombre);
                NombreColumna.append(Nombre);
                table.append(NombreColumna);

                let precio = document.createElement("td");
                precio.append(document.createTextNode(persona.precio))
                table.append(precio)

                let descripcion = document.createElement("td")
                descripcion.append(document.createTextNode(persona.descripcion));
                table.append(descripcion)

                let imagen = document.createElement("td")
                imagen.append(document.createTextNode(persona.imagen));
                let img = document.createElement("img");
                img.src = persona.imagen;
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




