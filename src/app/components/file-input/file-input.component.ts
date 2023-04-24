import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileService} from "../../core/services/file.service";
import {catchError, takeUntil, tap, throwError} from "rxjs";
import {DestroyService} from "../../core/services/destroy.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

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

  error = ''

  constructor(private input: ElementRef<HTMLInputElement>, private destroy$: DestroyService, private fileService:FileService, private cdr:ChangeDetectorRef) {}

  private _showUploadError(){
    this.isFileLoading = false;
    this.error = 'Не удалось загрузить файл. Попробуйте снова'

    this.cdr.markForCheck();
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
  upload(event:any){
    const file = event.target?.files[0];

    if(file){
      this.isFileLoading = true;
      this.error = ''

      this.fileService.upload(file).pipe(
        catchError((err)=>{
          this._showUploadError();

          this.onChange('');

          return throwError(() => err);
        }),
        tap(guid => {
            this.onChange(guid)

            this.error = ''
            this.isFileLoading = false;

            this.cdr.markForCheck();
          }
        ),
        takeUntil(this.destroy$)
      ).subscribe();
    }

  }
}
