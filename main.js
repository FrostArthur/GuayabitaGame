function dado() {
    return Math.floor(Math.random() * 6) + 1;
}

let jugadores_registrados = [];
let jugadores_en_orden = [];
let pote = 0.0;

function registrar_jugador(nombre, cuota) {
    let nuevo_jugador = {
        nombre: nombre,
        cuota_inicial: cuota
    };
    jugadores_registrados.push(nuevo_jugador);
}

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    let en_definicion_turnos = false;
    let en_juego = false;

    //Elementos del DOM necesarios
    const seccion_registro = document.getElementById('registro_jugador');
    const seccion_definir_turnos = document.getElementById('definir_turnos');
    const boton_registrar = document.getElementById('registrar_btn');
    const boton_empezar_juego = document.getElementById('empezar_juego_btn');
    const campo_nombre_jugador = document.getElementById('nombre_jugador');
    const campo_cuota_jugador = document.getElementById('cuota_inicial');
    const turno_jugador = document.getElementById('turno_jugador');
    const lanzar_dado_inicial_boton = document.getElementById('d_lanzar_btn');
    const numero_obtenido_para_turno = document.getElementById('numero_obtenido_para_turno');

    //Registrar jugador (Definitva)
    boton_registrar.addEventListener('click', event => {
        event.preventDefault();
        const nombre = campo_nombre_jugador.value.trim();
        const cuota = parseFloat(campo_cuota_jugador.value);

        if (nombre === "") {
            alert("El nombre del jugador no puede estar vacio");
            campo_nombre_jugador.focus();
            return;
        }

        if (isNaN(cuota) || cuota <= 0.0) {
            alert("La cuota inicial no puede estar vacia ni ser 0 o negativa");
            campo_cuota_jugador.focus();
            return;
        } 

        registrar_jugador(nombre, cuota);
        pote += cuota;
        campo_nombre_jugador.value = "";
        campo_cuota_jugador.value = "";
        console.log(jugadores_registrados);
        console.log("Valor actual del pote: " + pote)
    });
    
    //Definir turnos
    boton_empezar_juego.addEventListener('click', event => {
        //Verificar que haya jugadores para empezar
        event.preventDefault;
        if (jugadores_registrados.length <= 1) {
            alert("No hay suficientes jugadores para empezar la partida. Cant. Jugadores Actual: " + jugadores.length);
            return;
        }
        seccion_registro.hidden = true;
        seccion_definir_turnos.hidden = false;
        boton_empezar_juego.hidden = true;
        en_definicion_turnos = true;

        cola_grupos = [[...jugadores_registrados]];
        procesar_siguiente_grupo();
    });

    function actualizar_ui_turno(jugador) {
        turno_jugador.innerText = "Jugador: " + jugador.nombre;
        numero_obtenido_para_turno.innerText = "Numero obtenido: ";
    }

    function iniciar_partida() {
        seccion_definir_turnos.hidden = true;
        en_definicion_turnos = false;
        en_juego = true;

        console.log("Orden final de turnos:",
            jugadores_en_orden.map(j => j.nombre));

        alert("Orden de turnos:\n" +
            jugadores_en_orden.map((j, i) => (i + 1) + ". " + j.nombre).join("\n"));
    }

    function procesar_siguiente_grupo() {
        if (cola_grupos.length === 0) {
            iniciar_partida();
            return;
        }

        let grupo = cola_grupos[0];

        if (grupo.length === 1) {
            jugadores_en_orden.push(grupo[0]);
            cola_grupos.shift();
            procesar_siguiente_grupo();
            return;
        }

        indice_en_grupo = 0;
        resultados_grupo = [];
        actualizar_ui_turno(grupo[indice_en_grupo]);
    }

    lanzar_dado_inicial_boton.addEventListener('click', async(event) => {
        event.preventDefault();

        let grupo = cola_grupos[0];
        let jugador = grupo[indice_en_grupo];
        let lanzamiento = dado();

        resultados_grupo.push({ jugador: jugador, valor: lanzamiento });
        numero_obtenido_para_turno.innerText += lanzamiento;

        await esperar(2500);

        indice_en_grupo++;

        if (indice_en_grupo < grupo.length) {
            actualizar_ui_turno(grupo[indice_en_grupo]);
            return;
        }

        resultados_grupo.sort((a, b) => b.valor - a.valor);

        let subgrupos = [];
        let i = 0;
        while (i < resultados_grupo.length) {
            let valor_actual = resultados_grupo[i].valor;
            let empatados = resultados_grupo
                .filter(r => r.valor === valor_actual)
                .map(r => r.jugador);
            subgrupos.push(empatados);
            i += empatados.length;
        }

        cola_grupos.shift();
        cola_grupos.unshift(...subgrupos);

        if (subgrupos.some(g => g.length > 1)) {
            alert("Hubo empate. Los jugadores empatados vuelven a lanzar el dado.");
        }

        procesar_siguiente_grupo();
    });
});
