function dado() {
    return Math.floor(Math.random() * 6) + 1;
}

let jugadores_registrados = [];
let jugadores_en_orden = [];
let cuota = 0;
let pote = 0.0;


function registrar_jugador(nombre) {
    jugadores_registrados.push(nombre);
}


const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

document.addEventListener('DOMContentLoaded', () => {
    let cola_grupos = [];
    let indice_en_grupo = 0;
    let resultados_grupo = [];

    //Flags
    let en_definicion_turnos = false;
    let en_juego = false;

    //Elementos del DOM necesarios
    const seccion_cuota = document.getElementById('seccion_cuota');
    const seccion_registro = document.getElementById('registro_jugador');
    const boton_empezar_juego = document.getElementById('empezar_juego_btn');
    const campo_nombre_jugador = document.getElementById('nombre_jugador');
    const seccion_definir_turnos = document.getElementById('definir_turnos');
    const numero_obtenido_para_turno = document.getElementById('numero_obtenido_para_turno');
    const turno_jugador = document.getElementById('turno_jugador');

    //Ingresar cuota
    document.getElementById('cuota_btn').addEventListener('click', event => {
        event.preventDefault();
        let valor_cuota = parseFloat(document.getElementById('cuota').value);
        if (isNaN(valor_cuota) || valor_cuota <= 0) {
            alert("No se ha ingresado un valor para la cuota o el valor es invalido");
            return;
        }
        cuota = valor_cuota;
        console.log(cuota);
        seccion_cuota.hidden = true;
        seccion_registro.hidden = false;
        boton_empezar_juego.hidden = false;
    });

    //Registrar jugador
    document.getElementById('registrar_btn').addEventListener('click', event => {
        event.preventDefault();
        const nombre = campo_nombre_jugador.value.trim();

        if (nombre === "") {
            alert("El nombre del jugador no puede estar vacio");
            campo_nombre_jugador.focus();
            return;
        }

        registrar_jugador(nombre);
        pote += cuota;
        campo_nombre_jugador.value = "";
        console.log(jugadores_registrados);
        console.log("Valor actual del pote: " + pote)
    });

    function actualizar_ui_turno(nombre) {
        turno_jugador.innerText = "Jugador: " + nombre;
        numero_obtenido_para_turno.innerText = "Numero obtenido: ";
    }

    // ---- Elementos del DOM para la fase de juego ----
    const seccion_juego = document.getElementById('juego');
    const pote_actual_elem = document.getElementById('pote_actual');
    const turno_actual_jugador_elem = document.getElementById('turno_actual_jugador');
    const fase_primer_tiro = document.getElementById('fase_primer_tiro');
    const boton_lanzar_primer = document.getElementById('lanzar_primer_dado_btn');
    const resultado_primer_tiro_elem = document.getElementById('resultado_primer_tiro');
    const fase_decision_apuesta = document.getElementById('fase_decision_apuesta');
    const mensaje_decision_elem = document.getElementById('mensaje_decision');
    const campo_monto_apuesta = document.getElementById('monto_apuesta');
    const boton_apostar = document.getElementById('apostar_btn');
    const boton_no_arriesgar = document.getElementById('no_arriesgar_btn');
    const fase_segundo_tiro = document.getElementById('fase_segundo_tiro');
    const boton_lanzar_segundo = document.getElementById('lanzar_segundo_dado_btn');
    const resultado_segundo_tiro_elem = document.getElementById('resultado_segundo_tiro');
    const mensaje_resultado_turno_elem = document.getElementById('mensaje_resultado_turno');

    let turno_actual = 0;
    let primer_tiro_valor = 0;
    let monto_apostado = 0;

    function actualizar_pote_ui() {
        pote_actual_elem.innerText = pote.toFixed(2);
    }

    function iniciar_turno() {
        fase_primer_tiro.hidden = false;
        fase_decision_apuesta.hidden = true;
        fase_segundo_tiro.hidden = true;
        resultado_primer_tiro_elem.innerText = "";
        resultado_segundo_tiro_elem.innerText = "";
        mensaje_resultado_turno_elem.innerText = "";
        campo_monto_apuesta.value = "";

        let jugador = jugadores_en_orden[turno_actual];
        turno_actual_jugador_elem.innerText = "Turno de: " + jugador;
        actualizar_pote_ui();
    }

    function pasar_turno() {
        turno_actual = (turno_actual + 1) % jugadores_en_orden.length;
        iniciar_turno();
    }

    function reiniciar_ronda_guayabita(nombre) {
        alert(nombre + "¡Se comió la guayabita! Todos vuelven a poner la cuota inicial.");
        pote = jugadores_en_orden.length * cuota;
        actualizar_pote_ui();
        pasar_turno();
    }

    boton_lanzar_primer.addEventListener('click', event => {
        event.preventDefault();
        primer_tiro_valor = dado();
        resultado_primer_tiro_elem.innerText = "Resultado: " + primer_tiro_valor;

        if (primer_tiro_valor === 1 || primer_tiro_valor === 6) {
            pote += cuota;
            actualizar_pote_ui();
            mensaje_resultado_turno_elem.innerText =
                jugadores_en_orden[turno_actual] + " sacó " + primer_tiro_valor +
                " y pierde el turno. Pone " + cuota.toFixed(2) + " al pote.";
            fase_primer_tiro.hidden = true;
            setTimeout(pasar_turno, 2000);
            return;
        }

        // 2, 3, 4 o 5: puede apostar
        fase_primer_tiro.hidden = true;
        fase_decision_apuesta.hidden = false;
        mensaje_decision_elem.innerText =
            "Sacaste " + primer_tiro_valor + ". ¿Quieres apostar parte del pote ($" +
            pote.toFixed(2) + ")?";
        campo_monto_apuesta.max = pote;
    });

    boton_no_arriesgar.addEventListener('click', event => {
        event.preventDefault();
        mensaje_resultado_turno_elem.innerText =
            jugadores_en_orden[turno_actual] + " decidió no arriesgar.";
        fase_decision_apuesta.hidden = true;
        setTimeout(pasar_turno, 1500);
    });

    boton_apostar.addEventListener('click', event => {
        event.preventDefault();
        let monto = parseFloat(campo_monto_apuesta.value);

        if (isNaN(monto) || monto <= 0) {
            alert("Debes ingresar un monto de apuesta valido");
            return;
        }
        if (monto > pote) {
            alert("No puedes apostar mas de lo que hay en el pote");
            return;
        }

        monto_apostado = monto;
        fase_decision_apuesta.hidden = true;
        fase_segundo_tiro.hidden = false;
    });

    boton_lanzar_segundo.addEventListener('click', event => {
        event.preventDefault();
        let segundo_tiro_valor = dado();
        resultado_segundo_tiro_elem.innerText = "Resultado: " + segundo_tiro_valor;
        fase_segundo_tiro.hidden = true;

        if (segundo_tiro_valor > primer_tiro_valor) {
            let se_comio_la_guayabita = (monto_apostado === pote);
            pote -= monto_apostado;
            actualizar_pote_ui();
            mensaje_resultado_turno_elem.innerText =
                jugadores_en_orden[turno_actual] + " gana $" + monto_apostado.toFixed(2) + " del pote.";

            if (se_comio_la_guayabita) {
                setTimeout(reiniciar_ronda_guayabita(jugadores_en_orden[turno_actual]), 2000);
                return;
            }
        } else {
            pote += monto_apostado;
            actualizar_pote_ui();
            mensaje_resultado_turno_elem.innerText =
                jugadores_en_orden[turno_actual] + " pierde la apuesta y pone $" +
                monto_apostado.toFixed(2) + " al pote.";
        }

        setTimeout(pasar_turno, 2000);
    });

    function iniciar_partida() {
        seccion_definir_turnos.hidden = true;
        en_definicion_turnos = false;
        en_juego = true;

        console.log("Orden final de turnos:", jugadores_en_orden);

        seccion_juego.hidden = false;
        turno_actual = 0;
        iniciar_turno();
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

    //Empezar juego
    boton_empezar_juego.addEventListener('click', event => {
        event.preventDefault();
        //Verificar que haya jugadores para empezar
        if (jugadores_registrados.length <= 1) {
            alert("No hay suficientes jugadores para empezar la partida. Cant. Jugadores Actual: " + jugadores_registrados.length);
            return;
        }
        seccion_registro.hidden = true;
        seccion_definir_turnos.hidden = false;
        boton_empezar_juego.hidden = true;
        en_definicion_turnos = true;

        cola_grupos = [[...jugadores_registrados]];
        jugadores_en_orden = [];
        procesar_siguiente_grupo();
    });

    document.getElementById('d_lanzar_btn').addEventListener('click', async (event) => {
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
