import { Container, Row, Col } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { listarProductos } from "../helpers/queries";
import "../../App.css";
import alfajorWorking from "../../assets/chocodevsworking.jpg";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await listarProductos();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <section className="mainSection">
      {/* Banner principal */}
      <img
        className="banner w-100"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo alfajores"
      />

      <Container className="mt-5">
        {/* Título */}
        <h1 className="display-4 text-underline-warning titulo-principal text-center">
          Nuestros Productos
        </h1>
        <hr />

        {/* Mensaje de carga / error */}
        {error || productos.length === 0 ? (
          <div className="mensaje-container text-center">
            <h1 className="fw-bold mensaje-carga">
              Estamos trabajando cargando los productos. Apenas estén cargados se verán en esta página.
              <br /> Disculpen las molestias.
            </h1>
            <div className="img-wrapper">
              <img
                src={alfajorWorking}
                alt="Alfajor trabajando en la página"
                className="img-alfajor-working"
              />
            </div>
          </div>
        ) : (
          // Listado de productos
          <Row className="g-3">
            {productos.map((producto) => (
              <Col key={producto._id} xs={12} sm={6} md={4} lg={3}>
                <CardProducto producto={producto} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Inicio;



// https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg