import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISumaIncasata } from '../suma-incasata.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../suma-incasata.test-samples';

import { SumaIncasataService, RestSumaIncasata } from './suma-incasata.service';

const requireRestSample: RestSumaIncasata = {
  ...sampleWithRequiredData,
  dataIncasarii: sampleWithRequiredData.dataIncasarii?.format(DATE_FORMAT),
};

describe('SumaIncasata Service', () => {
  let service: SumaIncasataService;
  let httpMock: HttpTestingController;
  let expectedResult: ISumaIncasata | ISumaIncasata[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SumaIncasataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SumaIncasata', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sumaIncasata = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sumaIncasata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SumaIncasata', () => {
      const sumaIncasata = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sumaIncasata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SumaIncasata', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SumaIncasata', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SumaIncasata', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSumaIncasataToCollectionIfMissing', () => {
      it('should add a SumaIncasata to an empty array', () => {
        const sumaIncasata: ISumaIncasata = sampleWithRequiredData;
        expectedResult = service.addSumaIncasataToCollectionIfMissing([], sumaIncasata);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sumaIncasata);
      });

      it('should not add a SumaIncasata to an array that contains it', () => {
        const sumaIncasata: ISumaIncasata = sampleWithRequiredData;
        const sumaIncasataCollection: ISumaIncasata[] = [
          {
            ...sumaIncasata,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSumaIncasataToCollectionIfMissing(sumaIncasataCollection, sumaIncasata);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SumaIncasata to an array that doesn't contain it", () => {
        const sumaIncasata: ISumaIncasata = sampleWithRequiredData;
        const sumaIncasataCollection: ISumaIncasata[] = [sampleWithPartialData];
        expectedResult = service.addSumaIncasataToCollectionIfMissing(sumaIncasataCollection, sumaIncasata);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sumaIncasata);
      });

      it('should add only unique SumaIncasata to an array', () => {
        const sumaIncasataArray: ISumaIncasata[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const sumaIncasataCollection: ISumaIncasata[] = [sampleWithRequiredData];
        expectedResult = service.addSumaIncasataToCollectionIfMissing(sumaIncasataCollection, ...sumaIncasataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sumaIncasata: ISumaIncasata = sampleWithRequiredData;
        const sumaIncasata2: ISumaIncasata = sampleWithPartialData;
        expectedResult = service.addSumaIncasataToCollectionIfMissing([], sumaIncasata, sumaIncasata2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sumaIncasata);
        expect(expectedResult).toContain(sumaIncasata2);
      });

      it('should accept null and undefined values', () => {
        const sumaIncasata: ISumaIncasata = sampleWithRequiredData;
        expectedResult = service.addSumaIncasataToCollectionIfMissing([], null, sumaIncasata, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sumaIncasata);
      });

      it('should return initial array if no SumaIncasata is added', () => {
        const sumaIncasataCollection: ISumaIncasata[] = [sampleWithRequiredData];
        expectedResult = service.addSumaIncasataToCollectionIfMissing(sumaIncasataCollection, undefined, null);
        expect(expectedResult).toEqual(sumaIncasataCollection);
      });
    });

    describe('compareSumaIncasata', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSumaIncasata(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSumaIncasata(entity1, entity2);
        const compareResult2 = service.compareSumaIncasata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSumaIncasata(entity1, entity2);
        const compareResult2 = service.compareSumaIncasata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSumaIncasata(entity1, entity2);
        const compareResult2 = service.compareSumaIncasata(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
