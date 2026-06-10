import { Injectable } from '@angular/core';
import { Food, FOODS } from '../data/foods';

export type GameMode = 'easy' | 'hard';

/** Dificultad concreta de una ronda. */
export type Difficulty = 1 | 2 | 3;
/** Ajuste elegido en la config: fija (1-3) o aleatoria por ronda. */
export type DifficultySetting = Difficulty | 'random';

export const STARTING_LIVES = 3;

export interface GameConfig {
  /**
   * 1 = It's a piece of cake ... 3 = It's hard to swallow.
   * 'random' = cada ronda tiene una dificultad aleatoria (1-3).
   * Mas dificultad = mas pixelado y mas puntos.
   */
  difficulty: DifficultySetting;
  /** easy = con opciones; hard = sin opciones. */
  mode: GameMode;
  numberRounds: number;
  /** Retardo aleatorio (segundos) antes de mostrar la imagen. */
  minSeconds: number;
  maxSeconds: number;
  /** Nombres de los jugadores (2-4). */
  players: string[];
}

export interface Player {
  name: string;
  points: number;
  lives: number;
}

export interface RoundData {
  /** Indice 0-based de la ronda. */
  index: number;
  total: number;
  food: Food;
  /** Solo en modo easy: 4 opciones barajadas que incluyen la respuesta. */
  options: Food[];
  /** Dificultad de esta ronda (1-3), ya resuelta si la config era 'random'. */
  difficulty: Difficulty;
  /** Puntos que vale acertar esta ronda (= dificultad). */
  points: number;
}

interface SavedState {
  config: GameConfig;
  deck: { foodId: string; optionIds: string[]; difficulty: Difficulty }[];
  round: number;
  players: Player[];
}

const STORAGE_KEY = 'wtf-game';

@Injectable({ providedIn: 'root' })
export class GameService {
  private config: GameConfig | null = null;
  private deck: { food: Food; options: Food[]; difficulty: Difficulty }[] = [];
  private round = 0;
  private playersState: Player[] = [];

  constructor() {
    this.restore();
  }

  // ---- ciclo de vida de la partida ----

  startGame(config: GameConfig): void {
    this.config = config;
    this.round = 0;
    this.deck = this.buildDeck(config);
    this.playersState = config.players.map((name) => ({
      name,
      points: 0,
      lives: STARTING_LIVES,
    }));
    this.persist();
  }

  hasGame(): boolean {
    return !!this.config && this.deck.length > 0 && this.playersState.length > 0;
  }

  get currentConfig(): GameConfig | null {
    return this.config;
  }

  get players(): Player[] {
    return this.playersState;
  }

  get currentRound(): RoundData | null {
    if (!this.config || this.round >= this.deck.length) return null;
    const entry = this.deck[this.round];
    return {
      index: this.round,
      total: this.config.numberRounds,
      food: entry.food,
      options: entry.options,
      difficulty: entry.difficulty,
      points: entry.difficulty,
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
    this.playersState = [];
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  // ---- puntuacion ----

  /** Acierto: suma los puntos de la ronda actual (= dificultad de la ronda) al jugador. */
  awardCorrect(playerIndex: number): void {
    const p = this.playersState[playerIndex];
    const entry = this.deck[this.round];
    if (!p || !entry) return;
    p.points += entry.difficulty;
    this.persist();
  }

  /** Fallo: el jugador pierde 1 vida (sin bajar de 0). */
  awardWrong(playerIndex: number): void {
    const p = this.playersState[playerIndex];
    if (!p) return;
    p.lives = Math.max(0, p.lives - 1);
    this.persist();
  }

  /** Clasificacion final: mas puntos; en empate, mas vidas. */
  ranking(): Player[] {
    return [...this.playersState].sort((a, b) =>
      b.points !== a.points ? b.points - a.points : b.lives - a.lives,
    );
  }

  // ---- construccion del mazo ----

  private buildDeck(
    config: GameConfig,
  ): { food: Food; options: Food[]; difficulty: Difficulty }[] {
    const order = this.sampleFoods(config.numberRounds);
    return order.map((food) => ({
      food,
      options: this.buildOptions(food),
      difficulty: this.rollDifficulty(config.difficulty),
    }));
  }

  /** Resuelve la dificultad de una ronda: fija, o aleatoria 1-3 si es 'random'. */
  private rollDifficulty(setting: DifficultySetting): Difficulty {
    if (setting === 'random') {
      return (Math.floor(Math.random() * 3) + 1) as Difficulty;
    }
    return setting;
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
        difficulty: d.difficulty,
      })),
      round: this.round,
      players: this.playersState,
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
      const fallback: Difficulty =
        state.config.difficulty === 'random' ? 1 : state.config.difficulty;
      const deck = state.deck
        .map((d) => {
          const food = byId.get(d.foodId);
          const options = d.optionIds.map((id) => byId.get(id)).filter(Boolean) as Food[];
          const difficulty = (d.difficulty ?? fallback) as Difficulty;
          return food ? { food, options, difficulty } : null;
        })
        .filter(Boolean) as { food: Food; options: Food[]; difficulty: Difficulty }[];
      if (deck.length && state.players?.length) {
        this.config = state.config;
        this.deck = deck;
        this.round = state.round;
        this.playersState = state.players;
      }
    } catch {}
  }
}
