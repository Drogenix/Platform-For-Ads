import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileService } from '../../core/services/file.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { DestroyService } from '../../core/services/destroy.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

enum InputLabel {
  ErrorOrEmpty = 'Максимум 10 картинок в формате jpeg, png или heic',
  UploadSuccess = 'Изображение загружено',
  UploadInProgress = 'Загрузка...',
}

const UPLOAD_ERROR = 'Не удалось загрузить файл. Попробуйте снова';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true,
    },
    DestroyService,
  ],
  imports: [ProgressSpinnerModule, NgIf, AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements ControlValueAccessor {
  onChange: Function;
  onTouched: Function;
  private _fileUploadSubject = new BehaviorSubject<boolean>(false);
  fileUpload$ = this._fileUploadSubject.asObservable();
  private _errorSubject = new BehaviorSubject<string>('');
  error$ = this._errorSubject.asObservable();
  label: InputLabel = InputLabel.ErrorOrEmpty;

  constructor(
    private input: ElementRef<HTMLInputElement>,
    private destroy$: DestroyService,
    private fileService: FileService
  ) {}

  private _showUploadError() {
    this._fileUploadSubject.next(false);
    this._errorSubject.next(UPLOAD_ERROR);
    this.label = InputLabel.ErrorOrEmpty;
  }

  private _showUploadSuccess() {
    this._fileUploadSubject.next(false);
    this._errorSubject.next('');
    this.label = InputLabel.UploadSuccess;
  }

  private _showLoading() {
    this._fileUploadSubject.next(true);
    this._errorSubject.next('');
    this.label = InputLabel.UploadInProgress;
  }

  upload(event: any) {
    const file = event.target?.files[0];

    if (file) {
      this._showLoading();
      this.fileService
        .upload(file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (guid) => {
            this.onChange(guid);
            this._showUploadSuccess();
          },
          error: () => {
            this.onChange('');
            this._showUploadError();
          },
        });
    }
  }

  writeValue(value: null) {
    this.input.nativeElement.value = '';
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
}
