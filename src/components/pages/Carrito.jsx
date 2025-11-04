import { useState, useEffect } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "../../App.css";
const URI_Pagos = import.meta.env.VITE_API_PAGOS;
const Carrito = () => {
  // Inicializar Mercado Pago
  initMercadoPago("APP_USR-6eb5df9d-a8ac-44be-a4fa-81f834cf43be");
  
  // Estados
  const [carrito, setCarrito] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ show: false, message: "" });

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  // ❌ ELIMINADO: Ya NO creamos preferencia automáticamente
  // La creamos solo cuando el usuario elige "Mercado Pago"

  // Incrementar o disminuir cantidad de productos
  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total =
    carrito.length > 0
      ? carrito.reduce(
          (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
          0
        )
      : 0;

  const handleError = (message) => {
    setErrorModal({ show: true, message });
  };

  // -------------------- PAGO EN EFECTIVO --------------------
  const handlePagarEfectivo = async () => {
    setShowPaymentModal(false);
    
    try {
      const response = await fetch(`${URI_Pagos}pedido-efectivo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: carrito, total }),
      });

      const data = await response.json();

      if (response.ok && data.orderId) {
        // Limpiar carrito
        localStorage.removeItem("carrito");
        setCarrito([]);
        
        // Mostrar mensaje de éxito
        alert("✅ ¡Tu pedido fue registrado!\n\nPuedes pasarlo a buscar en los siguientes horarios:\n📅 Lunes a Sábados\n🕐 8:00 AM - 8:00 PM\n\n¡Te esperamos!");
        
        // Opcional: redirigir a página de confirmación
        // window.location.href = `/order-confirmation/${data.orderId}?method=efectivo`;
      } else {
        handleError(
          `Error al registrar la orden: ${data.mensaje || "Intente de nuevo."}`
        );
      }
    } catch (error) {
      console.error("Error en la orden de efectivo:", error);
      handleError("Hubo un error de conexión al procesar la orden en efectivo.");
    }
  };

  // -------------------- PAGO CON MERCADO PAGO --------------------
  const handlePagarMercadoPago = async () => {
    try {
      const response = await fetch(
        `${URI_Pagos}create-preference`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: carrito }),
        }
      );

      const data = await response.json();

      if (response.ok && data.preferenceId) {
        console.log("✅ Preferencia creada:", data.preferenceId);
        setPreferenceId(data.preferenceId);
        // NO cerrar el modal - el Wallet se mostrará dentro
      } else {
        console.error("Error del Backend/MP:", data.message);
        handleError("Error al iniciar el pago con Mercado Pago.");
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      handleError("Hubo un error al conectar con el servidor de pagos.");
      setShowPaymentModal(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="mt-5 mainSection">
        <h3>El carrito está vacío. Agrega productos desde la tienda.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mainSection">
      <h2 className="text-underline-warning">Carrito de Compras</h2>
      
      {/* 💥 ÚNICA CORRECCIÓN: Se añade la prop 'responsive' al componente Table. 
          Esto obliga a la tabla a tener scroll horizontal en pantallas pequeñas, 
          evitando que rompa el layout del menú y footer. */}
      <Table striped bordered hover className="mt-3" responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item._id}>
              <td>{item.nombreProducto}</td>
              <td>
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="img-tabla-producto"
                />
              </td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-sumar-${item._id}`}>Sumar unidad</Tooltip>}
                >
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => incrementarCantidad(item._id)}
                  >
                    +
                  </Button>
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-restar-${item._id}`}>Restar unidad</Tooltip>}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => disminuirCantidad(item._id)}
                  >
                    -
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Total: ${total}</h4>

      {/* ✅ SIEMPRE mostrar botón "Proceder al Pago" */}
      <div className="d-flex justify-content-end mt-3">
        <Button
          variant="success"
          size="lg"
          onClick={() => setShowPaymentModal(true)}
          className="mb-2"
        >
          Pagar
        </Button>
      </div>

      {/* ============ MODAL DE SELECCIÓN DE PAGO ============ */}
      <Modal 
        show={showPaymentModal} 
        onHide={() => {
          setShowPaymentModal(false);
          setPreferenceId(null); // Reset al cerrar
        }} 
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Con qué método quieres pagar?</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="text-center">
          <p className="lead mb-4">
            Total a Pagar: <strong className="text-success">${total}</strong>
          </p>

          {/* Si NO hay preferenceId, mostrar botones de selección */}
          {!preferenceId ? (
            <>
              <Button
                variant="primary"
                size="lg"
                className="w-100 my-2 shadow-sm"
                onClick={handlePagarMercadoPago}
              >
                💳 Pagar con Mercado Pago
                <br />
                <small className="d-block mt-1" style={{ fontSize: '0.85rem' }}>
                  (Transferencia, Tarjeta, Efectivo)
                </small>
              </Button>

              <div className="my-3">
                <hr />
                <p className="text-muted">O</p>
                <hr />
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="w-100 my-2 shadow-sm"
                onClick={handlePagarEfectivo}
              >
                💵 Pago en Efectivo / Retiro en Local
              </Button>
            </>
          ) : (
            // Si HAY preferenceId, mostrar el Wallet de Mercado Pago
            <div className="my-4">
              <p className="text-muted mb-3">
                Completa tu pago con Mercado Pago:
              </p>
              <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <Wallet 
                  initialization={{ preferenceId: preferenceId }}
                  customization={{
                    texts: {
                      action: 'pay',
                      valueProp: 'security_safety'
                    }
                  }}
                />
              </div>
              <Button
                variant="outline-secondary"
                className="mt-3"
                onClick={() => setPreferenceId(null)}
              >
                ← Volver a Métodos de Pago
              </Button>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="outline-dark" 
            onClick={() => {
              setShowPaymentModal(false);
              setPreferenceId(null);
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ============ MODAL DE ERRORES ============ */}
      <Modal
        show={errorModal.show}
        onHide={() => setErrorModal({ show: false, message: "" })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">⚠️ Error de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorModal.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            onClick={() => setErrorModal({ show: false, message: "" })}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Carrito;