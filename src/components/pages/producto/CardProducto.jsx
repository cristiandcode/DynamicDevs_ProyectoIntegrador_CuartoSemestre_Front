import { Col, Card, Button } from "react-bootstrap";

const CardProducto = ({ imagen, titulo, descripcion, precio }) => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100 shadow-sm d-flex flex-column">
        <div>
          <img src={imagen} alt={titulo} className="card-img-top-nueva" />
        </div>
        {/* Forzamos que el cuerpo de la tarjeta ocupe el espacio disponible */}
        <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <Card.Title className="primary-font">{titulo}</Card.Title>
            <Card.Text style={{ minHeight: "4.5rem" }}>
              {descripcion}
            </Card.Text>
          </div>
          <div>
            <span className="fw-bold">Precio: ${precio}</span>
          </div>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="warning" className="me-2">
            Ver más
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
