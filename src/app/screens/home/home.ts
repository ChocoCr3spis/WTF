import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../core/services/integrations/room.service';

interface Room {
  id: string;
  name: string;
  dj: string;
  genre: string;
  users: number;
  isLive: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: false
})

export class Home {

  isSyncSpotify: boolean = false;
  modes: any[] = [{ label: 'Classic', value: 'clasico' },{ label: 'Write It', value: 'write_it' },{ label: 'Flash', value: 'flash' },{ label: 'Random', value: 'random' }];

  dificultades: string[] = ['It’s a piece of cake (easy)', 'Intermedio', 'It’s hard to swallow (hard)'];
  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService
  ){
    this.configForm = this.fb.group({
      dificultad: [null, [Validators.required]],
      mode:  ['clasico', [Validators.required]],
      minSeconds: [1, [Validators.required]],
      maxSeconds: [5, [Validators.required]],
      numberRounds: [10, [Validators.required]],
      timeAnswer: [1]
    });
  }

  get configFormControls(){ return this.configForm.controls }

  changeValidator(){
    if(this.configFormControls['mode'].value == 'random'){
      this.configFormControls['dificultad'].clearValidators();
      this.configFormControls['timeAnswer'].clearValidators()
    }else{
      this.configFormControls['dificultad'].addValidators([Validators.required]);
      if(this.configFormControls['mode'].value == 'flash'){
        this.configFormControls['timeAnswer'].addValidators([Validators.required]);
      }
    }
    this.configFormControls['dificultad'].updateValueAndValidity();
    this.configFormControls['timeAnswer'].updateValueAndValidity();
  }

  async saveConfig(){
    let res = await this.roomService.createRoom(this.configForm.getRawValue());
    sessionStorage.setItem('id', res);
  }
}
