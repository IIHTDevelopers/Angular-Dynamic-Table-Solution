import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, DynamicTableComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should render the DynamicTableComponent', () => {
            const dynamicTableComponent = fixture.nativeElement.querySelector('app-dynamic-table');
            expect(dynamicTableComponent).toBeTruthy();
        });
    });
});
