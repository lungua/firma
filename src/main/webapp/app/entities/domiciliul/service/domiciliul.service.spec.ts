import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDomiciliul } from '../domiciliul.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../domiciliul.test-samples';

import { DomiciliulService } from './domiciliul.service';

const requireRestSample: IDomiciliul = {
  ...sampleWithRequiredData,
};

describe('Domiciliul Service', () => {
  let service: DomiciliulService;
  let httpMock: HttpTestingController;
  let expectedResult: IDomiciliul | IDomiciliul[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DomiciliulService);
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

    it('should create a Domiciliul', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const domiciliul = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(domiciliul).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Domiciliul', () => {
      const domiciliul = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(domiciliul).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Domiciliul', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Domiciliul', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Domiciliul', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDomiciliulToCollectionIfMissing', () => {
      it('should add a Domiciliul to an empty array', () => {
        const domiciliul: IDomiciliul = sampleWithRequiredData;
        expectedResult = service.addDomiciliulToCollectionIfMissing([], domiciliul);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(domiciliul);
      });

      it('should not add a Domiciliul to an array that contains it', () => {
        const domiciliul: IDomiciliul = sampleWithRequiredData;
        const domiciliulCollection: IDomiciliul[] = [
          {
            ...domiciliul,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDomiciliulToCollectionIfMissing(domiciliulCollection, domiciliul);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Domiciliul to an array that doesn't contain it", () => {
        const domiciliul: IDomiciliul = sampleWithRequiredData;
        const domiciliulCollection: IDomiciliul[] = [sampleWithPartialData];
        expectedResult = service.addDomiciliulToCollectionIfMissing(domiciliulCollection, domiciliul);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(domiciliul);
      });

      it('should add only unique Domiciliul to an array', () => {
        const domiciliulArray: IDomiciliul[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const domiciliulCollection: IDomiciliul[] = [sampleWithRequiredData];
        expectedResult = service.addDomiciliulToCollectionIfMissing(domiciliulCollection, ...domiciliulArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const domiciliul: IDomiciliul = sampleWithRequiredData;
        const domiciliul2: IDomiciliul = sampleWithPartialData;
        expectedResult = service.addDomiciliulToCollectionIfMissing([], domiciliul, domiciliul2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(domiciliul);
        expect(expectedResult).toContain(domiciliul2);
      });

      it('should accept null and undefined values', () => {
        const domiciliul: IDomiciliul = sampleWithRequiredData;
        expectedResult = service.addDomiciliulToCollectionIfMissing([], null, domiciliul, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(domiciliul);
      });

      it('should return initial array if no Domiciliul is added', () => {
        const domiciliulCollection: IDomiciliul[] = [sampleWithRequiredData];
        expectedResult = service.addDomiciliulToCollectionIfMissing(domiciliulCollection, undefined, null);
        expect(expectedResult).toEqual(domiciliulCollection);
      });
    });

    describe('compareDomiciliul', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDomiciliul(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDomiciliul(entity1, entity2);
        const compareResult2 = service.compareDomiciliul(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDomiciliul(entity1, entity2);
        const compareResult2 = service.compareDomiciliul(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDomiciliul(entity1, entity2);
        const compareResult2 = service.compareDomiciliul(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
