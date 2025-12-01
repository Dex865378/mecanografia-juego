// VELOCITY Word Bank - Expanded
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

    science: [
        "fotosintesis", "termodinamica", "electromagnetismo", "biotecnologia", "nanotecnologia",
        "astrofisica", "microbiologia", "paleontologia", "neurociencia", "genetica",
        "evolucion", "gravedad", "relatividad", "cuantico", "particula", "molecula",
        "organismo", "ecosistema", "biosfera", "atmosfera", "litosfera", "hidrosfera",
        "metabolismo", "respiracion", "reproduccion", "mutacion", "seleccion", "adaptacion",
        "hipotesis", "teoria", "experimento", "observacion", "conclusion", "variable",
        "constante", "ecuacion", "formula", "calculo", "medida", "precision",
        "exactitud", "incertidumbre", "probabilidad", "estadistica", "algoritmo", "logaritmo",
        "exponencial", "derivada", "integral", "vector", "matriz", "tensor",
        "fractal", "caos", "entropia", "entalpia", "energia", "cinetica",
        "potencial", "mecanica", "optica", "acustica", "termica", "nuclear",
        "fusion", "fision", "radiacion", "espectro", "frecuencia", "longitud",
        "amplitud", "resonancia", "vibracion", "oscilacion", "onda", "particula",
        "telescopio", "microscopio", "espectroscopio", "sismografo", "barometro", "termometro",
        "cronometro", "balanza", "pipeta", "probeta", "matraz", "bisturi",
        "estetoscopio", "electrodo", "cateter", "implante", "protesis", "vacuna",
        "antibiotico", "antivirus", "bacteria", "virus", "hongo", "parasito",
        "celula", "tejido", "organo", "sistema", "esqueleto", "musculo",
        "nervio", "cerebro", "corazon", "pulmon", "higado", "riñon",
        "estomago", "intestino", "sangre", "linfa", "hormona", "enzima",
        "proteina", "lipido", "glucido", "vitamina", "mineral", "nutriente",
        "caloria", "metabolismo", "homeostasis", "inmunidad", "patogeno", "antigeno",
        "anticuerpo", "fagocito", "linfocito", "neurona", "sinapsis", "impulso",
        "reflejo", "instinto", "memoria", "aprendizaje", "cognicion", "emocion",
        "conciencia", "percepcion", "sensacion", "estimulo", "respuesta", "conducta",
        "etologia", "ecologia", "habitat", "nicho", "poblacion", "comunidad",
        "bioma", "tundra", "taiga", "bosque", "selva", "desierto",
        "sabana", "pradera", "arrecife", "estuario", "humedal", "pantano",
        "clima", "tiempo", "estacion", "ciclo", "carbono", "nitrogeno",
        "fosforo", "agua", "oxigeno", "ozono", "invernadero", "calentamiento",
        "cambio", "climatico", "contaminacion", "polucion", "residuo", "reciclaje",
        "renovable", "sostenible", "ecologico", "ambiental", "conservacion", "preservacion",
        "extincion", "biodiversidad", "especie", "genero", "familia", "orden",
        "clase", "filo", "reino", "dominio", "taxonomia", "filogenia",
        "cladistica", "evolucion", "darwin", "lamarck", "mendel", "pasteur",
        "curie", "einstein", "newton", "galileo", "copernico", "kepler",
        "hawking", "tesla", "edison", "bell", "marconi", "morse",
        "nobel", "turing", "lovelace", "franklin", "watson", "crick"
    ],

    chemistry: [
        "hidrogeno", "helio", "litio", "berilio", "boro", "carbono", "nitrogeno", "oxigeno",
        "fluor", "neon", "sodio", "magnesio", "aluminio", "silicio", "fosforo", "azufre",
        "cloro", "argon", "potasio", "calcio", "escandio", "titanio", "vanadio", "cromo",
        "manganeso", "hierro", "cobalto", "niquel", "cobre", "zinc", "galio", "germanio",
        "arsenico", "selenio", "bromo", "kripton", "rubidio", "estroncio", "itrio", "zirconio",
        "niobio", "molibdeno", "tecnecio", "rutenio", "rodio", "paladio", "plata", "cadmio",
        "indio", "estaño", "antimonio", "telurio", "yodo", "xenon", "cesio", "bario",
        "lantano", "cerio", "praseodimio", "neodimio", "prometio", "samario", "europio", "gadolinio",
        "terbio", "disprosio", "holmio", "erbio", "tulio", "iterbio", "lutecio", "hafnio",
        "tantalo", "wolframio", "renio", "osmio", "iridio", "platino", "oro", "mercurio",
        "talio", "plomo", "bismuto", "polonio", "astato", "radon", "francio", "radio",
        "actinio", "torio", "protactinio", "uranio", "neptunio", "plutonio", "americio", "curio",
        "berkelio", "californio", "einstenio", "fermio", "mendelevio", "nobelio", "lawrencio", "rutherfordio",
        "dubnio", "seaborgio", "bohrio", "hasio", "meitnerio", "darmstatio", "roentgenio", "copernicio",
        "nihonio", "flerovio", "moscovio", "livermorio", "teneso", "oganeson",
        "acido", "base", "sal", "oxido", "hidruro", "peroxido", "alcance", "alqueno",
        "alquino", "alcohol", "eter", "aldehido", "cetona", "ester", "amina", "amida",
        "nitrilo", "benceno", "fenol", "tolueno", "anilina", "piridina", "polimero", "monomero",
        "plastico", "caucho", "fibra", "resina", "catalizador", "reaccion", "sintesis", "analisis",
        "destilacion", "filtracion", "cristalizacion", "cromatografia", "electrolisis", "hidrolisis", "oxidacion", "reduccion",
        "combustion", "fermentacion", "saponificacion", "neutralizacion", "precipitacion", "disolucion", "solubilidad", "concentracion",
        "molaridad", "normalidad", "molalidad", "fraccion", "molar", "estequiometria", "equilibrio", "cinetica",
        "termoquimica", "electroquimica", "radioquimica", "bioquimica", "geoquimica", "petroquimica", "farmacoquimica"
    ],

    getAllWords() {
        return [...this.common, ...this.science, ...this.chemistry];
    },

    getRandomWord(category = 'all') {
        let pool;
        if (category === 'science') pool = this.science;
        else if (category === 'chemistry') pool = this.chemistry;
        else if (category === 'common') pool = this.common;
        else pool = this.getAllWords();

        return pool[Math.floor(Math.random() * pool.length)];
    },

    // Get a random word from specific category with minimum length
    getRandomWordByLength(category, minLength) {
        let pool;
        if (category === 'science') pool = this.science;
        else if (category === 'chemistry') pool = this.chemistry;
        else pool = this.getAllWords();

        const filtered = pool.filter(w => w.length >= minLength);
        if (filtered.length === 0) return this.getRandomWord(category); // Fallback
        return filtered[Math.floor(Math.random() * filtered.length)];
    },

    getWords(count, category = 'all') {
        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(this.getRandomWord(category));
        }
        return words;
    }
};
