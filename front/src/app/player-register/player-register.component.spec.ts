import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayerRegisterComponent } from './player-register.component';

describe('PlayerRegisterComponent', () => {
  let component: PlayerRegisterComponent;
  let fixture: ComponentFixture<PlayerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRegisterComponent ],
      imports: [ ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should register a player if form value is correct', () => {
  //   expect(component).toBeTruthy();
  // });
});
