import { SalesmanUsecase } from '../SalesmanUsecase';
import { ContractId } from '../../domain/Id';
import { Salesmans } from '../../domain/Salesman';
import { register } from 'automated-omusubi';
import { SalesmanPort } from '../../port/SalesmanPort';
import { when } from 'jest-when';

describe('SalesmanUsecase', () => {
    describe('#getSalesmans', () => {
        it('idに紐づく営業マンを全て取得する', async () => {
            const target = new SalesmanUsecase();
            const contractId = new ContractId('12345');
            const salesmans = new Salesmans([]);

            const salesmanPort: SalesmanPort = {
                getSalesmans: jest.fn()
            }
            register(salesmanPort).as(SalesmanPort);
            when(salesmanPort.getSalesmans as jest.Mock)
            .calledWith(contractId)
            .mockReturnValueOnce(salesmans);

            const actual = await target.getSalesmans(contractId);

            expect(actual).toBe(salesmans);
        });
    });
});