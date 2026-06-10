import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../core/data/foods';
import { GameService, Player, RoundData } from '../../core/services/game.service';

type Phase = 'waiting' | 'showing' | 'finished';

@Component({
  selector: 'app-room',
  templateUrl: './room.html',
  styleUrl: './room.scss',
  standalone: false,
})
export class Room implements OnInit, OnDestroy {
  phase: Phase = 'waiting';
  round: RoundData | null = null;
  revealed = false;

  /** Indice del jugador que responde la ronda. */
  answererIndex: number | null = null;
  /** Opcion elegida (modo easy). */
  selectedOption: Food | null = null;
  /** Si ya se aplico el resultado de la ronda. */
  resolved = false;
  outcome: 'correct' | 'wrong' | null = null;

  private timer: any = null;

  constructor(
    public game: GameService,
    private router: Router,
  ) {}

  get config() {
    return this.game.currentConfig;
  }

  get players(): Player[] {
    return this.game.players;
  }

  ngOnInit(): void {
    if (!this.game.hasGame()) {
      this.router.navigate(['/']);
      return;
    }
    this.startRound();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  // ---- rondas ----

  private startRound(): void {
    this.clearTimer();

    if (this.allPlayersOut()) {
      this.phase = 'finished';
      this.round = null;
      return;
    }

    this.round = this.game.currentRound;
    if (!this.round || !this.config) {
      this.phase = 'finished';
      return;
    }

    this.revealed = false;
    this.answererIndex = null;
    this.selectedOption = null;
    this.resolved = false;
    this.outcome = null;
    this.phase = 'waiting';

    const { minSeconds, maxSeconds } = this.config;
    const delayMs = (minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000;
    this.timer = setTimeout(() => {
      this.phase = 'showing';
    }, delayMs);
  }

  /** El jugador que cogio el ketchup se selecciona. */
  selectAnswerer(index: number): void {
    if (this.phase !== 'showing' || this.resolved) return;
    if (this.players[index]?.lives <= 0) return;
    this.answererIndex = index;
  }

  /** Modo easy: el jugador toca la opcion que cree correcta. */
  pick(option: Food): void {
    if (this.phase !== 'showing' || this.resolved || this.answererIndex === null) return;
    this.selectedOption = option;
    this.resolve(this.isCorrect(option));
  }

  /** Modo hard: un arbitro marca si acerto o fallo. */
  judge(correct: boolean): void {
    if (this.phase !== 'showing' || this.resolved || this.answererIndex === null) return;
    this.resolve(correct);
  }

  /** Modo hard: revela la respuesta sin puntuar todavia. */
  revealAnswer(): void {
    if (this.phase !== 'showing') return;
    this.revealed = true;
  }

  private resolve(correct: boolean): void {
    if (this.answererIndex === null) return;
    this.outcome = correct ? 'correct' : 'wrong';
    if (correct) {
      this.game.awardCorrect(this.answererIndex);
    } else {
      this.game.awardWrong(this.answererIndex);
    }
    this.revealed = true;
    this.resolved = true;
  }

  next(): void {
    this.game.nextRound();
    if (this.game.isFinished() || this.allPlayersOut()) {
      this.clearTimer();
      this.phase = 'finished';
      this.round = null;
    } else {
      this.startRound();
    }
  }

  isCorrect(option: Food): boolean {
    return !!this.round && option.id === this.round.food.id;
  }

  get answererName(): string {
    return this.answererIndex !== null ? this.players[this.answererIndex].name : '';
  }

  allPlayersOut(): boolean {
    return this.players.length > 0 && this.players.every((p) => p.lives <= 0);
  }

  ranking(): Player[] {
    return this.game.ranking();
  }

  /** Array para pintar las vidas como iconos. */
  livesArray(n: number): number[] {
    return Array.from({ length: Math.max(0, n) });
  }

  playAgain(): void {
    this.game.reset();
    this.router.navigate(['/']);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
