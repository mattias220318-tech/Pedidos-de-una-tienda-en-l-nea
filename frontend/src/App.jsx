import React, { useState, useEffect } from 'react';

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [producto, setProducto] = useState('');

  const cargarPedidos = () => {
    // Busca la URL de tu Codespace activo dinámicamente o usa localhost si estás en local
    const urlBackend = window.location.hostname.includes('github.dev') 
      ? `https://${window.location.hostname.replace('5173', '8080')}/api/pedidos`
      : 'http://localhost:8080/api/pedidos';
    
    fetch(urlBackend)
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Error al cargar backend. Asegúrate de tener el puerto 8080 público.", err));
  };

  useEffect(() => { cargarPedidos(); }, []);

  const realizarPedido = () => {
    if (!producto) return;
    const urlBackend = window.location.hostname.includes('github.dev') 
      ? `https://${window.location.hostname.replace('5173', '8080')}/api/pedidos`
      : 'http://localhost:8080/api/pedidos';

    fetch(urlBackend, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto: producto })
    }).then(() => {
      setProducto('');
      cargarPedidos();
    });
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center', color: 'white' }}>
      <h1 style={{ color: '#00d8ff' }}>Tienda en Línea</h1>
      <p>Simulador de Compras (Funcional)</p>
      
      <div style={{ margin: '20px' }}>
        <input 
          value={producto} 
          onChange={(e) => setProducto(e.target.value)} 
          placeholder="Ej: Laptop, Libro, etc." 
          style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: 'none', marginRight: '10px' }}
        />
        <button onClick={realizarPedido} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#00d8ff', color: '#1a1a1a', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Realizar Pedido
        </button>
      </div>
      
      <h3 style={{ marginTop: '40px', color: '#aaa' }}>Historial de Pedidos en Vivo:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {pedidos.map(p => (
          <div key={p.id} style={{ background: '#333', margin: '10px', padding: '15px', width: '350px', borderRadius: '8px', textAlign: 'left', borderLeft: '5px solid #00d8ff' }}>
            <strong>ID:</strong> {p.id} <br/>
            <strong>Producto:</strong> {p.producto} <br/>
            <span style={{ color: '#ffcc00' }}>Estado: {p.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App;
