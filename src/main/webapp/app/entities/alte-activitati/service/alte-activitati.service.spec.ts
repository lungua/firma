import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAlteActivitati } from '../alte-activitati.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../alte-activitati.test-samples';

import { AlteActivitatiService } from './alte-activitati.service';

const requireRestSample: IAlteActivitati = {
  ...sampleWithRequiredData,
};

describe('AlteActivitati Service', () => {
  let service: AlteActivitatiService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlteActivitati | IAlteActivitati[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlteActivitatiService);
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

    it('should create a AlteActivitati', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const alteActivitati = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(alteActivitati).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlteActivitati', () => {
      const alteActivitati = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(alteActivitati).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AlteActivitati', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlteActivitati', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AlteActivitati', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlteActivitatiToCollectionIfMissing', () => {
      it('should add a AlteActivitati to an empty array', () => {
        const alteActivitati: IAlteActivitati = sampleWithRequiredData;
        expectedResult = service.addAlteActivitatiToCollectionIfMissing([], alteActivitati);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alteActivitati);
      });

      it('should not add a AlteActivitati to an array that contains it', () => {
        const alteActivitati: IAlteActivitati = sampleWithRequiredData;
        const alteActivitatiCollection: IAlteActivitati[] = [
          {
            ...alteActivitati,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlteActivitatiToCollectionIfMissing(alteActivitatiCollection, alteActivitati);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlteActivitati to an array that doesn't contain it", () => {
        const alteActivitati: IAlteActivitati = sampleWithRequiredData;
        const alteActivitatiCollection: IAlteActivitati[] = [sampleWithPartialData];
        expectedResult = service.addAlteActivitatiToCollectionIfMissing(alteActivitatiCollection, alteActivitati);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alteActivitati);
      });

      it('should add only unique AlteActivitati to an array', () => {
        const alteActivitatiArray: IAlteActivitati[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const alteActivitatiCollection: IAlteActivitati[] = [sampleWithRequiredData];
        expectedResult = service.addAlteActivitatiToCollectionIfMissing(alteActivitatiCollection, ...alteActivitatiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alteActivitati: IAlteActivitati = sampleWithRequiredData;
        const alteActivitati2: IAlteActivitati = sampleWithPartialData;
        expectedResult = service.addAlteActivitatiToCollectionIfMissing([], alteActivitati, alteActivitati2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alteActivitati);
        expect(expectedResult).toContain(alteActivitati2);
      });

      it('should accept null and undefined values', () => {
        const alteActivitati: IAlteActivitati = sampleWithRequiredData;
        expectedResult = service.addAlteActivitatiToCollectionIfMissing([], null, alteActivitati, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alteActivitati);
      });

      it('should return initial array if no AlteActivitati is added', () => {
        const alteActivitatiCollection: IAlteActivitati[] = [sampleWithRequiredData];
        expectedResult = service.addAlteActivitatiToCollectionIfMissing(alteActivitatiCollection, undefined, null);
        expect(expectedResult).toEqual(alteActivitatiCollection);
      });
    });

    describe('compareAlteActivitati', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlteActivitati(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAlteActivitati(entity1, entity2);
        const compareResult2 = service.compareAlteActivitati(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAlteActivitati(entity1, entity2);
        const compareResult2 = service.compareAlteActivitati(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAlteActivitati(entity1, entity2);
        const compareResult2 = service.compareAlteActivitati(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
