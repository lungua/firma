import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBuletin } from '../buletin.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../buletin.test-samples';

import { BuletinService, RestBuletin } from './buletin.service';

const requireRestSample: RestBuletin = {
  ...sampleWithRequiredData,
  data: sampleWithRequiredData.data?.toJSON(),
};

describe('Buletin Service', () => {
  let service: BuletinService;
  let httpMock: HttpTestingController;
  let expectedResult: IBuletin | IBuletin[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BuletinService);
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

    it('should create a Buletin', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const buletin = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(buletin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Buletin', () => {
      const buletin = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(buletin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Buletin', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Buletin', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Buletin', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBuletinToCollectionIfMissing', () => {
      it('should add a Buletin to an empty array', () => {
        const buletin: IBuletin = sampleWithRequiredData;
        expectedResult = service.addBuletinToCollectionIfMissing([], buletin);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(buletin);
      });

      it('should not add a Buletin to an array that contains it', () => {
        const buletin: IBuletin = sampleWithRequiredData;
        const buletinCollection: IBuletin[] = [
          {
            ...buletin,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBuletinToCollectionIfMissing(buletinCollection, buletin);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Buletin to an array that doesn't contain it", () => {
        const buletin: IBuletin = sampleWithRequiredData;
        const buletinCollection: IBuletin[] = [sampleWithPartialData];
        expectedResult = service.addBuletinToCollectionIfMissing(buletinCollection, buletin);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(buletin);
      });

      it('should add only unique Buletin to an array', () => {
        const buletinArray: IBuletin[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const buletinCollection: IBuletin[] = [sampleWithRequiredData];
        expectedResult = service.addBuletinToCollectionIfMissing(buletinCollection, ...buletinArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const buletin: IBuletin = sampleWithRequiredData;
        const buletin2: IBuletin = sampleWithPartialData;
        expectedResult = service.addBuletinToCollectionIfMissing([], buletin, buletin2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(buletin);
        expect(expectedResult).toContain(buletin2);
      });

      it('should accept null and undefined values', () => {
        const buletin: IBuletin = sampleWithRequiredData;
        expectedResult = service.addBuletinToCollectionIfMissing([], null, buletin, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(buletin);
      });

      it('should return initial array if no Buletin is added', () => {
        const buletinCollection: IBuletin[] = [sampleWithRequiredData];
        expectedResult = service.addBuletinToCollectionIfMissing(buletinCollection, undefined, null);
        expect(expectedResult).toEqual(buletinCollection);
      });
    });

    describe('compareBuletin', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBuletin(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBuletin(entity1, entity2);
        const compareResult2 = service.compareBuletin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBuletin(entity1, entity2);
        const compareResult2 = service.compareBuletin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBuletin(entity1, entity2);
        const compareResult2 = service.compareBuletin(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
