import { Container, Row } from "react-bootstrap";
import CardProducto from "./CardProducto";

import alfajores from "../../../assets/alfajorchocolate.jpg";
import galleta from "../../../assets/galleta.jpg";
import capuchino from "../../../assets/capuchino.jpg";

const Tendencias = () => {
  const productos = [
    {
      imagen: alfajores,
      titulo: "Alfajor de dulce de leche",
      descripcion:
        "Dos suaves tapas unidas con un delicioso relleno de dulce de leche.",
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
      descripcion:
        "Espuma de leche cremosa sobre un espresso fuerte.",
      precio: 350,
    },
  ];

  return (
    <Container className="my-5">
      <h2
        className="mb-4 text-underline-warning text-center fw-bold"
        style={{ fontSize: "2rem" }}
      >
        Tendencias
      </h2>
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
  );
};

export default Tendencias;
