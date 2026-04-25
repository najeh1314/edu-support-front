import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guards';
import { AppLayoutComponent } from './shared/layouts/app-layout.component';
import { PublicLayoutComponent } from './shared/layouts/public-layout.component';
import { CoursesPageComponent } from './pages/courses/courses-page.component';
import { CourseDetailPageComponent } from './pages/course-detail/course-detail-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { ForbiddenPageComponent } from './pages/errors/forbidden-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page.component';
import { ServerErrorPageComponent } from './pages/errors/server-error-page.component';
import { LandingPageComponent } from './pages/landing/landing-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { MessagesPageComponent } from './pages/messages/messages-page.component';
import { PlanningPageComponent } from './pages/planning/planning-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon/coming-soon-page.component';
import { TutorDetailPageComponent } from './pages/tutor-detail/tutor-detail-page.component';
import { TutorsPageComponent } from './pages/tutors/tutors-page.component';
import { WalletPageComponent } from './pages/wallet/wallet-page.component';
import { PrivateSessionsPageComponent } from './pages/private-sessions/private-sessions-page.component';
import { NotificationsPageComponent } from './pages/notifications/notifications-page.component';
import { AdminTeachersPageComponent } from './pages/admin-teachers/admin-teachers-page.component';
import { roleGuard } from './core/auth/auth.guards';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginPageComponent, canActivate: [guestGuard] },
      { path: 'register', component: RegisterPageComponent, canActivate: [guestGuard] },
      { path: 'coming-soon', component: ComingSoonPageComponent },
      { path: 'error/403', component: ForbiddenPageComponent },
      { path: 'error/500', component: ServerErrorPageComponent }
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'courses', component: CoursesPageComponent },
      { path: 'courses/:id', component: CourseDetailPageComponent },
      { path: 'tutors', component: TutorsPageComponent },
      { path: 'tutors/:id', component: TutorDetailPageComponent },
      { path: 'wallet', component: WalletPageComponent, canActivate: [roleGuard], data: { roles: ['student'] } },
      { path: 'private-sessions', component: PrivateSessionsPageComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'admin/teachers', component: AdminTeachersPageComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'planning', component: PlanningPageComponent },
      { path: 'messages', component: MessagesPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
