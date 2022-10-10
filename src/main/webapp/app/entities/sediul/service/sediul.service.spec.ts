import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISediul } from '../sediul.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../sediul.test-samples';

import { SediulService } from './sediul.service';

const requireRestSample: ISediul = {
  ...sampleWithRequiredData,
};

describe('Sediul Service', () => {
  let service: SediulService;
  let httpMock: HttpTestingController;
  let expectedResult: ISediul | ISediul[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SediulService);
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

    it('should create a Sediul', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sediul = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sediul).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Sediul', () => {
      const sediul = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sediul).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Sediul', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Sediul', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Sediul', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSediulToCollectionIfMissing', () => {
      it('should add a Sediul to an empty array', () => {
        const sediul: ISediul = sampleWithRequiredData;
        expectedResult = service.addSediulToCollectionIfMissing([], sediul);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sediul);
      });

      it('should not add a Sediul to an array that contains it', () => {
        const sediul: ISediul = sampleWithRequiredData;
        const sediulCollection: ISediul[] = [
          {
            ...sediul,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSediulToCollectionIfMissing(sediulCollection, sediul);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Sediul to an array that doesn't contain it", () => {
        const sediul: ISediul = sampleWithRequiredData;
        const sediulCollection: ISediul[] = [sampleWithPartialData];
        expectedResult = service.addSediulToCollectionIfMissing(sediulCollection, sediul);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sediul);
      });

      it('should add only unique Sediul to an array', () => {
        const sediulArray: ISediul[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const sediulCollection: ISediul[] = [sampleWithRequiredData];
        expectedResult = service.addSediulToCollectionIfMissing(sediulCollection, ...sediulArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sediul: ISediul = sampleWithRequiredData;
        const sediul2: ISediul = sampleWithPartialData;
        expectedResult = service.addSediulToCollectionIfMissing([], sediul, sediul2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sediul);
        expect(expectedResult).toContain(sediul2);
      });

      it('should accept null and undefined values', () => {
        const sediul: ISediul = sampleWithRequiredData;
        expectedResult = service.addSediulToCollectionIfMissing([], null, sediul, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sediul);
      });

      it('should return initial array if no Sediul is added', () => {
        const sediulCollection: ISediul[] = [sampleWithRequiredData];
        expectedResult = service.addSediulToCollectionIfMissing(sediulCollection, undefined, null);
        expect(expectedResult).toEqual(sediulCollection);
      });
    });

    describe('compareSediul', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSediul(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSediul(entity1, entity2);
        const compareResult2 = service.compareSediul(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSediul(entity1, entity2);
        const compareResult2 = service.compareSediul(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSediul(entity1, entity2);
        const compareResult2 = service.compareSediul(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
