import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeImagesService {
  url = 'assets/img';
  http = inject(HttpClient);

  getImg(imgid: string): string {
    return this.url + "/" + imgid + ".jpg";
  }
}
