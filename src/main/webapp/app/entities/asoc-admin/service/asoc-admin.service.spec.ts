import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAsocAdmin } from '../asoc-admin.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../asoc-admin.test-samples';

import { AsocAdminService } from './asoc-admin.service';

const requireRestSample: IAsocAdmin = {
  ...sampleWithRequiredData,
};

describe('AsocAdmin Service', () => {
  let service: AsocAdminService;
  let httpMock: HttpTestingController;
  let expectedResult: IAsocAdmin | IAsocAdmin[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AsocAdminService);
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

    it('should create a AsocAdmin', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const asocAdmin = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(asocAdmin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AsocAdmin', () => {
      const asocAdmin = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(asocAdmin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AsocAdmin', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AsocAdmin', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AsocAdmin', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAsocAdminToCollectionIfMissing', () => {
      it('should add a AsocAdmin to an empty array', () => {
        const asocAdmin: IAsocAdmin = sampleWithRequiredData;
        expectedResult = service.addAsocAdminToCollectionIfMissing([], asocAdmin);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asocAdmin);
      });

      it('should not add a AsocAdmin to an array that contains it', () => {
        const asocAdmin: IAsocAdmin = sampleWithRequiredData;
        const asocAdminCollection: IAsocAdmin[] = [
          {
            ...asocAdmin,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAsocAdminToCollectionIfMissing(asocAdminCollection, asocAdmin);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AsocAdmin to an array that doesn't contain it", () => {
        const asocAdmin: IAsocAdmin = sampleWithRequiredData;
        const asocAdminCollection: IAsocAdmin[] = [sampleWithPartialData];
        expectedResult = service.addAsocAdminToCollectionIfMissing(asocAdminCollection, asocAdmin);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asocAdmin);
      });

      it('should add only unique AsocAdmin to an array', () => {
        const asocAdminArray: IAsocAdmin[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const asocAdminCollection: IAsocAdmin[] = [sampleWithRequiredData];
        expectedResult = service.addAsocAdminToCollectionIfMissing(asocAdminCollection, ...asocAdminArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const asocAdmin: IAsocAdmin = sampleWithRequiredData;
        const asocAdmin2: IAsocAdmin = sampleWithPartialData;
        expectedResult = service.addAsocAdminToCollectionIfMissing([], asocAdmin, asocAdmin2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asocAdmin);
        expect(expectedResult).toContain(asocAdmin2);
      });

      it('should accept null and undefined values', () => {
        const asocAdmin: IAsocAdmin = sampleWithRequiredData;
        expectedResult = service.addAsocAdminToCollectionIfMissing([], null, asocAdmin, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asocAdmin);
      });

      it('should return initial array if no AsocAdmin is added', () => {
        const asocAdminCollection: IAsocAdmin[] = [sampleWithRequiredData];
        expectedResult = service.addAsocAdminToCollectionIfMissing(asocAdminCollection, undefined, null);
        expect(expectedResult).toEqual(asocAdminCollection);
      });
    });

    describe('compareAsocAdmin', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAsocAdmin(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAsocAdmin(entity1, entity2);
        const compareResult2 = service.compareAsocAdmin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAsocAdmin(entity1, entity2);
        const compareResult2 = service.compareAsocAdmin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAsocAdmin(entity1, entity2);
        const compareResult2 = service.compareAsocAdmin(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
