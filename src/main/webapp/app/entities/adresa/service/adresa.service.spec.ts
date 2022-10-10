import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAdresa } from '../adresa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../adresa.test-samples';

import { AdresaService } from './adresa.service';

const requireRestSample: IAdresa = {
  ...sampleWithRequiredData,
};

describe('Adresa Service', () => {
  let service: AdresaService;
  let httpMock: HttpTestingController;
  let expectedResult: IAdresa | IAdresa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AdresaService);
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

    it('should create a Adresa', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const adresa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(adresa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Adresa', () => {
      const adresa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(adresa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Adresa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Adresa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Adresa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAdresaToCollectionIfMissing', () => {
      it('should add a Adresa to an empty array', () => {
        const adresa: IAdresa = sampleWithRequiredData;
        expectedResult = service.addAdresaToCollectionIfMissing([], adresa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(adresa);
      });

      it('should not add a Adresa to an array that contains it', () => {
        const adresa: IAdresa = sampleWithRequiredData;
        const adresaCollection: IAdresa[] = [
          {
            ...adresa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAdresaToCollectionIfMissing(adresaCollection, adresa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Adresa to an array that doesn't contain it", () => {
        const adresa: IAdresa = sampleWithRequiredData;
        const adresaCollection: IAdresa[] = [sampleWithPartialData];
        expectedResult = service.addAdresaToCollectionIfMissing(adresaCollection, adresa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(adresa);
      });

      it('should add only unique Adresa to an array', () => {
        const adresaArray: IAdresa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const adresaCollection: IAdresa[] = [sampleWithRequiredData];
        expectedResult = service.addAdresaToCollectionIfMissing(adresaCollection, ...adresaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const adresa: IAdresa = sampleWithRequiredData;
        const adresa2: IAdresa = sampleWithPartialData;
        expectedResult = service.addAdresaToCollectionIfMissing([], adresa, adresa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(adresa);
        expect(expectedResult).toContain(adresa2);
      });

      it('should accept null and undefined values', () => {
        const adresa: IAdresa = sampleWithRequiredData;
        expectedResult = service.addAdresaToCollectionIfMissing([], null, adresa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(adresa);
      });

      it('should return initial array if no Adresa is added', () => {
        const adresaCollection: IAdresa[] = [sampleWithRequiredData];
        expectedResult = service.addAdresaToCollectionIfMissing(adresaCollection, undefined, null);
        expect(expectedResult).toEqual(adresaCollection);
      });
    });

    describe('compareAdresa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAdresa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAdresa(entity1, entity2);
        const compareResult2 = service.compareAdresa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAdresa(entity1, entity2);
        const compareResult2 = service.compareAdresa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAdresa(entity1, entity2);
        const compareResult2 = service.compareAdresa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
