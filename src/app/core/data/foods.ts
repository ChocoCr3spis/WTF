export interface Food {
  id: string;
  /** Nombre del plato en ingles (la respuesta correcta). */
  name: string;
  /** Emoji usado como imagen de muestra (se reemplaza por fotos reales en assets). */
  emoji: string;
  /** Pais / cultura de origen, solo informativo. */
  country: string;
  /** Breve resumen del origen del plato (se muestra al revelar la respuesta). */
  description: string;
  /**
   * Ruta opcional a una foto real (ej: 'foods/pizza.jpg' dentro de /public).
   * Si existe, se usa en lugar del emoji.
   */
  image?: string;
}

/**
 * Dataset de muestra: platos y comidas internacionales famosas.
 * Para ampliar el juego basta con anadir entradas aqui (o poner una foto en
 * /public/foods y rellenar el campo `image`).
 */
export const FOODS: Food[] = [
  // --- Principales ---
  { id: 'pizza', name: 'Pizza', emoji: '🍕', country: 'Italy', description: 'Born in Naples, this tomato-and-cheese flatbread became a worldwide favorite.' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣', country: 'Japan', description: 'Vinegared rice paired with raw fish or seafood, a Japanese classic.' },
  { id: 'taco', name: 'Taco', emoji: '🌮', country: 'Mexico', description: 'A folded corn tortilla filled with meat, salsa and fresh toppings.' },
  { id: 'hamburger', name: 'Hamburger', emoji: '🍔', country: 'United States', description: 'A grilled beef patty in a bun, popularized across the US.' },
  { id: 'paella', name: 'Paella', emoji: '🥘', country: 'Spain', description: 'A saffron rice dish from Valencia, cooked with seafood or meat.' },
  { id: 'ramen', name: 'Ramen', emoji: '🍜', country: 'Japan', description: 'Wheat noodles in savory broth, adapted in Japan from Chinese noodle soup.' },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', country: 'France', description: 'A buttery, flaky French pastry inspired by the Austrian kipferl.' },
  { id: 'dumplings', name: 'Dumplings', emoji: '🥟', country: 'China', description: 'Dough parcels with savory fillings, central to Chinese cooking.' },
  { id: 'curry', name: 'Curry', emoji: '🍛', country: 'India', description: 'A spiced, saucy dish rooted in the Indian subcontinent.' },
  { id: 'pretzel', name: 'Pretzel', emoji: '🥨', country: 'Germany', description: 'A knot-shaped salted bread from southern Germany.' },
  { id: 'burrito', name: 'Burrito', emoji: '🌯', country: 'Mexico', description: 'A large wheat tortilla wrapped around beans, meat and rice.' },
  { id: 'spaghetti', name: 'Spaghetti', emoji: '🍝', country: 'Italy', description: 'Long Italian pasta, classically served with tomato sauce.' },
  { id: 'tempura', name: 'Tempura', emoji: '🍤', country: 'Japan', description: 'Lightly battered, fried seafood and veg, introduced by Portuguese traders.' },
  { id: 'bento', name: 'Bento', emoji: '🍱', country: 'Japan', description: 'A single-portion Japanese boxed meal of rice and sides.' },
  { id: 'hotdog', name: 'Hot Dog', emoji: '🌭', country: 'United States', description: 'A grilled sausage in a bun, an American icon with German roots.' },
  { id: 'pancakes', name: 'Pancakes', emoji: '🥞', country: 'United States', description: 'Fluffy griddle cakes, a beloved US breakfast.' },
  { id: 'baguette', name: 'Baguette', emoji: '🥖', country: 'France', description: 'A long, crusty French bread loaf.' },
  { id: 'hotpot', name: 'Hot Pot', emoji: '🍲', country: 'China', description: 'A simmering pot of broth for cooking ingredients at the table.' },
  { id: 'fries', name: 'French Fries', emoji: '🍟', country: 'Belgium', description: 'Deep-fried potato sticks, proudly claimed by Belgium.' },
  { id: 'kebab', name: 'Kebab Wrap', emoji: '🥙', country: 'Turkey', description: 'Marinated meat grilled on a skewer, a Turkish street-food staple.' },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', country: 'United Kingdom', description: 'Fillings between bread, named after Britain’s Earl of Sandwich.' },
  { id: 'friedchicken', name: 'Fried Chicken', emoji: '🍗', country: 'United States', description: 'Crispy battered chicken, a soul-food staple of the American South.' },
  { id: 'steak', name: 'Steak', emoji: '🥩', country: 'Argentina', description: 'Grilled beef, central to Argentina’s asado tradition.' },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', country: 'United States', description: 'Cured, fried pork strips, a breakfast favorite.' },
  { id: 'ribs', name: 'BBQ Ribs', emoji: '🍖', country: 'United States', description: 'Slow-cooked pork ribs glazed in barbecue sauce.' },
  { id: 'friedegg', name: 'Fried Egg', emoji: '🍳', country: 'Spain', description: 'A sunny fried egg, the simple base of many Spanish plates.' },
  { id: 'salad', name: 'Greek Salad', emoji: '🥗', country: 'Greece', description: 'Tomato, cucumber, olives and feta dressed in olive oil.' },
  { id: 'falafel', name: 'Falafel', emoji: '🧆', country: 'Lebanon', description: 'Deep-fried chickpea balls, popular across the Levant.' },
  { id: 'tamale', name: 'Tamale', emoji: '🫔', country: 'Mexico', description: 'Masa dough steamed in a corn husk, a Mesoamerican tradition.' },
  { id: 'flatbread', name: 'Naan', emoji: '🫓', country: 'India', description: 'A soft leavened flatbread baked in a tandoor oven.' },
  { id: 'fondue', name: 'Fondue', emoji: '🫕', country: 'Switzerland', description: 'Melted cheese shared from a communal pot, a Swiss Alpine dish.' },
  { id: 'oyster', name: 'Oysters', emoji: '🦪', country: 'France', description: 'Fresh oysters on the half shell, a French coastal delicacy.' },
  { id: 'corn', name: 'Grilled Corn', emoji: '🌽', country: 'Mexico', description: 'Grilled corn on the cob (elote), a Mexican street snack.' },
  { id: 'bread', name: 'Bread', emoji: '🍞', country: 'France', description: 'A staple loaf found on tables around the world.' },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', country: 'France', description: 'Aged dairy in countless varieties, a French specialty.' },
  { id: 'waffle', name: 'Waffle', emoji: '🧇', country: 'Belgium', description: 'A crisp, deep-pocketed batter cake from Belgium.' },
  { id: 'bagel', name: 'Bagel', emoji: '🥯', country: 'United States', description: 'A boiled-then-baked bread ring, popularized by New York delis.' },
  { id: 'popcorn', name: 'Popcorn', emoji: '🍿', country: 'United States', description: 'Puffed corn kernels, a movie-time classic.' },

  // --- Cocina asiatica ---
  { id: 'onigiri', name: 'Onigiri', emoji: '🍙', country: 'Japan', description: 'A hand-pressed Japanese rice ball, often wrapped in seaweed.' },
  { id: 'rice', name: 'Steamed Rice', emoji: '🍚', country: 'China', description: 'The staple grain at the heart of most Asian meals.' },
  { id: 'ricecracker', name: 'Rice Cracker', emoji: '🍘', country: 'Japan', description: 'Senbei, a savory grilled Japanese rice cracker.' },
  { id: 'fishcake', name: 'Fish Cake', emoji: '🍥', country: 'Japan', description: 'Narutomaki, a swirled fish-paste cake used to top ramen.' },
  { id: 'oden', name: 'Oden', emoji: '🍢', country: 'Japan', description: 'A winter Japanese stew of fish cakes and veg in dashi broth.' },
  { id: 'sweetpotato', name: 'Roasted Sweet Potato', emoji: '🍠', country: 'Japan', description: 'Yaki-imo, sold piping hot from winter street carts in Japan.' },
  { id: 'mooncake', name: 'Mooncake', emoji: '🥮', country: 'China', description: 'A dense pastry eaten during China’s Mid-Autumn Festival.' },
  { id: 'dango', name: 'Dango', emoji: '🍡', country: 'Japan', description: 'Sweet rice-flour dumplings served three or four to a skewer.' },
  { id: 'bubbletea', name: 'Bubble Tea', emoji: '🧋', country: 'Taiwan', description: 'Sweet milk tea with chewy tapioca pearls, invented in Taiwan.' },
  { id: 'fortunecookie', name: 'Fortune Cookie', emoji: '🥠', country: 'United States', description: 'A crisp cookie hiding a paper fortune, created in California.' },

  // --- Postres y dulces ---
  { id: 'shavedice', name: 'Shaved Ice', emoji: '🍧', country: 'Japan', description: 'Kakigori, fluffy shaved ice drenched in sweet syrup.' },
  { id: 'icecream', name: 'Ice Cream', emoji: '🍨', country: 'Italy', description: 'Gelato, Italy’s denser, silkier take on ice cream.' },
  { id: 'softserve', name: 'Soft Serve', emoji: '🍦', country: 'United States', description: 'Smooth, swirled soft-serve ice cream in a cone.' },
  { id: 'donut', name: 'Donut', emoji: '🍩', country: 'United States', description: 'A sweet glazed fried-dough ring, an American bakery staple.' },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', country: 'United States', description: 'The chocolate-chip cookie, an American baking classic.' },
  { id: 'cupcake', name: 'Cupcake', emoji: '🧁', country: 'United States', description: 'A small, individually frosted cake.' },
  { id: 'shortcake', name: 'Strawberry Cake', emoji: '🍰', country: 'Japan', description: 'A light sponge layered with cream and strawberries, beloved in Japan.' },
  { id: 'pie', name: 'Apple Pie', emoji: '🥧', country: 'United States', description: 'An emblem of American home baking.' },
  { id: 'flan', name: 'Flan', emoji: '🍮', country: 'Spain', description: 'A silky caramel-topped custard loved across Spain and Latin America.' },
  { id: 'chocolate', name: 'Chocolate Bar', emoji: '🍫', country: 'Belgium', description: 'Fine chocolate, a craft Belgium is world-famous for.' },
];
