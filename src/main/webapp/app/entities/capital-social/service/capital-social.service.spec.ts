import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICapitalSocial } from '../capital-social.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../capital-social.test-samples';

import { CapitalSocialService } from './capital-social.service';

const requireRestSample: ICapitalSocial = {
  ...sampleWithRequiredData,
};

describe('CapitalSocial Service', () => {
  let service: CapitalSocialService;
  let httpMock: HttpTestingController;
  let expectedResult: ICapitalSocial | ICapitalSocial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CapitalSocialService);
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

    it('should create a CapitalSocial', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const capitalSocial = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(capitalSocial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CapitalSocial', () => {
      const capitalSocial = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(capitalSocial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CapitalSocial', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CapitalSocial', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CapitalSocial', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCapitalSocialToCollectionIfMissing', () => {
      it('should add a CapitalSocial to an empty array', () => {
        const capitalSocial: ICapitalSocial = sampleWithRequiredData;
        expectedResult = service.addCapitalSocialToCollectionIfMissing([], capitalSocial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(capitalSocial);
      });

      it('should not add a CapitalSocial to an array that contains it', () => {
        const capitalSocial: ICapitalSocial = sampleWithRequiredData;
        const capitalSocialCollection: ICapitalSocial[] = [
          {
            ...capitalSocial,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCapitalSocialToCollectionIfMissing(capitalSocialCollection, capitalSocial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CapitalSocial to an array that doesn't contain it", () => {
        const capitalSocial: ICapitalSocial = sampleWithRequiredData;
        const capitalSocialCollection: ICapitalSocial[] = [sampleWithPartialData];
        expectedResult = service.addCapitalSocialToCollectionIfMissing(capitalSocialCollection, capitalSocial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(capitalSocial);
      });

      it('should add only unique CapitalSocial to an array', () => {
        const capitalSocialArray: ICapitalSocial[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const capitalSocialCollection: ICapitalSocial[] = [sampleWithRequiredData];
        expectedResult = service.addCapitalSocialToCollectionIfMissing(capitalSocialCollection, ...capitalSocialArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const capitalSocial: ICapitalSocial = sampleWithRequiredData;
        const capitalSocial2: ICapitalSocial = sampleWithPartialData;
        expectedResult = service.addCapitalSocialToCollectionIfMissing([], capitalSocial, capitalSocial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(capitalSocial);
        expect(expectedResult).toContain(capitalSocial2);
      });

      it('should accept null and undefined values', () => {
        const capitalSocial: ICapitalSocial = sampleWithRequiredData;
        expectedResult = service.addCapitalSocialToCollectionIfMissing([], null, capitalSocial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(capitalSocial);
      });

      it('should return initial array if no CapitalSocial is added', () => {
        const capitalSocialCollection: ICapitalSocial[] = [sampleWithRequiredData];
        expectedResult = service.addCapitalSocialToCollectionIfMissing(capitalSocialCollection, undefined, null);
        expect(expectedResult).toEqual(capitalSocialCollection);
      });
    });

    describe('compareCapitalSocial', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCapitalSocial(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCapitalSocial(entity1, entity2);
        const compareResult2 = service.compareCapitalSocial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCapitalSocial(entity1, entity2);
        const compareResult2 = service.compareCapitalSocial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCapitalSocial(entity1, entity2);
        const compareResult2 = service.compareCapitalSocial(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
