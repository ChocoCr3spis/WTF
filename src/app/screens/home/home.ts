import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

export class Home implements OnInit {

  isSyncSpotify: boolean = false;
  // stateOptions: any[] = [{ label: 'Mode 1', value: '1' },{ label: 'Mode 2', value: '2' },{ label: 'Mode 3', value: '3' }];
    stateOptions: any[] = [{ label: 'Publico', value: false },{ label: 'Privado', value: true }]

  genres: string[] = ['Pop', 'Rock', 'Jazz', 'Blues', 'Hip Hop', 'Rap', 'Trap', 'Reggae', 'Salsa', 'Flamenco', 'Música Clásica', 'Electrónica (House, Techno)', 'Heavy Metal', 'Country'];
  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){
    this.configForm = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      genre: [null, [Validators.required]],
      description: [null, [Validators.maxLength(100)]],
      visibility:  [false, [Validators.required]],
      allowEmojis: [false],
      allowLinks: [false],
      timeOut: [5],
      password: [null]
    });
  }

  get configFormControls(){ return this.configForm.controls }

  ngOnInit() {
    console.log('asdasdasd')
  }

  changeValidator(){
    !this.configFormControls['visibility'].value ? this.configFormControls['password'].clearValidators() : this.configFormControls['password'].addValidators([Validators.required, Validators.pattern(''), Validators.minLength(6), Validators.maxLength(6)]);
    this.configFormControls['password'].updateValueAndValidity();
  }

  saveConfig(){
    console.log(this.configForm.value)
  }
}
