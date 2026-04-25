import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="message-layout">
      <article class="panel">
        <h3>{{ 'messages.followupNotes' | t }}</h3>
        <div class="feed">
          @for (item of notes; track item.student) {
            <div class="feed-item">
              <strong>{{ item.student }}</strong>
              <p>{{ item.note | t }}</p>
              <span>{{ item.author }}</span>
            </div>
          }
        </div>
      </article>

      <article class="panel">
        <h3>{{ 'messages.templates' | t }}</h3>
        <ul>
          <li>{{ 'messages.templateWeekly' | t }}</li>
          <li>{{ 'messages.templateMissed' | t }}</li>
          <li>{{ 'messages.templateHomework' | t }}</li>
          <li>{{ 'messages.templateSchedule' | t }}</li>
        </ul>
      </article>
    </section>
  `,
  styles: [`
    .message-layout {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 18px;
    }

    .panel {
      padding: 22px;
      border-radius: 24px;
      background: rgba(255, 252, 246, 0.76);
      border: 1px solid rgba(30, 41, 59, 0.11);
      box-shadow: 0 24px 60px rgba(71, 47, 24, 0.12);
    }

    .feed {
      display: grid;
      gap: 12px;
      margin-top: 18px;
    }

    .feed-item {
      padding: 16px;
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
    span,
    li {
      color: #5f6779;
    }

    ul {
      margin: 18px 0 0;
      padding-left: 18px;
    }

    @media (max-width: 900px) {
      .message-layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MessagesPageComponent {
  protected readonly notes = [
    {
      student: 'Amina Triki',
      note: 'messages.noteAmina',
      author: 'Meriem Ben Salem'
    },
    {
      student: 'Youssef Kallel',
      note: 'messages.noteYoussef',
      author: 'Operations desk'
    },
    {
      student: 'Sarra Ben Romdhane',
      note: 'messages.noteSarra',
      author: 'Salma Trabelsi'
    }
  ];
}
