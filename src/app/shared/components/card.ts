import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Food } from '../../core/data/foods';

/**
 * Muestra una imagen de comida pixelada en un canvas.
 * El nivel de pixelado depende de la dificultad (1 = poco, 3 = mucho).
 * Cuando `revealed` es true se muestra la imagen nitida.
 */
@Component({
  selector: 'app-food-image',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: false,
})
export class Card implements AfterViewInit, OnChanges {
  @Input() food!: Food;
  @Input() difficulty: 1 | 2 | 3 = 1;
  @Input() revealed = false;

  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  /** Resolucion interna del canvas (cuadrado). */
  readonly size = 420;

  private img?: HTMLImageElement;
  private currentSrc = '';

  ngAfterViewInit(): void {
    this.loadAndDraw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.canvasRef) return;
    if (changes['food']) {
      this.loadAndDraw();
    } else {
      this.draw();
    }
  }

  private loadAndDraw(): void {
    if (!this.food) return;
    const src = this.buildSource(this.food);
    if (src === this.currentSrc && this.img) {
      this.draw();
      return;
    }
    this.currentSrc = src;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.img = img;
      this.draw();
    };
    img.src = src;
  }

  private buildSource(food: Food): string {
    if (food.image) return food.image;
    // Imagen de muestra: el emoji centrado sobre un fondo calido, como SVG.
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='${this.size}' height='${this.size}'>` +
      `<rect width='100%' height='100%' fill='#fde68a'/>` +
      `<text x='50%' y='52%' font-size='300' text-anchor='middle' dominant-baseline='central'>${food.emoji}</text>` +
      `</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  private blocks(): number {
    // Menos bloques = mas pixelado. Dificultad alta => mas pixelado.
    switch (this.difficulty) {
      case 3:
        return 9;
      case 2:
        return 15;
      default:
        return 26;
    }
  }

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const S = this.size;
    ctx.clearRect(0, 0, S, S);
    if (!this.img) return;

    if (this.revealed) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(this.img, 0, 0, S, S);
      return;
    }

    const b = this.blocks();
    const tmp = document.createElement('canvas');
    tmp.width = b;
    tmp.height = b;
    const tctx = tmp.getContext('2d');
    if (!tctx) return;
    tctx.imageSmoothingEnabled = true;
    tctx.drawImage(this.img, 0, 0, b, b);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, b, b, 0, 0, S, S);
  }
}
