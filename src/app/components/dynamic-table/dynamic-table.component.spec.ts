import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from './dynamic-table.component';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DynamicTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have 2 input fields and 1 button', () => {
      const inputFields = fixture.nativeElement.querySelectorAll('input');
      const button = fixture.nativeElement.querySelector('button');
      expect(inputFields.length).toBe(2);
      expect(button).toBeTruthy();
    });

    it('should disable the button when rows or columns are not within 1-9', () => {
      component.rows = 0;
      component.columns = 5;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should generate table data after clicking "Create Table"', () => {
      component.rows = 3;
      component.columns = 3;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      const table = fixture.nativeElement.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should enable the button when both rows and columns are between 1-9', () => {
      component.rows = 5;
      component.columns = 3;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });

    it('should clear error message when valid rows input is provided', () => {
      component.rows = -1;
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('#rows');
      input.value = '5';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeFalsy();
    });

    it('should show error message when valid columns input is not provided', () => {
      component.columns = 11;
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('#columns');
      input.value = '11';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeTruthy();
    });

    it('should clear error message when valid columns input is provided', () => {
      component.columns = 11;
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('#columns');
      input.value = '3';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeFalsy();
    });

    it('should display table data with correct rows and columns', () => {
      component.rows = 2;
      component.columns = 4;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      const table = fixture.nativeElement.querySelector('table');
      expect(table).toBeTruthy();

      const rows = fixture.nativeElement.querySelectorAll('tr');
      expect(rows.length).toBe(2);

      const cellsInFirstRow = rows[0].querySelectorAll('td');
      expect(cellsInFirstRow.length).toBe(4);

      const cellsInSecondRow = rows[1].querySelectorAll('td');
      expect(cellsInSecondRow.length).toBe(4);
    });

    it('should not display the table initially', () => {
      const table = fixture.nativeElement.querySelector('table');
      expect(table).toBeFalsy();
    });
  });
});
