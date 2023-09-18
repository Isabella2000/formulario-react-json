import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
  const formData = await request.formData(); // el request en consola trae varias caracteristicas como lo es formData()
  // formData() el cual da de manera sencilla recoge conjunto de parejas clave/valor como los osn los campos de formulario y los valores, y seran enviados por HTTP
  const datos = Object.fromEntries(formData); //toma una lista de pares con clave-valor y devuelve un nuevo objeto cuyas propiedades son dadas por éstas entradas.
  // console.log(formData.get("nombre"))  Es una manera de recoger el dato de nombre

  // Validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  // Validacion de Email
  const email = formData.get("email");
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El Email no es valido");
  }

  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarCliente(datos);

  return redirect("/"); //se supone que el activeData no tiene como regla el retornar datos, sin embargo, como no retorne algo, tendre error, i dont have idea men
}

function NuevoCliente() {
  const errores = useActionData();
  console.log(errores);

  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Clientes</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-900 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          {" "}
          {/* tambien en los parentesis puedes poner (-1) que seria la pagina anterior a la que fuiste, el ("/") es la direccion del inicio, pero para paginas mas grandes que no siempre quieres ir a la principal, es bueno usar (-1) */}
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registar cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
