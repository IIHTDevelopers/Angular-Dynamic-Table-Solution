import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {
  rows: number | null = null;
  columns: number | null = null;
  errorMessage: string | null = null;
  tableData: string[][] | null = null;
  dirtyFields = {
    rows: false,
    columns: false
  };

  get canCreateTable(): boolean {
    return (
      this.rows !== null &&
      this.columns !== null &&
      this.rows >= 1 &&
      this.rows <= 9 &&
      this.columns >= 1 &&
      this.columns <= 9
    );
  }

  createTable() {
    if (!this.canCreateTable) {
      this.errorMessage = 'Please enter a number between 1-9';
      this.tableData = null;
      return;
    }
    this.errorMessage = null;
    this.tableData = this.generateTableData();
  }

  generateTableData(): string[][] {
    const data: string[][] = [];
    for (let i = 0; i < this.rows!; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.columns!; j++) {
        row.push(`${i + 1}-${j + 1}`);
      }
      data.push(row);
    }
    return data;
  }

  onInputChanged(field: 'rows' | 'columns') {
    this.dirtyFields[field] = true;
    this.validateInput(field);
  }

  validateInput(field: 'rows' | 'columns') {
    if (field === 'rows') {
      this.dirtyFields.rows = true;
      if (!this.isNumericInput(this.rows) || this.rows === null || this.rows < 1 || this.rows > 9) {
        this.errorMessage = 'Please enter a numeric value between 1 and 9 for rows.';
      } else {
        this.errorMessage = null;
      }
    } else if (field === 'columns') {
      this.dirtyFields.columns = true;
      if (!this.isNumericInput(this.columns) || this.columns === null || this.columns < 1 || this.columns > 9) {
        this.errorMessage = 'Please enter a numeric value between 1 and 9 for columns.';
      } else {
        this.errorMessage = null;
      }
    }
  }

  isNumericInput(value: any): boolean {
    return !isNaN(value) && isFinite(value);
  }
}
