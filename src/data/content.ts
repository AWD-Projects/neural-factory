/**
 * Contenido del sitio de Neural Factory.
 * Todo el texto sale de la versión anterior del sitio (mismos datos, mismas
 * secciones), reescrito en voz de "tú" y sin adjetivos de relleno.
 * No hay cifras, reseñas ni clientes inventados.
 */

export const SITE = {
  name: "Neural Factory",
  domain: "neural-factory.com",
  email: "info@neural-factory.com",
  linkedin: "https://www.linkedin.com/company/neuralfactory/",
  twitterHandle: "@NeuralFactory",
  credit: { label: "AMOXTLI", href: "https://www.amoxtli.tech" },
} as const;

export const SEO = {
  // 51 caracteres: caben completos en el resultado de búsqueda.
  title: "Neural Factory: IA y Machine Learning para empresas",
  description:
    "Modelos de inteligencia artificial, machine learning y visión por computadora para empresas. Automatiza procesos y decide con datos. Cuéntanos tu caso.",
  knowsAbout: [
    "Inteligencia artificial",
    "Machine learning",
    "Aprendizaje profundo",
    "Visión por computadora",
    "Procesamiento del lenguaje natural",
    "Redes neuronales",
    "Ciencia de datos",
    "Análisis de datos",
    "Automatización de procesos",
  ],
} as const;

export const NAV = [
  { id: "nosotros", label: "Nosotros" },
  { id: "equipo", label: "Equipo" },
  { id: "rendimiento", label: "Rendimiento" },
  { id: "servicios", label: "Servicios" },
  { id: "industrias", label: "Industrias" },
] as const;

export const CTA = { label: "Cuéntanos tu caso", href: "#contacto" } as const;

export const HERO = {
  eyebrow: "IA · Machine learning · Visión por computadora",
  // El h1 lleva la palabra clave principal: "inteligencia artificial para empresas".
  title: ["Inteligencia artificial", "para empresas, a la", "medida de tu", "presupuesto."],
  titleText: "Inteligencia artificial para empresas, a la medida de tu presupuesto.",
  lead: "Convertimos tus datos en modelos que optimizan operaciones y mejoran decisiones: aprendizaje automático, aprendizaje profundo y visión por computadora, con un equipo que te acompaña hasta producción.",
  secondary: { label: "Ver las pruebas de rendimiento", href: "#rendimiento" },
} as const;

export const ABOUT = {
  title: "¿Qué es Neural Factory?",
  statement:
    "Ayudamos a empresas de distintas industrias a sacar provecho de la inteligencia artificial. Desarrollamos modelos de aprendizaje automático, aprendizaje profundo y visión por computadora para optimizar tus operaciones, mejorar tus decisiones y crecer. Cada proyecto parte de tus necesidades y de tus objetivos de negocio.",
  items: [
    {
      id: "quienes-somos",
      title: "¿Quiénes somos?",
      text: "Transformamos procesos empresariales con inteligencia artificial y machine learning. Buscamos que la tecnología de punta rinda en tu operación sin comprometer tu presupuesto.",
      image: "/images/about/quienes-somos-g.webp",
      alt: "Red de nodos amarillos conectados formando una esfera sobre fondo oscuro",
    },
    {
      id: "historia",
      title: "Historia",
      text: "Neural Factory nació con una idea: que la IA sea accesible para todas las empresas. Seguimos en evolución constante para estar al día con lo que se hace en IA.",
      image: "/images/about/historia-g.webp",
      alt: "Líneas de contorno onduladas en amarillo y gris, como curvas de datos",
    },
    {
      id: "mision",
      title: "Misión",
      text: "Acelerar la transformación digital de las empresas con IA y ML accesibles, para que aproveches mejor tus recursos y logres un alto retorno de inversión.",
      image: "/images/about/mision-g.webp",
      alt: "Cuadros de detección con esquinas marcadas y una mira central, como en visión por computadora",
    },
    {
      id: "vision",
      title: "Visión",
      text: "Ser referentes en desarrollo de IA y ML, con herramientas efectivas que permitan a las empresas evolucionar sin disparar sus costos.",
      image: "/images/about/vision-g.webp",
      alt: "Malla de terreno en perspectiva dibujada con líneas amarillas",
    },
    {
      id: "valores",
      title: "Valores",
      text: "Eficiencia, asequibilidad, innovación y colaboración.",
      values: ["Eficiencia", "Asequibilidad", "Innovación", "Colaboración"],
      image: "/images/about/valores-g.webp",
      alt: "Círculos concéntricos tipo radar con puntos amarillos",
    },
  ],
} as const;

export const TEAM = {
  title: "Conoce a los NF's",
  intro:
    "Ciencia de datos, inteligencia artificial y matemáticas aplicadas: las personas que hay detrás de cada modelo.",
  people: [
    {
      name: "Daniel Núñez",
      first: "Daniel",
      role: "Científico de Datos",
      bio: "Ingeniero en Ciencia de Datos con maestría en IA. Se especializa en machine learning, big data y optimización, y domina herramientas como Azure, SQL y Python. Su enfoque son las soluciones tecnológicas que optimizan procesos y generan valor.",
      photo: "/images/team/daniel.webp",
      linkedin: "https://www.linkedin.com/in/danielnunez10",
      linkedinConfirmed: true,
      email: "daniel.nunez@neural-factory.com",
    },
    {
      name: "Ricardo López",
      first: "Ricardo",
      role: "Científico de Datos",
      bio: "Formación en nanotecnología y ciencia de datos, con especialidad en redes neuronales y optimización de procesos. Ha trabajado en las industrias farmacéutica y tecnológica desarrollando modelos predictivos para mejorar la gestión y las decisiones estratégicas.",
      photo: "/images/team/ricardo.webp",
      linkedin: "https://www.linkedin.com/in/ricardo-lopez-cruz-01a125221",
      linkedinConfirmed: true,
      email: "ricardo.lopez@neural-factory.com",
    },
    {
      name: "Efraín Pantoja",
      first: "Efraín",
      role: "Actuario",
      bio: "Actuario por la UNAM con estudios en modelación matemática. Se especializa en optimización y en modelos determinísticos y probabilísticos de inventarios. En ciencia de datos aplica análisis matemático y modelación para gestionar mejor los recursos de las empresas.",
      photo: "/images/team/efrain.webp",
      // TODO(cliente): este enlace pertenece a un perfil "Efraín López"; confirmar el de Efraín Pantoja.
      linkedin: "https://www.linkedin.com/in/efra%C3%ADn-l%C3%B3pez-2384632a",
      linkedinConfirmed: false,
      email: "efrain.pantoja@neural-factory.com",
    },
  ],
} as const;

export type BenchmarkRow = { tool: string; seconds: number | null };
export type Benchmark = { id: string; label: string; rows: BenchmarkRow[] };

export const PERFORMANCE = {
  title: "Elegimos Megaladata por su rendimiento",
  text: "Es el software con el que trabajamos tus datos. Estas son las pruebas de carga con tres volúmenes de información frente a RapidMiner, Alteryx, Pentaho y KNIME.",
  caption: "Tiempo de procesamiento en segundos. Menos es más rápido.",
  unfinished: "Más de dos horas o no cargó",
  // Datos tomados tal cual de los tres gráficos del sitio anterior.
  // TODO(cliente): confirmar la fuente y la fecha de estas pruebas para citarlas en el sitio.
  benchmarks: [
    {
      id: "7-5",
      label: "7.5 GB",
      rows: [
        { tool: "Megaladata", seconds: 66 },
        { tool: "RapidMiner", seconds: 70 },
        { tool: "Alteryx", seconds: 73 },
        { tool: "Pentaho", seconds: 170 },
        { tool: "KNIME", seconds: 4560 },
      ],
    },
    {
      id: "14-5",
      label: "14.5 GB",
      rows: [
        { tool: "Megaladata", seconds: 117 },
        { tool: "RapidMiner", seconds: 197 },
        { tool: "Pentaho", seconds: 1495 },
        { tool: "Alteryx", seconds: null },
        { tool: "KNIME", seconds: null },
      ],
    },
    {
      id: "58",
      label: "58 GB",
      rows: [
        { tool: "Megaladata", seconds: 226 },
        { tool: "RapidMiner", seconds: 5270 },
        { tool: "Pentaho", seconds: null },
        { tool: "Alteryx", seconds: null },
        { tool: "KNIME", seconds: null },
      ],
    },
  ] satisfies Benchmark[],
} as const;

export const SERVICES = {
  title: "Servicios de inteligencia artificial y ciencia de datos",
  intro:
    "Desde el análisis de tus datos hasta la automatización de procesos: proyectos de IA pensados para que decidas más rápido y con mejor información.",
  items: [
    {
      title: "Análisis de datos",
      text: "Desarrollos con gran capacidad de integración a tus sistemas, para aprovechar todo el potencial de tus datos.",
      image: "/images/services/analisis-g.webp",
      alt: "Gráfica de línea con área sombreada y un punto amarillo en el valor más reciente",
    },
    {
      title: "Automatización de procesos",
      text: "Reduce tiempos de procesamiento y costos operativos con automatizaciones diseñadas para tus procesos.",
      image: "/images/services/automatizacion-g.webp",
      alt: "Cinco carriles de proceso con etapas conectadas y algunas resaltadas en amarillo",
    },
    {
      title: "Ciencia de datos y redes neuronales",
      text: "Modelos avanzados para decidir con más información: visión por computadora, procesamiento del lenguaje natural, series de tiempo, aprendizaje por refuerzo y otras áreas de especialización.",
      image: "/images/services/ciencia-datos-g.webp",
      alt: "Diagrama de árbol de decisión con nodos amarillos y conexiones curvas",
    },
    {
      title: "Gestión de proyectos de IA",
      text: "Te acompañamos en la gestión de tus proyectos y en su paso a producción. También capacitamos a tu equipo en herramientas como ChatGPT y automatizamos el machine learning con AutoML.",
      image: "/images/services/gestion-proyectos-g.webp",
      alt: "Matriz de celdas con bloques amarillos y una selección resaltada",
    },
    {
      title: "Pasantías universitarias",
      text: "Un programa para que estudiantes ganen experiencia práctica en proyectos reales. Trabajamos por etapas: definimos el caso de uso, lo implementamos y lo optimizamos.",
      image: "/images/services/pasantias-g.webp",
      alt: "Red pequeña de nodos conectados en amarillo",
    },
  ],
} as const;

export const INDUSTRIES = {
  title: "Industrias con las que hemos trabajado",
  text: "Ayudamos a optimizar su logística, marketing y operaciones.",
  items: [
    { name: "Banca", image: "/images/industries/banca-g.webp", alt: "Barras de datos crecientes con las últimas tres en amarillo" },
    { name: "Educación", image: "/images/industries/educacion-g.webp", alt: "Árbol de conocimiento con nodos ramificados" },
    { name: "Energías", image: "/images/industries/energias-g.webp", alt: "Ondas senoidales superpuestas, la principal en amarillo" },
    { name: "Gobierno", image: "/images/industries/gobierno-g.webp", alt: "Fachada con columnas y frontón en amarillo y gris" },
    { name: "Logística", image: "/images/industries/logistica-g.webp", alt: "Rutas punteadas que conectan puntos en un mapa abstracto" },
    { name: "Manufactura", image: "/images/industries/manufactura-g.webp", alt: "Bloques isométricos apilados, algunos resaltados en amarillo" },
    { name: "Retail", image: "/images/industries/retail-g.webp", alt: "Grupos de puntos que representan segmentos de clientes" },
    { name: "Salud", image: "/images/industries/salud-g.webp", alt: "Electrocardiograma en amarillo sobre una cuadrícula" },
    { name: "Seguros", image: "/images/industries/seguros-g.webp", alt: "Malla hexagonal con un núcleo protegido resaltado en amarillo" },
    { name: "Telecomunicaciones", image: "/images/industries/telecomunicaciones-g.webp", alt: "Arcos de señal que salen de un punto y llegan a antenas" },
  ],
} as const;

export const CONTACT = {
  title: "Cuéntanos qué proceso quieres mejorar.",
  text: "Llena el formulario con tus datos de contacto y te respondemos por correo.",
  fields: {
    name: "Nombre",
    email: "Correo electrónico",
    areas: "¿Qué área te interesa?",
    message: "Mensaje",
  },
  areas: [
    "Análisis de datos",
    "Automatización de procesos",
    "Ciencia de datos y redes neuronales",
    "Gestión de proyectos de IA",
    "Pasantías universitarias",
  ],
  submit: "Enviar mi caso",
  sending: "Enviando…",
  success: "Listo, recibimos tu mensaje. Te escribiremos al correo que dejaste.",
  error: `No pudimos enviar el mensaje. Escríbenos directamente a ${SITE.email}.`,
  invalid: "Revisa tu nombre, tu correo y el mensaje antes de enviar.",
  directLabel: "O escríbenos directo",
} as const;

export const FOOTER = {
  peopleLabel: "Escríbele directo a",
  rights: "Todos los derechos reservados",
  creditPrefix: "Diseño y desarrollo:",
} as const;
