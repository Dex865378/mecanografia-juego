// VELOCITY Word Bank - 500+ Spanish Words
const WordBank = {
    common: [
        "tiempo", "juego", "vida", "casa", "mundo", "forma", "parte", "ojos", "mano", "vez",
        "mujer", "hombre", "dia", "niño", "amor", "noche", "agua", "amigo", "lado", "lugar",
        "madre", "padre", "trabajo", "hora", "punto", "gente", "cuerpo", "mente", "alma", "fuego",
        "tierra", "aire", "mar", "sol", "luna", "estrella", "cielo", "nube", "lluvia", "nieve",
        "arbol", "flor", "hoja", "fruta", "animal", "perro", "gato", "ave", "pez", "leon",
        "tigre", "oso", "lobo", "zorro", "raton", "vaca", "cerdo", "pollo", "pato", "cisne",
        "mesa", "silla", "cama", "puerta", "ventana", "pared", "techo", "piso", "baño", "cocina",
        "sala", "cuarto", "jardin", "patio", "calle", "camino", "ruta", "viaje", "coche", "moto",
        "tren", "avion", "barco", "nave", "bici", "rueda", "motor", "freno", "gas", "luz",
        "color", "rojo", "azul", "verde", "gris", "negro", "blanco", "rosa", "oro", "plata",
        "papel", "libro", "letra", "texto", "voz", "sonido", "musica", "arte", "cine", "foto",
        "video", "red", "web", "chat", "app", "dato", "wifi", "mouse", "tecla", "chip",
        "codigo", "java", "html", "css", "python", "ruby", "swift", "rust", "go", "php",
        "sql", "mongo", "node", "react", "vue", "next", "nest", "git", "bash", "shell",
        "linux", "unix", "win", "mac", "ios", "droid", "pixel", "byte", "bit", "mega",
        "giga", "tera", "peta", "exa", "zetta", "yotta", "nano", "micro", "mili", "kilo",
        "hertz", "watt", "volt", "amp", "ohm", "joule", "newton", "gramo", "litro", "metro",
        "segundo", "minuto", "semana", "mes", "año", "siglo", "era", "fase", "ciclo", "onda",
        "flujo", "ritmo", "pulso", "latido", "golpe", "paso", "salto", "giro", "vuelo", "caida",
        "subida", "bajada", "entrada", "salida", "inicio", "fin", "mitad", "centro", "borde", "fondo",
        "cima", "pico", "valle", "rio", "lago", "mar", "oceano", "costa", "playa", "arena",
        "roca", "piedra", "metal", "hierro", "acero", "cobre", "zinc", "plomo", "estaño", "oro",
        "plata", "bronce", "vidrio", "cristal", "madera", "cuero", "tela", "seda", "lana", "hilo",
        "aguja", "clavo", "tornillo", "tuerca", "llave", "candado", "caja", "bolsa", "saco", "maleta",
        "mochila", "cartera", "dinero", "pago", "precio", "costo", "valor", "venta", "compra", "cambio",
        "dolar", "euro", "peso", "yen", "yuan", "libra", "franco", "real", "sol", "luna",
        "marte", "venus", "tierra", "saturno", "jupiter", "urano", "neptuno", "pluton", "cometa", "meteoro",
        "galaxia", "nebula", "agujero", "negro", "blanco", "enano", "gigante", "super", "nova", "pulsar",
        "quasar", "laser", "robot", "cyborg", "android", "dron", "clon", "gen", "adn", "arn",
        "celula", "atomo", "neutron", "proton", "electron", "quark", "gluon", "foton", "boson", "spin",
        "masa", "peso", "fuerza", "poder", "energia", "trabajo", "calor", "frio", "hielo", "vapor",
        "gas", "plasma", "solido", "liquido", "estado", "fase", "cambio", "orden", "caos", "azar",
        "suerte", "destino", "karma", "dharma", "zen", "yoga", "reiki", "aura", "chakra", "mana",
        "magia", "hechizo", "truco", "mago", "bruja", "hada", "elfo", "orco", "troll", "ogro",
        "dragon", "fenix", "grifo", "hidra", "sirena", "triton", "ninfa", "musa", "dios", "diosa",
        "heroe", "villano", "rey", "reina", "prince", "duque", "conde", "baron", "lord", "lady",
        "sir", "dama", "caballero", "soldado", "guerrero", "arquero", "mago", "clerigo", "ladron", "bardo",
        "monje", "druida", "paladin", "ranger", "ninja", "samurai", "ronin", "shogun", "geisha", "sumo",
        "judo", "karate", "kendo", "aikido", "kungfu", "taichi", "wushu", "boxeo", "lucha", "mma",
        "futbol", "basket", "tenis", "golf", "rugby", "hockey", "voley", "surf", "skate", "ski",
        "snow", "bici", "moto", "auto", "rally", "f1", "nascar", "indy", "kart", "drift",
        "nitro", "turbo", "motor", "rueda", "llanta", "freno", "disco", "aleron", "capo", "baul",
        "puerta", "vidrio", "espejo", "luz", "faro", "guiño", "bocina", "radio", "gps", "mapa",
        "ruta", "calle", "avenida", "plaza", "parque", "museo", "teatro", "cine", "bar", "pub",
        "club", "disco", "fiesta", "baile", "musica", "ritmo", "salsa", "rock", "pop", "jazz",
        "blues", "metal", "punk", "funk", "soul", "rap", "trap", "hiphop", "reggae", "ska",
        "dub", "house", "techno", "trance", "dance", "edm", "bass", "drum", "guitar", "bajo",
        "piano", "violin", "flauta", "saxo", "trompeta", "bateria", "voz", "coro", "banda", "grupo",
        "solo", "duo", "trio", "cuarteto", "quinteto", "sexteto", "septeto", "octeto", "noneto", "deceto",
        "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
        "once", "doce", "trece", "catorce", "quince", "veinte", "treinta", "cuarenta", "cincuenta", "cien",
        "mil", "millon", "billon", "trillon", "cero", "nulo", "nada", "todo", "algo", "mucho",
        "poco", "bastante", "demasiado", "mas", "menos", "igual", "distinto", "mejor", "peor", "bueno",
        "malo", "rico", "pobre", "alto", "bajo", "gordo", "flaco", "lindo", "feo", "nuevo",
        "viejo", "joven", "adulto", "niño", "bebe", "abuelo", "tio", "primo", "sobrino", "nieto",
        "amigo", "enemigo", "vecino", "socio", "colega", "jefe", "lider", "guia", "maestro", "alumno"
    ],

    getRandomWord() {
        return this.common[Math.floor(Math.random() * this.common.length)];
    },

    getWords(count) {
        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(this.getRandomWord());
        }
        return words;
    }
};
