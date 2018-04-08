import { database } from '../../database/db.js'
import { createPump, getAllPumps, getPumpById, updatePump, deletePump } from '../pump';

describe('controllers - pump', () => {

    const testpumps = [
        { msPerCl: 5000 },
        { msPerCl: 6000 },
        { msPerCl: 7000 },
    ];

    const dummyResponse = {json: () => {}};

    const createTestPumps = () =>
        createPump({ body: testpumps[0] }, dummyResponse).then(() => 
        createPump({ body: testpumps[1] }, dummyResponse).then(() => 
        createPump({ body: testpumps[2] }, dummyResponse)));

    beforeEach(() => database.init('sqlite://:memory:').sync({force: true}));

    it('creates a pump entry in the database', () => {
        const request = {
            body: testpumps[0]
        };
        const response = {
            json: jest.fn()
        };

        return createPump(request, response).then(() => {
            expect(response.json.mock.calls.length).toBe(1);
            const pump = response.json.mock.calls[0][0];
            expect(pump.id).toEqual(1);
            expect(pump.msPerCl).toEqual(testpumps[0].msPerCl);
        });
    });

    it('reads all created pump entries from database', () => {
        const getResponse = { json: jest.fn() };

        return createTestPumps().then(() =>
            getAllPumps(null, getResponse).then(() => {
                expect(getResponse.json.mock.calls.length).toBe(1);
                const pumps = getResponse.json.mock.calls[0][0];
                expect(pumps.length).toEqual(3);
                expect(pumps[0].id).toEqual(1);
                expect(pumps[0].msPerCl).toEqual(testpumps[0].msPerCl);
                expect(pumps[1].id).toEqual(2);
                expect(pumps[1].msPerCl).toEqual(testpumps[1].msPerCl);
                expect(pumps[2].id).toEqual(3);
                expect(pumps[2].msPerCl).toEqual(testpumps[2].msPerCl);
            })
        );
    });

    it('reads single created size entry with id from database', () => {
        const id = 2;
        const findByIdRequest = { params: { id } };
        const getResponse = { json: jest.fn() };

        return createTestPumps().then(() =>
            getPumpById(findByIdRequest, getResponse).then(() => {
                expect(getResponse.json.mock.calls.length).toBe(1);
                const pump = getResponse.json.mock.calls[0][0];
                expect(pump.id).toEqual(id);
                expect(pump.msPerCl).toEqual(testpumps[1].msPerCl);
            })
        ); 
    });

    it('updates single entry with id from database', () => {
        const id = 2;
        const updateRequest = { params: { id }, body: { msPerCl: 1337 }};
        const getResponse = { json: jest.fn() };

        return createTestPumps().then(() =>
            updatePump(updateRequest, dummyResponse).then(() => 
                getAllPumps(null, getResponse).then(() => {
                    expect(getResponse.json.mock.calls.length).toBe(1);
                    const pumps = getResponse.json.mock.calls[0][0];
                    expect(pumps.length).toEqual(3);
                    expect(pumps[0].id).toEqual(1);
                    expect(pumps[0].msPerCl).toEqual(testpumps[0].msPerCl);
                    expect(pumps[1].id).toEqual(2);
                    expect(pumps[1].msPerCl).toEqual(1337);
                    expect(pumps[2].id).toEqual(3);
                    expect(pumps[2].msPerCl).toEqual(testpumps[2].msPerCl);
                })
            )
        ); 
    });

    it('deletes single entry with id from database', () => {
        const id = 2;
        const deleteRequest = { params: { id } };
        const getResponse = { json: jest.fn() };

        return createTestPumps().then(() =>
            deletePump(deleteRequest, dummyResponse).then(() => 
                getAllPumps(null, getResponse).then(() => {
                    expect(getResponse.json.mock.calls.length).toBe(1);
                    const pumps = getResponse.json.mock.calls[0][0];
                    expect(pumps.length).toEqual(2);
                    expect(pumps[0].id).toEqual(1);
                    expect(pumps[0].msPerCl).toEqual(testpumps[0].msPerCl);
                    expect(pumps[1].id).toEqual(3);
                    expect(pumps[1].msPerCl).toEqual(testpumps[2].msPerCl);
                })
            )
        ); 
    });
});