import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-planning-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="planning-grid">
      @for (day of planning; track day.day) {
        <article class="day-card">
          <h3>{{ day.day | t }}</h3>
          <div class="slots">
            @for (slot of day.slots; track slot.time + slot.subject) {
              <div class="slot">
                <strong>{{ slot.time }}</strong>
                <div>
                  <p>{{ slot.subject | t }}</p>
                  <span>{{ slot.group | t }}</span>
                </div>
              </div>
            }
          </div>
        </article>
      }
    </section>
  `,
  styles: [`
    .planning-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .day-card {
      padding: 22px;
      border-radius: 24px;
      background: rgba(255, 252, 246, 0.76);
      border: 1px solid rgba(30, 41, 59, 0.11);
      box-shadow: 0 24px 60px rgba(71, 47, 24, 0.12);
    }

    .slots {
      display: grid;
      gap: 12px;
      margin-top: 18px;
    }

    .slot {
      display: flex;
      gap: 14px;
      padding: 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.72);
    }

    h3,
    strong {
      margin: 0;
      font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
      color: #172033;
    }

    p,
    span {
      margin: 0;
      color: #5f6779;
    }

    @media (max-width: 1024px) {
      .planning-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlanningPageComponent {
  protected readonly planning = [
    {
      day: 'calendar.monday',
      slots: [
        { time: '18:00', subject: 'planning.mathRemediation', group: 'planning.groupSecondary' },
        { time: '20:00', subject: 'planning.frenchClinic', group: 'planning.groupLetters' }
      ]
    },
    {
      day: 'calendar.wednesday',
      slots: [
        { time: '17:30', subject: 'planning.homeworkClub', group: 'planning.groupPrimary' },
        { time: '19:30', subject: 'planning.physicsIntensive', group: 'planning.groupScience' }
      ]
    },
    {
      day: 'calendar.saturday',
      slots: [
        { time: '10:00', subject: 'planning.englishLab', group: 'planning.groupIntermediate' },
        { time: '14:00', subject: 'planning.algorithmsWorkshop', group: 'planning.groupBridge' }
      ]
    }
  ];
}
