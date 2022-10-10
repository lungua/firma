import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDateAsociati } from '../date-asociati.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../date-asociati.test-samples';

import { DateAsociatiService } from './date-asociati.service';

const requireRestSample: IDateAsociati = {
  ...sampleWithRequiredData,
};

describe('DateAsociati Service', () => {
  let service: DateAsociatiService;
  let httpMock: HttpTestingController;
  let expectedResult: IDateAsociati | IDateAsociati[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DateAsociatiService);
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

    it('should create a DateAsociati', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dateAsociati = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dateAsociati).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DateAsociati', () => {
      const dateAsociati = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dateAsociati).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DateAsociati', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DateAsociati', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DateAsociati', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDateAsociatiToCollectionIfMissing', () => {
      it('should add a DateAsociati to an empty array', () => {
        const dateAsociati: IDateAsociati = sampleWithRequiredData;
        expectedResult = service.addDateAsociatiToCollectionIfMissing([], dateAsociati);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dateAsociati);
      });

      it('should not add a DateAsociati to an array that contains it', () => {
        const dateAsociati: IDateAsociati = sampleWithRequiredData;
        const dateAsociatiCollection: IDateAsociati[] = [
          {
            ...dateAsociati,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDateAsociatiToCollectionIfMissing(dateAsociatiCollection, dateAsociati);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DateAsociati to an array that doesn't contain it", () => {
        const dateAsociati: IDateAsociati = sampleWithRequiredData;
        const dateAsociatiCollection: IDateAsociati[] = [sampleWithPartialData];
        expectedResult = service.addDateAsociatiToCollectionIfMissing(dateAsociatiCollection, dateAsociati);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dateAsociati);
      });

      it('should add only unique DateAsociati to an array', () => {
        const dateAsociatiArray: IDateAsociati[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dateAsociatiCollection: IDateAsociati[] = [sampleWithRequiredData];
        expectedResult = service.addDateAsociatiToCollectionIfMissing(dateAsociatiCollection, ...dateAsociatiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dateAsociati: IDateAsociati = sampleWithRequiredData;
        const dateAsociati2: IDateAsociati = sampleWithPartialData;
        expectedResult = service.addDateAsociatiToCollectionIfMissing([], dateAsociati, dateAsociati2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dateAsociati);
        expect(expectedResult).toContain(dateAsociati2);
      });

      it('should accept null and undefined values', () => {
        const dateAsociati: IDateAsociati = sampleWithRequiredData;
        expectedResult = service.addDateAsociatiToCollectionIfMissing([], null, dateAsociati, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dateAsociati);
      });

      it('should return initial array if no DateAsociati is added', () => {
        const dateAsociatiCollection: IDateAsociati[] = [sampleWithRequiredData];
        expectedResult = service.addDateAsociatiToCollectionIfMissing(dateAsociatiCollection, undefined, null);
        expect(expectedResult).toEqual(dateAsociatiCollection);
      });
    });

    describe('compareDateAsociati', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDateAsociati(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDateAsociati(entity1, entity2);
        const compareResult2 = service.compareDateAsociati(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDateAsociati(entity1, entity2);
        const compareResult2 = service.compareDateAsociati(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDateAsociati(entity1, entity2);
        const compareResult2 = service.compareDateAsociati(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
