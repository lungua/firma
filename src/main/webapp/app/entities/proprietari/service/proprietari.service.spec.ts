import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProprietari } from '../proprietari.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../proprietari.test-samples';

import { ProprietariService } from './proprietari.service';

const requireRestSample: IProprietari = {
  ...sampleWithRequiredData,
};

describe('Proprietari Service', () => {
  let service: ProprietariService;
  let httpMock: HttpTestingController;
  let expectedResult: IProprietari | IProprietari[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProprietariService);
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

    it('should create a Proprietari', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const proprietari = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(proprietari).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Proprietari', () => {
      const proprietari = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(proprietari).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Proprietari', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Proprietari', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Proprietari', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProprietariToCollectionIfMissing', () => {
      it('should add a Proprietari to an empty array', () => {
        const proprietari: IProprietari = sampleWithRequiredData;
        expectedResult = service.addProprietariToCollectionIfMissing([], proprietari);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(proprietari);
      });

      it('should not add a Proprietari to an array that contains it', () => {
        const proprietari: IProprietari = sampleWithRequiredData;
        const proprietariCollection: IProprietari[] = [
          {
            ...proprietari,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProprietariToCollectionIfMissing(proprietariCollection, proprietari);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Proprietari to an array that doesn't contain it", () => {
        const proprietari: IProprietari = sampleWithRequiredData;
        const proprietariCollection: IProprietari[] = [sampleWithPartialData];
        expectedResult = service.addProprietariToCollectionIfMissing(proprietariCollection, proprietari);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(proprietari);
      });

      it('should add only unique Proprietari to an array', () => {
        const proprietariArray: IProprietari[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const proprietariCollection: IProprietari[] = [sampleWithRequiredData];
        expectedResult = service.addProprietariToCollectionIfMissing(proprietariCollection, ...proprietariArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const proprietari: IProprietari = sampleWithRequiredData;
        const proprietari2: IProprietari = sampleWithPartialData;
        expectedResult = service.addProprietariToCollectionIfMissing([], proprietari, proprietari2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(proprietari);
        expect(expectedResult).toContain(proprietari2);
      });

      it('should accept null and undefined values', () => {
        const proprietari: IProprietari = sampleWithRequiredData;
        expectedResult = service.addProprietariToCollectionIfMissing([], null, proprietari, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(proprietari);
      });

      it('should return initial array if no Proprietari is added', () => {
        const proprietariCollection: IProprietari[] = [sampleWithRequiredData];
        expectedResult = service.addProprietariToCollectionIfMissing(proprietariCollection, undefined, null);
        expect(expectedResult).toEqual(proprietariCollection);
      });
    });

    describe('compareProprietari', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProprietari(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProprietari(entity1, entity2);
        const compareResult2 = service.compareProprietari(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProprietari(entity1, entity2);
        const compareResult2 = service.compareProprietari(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProprietari(entity1, entity2);
        const compareResult2 = service.compareProprietari(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
