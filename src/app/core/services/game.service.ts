import { Injectable } from '@angular/core';
import { Food, FOODS } from '../data/foods';

export type GameMode = 'easy' | 'hard';

export interface GameConfig {
  /** 1 = It's a piece of cake ... 3 = It's hard to swallow. Mas dificultad = mas pixelado y mas puntos. */
  difficulty: 1 | 2 | 3;
  /** easy = con opciones; hard = sin opciones. */
  mode: GameMode;
  numberRounds: number;
  /** Retardo aleatorio (segundos) antes de mostrar la imagen. */
  minSeconds: number;
  maxSeconds: number;
}

export interface RoundData {
  /** Indice 0-based de la ronda. */
  index: number;
  total: number;
  food: Food;
  /** Solo en modo easy: 4 opciones barajadas que incluyen la respuesta. */
  options: Food[];
  /** Puntos que vale acertar esta ronda (= dificultad). */
  points: number;
}

interface SavedState {
  config: GameConfig;
  deck: { foodId: string; optionIds: string[] }[];
  round: number;
}

const STORAGE_KEY = 'wtf-game';

@Injectable({ providedIn: 'root' })
export class GameService {
  private config: GameConfig | null = null;
  private deck: { food: Food; options: Food[] }[] = [];
  private round = 0;

  constructor() {
    this.restore();
  }

  // ---- ciclo de vida de la partida ----

  startGame(config: GameConfig): void {
    this.config = config;
    this.round = 0;
    this.deck = this.buildDeck(config);
    this.persist();
  }

  hasGame(): boolean {
    return !!this.config && this.deck.length > 0;
  }

  get currentConfig(): GameConfig | null {
    return this.config;
  }

  get currentRound(): RoundData | null {
    if (!this.config || this.round >= this.deck.length) return null;
    const entry = this.deck[this.round];
    return {
      index: this.round,
      total: this.config.numberRounds,
      food: entry.food,
      options: entry.options,
      points: this.config.difficulty,
    };
  }

  nextRound(): void {
    this.round++;
    this.persist();
  }

  isFinished(): boolean {
    return this.round >= this.deck.length;
  }

  reset(): void {
    this.config = null;
    this.deck = [];
    this.round = 0;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  // ---- construccion del mazo ----

  private buildDeck(config: GameConfig): { food: Food; options: Food[] }[] {
    const order = this.sampleFoods(config.numberRounds);
    return order.map((food) => ({
      food,
      options: this.buildOptions(food),
    }));
  }

  /** Devuelve `count` platos: sin repetir mientras haya stock, repitiendo despues. */
  private sampleFoods(count: number): Food[] {
    const result: Food[] = [];
    let pool: Food[] = [];
    while (result.length < count) {
      if (pool.length === 0) pool = this.shuffle([...FOODS]);
      result.push(pool.pop()!);
    }
    return result;
  }

  /** Respuesta correcta + 3 distractores, barajados (modo easy). */
  private buildOptions(answer: Food): Food[] {
    const distractors = this.shuffle(FOODS.filter((f) => f.id !== answer.id)).slice(0, 3);
    return this.shuffle([answer, ...distractors]);
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ---- persistencia (sobrevive a recargas de pagina) ----

  private persist(): void {
    if (!this.config) return;
    const state: SavedState = {
      config: this.config,
      deck: this.deck.map((d) => ({
        foodId: d.food.id,
        optionIds: d.options.map((o) => o.id),
      })),
      round: this.round,
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  private restore(): void {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!raw) return;
    try {
      const state: SavedState = JSON.parse(raw);
      const byId = new Map(FOODS.map((f) => [f.id, f]));
      const deck = state.deck
        .map((d) => {
          const food = byId.get(d.foodId);
          const options = d.optionIds.map((id) => byId.get(id)).filter(Boolean) as Food[];
          return food ? { food, options } : null;
        })
        .filter(Boolean) as { food: Food; options: Food[] }[];
      if (deck.length) {
        this.config = state.config;
        this.deck = deck;
        this.round = state.round;
      }
    } catch {}
  }
}
