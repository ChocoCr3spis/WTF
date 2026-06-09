import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../core/data/foods';
import { GameService, RoundData } from '../../core/services/game.service';

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
  selected: Food | null = null;

  private timer: any = null;

  constructor(
    public game: GameService,
    private router: Router,
  ) {}

  get config() {
    return this.game.currentConfig;
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
    this.round = this.game.currentRound;
    if (!this.round || !this.config) {
      this.phase = 'finished';
      return;
    }
    this.revealed = false;
    this.selected = null;
    this.phase = 'waiting';

    const { minSeconds, maxSeconds } = this.config;
    const delayMs = (minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000;
    this.timer = setTimeout(() => {
      this.phase = 'showing';
    }, delayMs);
  }

  /** Modo easy: el jugador toca una opcion para comprobarla. */
  pick(option: Food): void {
    if (this.revealed || this.phase !== 'showing') return;
    this.selected = option;
    this.revealed = true;
  }

  /** Modo hard: revela la respuesta. */
  reveal(): void {
    if (this.phase !== 'showing') return;
    this.revealed = true;
  }

  next(): void {
    this.game.nextRound();
    if (this.game.isFinished()) {
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
