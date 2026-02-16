import { redirect } from "next/navigation";

/**
 * Cualquier ruta que no exista en el dominio redirige a la página principal.
 */
export default function NotFound() {
  redirect("/");
}
