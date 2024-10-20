import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarscardsComponent } from './carscards.component';

describe('CarscardsComponent', () => {
  let component: CarscardsComponent;
  let fixture: ComponentFixture<CarscardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarscardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
