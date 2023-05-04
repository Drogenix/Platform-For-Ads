import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileService} from "../../core/services/file.service";
import {catchError, takeUntil, tap, throwError} from "rxjs";
import {DestroyService} from "../../core/services/destroy.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

enum InputLabel {
  ErrorOrEmpty = 'Максимум 10 картинок в формате jpeg, png или heic',
  UploadSuccess = 'Изображение загружено',
  UploadInProgress = 'Загрузка...'
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
      multi: true
    },
    DestroyService
  ],
  imports: [CommonModule, ProgressSpinnerModule],
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FileInputComponent implements ControlValueAccessor {
  onChange: Function;
  onTouched: Function;
  isFileLoading:boolean = false;
  error:string;
  label: InputLabel = InputLabel.ErrorOrEmpty;

  constructor(private input: ElementRef<HTMLInputElement>,
              private destroy$: DestroyService,
              private fileService:FileService,
              private cdr:ChangeDetectorRef) {}

  private _showUploadError(){
    this.isFileLoading = false;
    this.error = UPLOAD_ERROR;

    this.label = InputLabel.ErrorOrEmpty;

    this.cdr.markForCheck();
  }

  private _showUploadSuccess(){
    this.error = ''
    this.isFileLoading = false;

    this.label = InputLabel.UploadSuccess;

    this.cdr.markForCheck();
  }

  private _showLoading(){
    this.isFileLoading = true;
    this.error = ''
    this.label = InputLabel.UploadInProgress;
  }

  upload(event:any){
    const file = event.target?.files[0];

    if(file){
      this._showLoading()

      this.fileService.upload(file).pipe(
        catchError((err)=>{
          this.onChange('');

          this._showUploadError();

          return throwError(() => err.message);
        }),
        tap(guid => {
            this.onChange(guid)

            this._showUploadSuccess();
          }
        ),
        takeUntil(this.destroy$)
      ).subscribe();
    }

  }
  writeValue(value: null) {
    this.input.nativeElement.value = '';
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
    this.onTouched = fn;
  }

}
