import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseApiService } from '../../core/api/course-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { CourseDto } from '../../core/models/api.models';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    @if (isTeacher()) {
      <section class="teacher-layout">
        <article class="panel">
          <h3>{{ editingId() ? 'Edit course' : 'Create course' }}</h3>
          <form [formGroup]="form" (ngSubmit)="saveCourse()">
            <input placeholder="Title" formControlName="title">
            <input placeholder="Category" formControlName="category">
            <input placeholder="Short description" formControlName="shortDescription">
            <textarea placeholder="Description" formControlName="description"></textarea>
            <input placeholder="Level" formControlName="level">
            <input placeholder="Format" formControlName="format">
            <input placeholder="Duration" formControlName="duration">
            <input type="number" placeholder="Price" formControlName="price">
            <input placeholder="Next session" formControlName="nextSession">
            <input placeholder="Outcomes separated by |" formControlName="outcomesRaw">
            <input placeholder="Modules separated by |" formControlName="modulesRaw">
            <div class="actions">
              <button type="submit">{{ editingId() ? 'Update' : 'Create' }}</button>
              @if (editingId()) {
                <button type="button" class="secondary" (click)="resetForm()">Cancel</button>
              }
            </div>
          </form>
        </article>

        <article class="panel">
          <h3>My courses</h3>
          <div class="card-list">
            @for (course of teacherCourses(); track course.id) {
              <div class="course-card">
                <div>
                  <strong>{{ course.title }}</strong>
                  <p>{{ course.shortDescription }}</p>
                </div>
                <div class="card-actions">
                  <a [routerLink]="['/app/courses', course.slug]">Details</a>
                  <button type="button" (click)="editCourse(course)">Edit</button>
                  <button type="button" class="danger" (click)="deleteCourse(course.id)">Delete</button>
                </div>
              </div>
            }
          </div>
        </article>
      </section>
    } @else {
      <section class="catalog-grid">
        @for (course of allCourses(); track course.id) {
          <a class="course-card" [routerLink]="['/app/courses', course.slug]">
            <span class="badge">{{ course.category }}</span>
            <h3>{{ course.title }}</h3>
            <p>{{ course.shortDescription }}</p>
            <div class="meta">
              <span>{{ course.format }}</span>
              <strong>{{ course.price }} TND</strong>
            </div>
          </a>
        }
      </section>
    }
  `,
  styles: [`
    .teacher-layout,.catalog-grid{display:grid;gap:18px}
    .teacher-layout{grid-template-columns:.95fr 1.05fr}
    .catalog-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    .panel,.course-card{padding:22px;border-radius:24px;background:rgba(255,252,246,.76);border:1px solid rgba(30,41,59,.11);box-shadow:0 24px 60px rgba(71,47,24,.12)}
    .course-card{text-decoration:none;display:block}
    h3,strong{margin:0;color:#172033;font-family:'Space Grotesk','Segoe UI',sans-serif}
    p,span{color:#5f6779}
    form,.card-list{display:grid;gap:12px;margin-top:16px}
    input,textarea,button{font:inherit}
    input,textarea{min-height:46px;padding:10px 14px;border-radius:14px;border:1px solid rgba(23,32,51,.14)}
    textarea{min-height:100px;resize:vertical}
    .actions,.card-actions,.meta{display:flex;gap:10px;align-items:center}
    button,.card-actions a{min-height:40px;padding:0 14px;border:0;border-radius:12px;cursor:pointer;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
    button,.card-actions a{background:#172033;color:#fff}
    .secondary{background:#d1d5db;color:#172033}
    .danger{background:#b42318}
    .course-card .meta{justify-content:space-between;margin-top:18px}
    .badge{display:inline-flex;margin-bottom:14px;padding:8px 12px;border-radius:999px;background:rgba(217,108,63,.12);color:#8c3b22;font-size:.78rem;font-weight:700}
    @media (max-width:1024px){.teacher-layout,.catalog-grid{grid-template-columns:1fr}}
  `]
})
export class CoursesPageComponent {
  private readonly authService = inject(AuthService);
  private readonly courseApi = inject(CourseApiService);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly editingId = signal<number | null>(null);
  protected readonly refresh = signal(0);

  protected readonly isTeacher = computed(() => this.authService.normalizedRole() === 'teacher');
  protected readonly allCourses = toSignal(this.courseApi.getAll(), { initialValue: [] as CourseDto[] });
  protected readonly teacherCourses = toSignal(this.courseApi.getMine(), { initialValue: [] as CourseDto[] });

  protected readonly form = this.formBuilder.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    shortDescription: ['', Validators.required],
    description: ['', Validators.required],
    level: ['', Validators.required],
    format: ['', Validators.required],
    duration: ['', Validators.required],
    price: [0, Validators.required],
    nextSession: ['', Validators.required],
    outcomesRaw: ['', Validators.required],
    modulesRaw: ['', Validators.required]
  });

  protected saveCourse(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const payload = {
      title: raw.title ?? '',
      category: raw.category ?? '',
      shortDescription: raw.shortDescription ?? '',
      description: raw.description ?? '',
      level: raw.level ?? '',
      format: raw.format ?? '',
      duration: raw.duration ?? '',
      price: Number(raw.price ?? 0),
      nextSession: raw.nextSession ?? '',
      outcomes: (raw.outcomesRaw ?? '').split('|').map((v) => v.trim()).filter(Boolean),
      modules: (raw.modulesRaw ?? '').split('|').map((v) => v.trim()).filter(Boolean)
    };

    const request$ = this.editingId() ? this.courseApi.update(this.editingId()!, payload) : this.courseApi.create(payload);
    request$.subscribe(() => window.location.reload());
  }

  protected editCourse(course: CourseDto): void {
    this.editingId.set(course.id);
    this.form.patchValue({
      title: course.title,
      category: course.category,
      shortDescription: course.shortDescription,
      description: course.description,
      level: course.level,
      format: course.format,
      duration: course.duration,
      price: course.price,
      nextSession: course.nextSession,
      outcomesRaw: course.outcomes.join(' | '),
      modulesRaw: course.modules.join(' | ')
    });
  }

  protected resetForm(): void {
    this.editingId.set(null);
    this.form.reset({ price: 0 });
  }

  protected deleteCourse(id: number): void {
    this.courseApi.delete(id).subscribe(() => window.location.reload());
  }
}
