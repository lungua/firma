import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDovada } from '../dovada.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dovada.test-samples';

import { DovadaService } from './dovada.service';

const requireRestSample: IDovada = {
  ...sampleWithRequiredData,
};

describe('Dovada Service', () => {
  let service: DovadaService;
  let httpMock: HttpTestingController;
  let expectedResult: IDovada | IDovada[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DovadaService);
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

    it('should create a Dovada', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dovada = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dovada).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Dovada', () => {
      const dovada = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dovada).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Dovada', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Dovada', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Dovada', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDovadaToCollectionIfMissing', () => {
      it('should add a Dovada to an empty array', () => {
        const dovada: IDovada = sampleWithRequiredData;
        expectedResult = service.addDovadaToCollectionIfMissing([], dovada);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dovada);
      });

      it('should not add a Dovada to an array that contains it', () => {
        const dovada: IDovada = sampleWithRequiredData;
        const dovadaCollection: IDovada[] = [
          {
            ...dovada,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDovadaToCollectionIfMissing(dovadaCollection, dovada);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Dovada to an array that doesn't contain it", () => {
        const dovada: IDovada = sampleWithRequiredData;
        const dovadaCollection: IDovada[] = [sampleWithPartialData];
        expectedResult = service.addDovadaToCollectionIfMissing(dovadaCollection, dovada);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dovada);
      });

      it('should add only unique Dovada to an array', () => {
        const dovadaArray: IDovada[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dovadaCollection: IDovada[] = [sampleWithRequiredData];
        expectedResult = service.addDovadaToCollectionIfMissing(dovadaCollection, ...dovadaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dovada: IDovada = sampleWithRequiredData;
        const dovada2: IDovada = sampleWithPartialData;
        expectedResult = service.addDovadaToCollectionIfMissing([], dovada, dovada2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dovada);
        expect(expectedResult).toContain(dovada2);
      });

      it('should accept null and undefined values', () => {
        const dovada: IDovada = sampleWithRequiredData;
        expectedResult = service.addDovadaToCollectionIfMissing([], null, dovada, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dovada);
      });

      it('should return initial array if no Dovada is added', () => {
        const dovadaCollection: IDovada[] = [sampleWithRequiredData];
        expectedResult = service.addDovadaToCollectionIfMissing(dovadaCollection, undefined, null);
        expect(expectedResult).toEqual(dovadaCollection);
      });
    });

    describe('compareDovada', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDovada(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDovada(entity1, entity2);
        const compareResult2 = service.compareDovada(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDovada(entity1, entity2);
        const compareResult2 = service.compareDovada(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDovada(entity1, entity2);
        const compareResult2 = service.compareDovada(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
