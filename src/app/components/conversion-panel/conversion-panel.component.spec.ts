import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionPanelComponent } from './conversion-panel.component';

describe('ConversionPanelComponent', () => {
  let component: ConversionPanelComponent;
  let fixture: ComponentFixture<ConversionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
