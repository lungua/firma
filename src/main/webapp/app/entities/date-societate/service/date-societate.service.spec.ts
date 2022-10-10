import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDateSocietate } from '../date-societate.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../date-societate.test-samples';

import { DateSocietateService } from './date-societate.service';

const requireRestSample: IDateSocietate = {
  ...sampleWithRequiredData,
};

describe('DateSocietate Service', () => {
  let service: DateSocietateService;
  let httpMock: HttpTestingController;
  let expectedResult: IDateSocietate | IDateSocietate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DateSocietateService);
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

    it('should create a DateSocietate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dateSocietate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dateSocietate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DateSocietate', () => {
      const dateSocietate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dateSocietate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DateSocietate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DateSocietate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DateSocietate', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDateSocietateToCollectionIfMissing', () => {
      it('should add a DateSocietate to an empty array', () => {
        const dateSocietate: IDateSocietate = sampleWithRequiredData;
        expectedResult = service.addDateSocietateToCollectionIfMissing([], dateSocietate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dateSocietate);
      });

      it('should not add a DateSocietate to an array that contains it', () => {
        const dateSocietate: IDateSocietate = sampleWithRequiredData;
        const dateSocietateCollection: IDateSocietate[] = [
          {
            ...dateSocietate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDateSocietateToCollectionIfMissing(dateSocietateCollection, dateSocietate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DateSocietate to an array that doesn't contain it", () => {
        const dateSocietate: IDateSocietate = sampleWithRequiredData;
        const dateSocietateCollection: IDateSocietate[] = [sampleWithPartialData];
        expectedResult = service.addDateSocietateToCollectionIfMissing(dateSocietateCollection, dateSocietate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dateSocietate);
      });

      it('should add only unique DateSocietate to an array', () => {
        const dateSocietateArray: IDateSocietate[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dateSocietateCollection: IDateSocietate[] = [sampleWithRequiredData];
        expectedResult = service.addDateSocietateToCollectionIfMissing(dateSocietateCollection, ...dateSocietateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dateSocietate: IDateSocietate = sampleWithRequiredData;
        const dateSocietate2: IDateSocietate = sampleWithPartialData;
        expectedResult = service.addDateSocietateToCollectionIfMissing([], dateSocietate, dateSocietate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dateSocietate);
        expect(expectedResult).toContain(dateSocietate2);
      });

      it('should accept null and undefined values', () => {
        const dateSocietate: IDateSocietate = sampleWithRequiredData;
        expectedResult = service.addDateSocietateToCollectionIfMissing([], null, dateSocietate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dateSocietate);
      });

      it('should return initial array if no DateSocietate is added', () => {
        const dateSocietateCollection: IDateSocietate[] = [sampleWithRequiredData];
        expectedResult = service.addDateSocietateToCollectionIfMissing(dateSocietateCollection, undefined, null);
        expect(expectedResult).toEqual(dateSocietateCollection);
      });
    });

    describe('compareDateSocietate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDateSocietate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDateSocietate(entity1, entity2);
        const compareResult2 = service.compareDateSocietate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDateSocietate(entity1, entity2);
        const compareResult2 = service.compareDateSocietate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDateSocietate(entity1, entity2);
        const compareResult2 = service.compareDateSocietate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
