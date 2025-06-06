import { TestBed } from "@angular/core/testing";

import { RecipeImagesService } from "./recipe-images-service.service";

describe("RecipeImagesService", () => {
  let service: RecipeImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeImagesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
