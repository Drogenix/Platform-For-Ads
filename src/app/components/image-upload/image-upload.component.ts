import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Image } from '../../core/entities/image';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

interface FileUploadEvent {
  originalEvent: HttpResponse<any>;
  files: File[];
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true,
    },
  ],
  imports: [ProgressSpinnerModule, NgIf, AsyncPipe, FileUploadModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent implements ControlValueAccessor {
  private _onChange: Function;
  private _onTouched: Function;
  readonly API_URL =
    'https://api.upload.io/v2/accounts/W142i8h/uploads/form_data';

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer public_W142i8hAPFZutJkkXDufzJu6xV9Y',
  });
  @ViewChild(FileUpload) private _fileUploadRef: FileUpload;
  uploadedImages: Image[] = [];

  constructor() {}

  onUpload(event: FileUploadEvent) {
    const uploadedImages = event.originalEvent.body.files;

    this.uploadedImages = [];

    if (uploadedImages instanceof Array) {
      uploadedImages.forEach((file: any) => {
        const url: string = file.fileUrl;
        if (url) {
          const image: Image = {
            url: url,
          };
          this.uploadedImages.push(image);
        }
      });
    }

    this._onChange(this.uploadedImages);
  }

  writeValue(value: null) {}

  registerOnChange(fn: Function) {
    this._onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this._onTouched = fn;
  }
}
