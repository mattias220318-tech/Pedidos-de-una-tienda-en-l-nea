package com.example.tienda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*") // Permite al frontend de React conectarse sin errores CORS
public class TiendaApplication {

    private List<Map<String, Object>> pedidos = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(TiendaApplication.class, args);
    }

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Map<String, Object> pedido) {
        pedido.put("id", UUID.randomUUID().toString().substring(0, 8));
        pedido.put("estado", "Procesando pago...");
        pedidos.add(0, pedido); // Agrega al inicio
        return ResponseEntity.ok(pedido);
    }

    @GetMapping
    public ResponseEntity<?> obtenerPedidos() {
        return ResponseEntity.ok(pedidos);
    }
}
