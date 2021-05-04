import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderEditComponent } from './list-header-edit.component';

describe('ListHeaderEditComponent', () => {
  let component: ListHeaderEditComponent;
  let fixture: ComponentFixture<ListHeaderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHeaderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
