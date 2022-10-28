import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeMenuComponent } from './poke-menu.component';

describe('PokeMenuComponent', () => {
  let component: PokeMenuComponent;
  let fixture: ComponentFixture<PokeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
