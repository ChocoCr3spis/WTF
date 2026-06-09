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
 * Dataset de muestra: ~20 platos internacionales famosos.
 * Para ampliar el juego basta con anadir entradas aqui (o poner una foto en
 * /public/foods y rellenar el campo `image`).
 */
export const FOODS: Food[] = [
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
  { id: 'falafel', name: 'Falafel Wrap', emoji: '🥙', country: 'Lebanon' },
  { id: 'mooncake', name: 'Mooncake', emoji: '🥮', country: 'China' },
  { id: 'dango', name: 'Dango', emoji: '🍡', country: 'Japan' },
];
