import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import Tendencias from "./producto/Tendencias";

// Importar imágenes
import alfajores from "../../assets/alfajorchocolate.jpg";
import galleta from "../../assets/galleta.jpg";
import capuchino from "../../assets/capuchino.jpg";
const Inicio = () => {
  const productosInicio = [
    {
      imagen: alfajores,
      titulo: "Alfajor de chocolate",
      descripcion:
        "Delicioso alfajor relleno de dulce de leche y bañado en chocolate.",
      precio: 1200,
    },
    {
      imagen: galleta,
      titulo: "Galleta rellena",
      descripcion:
        "Crujiente por fuera y suave por dentro, con relleno artesanal.",
      precio: 1000,
    },
    {
      imagen: capuchino,
      titulo: "Capuchino",
      descripcion: "Espuma de leche cremosa sobre un espresso fuerte.",
      precio: 350,
    },
  ];

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo alfajores"
      />

      <Container className="mt-5">
        <h1 className="display-4 text-underline-warning text-center">Nuestros Productos</h1>
        <hr />
        <Row>
          {productosInicio.map((producto, index) => (
            <CardProducto
              key={index}
              imagen={producto.imagen}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
            />
          ))}
        </Row>
      </Container>

      <Container>
        <Tendencias />
      </Container>
    </section>
  );
};

export default Inicio;
