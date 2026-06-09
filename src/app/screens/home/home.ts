import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameConfig, GameService } from '../../core/services/game.service';

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

  // Dificultad 1-3: mas dificultad = mas pixelado y mas puntos.
  difficulties = [
    { label: '1 · Easy', value: 1 },
    { label: '2 · Medium', value: 2 },
    { label: '3 · Hard', value: 3 },
  ];

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
    });
  }

  get f() {
    return this.configForm.controls;
  }

  start(): void {
    if (this.configForm.invalid) return;
    const raw = this.configForm.getRawValue();
    const min = Math.min(raw.minSeconds, raw.maxSeconds);
    const max = Math.max(raw.minSeconds, raw.maxSeconds);
    const config: GameConfig = {
      mode: raw.mode,
      difficulty: raw.difficulty,
      numberRounds: raw.numberRounds,
      minSeconds: min,
      maxSeconds: max,
    };
    this.game.startGame(config);
    this.router.navigate(['/room']);
  }
}
