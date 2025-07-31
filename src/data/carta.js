export const carta = [
  "Empanadas",
  "Bebidas",
  "Postres",
  "Perros",
  "Salchipapas",
  "Entradas",
  "Pastas",
];

export const empanadas = [
  {
    id: "1emca",
    nombre: "Empanada de Carne",
    precio: 2500,
    image: "/carta/empanadas/empanada.png",
    categoria: "empanadas",
    descripcion:
      "Deliciosa empanada rellena de carne molida sazonada con especias, cebolla y ajo, perfecta para los amantes de lo clásico.",
    ingredientes: [
      {
        id: 1,
        nombre: "Carne",
        cantidad: "120g",
        imagen: "/menuComponente/ingredientes/carne-molida.png",
      },
      {
        id: 2,
        nombre: "Cebolla",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/cebolla.png",
      },
      {
        id: 3,
        nombre: "Ajo",
        cantidad: "5g",
        imagen: "/menuComponente/ingredientes/ajo.png",
      },
      {
        id: 4,
        nombre: "Harina",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/harina-amarilla.png",
      },
    ],
  },
  {
    id: "2empol",
    nombre: "Empanada de Pollo",
    precio: 2500,
    image: "/carta/empanadas/empanada.png",
    categoria: "empanadas",
    descripcion:
      "Rellena de pollo desmechado con zanahoria, champiñones y un toque de queso, ideal para quienes buscan algo suave y sabroso.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pollo",
        cantidad: "100g",
        imagen: "/menuComponente/ingredientes/pollo.png",
      },
      {
        id: 2,
        nombre: "Zanahoria",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/zanahoria.png",
      },
      {
        id: 3,
        nombre: "Champiñón",
        cantidad: "25g",
        imagen: "/menuComponente/ingredientes/champiñones.png",
      },
      {
        id: 4,
        nombre: "Queso",
        cantidad: "15g",
        imagen: "/menuComponente/ingredientes/queso.png",
      },
    ],
  },
  {
    id: "3emja",
    nombre: "Empanada de Jamón y Queso",
    precio: 2500,
    image: "/carta/empanadas/empanada.png",
    categoria: "empanadas",
    descripcion:
      "Una combinación clásica: jamón tierno y queso derretido, con un toque de tomate fresco que le da sabor y textura única.",
    ingredientes: [
      {
        id: 1,
        nombre: "Jamón",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/jamon.png",
      },
      {
        id: 2,
        nombre: "Queso",
        cantidad: "50g",
        imagen: "/menuComponente/ingredientes/queso.png",
      },
      {
        id: 3,
        nombre: "Tomate",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/tomate.png",
      },
    ],
  },
  {
    id: "4emver",
    nombre: "Empanada de Verduras",
    precio: 2500,
    image: "/carta/empanadas/empanada.png",
    categoria: "empanadas",
    descripcion:
      "Ligera y saludable, esta empanada lleva una mezcla de zanahoria, pimentón y espinacas frescas, ideal para vegetarianos.",
    ingredientes: [
      {
        id: 1,
        nombre: "Zanahoria",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/zanahoria.png",
      },
      {
        id: 2,
        nombre: "Pimenton",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/pimenton.png",
      },
      {
        id: 4,
        nombre: "Espinacas",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/espinacas.png",
      },
    ],
  },
  {
    id: "5emat",
    nombre: "Empanada de Atún",
    precio: 2500,
    image: "/carta/empanadas/empanada.png",
    categoria: "empanadas",
    descripcion:
      "Rellena de atún fresco, huevo cocido y cebolla caramelizada, una opción rica en proteínas y sabor mediterráneo.",
    ingredientes: [
      {
        id: 1,
        nombre: "Atún",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/atun.png",
      },
      {
        id: 2,
        nombre: "Huevo",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/huevo-cocido.png",
      },
      {
        id: 3,
        nombre: "Cebolla",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/cebolla.png",
      },
    ],
  },
];

export const bebidas = [
  {
    id: "1cocabo",
    nombre: "Coca Cola Botella 750ml",
    precio: 500,
    image: "/carta/bebidas/cocacola-botella.png",
    categoria: "bebidas",
    descripcion:
      "Refresco gaseoso clásico de cola en presentación de botella de 750ml. Ideal para compartir o disfrutar en grandes ocasiones.",
  },
  {
    id: "2cocalata",
    nombre: "Coca Cola Lata 350ml",
    precio: 500,
    image: "/carta/bebidas/cocacola-lata.png",
    categoria: "bebidas",
    descripcion:
      "La clásica Coca Cola en lata de 350ml. Fácil de llevar y perfecta para acompañar cualquier comida rápida o snack.",
  },
  {
    id: "3pepsilata",
    nombre: "Pepsi Lata 350ml",
    precio: 500,
    image: "/carta/bebidas/pepsi-lata.png",
    categoria: "bebidas",
    descripcion:
      "Bebida gaseosa sabor cola con un toque más dulce y burbujeante. Excelente opción para refrescarte en cualquier momento del día.",
  },
  {
    id: "4pepsizero",
    nombre: "Pepsi Zero Lata 350ml",
    precio: 500,
    image: "/carta/bebidas/pepsi-zero-lata.png",
    categoria: "bebidas",
    descripcion:
      "Versión sin azúcar de Pepsi, con el mismo sabor intenso pero sin calorías. Perfecta para quienes buscan opciones más ligeras.",
  },
  {
    id: "5agua-brisa",
    nombre: "Agua Brisa 500ml",
    precio: 500,
    image: "/carta/bebidas/agua-brisa.png",
    categoria: "bebidas",
    descripcion:
      "Agua mineral natural con gas, pura y refrescante. Ideal para acompañar comidas o mantenerse hidratado durante el día.",
  },
];

export const postres = [
  {
    id: "1tartadulce",
    nombre: "Tarta de Dulce de Leche",
    precio: 1500,
    image: "/carta/postres/postre.png",
    categoria: "postres",
    ingredientes: [
      {
        id: 1,
        nombre: "Galletas",
        cantidad: "100g",
        imagen: "/menuComponente/ingredientes/galletas.png",
      },
      {
        id: 2,
        nombre: "Mantequilla",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/mantequilla.png",
      },
      {
        id: 3,
        nombre: "Leche",
        cantidad: "200g",
        imagen: "/menuComponente/ingredientes/leche.png",
      },
      {
        id: 4,
        nombre: "Chantilly",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/chantilly.png",
      },
      {
        id: 5,
        nombre: "Chocolate",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/chocolate.png",
      },
    ],
    descripcion:
      "Deliciosa tarta elaborada con una base crujiente de galletas y mantequilla, rellena con leche condensada caramelizada y cubierta con chantilly y chocolate rallado.",
  },
  {
    id: "2heladodulce",
    nombre: "Flan con Dulce de Leche",
    precio: 1200,
    image: "/carta/postres/postre.png",
    categoria: "postres",
    ingredientes: [
      {
        id: 1,
        nombre: "Huevo",
        cantidad: "3 unidades",
        imagen: "/menuComponente/ingredientes/huevo.png",
      },
      {
        id: 2,
        nombre: "Condensada",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/leche-condensada.png",
      },
      {
        id: 3,
        nombre: "Leche",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/leche.png",
      },
      {
        id: 4,
        nombre: "Vainilla",
        cantidad: "1 cucharadita",
        imagen: "/menuComponente/ingredientes/vainilla.png",
      },
      {
        id: 5,
        nombre: "Caramelo",
        cantidad: "30ml",
        imagen: "/menuComponente/ingredientes/caramelo.png",
      },
    ],
    descripcion:
      "Un clásico postre cremoso hecho con huevo, leche condensada y vainilla, horneado sobre una capa de caramelo líquido y servido con un toque extra de dulce de leche.",
  },
];

export const perros = [
  {
    id: "1perrocla",
    nombre: "Perro Caliente Clásico",
    precio: 10000,
    image: "/carta/perros/perro.png",
    categoria: "perros",
    descripcion:
      "Pan artesanal, dorado y suave, abraza la cremosa salsa tártara de la casa y la fresca salsa de cilantro, con crujientes papas ripio y el toque único del queso costeño.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pan artesanal",
        cantidad: "1 und",
        imagen: "/menuComponente/ingredientes/pan-artesanal.png",
      },
      {
        id: 2,
        nombre: "Salsa tártara",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-tartara.png",
      },
      {
        id: 3,
        nombre: "Salsa de cilantro",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/cilantro.png",
      },
      {
        id: 4,
        nombre: "Papas ripio",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/papas-ripio.png",
      },
      {
        id: 5,
        nombre: "Queso costeño",
        cantidad: "25g",
        imagen: "/menuComponente/ingredientes/queso-costeno.png",
      },
    ],
  },
  {
    id: "2perromex",
    nombre: "Perro Mexicano",
    precio: 13000,
    image: "/carta/perros/perro.png",
    categoria: "perros",
    descripcion:
      "Dorado pan artesanal que abraza dulces cebollas caramelizadas, vibrante chimichurri y un toque picante, bañado en fresca salsa de cilantro y cebollín.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pan artesanal",
        cantidad: "1 und",
        imagen: "/menuComponente/ingredientes/pan-artesanal.png",
      },
      {
        id: 2,
        nombre: "Cebolla caramelizada",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/cebolla-caramelizada.png",
      },
      {
        id: 3,
        nombre: "Chimichurri",
        cantidad: "15g",
        imagen: "/menuComponente/ingredientes/chimichurri.png",
      },
      {
        id: 4,
        nombre: "Salsa de cilantro",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/cilantro.png",
      },
      {
        id: 5,
        nombre: "Cebollín",
        cantidad: "10g",
        imagen: "/menuComponente/ingredientes/cebollin.png",
      },
    ],
  },
  {
    id: "3perroesco",
    nombre: "Perro Escocés",
    precio: 18000,
    image: "/carta/perros/perro.png",
    categoria: "perros",
    descripcion:
      "Pan artesanal, dorado y suave, se deleita con una rica salsa de quesos que envuelve una exquisita mezcla de pollo jugoso y maíces tiernos, realzada con un sutil toque de nuestra cremosa salsa blanca de la casa.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pan artesanal",
        cantidad: "1 und",
        imagen: "/menuComponente/ingredientes/pan-artesanal.png",
      },
      {
        id: 2,
        nombre: "Salsa de quesos",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-quesos.png",
      },
      {
        id: 3,
        nombre: "Pollo",
        cantidad: "50g",
        imagen: "/menuComponente/ingredientes/pollo.png",
      },
      {
        id: 4,
        nombre: "Maíz",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/maiz.png",
      },
      {
        id: 5,
        nombre: "Salsa blanca",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/salsa-blanca.png",
      },
    ],
  },
  {
    id: "4perrosui",
    nombre: "Perro Suizo",
    precio: 18000,
    image: "/carta/perros/perro.png",
    categoria: "perros",
    descripcion:
      "Pan artesanal, suave y recién horneado, abraza una armoniosa mezcla de tres salsas de la casa, realzada con verduras finamente picadas para un toque fresco y crujiente, coronada por la exquisita salchicha Suiza.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pan artesanal",
        cantidad: "1 und",
        imagen: "/menuComponente/ingredientes/pan-artesanal.png",
      },
      {
        id: 2,
        nombre: "Trío de salsas",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsas-mixtas.png",
      },
      {
        id: 3,
        nombre: "Verduras picadas",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/verduras.png",
      },
      {
        id: 4,
        nombre: "Salchicha suiza",
        cantidad: "1 und",
        imagen: "/menuComponente/ingredientes/salchicha-suiza.png",
      },
    ],
  },
];

export const salchipapas = [
  {
    id: "5salchicla",
    nombre: "Salchipapas Clásica",
    precio: 13000,
    image: "/carta/salchipapas/salchipapa-clasica.png",
    categoria: "salchipapas",
    descripcion:
      "Exquisitas papas a la francesa, crujientes y doradas, acompañadas de nuestra salsa base de la casa, un toque de salchichas con sutil dulzura y, opcionalmente, nuestra vibrante salsa de piña artesanal.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Salchichas",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/salchicha.png",
      },
      {
        id: 3,
        nombre: "Salsa base",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 4,
        nombre: "Salsa de piña",
        cantidad: "opcional",
        imagen: "/menuComponente/ingredientes/salsa-pina.png",
      },
    ],
  },
  {
    id: "6salchipol",
    nombre: "Salchipapas con Pollo",
    precio: 21000,
    image: "/carta/salchipapas/salchipapa-pollo.png",
    categoria: "salchipapas",
    descripcion:
      "Contiene papas a la francesa con nuestra salsa base de la casa, salchichas con toque dulce, nuestra salsa de piña artesanal que es opcional y pollo, además de exquisitas tiras de pimentones salteados.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Salchichas",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/salchicha.png",
      },
      {
        id: 3,
        nombre: "Pollo",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/pollo.png",
      },
      {
        id: 4,
        nombre: "Pimentones salteados",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/pimenton.png",
      },
      {
        id: 5,
        nombre: "Salsa base",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 6,
        nombre: "Salsa de piña",
        cantidad: "opcional",
        imagen: "/menuComponente/ingredientes/salsa-pina.png",
      },
    ],
  },
  {
    id: "7salchicar",
    nombre: "Salchipapas con Carne",
    precio: 25000,
    image: "/carta/salchipapas/salchipapa-carne.png",
    categoria: "salchipapas",
    descripcion:
      "Contiene papas a la francesa con nuestra salsa base de la casa, salchichas con toque dulce, nuestra salsa de piña artesanal que es opcional y carne, además de exquisitas tiras de pimentones salteados.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Salchichas",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/salchicha.png",
      },
      {
        id: 3,
        nombre: "Carne",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/carne.png",
      },
      {
        id: 4,
        nombre: "Pimentones salteados",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/pimenton.png",
      },
      {
        id: 5,
        nombre: "Salsa base",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 6,
        nombre: "Salsa de piña",
        cantidad: "opcional",
        imagen: "/menuComponente/ingredientes/salsa-pina.png",
      },
    ],
  },
  {
    id: "8salchiranch",
    nombre: "Salchipapas Ranch",
    precio: 18000,
    image: "/carta/salchipapas/salchipapa-ranch.png",
    categoria: "salchipapas",
    descripcion:
      "Crujientes papas a la francesa con salchichas rancheras, todo bañado en nuestra exclusiva salsa de la casa. ¿Quieres un toque diferente? Añade nuestra salsa de piña artesanal y dale un giro dulce y delicioso.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Salchichas rancheras",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/salchicha-ranchera.png",
      },
      {
        id: 3,
        nombre: "Salsa de la casa",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 4,
        nombre: "Salsa de piña",
        cantidad: "opcional",
        imagen: "/menuComponente/ingredientes/salsa-pina.png",
      },
    ],
  },
  {
    id: "9salchisuiza",
    nombre: "Salchipapas Suiza",
    precio: 18000,
    image: "/carta/salchipapas/salchipapa-suiza.png",
    categoria: "salchipapas",
    descripcion:
      "Crujientes papas a la francesa acompañadas de exquisita salchicha suiza, delicadamente cubiertas con nuestra exclusiva salsa de la casa. Sugerimos realzar el plato con nuestra salsa artesanal de piña.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Salchicha suiza",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/salchicha-suiza.png",
      },
      {
        id: 3,
        nombre: "Salsa de la casa",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 4,
        nombre: "Salsa de piña",
        cantidad: "opcional",
        imagen: "/menuComponente/ingredientes/salsa-pina.png",
      },
    ],
  },
  {
    id: "10salchimixta",
    nombre: "Salchipapa Mixta",
    precio: 25000,
    image: "/carta/salchipapas/salchipapa-mixta.png",
    categoria: "salchipapas",
    descripcion:
      "Una explosión de sabores: papas a la francesa con butifarra, salchicha, chorizo, carne y pollo, todo realzado con maíz dulce y tres de nuestras exclusivas salsas de la casa.",
    ingredientes: [
      {
        id: 1,
        nombre: "Papas a la francesa",
        cantidad: "150g",
        imagen: "/menuComponente/ingredientes/papas-fritas.png",
      },
      {
        id: 2,
        nombre: "Butifarra",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/butifarra.png",
      },
      {
        id: 3,
        nombre: "Salchicha",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salchicha.png",
      },
      {
        id: 4,
        nombre: "Chorizo",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/chorizo.png",
      },
      {
        id: 5,
        nombre: "Carne",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/carne.png",
      },
      {
        id: 6,
        nombre: "Pollo",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/pollo.png",
      },
      {
        id: 7,
        nombre: "Maíz dulce",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/maiz.png",
      },
      {
        id: 8,
        nombre: "Salsas mixtas",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/salsas-mixtas.png",
      },
    ],
  },
];

export const entradas = [
  {
    id: "11cremapollo",
    nombre: "Crema de Pollo",
    precio: 16000,
    image: "/carta/entradas/crema-pollo.png",
    categoria: "entradas",
    descripcion:
      "Suave y cremosa, esta delicada crema combina el sabor tierno del pollo con toques sutiles de especias que reconfortan el paladar.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pollo",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/pollo.png",
      },
      {
        id: 2,
        nombre: "Leche",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/leche.png",
      },
      {
        id: 3,
        nombre: "Especias",
        cantidad: "5g",
        imagen: "/menuComponente/ingredientes/especias.png",
      },
    ],
  },
  {
    id: "12cremacebolla",
    nombre: "Crema de Cebolla",
    precio: 16000,
    image: "/carta/entradas/crema-cebolla.png",
    categoria: "entradas",
    descripcion:
      "Una exquisita mezcla de cebolla fresca y textura aterciopelada que despierta los sentidos en cada cucharada.",
    ingredientes: [
      {
        id: 1,
        nombre: "Cebolla",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/cebolla.png",
      },
      {
        id: 2,
        nombre: "Leche",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/leche.png",
      },
      {
        id: 3,
        nombre: "Mantequilla",
        cantidad: "10g",
        imagen: "/menuComponente/ingredientes/mantequilla.png",
      },
    ],
  },
  {
    id: "13crematomate",
    nombre: "Crema de Tomate",
    precio: 16000,
    image: "/carta/entradas/crema-tomate.png",
    categoria: "entradas",
    descripcion:
      "Refrescante y elegante, esta crema destaca el sabor natural del tomate maduro en perfecta armonía.",
    ingredientes: [
      {
        id: 1,
        nombre: "Tomate",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/tomate.png",
      },
      {
        id: 2,
        nombre: "Crema de leche",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/crema-leche.png",
      },
      {
        id: 3,
        nombre: "Albahaca",
        cantidad: "5g",
        imagen: "/menuComponente/ingredientes/albahaca.png",
      },
    ],
  },
  {
    id: "14cremaahuyama",
    nombre: "Crema de Ahuyama",
    precio: 16000,
    image: "/carta/entradas/crema-ahuyama.png",
    categoria: "entradas",
    descripcion:
      "De sabor dulce y aterciopelado, esta crema de ahuyama ofrece una experiencia cálida y reconfortante con un toque natural.",
    ingredientes: [
      {
        id: 1,
        nombre: "Ahuyama",
        cantidad: "80g",
        imagen: "/menuComponente/ingredientes/ahuyama.png",
      },
      {
        id: 2,
        nombre: "Leche",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/leche.png",
      },
      {
        id: 3,
        nombre: "Mantequilla",
        cantidad: "10g",
        imagen: "/menuComponente/ingredientes/mantequilla.png",
      },
    ],
  },
  {
    id: "15choriahumado",
    nombre: "Chori Ahumado",
    precio: 18000,
    image: "/carta/entradas/chori-ahumado.png",
    categoria: "entradas",
    descripcion:
      "Chorizo ahumado acompañado de un vibrante chimichurri y crujientes chips de plátano verde, que crean un balance perfecto entre intensidad y textura.",
    ingredientes: [
      {
        id: 1,
        nombre: "Chorizo ahumado",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/chorizo.png",
      },
      {
        id: 2,
        nombre: "Chimichurri",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/chimichurri.png",
      },
      {
        id: 3,
        nombre: "Chips de plátano",
        cantidad: "40g",
        imagen: "/menuComponente/ingredientes/platanitos.png",
      },
    ],
  },
  {
    id: "16quesoencendido",
    nombre: "Queso Encendido",
    precio: 16000,
    image: "/carta/entradas/queso-encendido.png",
    categoria: "entradas",
    descripcion:
      "Tajadas de queso fresco bañadas en miel, realzadas con una mezcla de especias y un toque picante que despierta el paladar y los sentidos.",
    ingredientes: [
      {
        id: 1,
        nombre: "Queso fresco",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/queso.png",
      },
      {
        id: 2,
        nombre: "Miel",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/miel.png",
      },
      {
        id: 3,
        nombre: "Especias",
        cantidad: "5g",
        imagen: "/menuComponente/ingredientes/especias.png",
      },
    ],
  },
  {
    id: "17cevichechicharron",
    nombre: "Ceviche de Chicharrón",
    precio: 22000,
    image: "/carta/entradas/ceviche-chicharron.png",
    categoria: "entradas",
    descripcion:
      "Crujientes canastas de plátano verde rellenas con una vibrante mezcla de pimentones, chicharrón jugoso, cebolla roja fresca y nuestra exclusiva salsa de la casa, realzado con el toque agridulce del ceviche.",
    ingredientes: [
      {
        id: 1,
        nombre: "Chicharrón",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/chicharron.png",
      },
      {
        id: 2,
        nombre: "Pimentón",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/pimenton.png",
      },
      {
        id: 3,
        nombre: "Cebolla roja",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/cebolla-roja.png",
      },
      {
        id: 4,
        nombre: "Salsa de la casa",
        cantidad: "20g",
        imagen: "/menuComponente/ingredientes/salsa-base.png",
      },
      {
        id: 5,
        nombre: "Canastas de plátano",
        cantidad: "2 und",
        imagen: "/menuComponente/ingredientes/platanito-cesta.png",
      },
    ],
  },
];

export const pastas = [
  {
    id: "18pastacarbonara",
    nombre: "Pasta Carbonara",
    precio: 30000,
    image: "/carta/pastas/pasta-carbonara.png",
    categoria: "pastas",
    descripcion:
      "Una preparación que honra la tradición, con carácter sobrio y ejecución cuidada. Servida con nuestra salsa blanca de la casa, creada para realzar cada nota del plato.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pasta",
        cantidad: "120g",
        imagen: "/menuComponente/ingredientes/pasta.png",
      },
      {
        id: 2,
        nombre: "Tocineta",
        cantidad: "40g",
        imagen: "/menuComponente/ingredientes/tocineta.png",
      },
      {
        id: 3,
        nombre: "Salsa blanca",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/salsa-blanca.png",
      },
    ],
  },
  {
    id: "19pastaalfredo",
    nombre: "Pasta Alfredo",
    precio: 30000,
    image: "/carta/pastas/pasta-alfredo.png",
    categoria: "pastas",
    descripcion:
      "Texturas suaves y equilibrio perfecto en un plato que celebra la calidez de lo hecho a mano. Acompañada por nuestra cremosa salsa blanca, un sello de identidad artesanal.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pasta",
        cantidad: "120g",
        imagen: "/menuComponente/ingredientes/pasta.png",
      },
      {
        id: 2,
        nombre: "Queso parmesano",
        cantidad: "30g",
        imagen: "/menuComponente/ingredientes/queso-parmesano.png",
      },
      {
        id: 3,
        nombre: "Salsa blanca",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/salsa-blanca.png",
      },
    ],
  },
  {
    id: "20pastacamaron",
    nombre: "Pasta con Camarón",
    precio: 35000,
    image: "/carta/pastas/pasta-camaron.png",
    categoria: "pastas",
    descripcion:
      "Camarones salteados al momento, integrados con pasta fresca y nuestra salsa blanca de la casa. Una fusión delicada entre lo costero y lo hecho con alma.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pasta",
        cantidad: "120g",
        imagen: "/menuComponente/ingredientes/pasta.png",
      },
      {
        id: 2,
        nombre: "Camarones",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/camaron.png",
      },
      {
        id: 3,
        nombre: "Salsa blanca",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/salsa-blanca.png",
      },
    ],
  },
  {
    id: "21pastamariscos",
    nombre: "Pasta con Mariscos",
    precio: 35000,
    image: "/carta/pastas/pasta-mariscos.png",
    categoria: "pastas",
    descripcion:
      "Los mariscos se reúnen en esta receta que evoca la frescura del mar. Todo armonizado con nuestra salsa blanca artesanal, en un equilibrio sobrio y refinado.",
    ingredientes: [
      {
        id: 1,
        nombre: "Pasta",
        cantidad: "120g",
        imagen: "/menuComponente/ingredientes/pasta.png",
      },
      {
        id: 2,
        nombre: "Mariscos",
        cantidad: "60g",
        imagen: "/menuComponente/ingredientes/mariscos.png",
      },
      {
        id: 3,
        nombre: "Salsa blanca",
        cantidad: "100ml",
        imagen: "/menuComponente/ingredientes/salsa-blanca.png",
      },
    ],
  },
];

export const pechugas = [
  {
    id: "8pecha",
    nombre: "Pechuga Asada",
    precio: 28000,
    image: "/carta/pechugas/pechuga-asada.png",
    categoria: "pechugas",
    descripcion:
      "Corte jugoso cocido a la plancha con precisión, resaltando los matices naturales de la carne. Una preparación sencilla en apariencia, pero ejecutada con respeto por la técnica y el producto. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "8pechg",
    nombre: "Pechuga Gratinada",
    precio: 32000,
    image: "/carta/pechugas/pechuga-gratinada.png",
    categoria: "pechugas",
    descripcion:
      "Una base suave y tierna cubierta con una capa de gratinado, donde lo artesanal y lo reconfortante se encuentran en cada porción. Una receta pensada para quienes buscan textura y calidez en el mismo plato. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "8pechc",
    nombre: "Pechuga con Champiñones",
    precio: 35000,
    image: "/carta/pechugas/pechuga-champinones.png",
    categoria: "pechugas",
    descripcion:
      "Pechuga dorada lentamente y bañada en una salsa cremosa de champiñones, elaborada en casa. Un equilibrio entre suavidad y profundidad, que evoca cocina de hogar con toque refinado. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
];

export const carnes = [
  {
    id: "9caras",
    nombre: "Carne Asada",
    precio: 28000,
    image: "/carta/carnes/carne-asada.png",
    categoria: "carnes",
    descripcion:
      "Fusión de fuerza y autenticidad, un plato que transmite la esencia del fuego y el arte culinario ancestral. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "9churr",
    nombre: "Churrasco",
    precio: 35000,
    image: "/carta/carnes/churrasco.png",
    categoria: "carnes",
    descripcion:
      "Sencillo pero contundente, un clásico que celebra la conexión entre la tierra y el paladar exigente. Acompañado con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "9punta",
    nombre: "Punta Gorda",
    precio: 32000,
    image: "/carta/carnes/punta-gorda.png",
    categoria: "carnes",
    descripcion:
      "Presencia imponente y carácter robusto, ideal para quienes buscan una experiencia de sabor plena y refinada. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "9lpimi",
    nombre: "Lomo a la Pimienta",
    precio: 42000,
    image: "/carta/carnes/lomo-pimienta.png",
    categoria: "carnes",
    descripcion:
      "Una pieza distinguida, bañada en vino tinto y un delicado toque picante, que conjuga sofisticación y un perfil audaz en cada bocado. Acompañado con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
];

export const chuletas = [
  {
    id: "10chuc",
    nombre: "Lomo de Cerdo",
    precio: 28000,
    image: "/carta/chuletas/lomo-cerdo.png",
    categoria: "chuletas",
    descripcion:
      "Elegancia y sencillez en una pieza que celebra lo artesanal. Acompañado con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
  {
    id: "10chub",
    nombre: "Bondiola de Cerdo",
    precio: 28000,
    image: "/carta/chuletas/bondiola-cerdo.png",
    categoria: "chuletas",
    descripcion:
      "Una joya rústica que despierta los sentidos con su carácter único. Acompañada con ensalada de la casa y a elección: papas a la francesa, croquetas de yuca o papa cocida.",
  },
];

export const mixtos = [
  {
    id: "11mixc",
    nombre: "Cascos a la Costeña",
    precio: 25000,
    image: "/carta/mixtos/cascos-costena.png",
    categoria: "mixtos",
    descripcion:
      "Exquisitos cascos de papa criolla, cuidadosamente preparados, se engalanan con tierna carne de res, suculento cerdo y delicada pechuga, bañados en nuestra salsa especial de la casa y coronados con el auténtico sabor del queso costeño.",
  },
  {
    id: "11mixm",
    nombre: "Cascos a la Mexicana",
    precio: 25000,
    image: "/carta/mixtos/cascos-mexicana.png",
    categoria: "mixtos",
    descripcion:
      "Crujientes cascos de papa criolla, elaborados artesanalmente, se coronan con jugosa carne desmechada, crujiente chicharrón y una cremosa salsa de aguacate, realzados con un vibrante toque picante y finas notas de queso parmesano.",
  },
  {
    id: "11mixp",
    nombre: "Salchipapa Mixta",
    precio: 25000,
    image: "/carta/mixtos/salchipapa-mixta.png",
    categoria: "mixtos",
    descripcion:
      "Una explosión de sabores en cada bocado: crujientes papas a la francesa acompañadas de butifarra, salchicha, chorizo, carne y pollo, todo realzado con maíz dulce y tres de nuestras exclusivas salsas de la casa. Un plato pensado para los amantes de la variedad y el buen gusto.",
  },
];

export const crepes = [
  {
    id: "12crpp",
    nombre: "Crepe de Pollo",
    precio: 24000,
    image: "/carta/crepes/crepe-pollo.png",
    categoria: "crepes",
    descripcion:
      "Sutil y envolvente, esta versión revela equilibrio y personalidad en cada pliegue. Ideal para quienes valoran lo simple, bien hecho. Acompañada de pan de ajo.",
  },
  {
    id: "12crpch",
    nombre: "Crepe de Pollo con Champiñones",
    precio: 26000,
    image: "/carta/crepes/crepe-pollo-champinones.png",
    categoria: "crepes",
    descripcion:
      "Una combinación que eleva lo cotidiano, con una armonía que invita a disfrutar sin prisa. Refugio perfecto entre lo cálido y lo delicado. Acompañada de pan de ajo.",
  },
  {
    id: "12crpca",
    nombre: "Crepe Carbonara",
    precio: 28000,
    image: "/carta/crepes/crepe-carbonara.png",
    categoria: "crepes",
    descripcion:
      "Un guiño a lo clásico con un giro que sorprende. Profunda, reconfortante y llena de presencia. Para los que buscan sabor con carácter. Acompañada de pan de ajo.",
  },
];

export const brochetas = [
  {
    id: "13brocp",
    nombre: "Brocheta Clásica de Pollo",
    precio: 15000,
    image: "/carta/brochetas/brocheta-pollo.png",
    categoria: "brochetas",
    descripcion:
      "Un encuentro entre sencillez y autenticidad. Versátil, sabrosa y siempre fiel a lo esencial. Acompañada de papas a la francesa y ensalada de la casa.",
  },
  {
    id: "13brocc",
    nombre: "Brocheta de Tocino con Camarón",
    precio: 18000,
    image: "/carta/brochetas/brocheta-camaron.png",
    categoria: "brochetas",
    descripcion:
      "Una combinación intensa y atrevida, que sorprende por su armonía y su fuerza visual. Pequeña, pero inolvidable. Acompañada de papas a la francesa y ensalada de la casa.",
  },
  {
    id: "13broct",
    nombre: "Brocheta Trifásica",
    precio: 20000,
    image: "/carta/brochetas/brocheta-trifasica.png",
    categoria: "brochetas",
    descripcion:
      "Res, cerdo y carne molida en perfecta sintonía. Tres sabores, una sola esencia. Acompañada de papas a la francesa y ensalada de la casa.",
  },
];

export const picadas = [
  {
    id: "13brocp",
    nombre: "Brocheta Clásica de Pollo",
    precio: 15000,
    image: "/carta/brochetas/brocheta-pollo.png",
    categoria: "picadas",
    descripcion:
      "Un encuentro entre sencillez y autenticidad. Versátil, sabrosa y siempre fiel a lo esencial. Acompañada de papas a la francesa y ensalada de la casa.",
  },
  {
    id: "13brocc",
    nombre: "Brocheta de Tocino con Camarón",
    precio: 18000,
    image: "/carta/brochetas/brocheta-camaron.png",
    categoria: "picadas",
    descripcion:
      "Una combinación intensa y atrevida, que sorprende por su armonía y su fuerza visual. Pequeña, pero inolvidable. Acompañada de papas a la francesa y ensalada de la casa.",
  },
  {
    id: "13broct",
    nombre: "Brocheta Trifásica",
    precio: 20000,
    image: "/carta/brochetas/brocheta-trifasica.png",
    categoria: "picadas",
    descripcion:
      "Res, cerdo y carne molida en perfecta sintonía. Tres sabores, una sola esencia. Acompañada de papas a la francesa y ensalada de la casa.",
  },
];

export const limonadas = [
  {
    id: "15limce",
    nombre: "Limonada Cerezada",
    precio: 10000,
    image: "/carta/bebidas/limonada-cerezada.png",
    categoria: "limonadas",
    descripcion:
      "Refrescante limonada artesanal infusionada con el dulce sabor de la cereza y un toque cítrico que deleita el paladar.",
  },
  {
    id: "15limna",
    nombre: "Limonada Natural",
    precio: 7000,
    image: "/carta/bebidas/limonada-natural.png",
    categoria: "limonadas",
    descripcion:
      "Clásica limonada artesanal con limón recién exprimido y un sutil dulzor. Ideal para cualquier momento.",
  },
  {
    id: "15limco",
    nombre: "Limonada de Coco",
    precio: 10000,
    image: "/carta/bebidas/limonada-coco.png",
    categoria: "limonadas",
    descripcion:
      "Exótica limonada con limón y coco, suave, tropical y refrescante.",
  },
  {
    id: "15limma",
    nombre: "Limonada de Maracuyá",
    precio: 10000,
    image: "/carta/bebidas/limonada-maracuya.png",
    categoria: "limonadas",
    descripcion:
      "Limonada artesanal con maracuyá, vibrante y con un toque ácido tropical.",
  },
  {
    id: "15soddc",
    nombre: "Soda Doña Ceci",
    precio: 13000,
    image: "/carta/bebidas/soda-dona-ceci.png",
    categoria: "limonadas",
    descripcion:
      "Soda artesanal con mezcla de siropes seleccionados. Dulce, chispeante y refrescante.",
  },
];

export const ejecutivos = [
  {
    id: "16ejecer",
    nombre: "Cerdo Asado Ejecutivo",
    precio: 15000,
    image: "/carta/ejecutivos/cerdo-asado.png",
    categoria: "ejecutivos",
    descripcion:
      "Jugoso cerdo asado, acompañado de sopa del día, arroz, granos, ensalada de la casa y tajadas doradas.",
  },
  {
    id: "16ejecar",
    nombre: "Carne Asada Ejecutiva",
    precio: 15000,
    image: "/carta/ejecutivos/carne-asada.png",
    categoria: "ejecutivos",
    descripcion:
      "Tierna carne asada, servida con sopa del día, arroz, granos, ensalada de la casa y tajadas crujientes.",
  },
  {
    id: "16ejepec",
    nombre: "Pechuga Asada Ejecutiva",
    precio: 15000,
    image: "/carta/ejecutivos/pechuga-asada.png",
    categoria: "ejecutivos",
    descripcion:
      "Pechuga jugosa, acompañada de sopa del día, arroz, granos, ensalada de la casa y tajadas doradas.",
  },
  {
    id: "16ejepol",
    nombre: "Pollo Guisado Ejecutivo",
    precio: 15000,
    image: "/carta/ejecutivos/pollo-guisado.png",
    categoria: "ejecutivos",
    descripcion:
      "Pollo guisado tradicional, disponible según el día. Incluye sopa del día, arroz, granos, ensalada y tajadas.",
  },
  {
    id: "16ejedes",
    nombre: "Carne Desmechada Ejecutiva",
    precio: 15000,
    image: "/carta/ejecutivos/carne-desmechada.png",
    categoria: "ejecutivos",
    descripcion:
      "Carne desmechada artesanal, con sopa del día, arroz, granos, ensalada de la casa y tajadas.",
  },
];

export const especiales = [
  {
    id: "17espsob",
    nombre: "Sobrebarriga Ejecutiva",
    precio: 18000,
    image: "/carta/ejecutivos/sobrebarriga.png",
    categoria: "especiales",
    descripcion:
      "Tierna sobrebarriga cocida con esmero. Acompañada de sopa del día, arroz, granos, ensalada de la casa y tajadas.",
  },
  {
    id: "17espleng",
    nombre: "Lengua en Salsa Agridulce",
    precio: 18000,
    image: "/carta/ejecutivos/lengua-agridulce.png",
    categoria: "especiales",
    descripcion:
      "Lengua bañada en salsa agridulce artesanal, acompañada de sopa del día, arroz, granos, ensalada y tajadas.",
  },
  {
    id: "17esppost",
    nombre: "Carne en Posta Ejecutiva",
    precio: 18000,
    image: "/carta/ejecutivos/carne-posta.png",
    categoria: "especiales",
    descripcion:
      "Carne en posta con recetas tradicionales. Incluye sopa del día, arroz, granos, ensalada y tajadas.",
  },
  {
    id: "17espmoj",
    nombre: "Mojarra Frita Ejecutiva",
    precio: 20000,
    image: "/carta/ejecutivos/mojarra.png",
    categoria: "especiales",
    descripcion:
      "Crujiente mojarra frita, servida con sopa del día, arroz, granos, ensalada y tajadas doradas.",
  },
];

export const todas_categorias_datalladas = [
  ...empanadas,
  ...bebidas,
  ...postres,
  ...perros,
  ...salchipapas,
  ...entradas,
  ...pastas,
  ...pechugas,
  ...carnes,
  ...chuletas,
  ...mixtos,
  ...crepes,
  ...brochetas,
  ...picadas,
  ...limonadas,
  ...ejecutivos,
  ...especiales,
];
