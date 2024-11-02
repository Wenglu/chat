import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainerAppComponent } from './main-container-app.component';

describe('MainContainerAppComponent', () => {
  let component: MainContainerAppComponent;
  let fixture: ComponentFixture<MainContainerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContainerAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContainerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
