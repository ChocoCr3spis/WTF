import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roomGuard: CanActivateFn = async () => {
    
    
    const router = inject(Router);
    let roomId = sessionStorage.getItem('id')
    console.log(roomId)
    if (!roomId) {
      router.navigate(['/']);
      return false;
    }
    return true
}
