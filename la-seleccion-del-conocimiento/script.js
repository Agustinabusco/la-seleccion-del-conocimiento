class Pregunta {
  constructor(texto, opciones, respuestaCorrecta, categoria) {
    this.texto = texto;
    this.opciones = opciones;
    this.respuestaCorrecta = respuestaCorrecta;
    this.categoria = categoria;
  }

  esCorrecta(indiceSeleccionado) {
    return indiceSeleccionado === this.respuestaCorrecta;
  }
}

class Jugador {
  constructor(nombre, posicion) {
    this.nombre = nombre;
    this.posicion = posicion;
  }
}

class Equipo {
  constructor() {
    this.jugadores = [];
    this.maximoJugadores = 11;
  }

  agregarJugador(jugador) {
    if (!this.estaCompleto()) {
      this.jugadores.push(jugador);
    }
  }

  estaCompleto() {
    return this.jugadores.length >= this.maximoJugadores;
  }

  cantidad() {
    return this.jugadores.length;
  }

  obtenerPorPosicion(posicion) {
    return this.jugadores.filter((jugador) => jugador.posicion === posicion);
  }
}

class Juego {
  constructor() {
    this.equipo = new Equipo();
    this.preguntas = this.crearPreguntas();
    this.jugadoresDisponibles = this.crearJugadores();
    this.indicePreguntaActual = 0;
    this.respuestaBloqueada = false;

    this.pantallaInicio = document.getElementById("pantalla-inicio");
    this.pantallaJuego = document.getElementById("pantalla-juego");
    this.pantallaFinal = document.getElementById("pantalla-final");

    this.btnComenzar = document.getElementById("btn-comenzar");
    this.btnSiguiente = document.getElementById("btn-siguiente");
    this.btnReiniciar = document.getElementById("btn-reiniciar");

    this.contadorJugadores = document.getElementById("contador-jugadores");
    this.numeroPregunta = document.getElementById("numero-pregunta");
    this.categoriaPregunta = document.getElementById("categoria-pregunta");
    this.textoPregunta = document.getElementById("texto-pregunta");
    this.contenedorOpciones = document.getElementById("opciones");
    this.mensaje = document.getElementById("mensaje");
    this.cancha = document.getElementById("cancha");
    this.tituloFinal = document.getElementById("titulo-final");
    this.textoFinal = document.getElementById("texto-final");
    this.alineacionFinal = document.getElementById("alineacion-final");

    this.btnComenzar.addEventListener("click", () => this.iniciar());
    this.btnSiguiente.addEventListener("click", () => this.siguientePregunta());
    this.btnReiniciar.addEventListener("click", () => this.reiniciar());

    this.dibujarCancha();
  }

  crearPreguntas() {
    return [
      new Pregunta(
        "¿Cuál de estos dispositivos se usa para escribir texto en la computadora?",
        ["Monitor", "Teclado", "Parlante", "Impresora"],
        1,
        "Hardware"
      ),
      new Pregunta(
        "¿Qué dispositivo usamos para mover el cursor en la pantalla?",
        ["Mouse", "Micrófono", "Parlante", "Pendrive"],
        0,
        "Hardware"
      ),
      new Pregunta(
        "¿Dónde vemos las imágenes, textos y videos de la computadora?",
        ["Impresora", "Monitor", "Teclado", "Router"],
        1,
        "Hardware"
      ),
      new Pregunta(
        "¿Qué dispositivo sirve para imprimir trabajos en papel?",
        ["Cámara", "Impresora", "Mouse", "Auriculares"],
        1,
        "Hardware"
      ),
      new Pregunta(
        "¿Qué es una carpeta en la computadora?",
        ["Un lugar para guardar y ordenar archivos", "Un cable de Internet", "Una parte del teclado", "Un tipo de virus"],
        0,
        "Archivos"
      ),
      new Pregunta(
        "¿Para qué sirve Internet?",
        ["Para lavar ropa", "Para conectarse, comunicarse y buscar información", "Para apagar la luz", "Para cargar el mouse"],
        1,
        "Internet"
      ),
      new Pregunta(
        "¿Cuál de estas acciones es más segura en Internet?",
        ["Compartir mi contraseña", "Aceptar mensajes de desconocidos", "Pedir ayuda a un adulto si algo me parece raro", "Publicar todos mis datos personales"],
        2,
        "Seguridad digital"
      ),
      new Pregunta(
        "¿Debemos compartir nuestras contraseñas con desconocidos?",
        ["Sí", "No", "Solo si me lo piden por mensaje", "Solo en juegos"],
        1,
        "Seguridad digital"
      ),
      new Pregunta(
        "¿Cuál de estos programas se usa principalmente para dibujar?",
        ["Paint", "Calculadora", "Bloc de notas", "Calendario"],
        0,
        "Software"
      ),
      new Pregunta(
        "¿Qué es el software?",
        ["Los programas y aplicaciones", "La mesa de la computadora", "El cable de corriente", "La pantalla"],
        0,
        "Software"
      ),
      new Pregunta(
        "¿Qué es el hardware?",
        ["Las partes físicas de la computadora", "Una página web", "Una contraseña", "Un dibujo digital"],
        0,
        "Hardware"
      ),
      new Pregunta(
        "¿Cuál de estos elementos puede guardar archivos?",
        ["Pendrive", "Silla", "Lápiz común", "Pizarra"],
        0,
        "Archivos"
      ),
      new Pregunta(
        "¿Qué tecla se usa muchas veces para borrar letras hacia atrás?",
        ["Enter", "Espacio", "Backspace", "Shift"],
        2,
        "Teclado"
      ),
      new Pregunta(
        "¿Qué podemos hacer con una computadora?",
        ["Procesar información", "Dormir", "Comer", "Respirar"],
        0,
        "Uso básico"
      ),
      new Pregunta(
        "¿Cuál es un ejemplo de dato personal que debemos cuidar?",
        ["Color favorito", "Contraseña", "Nombre de un animal", "Una suma"],
        1,
        "Seguridad digital"
      )
    ];
  }

  crearJugadores() {
    return [
      new Jugador("Valentina", "Arquero"),
      new Jugador("Mateo", "Defensa"),
      new Jugador("Sofía", "Defensa"),
      new Jugador("Joaquín", "Defensa"),
      new Jugador("Camila", "Defensa"),
      new Jugador("Tomás", "Mediocampista"),
      new Jugador("Martina", "Mediocampista"),
      new Jugador("Pedro", "Mediocampista"),
      new Jugador("Ana", "Delantero"),
      new Jugador("Lucas", "Delantero"),
      new Jugador("Emilia", "Delantero")
    ];
  }

  iniciar() {
    this.preguntas = this.mezclarArray(this.preguntas);
    this.mostrarPantalla(this.pantallaJuego);
    this.mostrarPregunta();
    this.actualizarContador();
    this.dibujarCancha();
  }

  reiniciar() {
    this.equipo = new Equipo();
    this.preguntas = this.mezclarArray(this.crearPreguntas());
    this.jugadoresDisponibles = this.crearJugadores();
    this.indicePreguntaActual = 0;
    this.respuestaBloqueada = false;
    this.mostrarPantalla(this.pantallaInicio);
    this.actualizarContador();
    this.dibujarCancha();
  }

  mostrarPantalla(pantallaActiva) {
    this.pantallaInicio.classList.remove("activa");
    this.pantallaJuego.classList.remove("activa");
    this.pantallaFinal.classList.remove("activa");
    pantallaActiva.classList.add("activa");
  }

  mostrarPregunta() {
    if (this.indicePreguntaActual >= this.preguntas.length || this.equipo.estaCompleto()) {
      this.mostrarResultadoFinal();
      return;
    }

    this.respuestaBloqueada = false;
    this.mensaje.textContent = "";
    this.mensaje.className = "mensaje";
    this.btnSiguiente.classList.add("oculto");
    this.contenedorOpciones.innerHTML = "";

    const pregunta = this.preguntas[this.indicePreguntaActual];
    this.numeroPregunta.textContent = `Pregunta ${this.indicePreguntaActual + 1} de ${this.preguntas.length}`;
    this.categoriaPregunta.textContent = pregunta.categoria;
    this.textoPregunta.textContent = pregunta.texto;

    pregunta.opciones.forEach((opcion, indice) => {
      const boton = document.createElement("button");
      boton.classList.add("opcion");
      boton.textContent = `${String.fromCharCode(65 + indice)}) ${opcion}`;
      boton.addEventListener("click", () => this.responder(indice, boton));
      this.contenedorOpciones.appendChild(boton);
    });
  }

  responder(indiceSeleccionado, botonSeleccionado) {
    if (this.respuestaBloqueada) return;

    this.respuestaBloqueada = true;
    const pregunta = this.preguntas[this.indicePreguntaActual];
    const botones = document.querySelectorAll(".opcion");

    botones.forEach((boton, indice) => {
      boton.disabled = true;
      if (indice === pregunta.respuestaCorrecta) {
        boton.classList.add("correcta");
      }
    });

    if (pregunta.esCorrecta(indiceSeleccionado)) {
      const jugadorGanado = this.jugadoresDisponibles[this.equipo.cantidad()];
      this.equipo.agregarJugador(jugadorGanado);
      this.mensaje.textContent = `¡Correcto! ⚽ ${jugadorGanado.nombre} se unió a tu selección.`;
      this.mensaje.classList.add("bien");
      this.actualizarContador();
      this.dibujarCancha();
    } else {
      botonSeleccionado.classList.add("incorrecta");
      this.mensaje.textContent = "Incorrecto. Perdiste esta oportunidad de fichar un jugador.";
      this.mensaje.classList.add("mal");
    }

    this.btnSiguiente.classList.remove("oculto");
  }

  siguientePregunta() {
    this.indicePreguntaActual++;
    this.mostrarPregunta();
  }

  actualizarContador() {
    this.contadorJugadores.textContent = `${this.equipo.cantidad()}/11`;
  }

  dibujarCancha() {
    const formacion = [
      { posicion: "Delantero", cantidad: 3 },
      { posicion: "Mediocampista", cantidad: 3 },
      { posicion: "Defensa", cantidad: 4 },
      { posicion: "Arquero", cantidad: 1 }
    ];

    this.cancha.innerHTML = "";

    formacion.forEach((linea) => {
      const fila = document.createElement("div");
      fila.classList.add("linea");

      const jugadoresDeLaLinea = this.equipo.obtenerPorPosicion(linea.posicion);

      for (let i = 0; i < linea.cantidad; i++) {
        const slot = document.createElement("div");
        slot.classList.add("slot-jugador");

        const jugador = jugadoresDeLaLinea[i];

        if (jugador) {
          slot.classList.add("fichado");
          slot.innerHTML = `
            <span class="icono-jugador">👤</span>
            <strong>${jugador.nombre}</strong>
            <span class="posicion">${jugador.posicion}</span>
          `;
        } else {
          slot.innerHTML = `
            <span class="icono-jugador">➕</span>
            <span class="posicion">${linea.posicion}</span>
          `;
        }

        fila.appendChild(slot);
      }

      this.cancha.appendChild(fila);
    });
  }

  mostrarResultadoFinal() {
    this.mostrarPantalla(this.pantallaFinal);

    const cantidad = this.equipo.cantidad();

    if (cantidad === 11) {
      this.tituloFinal.textContent = "🏆 ¡Selección completa!";
      this.textoFinal.textContent = "Lograste formar los 11 jugadores. ¡Campeón del Mundial de la Informática!";
    } else if (cantidad >= 7) {
      this.tituloFinal.textContent = "⚽ ¡Muy buen equipo!";
      this.textoFinal.textContent = `Formaste ${cantidad} de 11 jugadores. Te faltó poco para completar la selección.`;
    } else {
      this.tituloFinal.textContent = "💻 A seguir practicando";
      this.textoFinal.textContent = `Formaste ${cantidad} de 11 jugadores. Podés intentarlo otra vez y aprender más informática.`;
    }

    this.alineacionFinal.innerHTML = this.crearResumenAlineacion();
  }

  crearResumenAlineacion() {
    const posiciones = ["Arquero", "Defensa", "Mediocampista", "Delantero"];

    return posiciones
      .map((posicion) => {
        const jugadores = this.equipo.obtenerPorPosicion(posicion);
        const nombres = jugadores.length > 0
          ? jugadores.map((jugador) => jugador.nombre).join(" - ")
          : "Sin jugadores";

        return `<p><strong>${posicion}:</strong> ${nombres}</p>`;
      })
      .join("");
  }

  mezclarArray(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }
}

const juego = new Juego();
