export interface Food {
  id: string;
  /** Nombre del plato en ingles (la respuesta correcta). */
  name: string;
  /** Emoji usado como imagen de muestra (se reemplaza por fotos reales en assets). */
  emoji: string;
  /** Pais / cultura de origen, solo informativo. */
  country: string;
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
  { id: 'pizza', name: 'Pizza', emoji: '🍕', country: 'Italy' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣', country: 'Japan' },
  { id: 'taco', name: 'Taco', emoji: '🌮', country: 'Mexico' },
  { id: 'hamburger', name: 'Hamburger', emoji: '🍔', country: 'United States' },
  { id: 'paella', name: 'Paella', emoji: '🥘', country: 'Spain' },
  { id: 'ramen', name: 'Ramen', emoji: '🍜', country: 'Japan' },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', country: 'France' },
  { id: 'dumplings', name: 'Dumplings', emoji: '🥟', country: 'China' },
  { id: 'curry', name: 'Curry', emoji: '🍛', country: 'India' },
  { id: 'pretzel', name: 'Pretzel', emoji: '🥨', country: 'Germany' },
  { id: 'burrito', name: 'Burrito', emoji: '🌯', country: 'Mexico' },
  { id: 'spaghetti', name: 'Spaghetti', emoji: '🍝', country: 'Italy' },
  { id: 'tempura', name: 'Tempura', emoji: '🍤', country: 'Japan' },
  { id: 'bento', name: 'Bento', emoji: '🍱', country: 'Japan' },
  { id: 'hotdog', name: 'Hot Dog', emoji: '🌭', country: 'United States' },
  { id: 'pancakes', name: 'Pancakes', emoji: '🥞', country: 'United States' },
  { id: 'baguette', name: 'Baguette', emoji: '🥖', country: 'France' },
  { id: 'hotpot', name: 'Hot Pot', emoji: '🍲', country: 'China' },
  { id: 'fries', name: 'French Fries', emoji: '🍟', country: 'Belgium' },
  { id: 'kebab', name: 'Kebab Wrap', emoji: '🥙', country: 'Turkey' },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', country: 'United States' },
  { id: 'friedchicken', name: 'Fried Chicken', emoji: '🍗', country: 'United States' },
  { id: 'steak', name: 'Steak', emoji: '🥩', country: 'Argentina' },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', country: 'United States' },
  { id: 'ribs', name: 'BBQ Ribs', emoji: '🍖', country: 'United States' },
  { id: 'friedegg', name: 'Fried Egg', emoji: '🍳', country: 'Spain' },
  { id: 'salad', name: 'Greek Salad', emoji: '🥗', country: 'Greece' },
  { id: 'falafel', name: 'Falafel', emoji: '🧆', country: 'Lebanon' },
  { id: 'tamale', name: 'Tamale', emoji: '🫔', country: 'Mexico' },
  { id: 'flatbread', name: 'Naan', emoji: '🫓', country: 'India' },
  { id: 'fondue', name: 'Fondue', emoji: '🫕', country: 'Switzerland' },
  { id: 'oyster', name: 'Oysters', emoji: '🦪', country: 'France' },
  { id: 'corn', name: 'Grilled Corn', emoji: '🌽', country: 'Mexico' },
  { id: 'bread', name: 'Bread', emoji: '🍞', country: 'France' },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', country: 'France' },
  { id: 'waffle', name: 'Waffle', emoji: '🧇', country: 'Belgium' },
  { id: 'bagel', name: 'Bagel', emoji: '🥯', country: 'United States' },
  { id: 'popcorn', name: 'Popcorn', emoji: '🍿', country: 'United States' },

  // --- Cocina asiatica ---
  { id: 'onigiri', name: 'Onigiri', emoji: '🍙', country: 'Japan' },
  { id: 'rice', name: 'Steamed Rice', emoji: '🍚', country: 'China' },
  { id: 'ricecracker', name: 'Rice Cracker', emoji: '🍘', country: 'Japan' },
  { id: 'fishcake', name: 'Fish Cake', emoji: '🍥', country: 'Japan' },
  { id: 'oden', name: 'Oden', emoji: '🍢', country: 'Japan' },
  { id: 'sweetpotato', name: 'Roasted Sweet Potato', emoji: '🍠', country: 'Japan' },
  { id: 'mooncake', name: 'Mooncake', emoji: '🥮', country: 'China' },
  { id: 'dango', name: 'Dango', emoji: '🍡', country: 'Japan' },
  { id: 'bubbletea', name: 'Bubble Tea', emoji: '🧋', country: 'Taiwan' },
  { id: 'fortunecookie', name: 'Fortune Cookie', emoji: '🥠', country: 'United States' },

  // --- Postres y dulces ---
  { id: 'shavedice', name: 'Shaved Ice', emoji: '🍧', country: 'Japan' },
  { id: 'icecream', name: 'Ice Cream', emoji: '🍨', country: 'Italy' },
  { id: 'softserve', name: 'Soft Serve', emoji: '🍦', country: 'United States' },
  { id: 'donut', name: 'Donut', emoji: '🍩', country: 'United States' },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', country: 'United States' },
  { id: 'cupcake', name: 'Cupcake', emoji: '🧁', country: 'United States' },
  { id: 'shortcake', name: 'Strawberry Cake', emoji: '🍰', country: 'Japan' },
  { id: 'pie', name: 'Apple Pie', emoji: '🥧', country: 'United States' },
  { id: 'flan', name: 'Flan', emoji: '🍮', country: 'Spain' },
  { id: 'chocolate', name: 'Chocolate Bar', emoji: '🍫', country: 'Belgium' },
];
