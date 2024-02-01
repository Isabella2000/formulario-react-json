import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import { actualizarCliente, obtenerCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No se encontro el Cliente"
    })
  }
  return cliente
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  const email = formData.get("email");
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(email)) {
    errores.push("El Email no es valido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await actualizarCliente(params.clienteId, datos);
  return redirect("/");
}

function EditarCliente() {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">A continuacion podras editar los datos de un cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-900 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          {" "}
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario
            cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Guardar cambios"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente