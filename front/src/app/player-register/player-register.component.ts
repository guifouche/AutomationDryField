import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../core/models/player/Player';

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register.component.html',
  styleUrls: ['./player-register.component.css']
})
export class PlayerRegisterComponent implements OnInit {

  public playerForm: FormGroup;
  @Output() public playerRegistered = new EventEmitter<Player>();

  constructor(private fb: FormBuilder) {

    const username: FormControl = fb.control('', Validators.required);
    this.playerForm = fb.group({ username });
  }

  ngOnInit() {
  }

  public register() {
    if (this.playerForm.valid) {
      const player = new Player(this.playerForm.value);
      this.playerRegistered.emit(player);
    }
  }
}
