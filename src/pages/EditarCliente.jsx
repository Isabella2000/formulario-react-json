import { obtenerCliente } from "../data/clientes"

export async function loader({params}){
const cliente = await obtenerCliente(params.clienteId)
}
const EditarCliente = () => {
  return (
    <div>EditarCliente</div>
  )
}

export default EditarCliente