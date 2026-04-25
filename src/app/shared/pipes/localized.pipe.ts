import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocalizedText } from '../../core/models/content.models';
import { TranslationService } from '../../core/i18n/translation.service';

@Pipe({
  name: 'localized',
  standalone: true,
  pure: false
})
export class LocalizedPipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  transform(value: LocalizedText | null | undefined): string {
    if (!value) {
      return '';
    }

    return this.translationService.pick(value);
  }
}
