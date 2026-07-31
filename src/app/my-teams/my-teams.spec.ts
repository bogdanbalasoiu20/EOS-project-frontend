import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeams } from './my-teams';

describe('MyTeams', () => {
  let component: MyTeams;
  let fixture: ComponentFixture<MyTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTeams],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTeams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
