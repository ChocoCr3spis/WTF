import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameConfig, GameService } from '../../core/services/game.service';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: false,
})
export class Home {
  // Modos segun el manual.
  modes = [
    { label: "It's a piece of cake (easy)", value: 'easy' },
    { label: "It's hard to swallow (hard)", value: 'hard' },
  ];

  // Dificultad 1-3 (mas dificultad = mas pixelado y mas puntos) o Random por ronda.
  difficulties = [
    { label: '1 · Easy', value: 1 },
    { label: '2 · Medium', value: 2 },
    { label: '3 · Hard', value: 3 },
    { label: '🎲 Random', value: 'random' },
  ];

  readonly maxPlayers = MAX_PLAYERS;
  readonly minPlayers = MIN_PLAYERS;

  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private game: GameService,
    private router: Router,
  ) {
    this.configForm = this.fb.group({
      mode: ['easy', [Validators.required]],
      difficulty: [1, [Validators.required]],
      numberRounds: [10, [Validators.required, Validators.min(1), Validators.max(50)]],
      minSeconds: [1, [Validators.required, Validators.min(0), Validators.max(29)]],
      maxSeconds: [5, [Validators.required, Validators.min(1), Validators.max(30)]],
      players: this.fb.array([this.newPlayer('Player 1'), this.newPlayer('Player 2')]),
    });
  }

  get f() {
    return this.configForm.controls;
  }

  get players(): FormArray {
    return this.configForm.get('players') as FormArray;
  }

  get playerControls(): FormControl[] {
    return this.players.controls as FormControl[];
  }

  private newPlayer(name = ''): FormControl {
    return this.fb.control(name, [Validators.required, Validators.maxLength(16)]);
  }

  addPlayer(): void {
    if (this.players.length < MAX_PLAYERS) {
      this.players.push(this.newPlayer(`Player ${this.players.length + 1}`));
    }
  }

  removePlayer(index: number): void {
    if (this.players.length > MIN_PLAYERS) {
      this.players.removeAt(index);
    }
  }

  start(): void {
    if (this.configForm.invalid) return;
    const raw = this.configForm.getRawValue();
    const min = Math.min(raw.minSeconds, raw.maxSeconds);
    const max = Math.max(raw.minSeconds, raw.maxSeconds);
    const names = (raw.players as string[]).map((n) => n.trim()).filter((n) => n.length > 0);
    if (names.length < MIN_PLAYERS) return;
    const config: GameConfig = {
      mode: raw.mode,
      difficulty: raw.difficulty,
      numberRounds: raw.numberRounds,
      minSeconds: min,
      maxSeconds: max,
      players: names,
    };
    this.game.startGame(config);
    this.router.navigate(['/room']);
  }
}
