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
  // Paso del asistente: 1 = bienvenida, 2 = jugadores, 3 = ajustes.
  step = 1;

  // Modos de juego (GameModes) segun el manual.
  modes = [
    {
      label: "It's a piece of cake (easy)",
      name: "It's a piece of cake",
      value: 'easy',
      desc: 'Options appear to choose from.',
    },
    {
      label: "It's hard to swallow (hard)",
      name: "It's hard to swallow",
      value: 'hard',
      desc: 'No options appear — guess it yourself.',
    },
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

  // ---- navegacion del asistente ----

  get settingsValid(): boolean {
    return (
      this.f['mode'].valid &&
      this.f['difficulty'].valid &&
      this.f['numberRounds'].valid &&
      this.f['minSeconds'].valid &&
      this.f['maxSeconds'].valid
    );
  }

  next(): void {
    if (this.step === 2 && this.players.invalid) {
      this.players.markAllAsTouched();
      return;
    }
    if (this.step < 3) this.step++;
  }

  back(): void {
    if (this.step > 1) this.step--;
  }

  start(): void {
    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched();
      return;
    }
    const raw = this.configForm.getRawValue();
    const min = Math.min(raw.minSeconds, raw.maxSeconds);
    const max = Math.max(raw.minSeconds, raw.maxSeconds);
    const names = (raw.players as string[]).map((n) => n.trim()).filter((n) => n.length > 0);
    if (names.length < MIN_PLAYERS) {
      this.step = 2;
      return;
    }
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
