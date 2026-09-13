# 🎲 Guayabita

**Guayabita** es un juego de azar tradicional basado en lanzamientos de dado y apuestas. Los jugadores compiten por ganar el dinero acumulado en un **pote**, tomando decisiones sobre cuánto arriesgar en cada turno.

---

## 📋 Reglas básicas

### 1. Preparación

* Todos los jugadores aportan una **cuota inicial igual** para formar el pote.

  * Por ejemplo: **$1.000 o $2.000 pesos** por jugador.
* Se define quién comienza lanzando el dado.
* Cada jugador realiza un lanzamiento y **quien obtenga el número más alto empieza**.

---

### 2. Lanzamiento del dado

En cada turno, el jugador lanza un dado. El resultado determina la acción que debe realizar:

|      Resultado     | Acción                                                                                 |
| :----------------: | -------------------------------------------------------------------------------------- |
|    🎲 **1 o 6**    | Pierde el turno y debe aportar al pote una cuota adicional igual a la apuesta inicial. |
| 🎲 **2, 3, 4 o 5** | Obtiene el derecho a realizar una apuesta.                                             |

---

### 3. Dinámica de la apuesta: "Tomar o Dejar"

Cuando el jugador obtiene un número entre **2 y 5**, puede decidir si quiere arriesgar dinero del pote.

#### 💰 Si decide apostar

1. El jugador elige cuánto dinero desea apostar.

   * Puede ser una **fracción del pote**.
   * También puede apostar **todo el dinero disponible**.
2. Realiza un segundo lanzamiento del dado.
3. Se compara el resultado del segundo lanzamiento con el resultado del primero:

|             Segundo lanzamiento             | Resultado                                                                   |
| :-----------------------------------------: | --------------------------------------------------------------------------- |
|     **Mayor que el primer lanzamiento**     | ✅ Gana la apuesta y retira del pote la cantidad que apostó.                 |
| **Igual o menor que el primer lanzamiento** | ❌ Pierde la apuesta y debe poner en el pote la cantidad que había apostado. |

#### 🚫 Si decide no arriesgar

El jugador puede decidir **no realizar ninguna apuesta**.

En ese caso:

* No gana dinero.
* No pierde dinero.
* Pasa el dado al siguiente jugador.

---

### 4. 🥇 La "Guayabita"

La **Guayabita** ocurre cuando un jugador apuesta **todo el dinero disponible en el pote** y gana el segundo lanzamiento.

En este caso:

> 🍈 **El jugador "se comió la guayabita" y limpia el pote.**

Una vez que el pote queda vacío:

1. Todos los jugadores vuelven a aportar la **cuota inicial**.
2. Se forma un nuevo pote.
3. Comienza una **nueva ronda**.

---

## 🔄 Resumen del turno

```text
                 🎲 Lanzar dado
                       │
             ┌─────────┴─────────┐
             │                   │
           1 o 6                2 - 5
             │                   │
       Paga cuota           ¿Apostar?
       al pote                  │
             │           ┌───────┴───────┐
             │           │               │
             │          NO              SÍ
             │           │               │
             │      Pasa turno       Elige apuesta
             │                           │
             │                      🎲 Segundo tiro
             │                           │
             │                   ┌───────┴───────┐
             │                   │               │
             │                 > 1er tiro     ≤ 1er tiro
             │                   │               │
             │                  GANA           PIERDE
             │                   │               │
             │             Retira apuesta    Paga apuesta
             │
             └──────────────► Siguiente jugador
```

---

## 🎯 Objetivo

El objetivo del juego es **ganar dinero del pote mediante apuestas acertadas**, intentando aumentar las ganancias y evitando perder las apuestas realizadas.

La partida continúa mientras exista dinero en el pote. Cuando un jugador logra **limpiarlo por completo**, se reinicia una nueva ronda con las cuotas iniciales.

---

## 📝 Ejemplo

Supongamos que el pote contiene **$10.000**.

Un jugador lanza el dado y obtiene un **4**.

Decide apostar **$5.000** y realiza un segundo lanzamiento:

* 🎲 Obtiene **5** → `5 > 4` → **Gana** y retira $5.000 del pote.
* 🎲 Obtiene **4** → `4 ≤ 4` → **Pierde** y debe poner $5.000 en el pote.
* 🎲 Obtiene **2** → `2 ≤ 4` → **Pierde** y debe poner $5.000 en el pote.

Si el jugador hubiera apostado los **$10.000 completos** y hubiera obtenido un número mayor que 4, habría **"comido la guayabita"** y limpiado todo el pote. 🍈🎲
