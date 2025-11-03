import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardProducto = ({ producto }) => {
  const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/detalle/${producto._id}`);
  };

  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100 card-hover-effect"> {/* Mantén esta clase */}
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombreProducto}
            className="card-img-top-nueva" /* Esta clase es la que usas para tus estilos de imagen */
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="primary-font">
            {producto.nombreProducto}
          </Card.Title>
          <div>
            Descripción: {producto.descripcion_breve}
          </div>
          <Card.Text className="mt-auto pt-2">
            <span className="fw-bold">Precio: ${producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="warning" className="me-2" onClick={irADetalle}>
            Ver más
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;