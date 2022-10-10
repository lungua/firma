import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISrl } from '../srl.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../srl.test-samples';

import { SrlService, RestSrl } from './srl.service';

const requireRestSample: RestSrl = {
  ...sampleWithRequiredData,
  dataInregistrare: sampleWithRequiredData.dataInregistrare?.toJSON(),
};

describe('Srl Service', () => {
  let service: SrlService;
  let httpMock: HttpTestingController;
  let expectedResult: ISrl | ISrl[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SrlService);
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

    it('should create a Srl', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const srl = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(srl).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Srl', () => {
      const srl = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(srl).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Srl', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Srl', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Srl', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSrlToCollectionIfMissing', () => {
      it('should add a Srl to an empty array', () => {
        const srl: ISrl = sampleWithRequiredData;
        expectedResult = service.addSrlToCollectionIfMissing([], srl);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(srl);
      });

      it('should not add a Srl to an array that contains it', () => {
        const srl: ISrl = sampleWithRequiredData;
        const srlCollection: ISrl[] = [
          {
            ...srl,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSrlToCollectionIfMissing(srlCollection, srl);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Srl to an array that doesn't contain it", () => {
        const srl: ISrl = sampleWithRequiredData;
        const srlCollection: ISrl[] = [sampleWithPartialData];
        expectedResult = service.addSrlToCollectionIfMissing(srlCollection, srl);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(srl);
      });

      it('should add only unique Srl to an array', () => {
        const srlArray: ISrl[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const srlCollection: ISrl[] = [sampleWithRequiredData];
        expectedResult = service.addSrlToCollectionIfMissing(srlCollection, ...srlArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const srl: ISrl = sampleWithRequiredData;
        const srl2: ISrl = sampleWithPartialData;
        expectedResult = service.addSrlToCollectionIfMissing([], srl, srl2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(srl);
        expect(expectedResult).toContain(srl2);
      });

      it('should accept null and undefined values', () => {
        const srl: ISrl = sampleWithRequiredData;
        expectedResult = service.addSrlToCollectionIfMissing([], null, srl, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(srl);
      });

      it('should return initial array if no Srl is added', () => {
        const srlCollection: ISrl[] = [sampleWithRequiredData];
        expectedResult = service.addSrlToCollectionIfMissing(srlCollection, undefined, null);
        expect(expectedResult).toEqual(srlCollection);
      });
    });

    describe('compareSrl', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSrl(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSrl(entity1, entity2);
        const compareResult2 = service.compareSrl(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSrl(entity1, entity2);
        const compareResult2 = service.compareSrl(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSrl(entity1, entity2);
        const compareResult2 = service.compareSrl(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
