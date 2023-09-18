import { stringify } from "postcss";

export async function obtenerClientes(){
    // const url = "http://localhost:3000/clientes"
    
    const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    // console.log("entro a la funcion")
    
    const resultado= await respuesta.json()
    return resultado;
}
export async function obtenerCliente(id){
    // const url = "http://localhost:3000/clientes"
    
    const respuesta= await fetch(import.meta.env.VITE_API_URL)
    // console.log("entro a la funcion")
    
    const resultado= await respuesta.json()
    return resultado;
}

export async function agregarCliente(datos){
try {
    const respuesta=await fetch(import.meta.env.VITE_API_URL,{
        method:"POST",
        body:JSON.stringify(datos),
        headers:{
            "Content-Type": "aplication/json"
        }
    })
    await respuesta.json()
} catch (error) {
    console.log(error)
    
}

}