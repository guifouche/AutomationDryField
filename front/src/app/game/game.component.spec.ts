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
      expect(component.isGameStarted).toBeFalsy();
    });

    it('should not have a player before the method playerRegistered is called', () => {
      expect(component.player).toBeUndefined();
    });

    it('should not have a game before the method playerRegistered is called', () => {
      expect(component.game).toBeUndefined();
    });
    // Method call

    it('should call method playerRegistered on component', () => {
      spyOn(component, 'playerRegistered').and.callThrough();
      component.playerRegistered(player);
      expect(component.playerRegistered).toHaveBeenCalled();
    });

    it('should add the sub to the subscription array', () => {
      component.playerRegistered(player);
      expect(component.subscriptions.length).toEqual(1);
    });

    it('should have the isGameStarted flag set to true', () => {
      component.playerRegistered(player);
      expect(component.isGameStarted).toBeTruthy();
    });
  });

});
