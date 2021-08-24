document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://610f5d459b698d0017175310.mockapi.io/api/v1/Personas';
        getPersonas();

    document.querySelector("#crearPersona").addEventListener("click", () => {
        let ID = document.querySelector("#id").value;
        let nombre = document.querySelector("#nombre").value;
        let apellido = document.querySelector("#apellido").value;
        let direccion = document.querySelector("#direccion").value;
        let titulo = document.querySelector("#titulo").value;
        let edad = document.querySelector("#edad").value;
        let avatar = document.querySelector("#avatar").value;
        console.log(document.querySelector("#apellido"));
        crearPersona(nombre,apellido,direccion,titulo,avatar,edad);
    })
    
    document.querySelector("#editPersonas").addEventListener("click", () => {
        let id = document.querySelector("#id").value;
        let nombre = document.querySelector("#nombreedit").value;
        let apellido = document.querySelector("#apellidoedit").value;
        let direccion = document.querySelector("#direccionedit").value;
        let titulo = document.querySelector("#tituloedit").value;
        let edad = document.querySelector("#edadedit").value;
        let avatar = document.querySelector("#avataredit").value;
        console.log(document.querySelector("#apellidoedit"));
        editarPersonas(id,nombre,apellido,direccion,titulo,avatar,edad);  

    })
async function crearPersona(nombre, apellido, direccion, titulo, avatar, edad) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "titulo": titulo,
            "avatar": avatar,
            "edad": edad
        })
    }).then(response => {
        if (response.ok) {
            getPersonas();
            console.log(response)
        } else {
            console.log("Si no funcione entro aca")
            throw new Error("no pude insertar")
        }
    }).catch((error) =>  {
        console.log("falle porque " + error);
    })
}

async function editarPersonas(id,nombre, apellido, direccion, titulo, avatar, edad) {
    await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "titulo": titulo,
            "avatar": avatar,
            "edad": edad
        })
    }).then(response => {
        if (response.ok) {
            getPersonas();
            console.log(response)
        } else {
            console.log("Si no funcione entro aca")
            throw new Error("no pude insertar")
        }
    }).catch((error) =>  {
        console.log("falle porque " + error);
    })
}

async function getPersonas() {
    await fetch(url)
        .then(response => {
        response.json().then(resp => {
            let tablePersona = document.querySelector("#info-row");
            tablePersona.innerHTML = "";

            console.log(Object.keys(resp[0]));

            resp.map(persona => {
                console.log(persona);
                let table = document.createElement("tr");
                let nombreColumna = document.createElement("td");
                let nombre = document.createTextNode(persona.nombre);
                nombreColumna.append(nombre);
                table.append(nombreColumna);

                let ID = document.createElement("td");
                ID.append(document.createTextNode(persona.id))
                table.append(ID)

                let apellido = document.createElement("td");
                apellido.append(document.createTextNode(persona.apellido))
                table.append(apellido)

                let direccion = document.createElement("td")
                direccion.append(document.createTextNode(persona.direccion));
                table.append(direccion)

                let titulo = document.createElement("td")
                titulo.append(document.createTextNode(persona.titulo));
                table.append(titulo)

                let edad = document.createElement("td")
                edad.append(document.createTextNode(persona.edad));
                table.append(edad)

                let avatar = document.createElement("td")
                avatar.append(document.createTextNode(persona.avatar));
                let img = document.createElement("img");
                img.src = persona.avatar;
                table.append(img)

                let eliminar = document.createElement("button");
                eliminar.setAttribute("value",persona.id);
                eliminar.append(document.createTextNode("Eliminar"));
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
            getPersonas();
        }
    })

}

})




