import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  protected readonly metrics = [
    { value: '12k+', labelKey: 'landing.metrics.students' },
    { value: '280', labelKey: 'landing.metrics.tutors' },
    { value: '94%', labelKey: 'landing.metrics.completion' }
  ];

  protected readonly features = [
    'landing.features.live',
    'landing.features.progress',
    'landing.features.parent'
  ];
}
