import { database } from '../../database/db.js'
import { createSize, getAllSizes, getSizeById } from '../size';

database.init().sync();

beforeEach(() => database.init('sqlite://:memory:').sync({force: true}));

const testsizes = [
    { name: 'shot', cl: 4 },
    { name: 'small', cl: 15 },
    { name: 'large', cl: 30 }
]

describe('controllers - size', () => {
    test('is creates a size entry in the database', () => {
        const request = {
            body: testsizes[0]
        };
        const response = {
            json: jest.fn()
        };

        return createSize(request, response).then(() => {
            expect(response.json.mock.calls.length).toBe(1);
            const size = response.json.mock.calls[0][0];
            expect(size.id).toEqual(1);
            expect(size.cl).toEqual(4);
            expect(size.name).toEqual('shot');
        });
    });

    const createTestSizes = () =>
        createSize({ body: testsizes[0] }, {json: () => {}}).then(() => 
        createSize({ body: testsizes[1] }, {json: () => {}}).then(() => 
        createSize({ body: testsizes[2] }, {json: () => {}})));

    test('reads created size entries from database', () => {
        const getResponse = { json: jest.fn() };

        return createTestSizes().then(() =>
            getAllSizes(null, getResponse).then(() => {
                expect(getResponse.json.mock.calls.length).toBe(1);
                const sizes = getResponse.json.mock.calls[0][0];
                expect(sizes.length).toEqual(3);
                expect(sizes[0].id).toEqual(1);
                expect(sizes[0].cl).toEqual(testsizes[0].cl);
                expect(sizes[0].name).toEqual(testsizes[0].name);
                expect(sizes[1].id).toEqual(2);
                expect(sizes[1].cl).toEqual(testsizes[1].cl);
                expect(sizes[1].name).toEqual(testsizes[1].name);
                expect(sizes[2].id).toEqual(3);
                expect(sizes[2].cl).toEqual(testsizes[2].cl);
                expect(sizes[2].name).toEqual(testsizes[2].name);
            })
        );
    });

    test('reads created size entry with id from database', () => {
        const id = 2;
        const findByIdRequest = { params: { id } };
        const getResponse = { json: jest.fn() };

        return createTestSizes().then(() =>
            getSizeById(findByIdRequest, getResponse).then(() => {
                expect(getResponse.json.mock.calls.length).toBe(1);
                const size = getResponse.json.mock.calls[0][0];
                expect(size.id).toEqual(id);
                expect(size.cl).toEqual(testsizes[1].cl);
                expect(size.name).toEqual(testsizes[1].name);
            })
        ); 
    });
});