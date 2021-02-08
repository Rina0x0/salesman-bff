import { SalesmansResponse } from './../../driver/ContentsDriver';
import { Department, FirstName, LastName, Outcome } from './../../domain/Salesman';
import { SalesmanGateway } from './../SalesmanGateway';
import { ContractId, ID } from '../../domain/Id';
import { Salesman, Salesmans } from '../../domain/Salesman';
import { ContentsDriver } from '../../driver/ContentsDriver';
import { register } from 'automated-omusubi';
import { when } from 'jest-when';

describe("SalesmanGateway", () => {
    describe("#getSalesmans", () => {
        it("idに紐づく営業マンの情報を全て取得する", async () => {
            const target = new SalesmanGateway();
            const contractId = new ContractId('12345');
            const salesmans = new Salesmans([
                new Salesman(
                    new ID('1'), 
                    new FirstName('太郎1'),
                    new LastName('営業マン'),
                    new Department('マンション事業部'),
                    new Outcome('実績1')),
                new Salesman(
                    new ID('2'), 
                    new FirstName('太郎2'),
                    new LastName('営業マン'),
                    new Department('戸建て事業部'),
                    new Outcome('実績2')),
                new Salesman(
                    new ID('3'), 
                    new FirstName('太郎3'),
                    new LastName('営業マン'),
                    new Department('アパート事業部'),
                    new Outcome('実績3'))
            ]);

            const salesmansResponse: SalesmansResponse = {
                salesmans: [
                    {
                        id: '1',
                        firstName: '太郎1',
                        lastName: '営業マン',
                        department: 'マンション事業部',
                        outCome: '実績1'
                    },
                    {
                        id: '2',
                        firstName: '太郎2',
                        lastName: '営業マン',
                        department: '戸建て事業部',
                        outCome: '実績2'
                    },
                    {
                        id: '3',
                        firstName: '太郎3',
                        lastName: '営業マン',
                        department: 'アパート事業部',
                        outCome: '実績3'
                    }
                ]
            }

            const contentsDriver: ContentsDriver = {
                getSalesmans: jest.fn()
            };
            register(contentsDriver).as(ContentsDriver);
            when(contentsDriver.getSalesmans as jest.Mock)
            .calledWith(contractId.value)
            .mockReturnValueOnce(salesmansResponse);

            const actual = await target.getSalesmans(contractId);

            expect(actual).toEqual(salesmans);
            expect(contentsDriver.getSalesmans).toBeCalledWith(contractId.value);
        });
    });
});