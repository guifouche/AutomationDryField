import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../../core/models/player/Player';
import { FieldComponent } from '../field/field.component';
import { PlayerRegisterComponent } from '../player-register/player-register.component';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, FieldComponent, PlayerRegisterComponent],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('playerRegistered : GameComponent should launch the app only after a player has registered', () => {

    const player: Player = new Player('test');

    it('should not have the isGameStarted flag set to true', () => {
      expect(this.isGameStarted).toBeFalsy();
    });

    it('should not have a player before the method playerRegistered is called', () => {
      expect(this.player).toBeUndefined();
    });

    it('should not have a game before the method playerRegistered is called', () => {
      expect(this.game).toBeUndefined();
    });

    it('should call method start on this.game', () => {

      this.playerRegistered(player);

      spyOn(this.game, 'start');
      expect(this.game.start).toHaveBeenCalled();
    });

    it('should add the sub to the subscription array', () => {
      expect(this.subscriptions.length).toEqual(1);
    });

    it('should have the isGameStarted flag set to true', () => {
      expect(this.isGameStarted).toBeTruthy();
    });
  });

  it('should irrigate a field', () => {
    const capacity = this.player.cistern.capacity;
    const amount = 1;
    this.playerIrrigatedField(amount);
    expect(this.player.cistern.capacity).toEqual(capacity - amount);
  });

  it('should buy water', () => {
    const capacity = this.player.cistern.capacity;
    this.buyWater();
    expect(capacity).toEqual(0);
  });

});
