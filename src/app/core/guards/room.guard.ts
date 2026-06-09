import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GameService } from '../services/game.service';

export const roomGuard: CanActivateFn = () => {
  const router = inject(Router);
  const game = inject(GameService);

  if (!game.hasGame()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
