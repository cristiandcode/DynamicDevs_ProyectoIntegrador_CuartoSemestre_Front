import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import Tendencias from "./producto/Tendencias";
import alfajores from "../../assets/alfajorchocolate.jpg";
import galleta from "../../assets/galleta.jpg";
import capuchino from "../../assets/capuchino.jpg";
// import medialuna from "../assets/medialuna.jpg";
// import budin from "../assets/budin.jpg";

const Inicio = () => {
  const productos = [
    {
      imagen: alfajores,
      titulo: "Alfajor de chocolate",
      descripcion: "Delicioso alfajor relleno de dulce de leche y bañado en chocolate.",
      precio: 1200,
    },
    {
      imagen: galleta,
      titulo: "Galleta rellena",
      descripcion: "Crujiente por fuera y suave por dentro, con relleno artesanal.",
      precio: 1000,
    },
    {
      imagen: capuchino,
      titulo: "Capuchino",
      descripcion: "Espuma de leche cremosa sobre un espresso fuerte.",
      precio: 350,
    },
    // {
    //   imagen: medialuna,
    //   titulo: "Medialuna",
    //   descripcion: "Suave y hojaldrada, ideal para el desayuno.",
    //   precio: 500,
    // },
    // {
    //   imagen: budin,
    //   titulo: "Budín casero",
    //   descripcion: "Dulce y esponjoso, perfecto para acompañar un café.",
    //   precio: 700,
    // },
  ];

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo alfajores"
      />
      <Container className="mt-5">
        <h1 className="display-4 text-underline-warning">Nuestros Productos</h1>
        <hr />
        <Row>
          {productos.map((producto, index) => (
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
