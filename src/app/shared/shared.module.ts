import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { SliderModule } from 'primeng/slider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Card } from './components/card';

@NgModule({
  declarations: [
    Card
  ],
  imports: [
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputIconModule,
    IconField,
    InputTextModule,
    ButtonModule,
    DividerModule,
    RouterOutlet,
    CommonModule,
    AvatarModule,
    PopoverModule,
    MenuModule,
    DialogModule,
    SelectModule,
    IftaLabelModule,
    SelectButtonModule,
    CheckboxModule,
    TextareaModule,
    ToolbarModule,
    SliderModule,
    ToggleSwitchModule,
    ConfirmDialogModule
],
  exports: [
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputIconModule,
    IconField,
    InputTextModule,
    ButtonModule,
    DividerModule,
    CommonModule,
    AvatarModule,
    DialogModule,
    SelectModule,
    IftaLabelModule,
    SelectButtonModule,
    CheckboxModule,
    PopoverModule,
    MenuModule,
    TextareaModule,
    ToolbarModule,
    SliderModule,
    ToggleSwitchModule,
    ConfirmDialogModule,
    Card
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModuleModule { }
