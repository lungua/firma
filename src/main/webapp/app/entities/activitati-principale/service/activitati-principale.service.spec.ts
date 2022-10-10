import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IActivitatiPrincipale } from '../activitati-principale.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../activitati-principale.test-samples';

import { ActivitatiPrincipaleService } from './activitati-principale.service';

const requireRestSample: IActivitatiPrincipale = {
  ...sampleWithRequiredData,
};

describe('ActivitatiPrincipale Service', () => {
  let service: ActivitatiPrincipaleService;
  let httpMock: HttpTestingController;
  let expectedResult: IActivitatiPrincipale | IActivitatiPrincipale[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ActivitatiPrincipaleService);
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

    it('should create a ActivitatiPrincipale', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const activitatiPrincipale = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(activitatiPrincipale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ActivitatiPrincipale', () => {
      const activitatiPrincipale = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(activitatiPrincipale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ActivitatiPrincipale', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ActivitatiPrincipale', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ActivitatiPrincipale', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addActivitatiPrincipaleToCollectionIfMissing', () => {
      it('should add a ActivitatiPrincipale to an empty array', () => {
        const activitatiPrincipale: IActivitatiPrincipale = sampleWithRequiredData;
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing([], activitatiPrincipale);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(activitatiPrincipale);
      });

      it('should not add a ActivitatiPrincipale to an array that contains it', () => {
        const activitatiPrincipale: IActivitatiPrincipale = sampleWithRequiredData;
        const activitatiPrincipaleCollection: IActivitatiPrincipale[] = [
          {
            ...activitatiPrincipale,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing(activitatiPrincipaleCollection, activitatiPrincipale);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ActivitatiPrincipale to an array that doesn't contain it", () => {
        const activitatiPrincipale: IActivitatiPrincipale = sampleWithRequiredData;
        const activitatiPrincipaleCollection: IActivitatiPrincipale[] = [sampleWithPartialData];
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing(activitatiPrincipaleCollection, activitatiPrincipale);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(activitatiPrincipale);
      });

      it('should add only unique ActivitatiPrincipale to an array', () => {
        const activitatiPrincipaleArray: IActivitatiPrincipale[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const activitatiPrincipaleCollection: IActivitatiPrincipale[] = [sampleWithRequiredData];
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing(activitatiPrincipaleCollection, ...activitatiPrincipaleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const activitatiPrincipale: IActivitatiPrincipale = sampleWithRequiredData;
        const activitatiPrincipale2: IActivitatiPrincipale = sampleWithPartialData;
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing([], activitatiPrincipale, activitatiPrincipale2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(activitatiPrincipale);
        expect(expectedResult).toContain(activitatiPrincipale2);
      });

      it('should accept null and undefined values', () => {
        const activitatiPrincipale: IActivitatiPrincipale = sampleWithRequiredData;
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing([], null, activitatiPrincipale, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(activitatiPrincipale);
      });

      it('should return initial array if no ActivitatiPrincipale is added', () => {
        const activitatiPrincipaleCollection: IActivitatiPrincipale[] = [sampleWithRequiredData];
        expectedResult = service.addActivitatiPrincipaleToCollectionIfMissing(activitatiPrincipaleCollection, undefined, null);
        expect(expectedResult).toEqual(activitatiPrincipaleCollection);
      });
    });

    describe('compareActivitatiPrincipale', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareActivitatiPrincipale(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareActivitatiPrincipale(entity1, entity2);
        const compareResult2 = service.compareActivitatiPrincipale(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareActivitatiPrincipale(entity1, entity2);
        const compareResult2 = service.compareActivitatiPrincipale(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareActivitatiPrincipale(entity1, entity2);
        const compareResult2 = service.compareActivitatiPrincipale(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
