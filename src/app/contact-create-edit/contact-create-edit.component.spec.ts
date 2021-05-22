import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreateEditComponent } from './contact-create-edit.component';

describe('ContactCreateEditComponent', () => {
  let component: ContactCreateEditComponent;
  let fixture: ComponentFixture<ContactCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
