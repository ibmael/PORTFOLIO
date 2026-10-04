import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPaletteComponent } from './command-palette.component';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { appConfig } from '../../../app.config';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;
  let service: CommandPaletteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
      providers: [appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CommandPaletteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start closed by default', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should filter commands based on query', () => {
    component.query.set('git');
    const filtered = component.filteredCommands();
    expect(filtered.some((c) => c.title === 'Open GitHub')).toBe(true);

    component.query.set('theme');
    const themeCmds = component.filteredCommands();
    expect(themeCmds.some((c) => c.title === 'Toggle Theme')).toBe(true);

    component.query.set('nonexistentXYZ123');
    expect(component.filteredCommands().length).toBe(0);
  });

  it('should wrap selected index with selectNext and selectPrevious', () => {
    component.query.set('');
    const total = component.filteredCommands().length;

    component.selectedIndex.set(0);
    component.selectPrevious();
    expect(component.selectedIndex()).toBe(total - 1);

    component.selectNext();
    expect(component.selectedIndex()).toBe(0);
  });

  it('should toggle open state on Ctrl+K and close on Escape', () => {
    const ctrlKEvent = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    window.dispatchEvent(ctrlKEvent);
    expect(service.isOpen()).toBe(true);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);
    expect(service.isOpen()).toBe(false);
  });
});
