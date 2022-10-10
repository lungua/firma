import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IActivitatiSecundare } from '../activitati-secundare.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../activitati-secundare.test-samples';

import { ActivitatiSecundareService } from './activitati-secundare.service';

const requireRestSample: IActivitatiSecundare = {
  ...sampleWithRequiredData,
};

describe('ActivitatiSecundare Service', () => {
  let service: ActivitatiSecundareService;
  let httpMock: HttpTestingController;
  let expectedResult: IActivitatiSecundare | IActivitatiSecundare[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ActivitatiSecundareService);
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

    it('should create a ActivitatiSecundare', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const activitatiSecundare = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(activitatiSecundare).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ActivitatiSecundare', () => {
      const activitatiSecundare = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(activitatiSecundare).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ActivitatiSecundare', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ActivitatiSecundare', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ActivitatiSecundare', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addActivitatiSecundareToCollectionIfMissing', () => {
      it('should add a ActivitatiSecundare to an empty array', () => {
        const activitatiSecundare: IActivitatiSecundare = sampleWithRequiredData;
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing([], activitatiSecundare);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(activitatiSecundare);
      });

      it('should not add a ActivitatiSecundare to an array that contains it', () => {
        const activitatiSecundare: IActivitatiSecundare = sampleWithRequiredData;
        const activitatiSecundareCollection: IActivitatiSecundare[] = [
          {
            ...activitatiSecundare,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing(activitatiSecundareCollection, activitatiSecundare);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ActivitatiSecundare to an array that doesn't contain it", () => {
        const activitatiSecundare: IActivitatiSecundare = sampleWithRequiredData;
        const activitatiSecundareCollection: IActivitatiSecundare[] = [sampleWithPartialData];
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing(activitatiSecundareCollection, activitatiSecundare);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(activitatiSecundare);
      });

      it('should add only unique ActivitatiSecundare to an array', () => {
        const activitatiSecundareArray: IActivitatiSecundare[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const activitatiSecundareCollection: IActivitatiSecundare[] = [sampleWithRequiredData];
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing(activitatiSecundareCollection, ...activitatiSecundareArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const activitatiSecundare: IActivitatiSecundare = sampleWithRequiredData;
        const activitatiSecundare2: IActivitatiSecundare = sampleWithPartialData;
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing([], activitatiSecundare, activitatiSecundare2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(activitatiSecundare);
        expect(expectedResult).toContain(activitatiSecundare2);
      });

      it('should accept null and undefined values', () => {
        const activitatiSecundare: IActivitatiSecundare = sampleWithRequiredData;
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing([], null, activitatiSecundare, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(activitatiSecundare);
      });

      it('should return initial array if no ActivitatiSecundare is added', () => {
        const activitatiSecundareCollection: IActivitatiSecundare[] = [sampleWithRequiredData];
        expectedResult = service.addActivitatiSecundareToCollectionIfMissing(activitatiSecundareCollection, undefined, null);
        expect(expectedResult).toEqual(activitatiSecundareCollection);
      });
    });

    describe('compareActivitatiSecundare', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareActivitatiSecundare(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareActivitatiSecundare(entity1, entity2);
        const compareResult2 = service.compareActivitatiSecundare(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareActivitatiSecundare(entity1, entity2);
        const compareResult2 = service.compareActivitatiSecundare(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareActivitatiSecundare(entity1, entity2);
        const compareResult2 = service.compareActivitatiSecundare(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
