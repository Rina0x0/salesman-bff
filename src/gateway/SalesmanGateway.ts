import { SalesmanResponse } from './../driver/ContentsDriver';
import { binding, namedWith } from 'automated-omusubi';
import { SalesmanPort } from '../port/SalesmanPort';
import { Salesman, Salesmans, FirstName } from './../domain/Salesman';
import { ContractId, ID } from '../domain/Id';
import { ContentsDriver } from '../driver/ContentsDriver';
import { LastName, Department, Outcome } from '../domain/Salesman';

@namedWith(SalesmanPort)
export class SalesmanGateway extends SalesmanPort{
    @binding
    contentsDriver!: ContentsDriver

    async getSalesmans(contractId: ContractId): Promise<Salesmans> {
        const response = await this.contentsDriver.getSalesmans(contractId.value);
        return new Salesmans(response.salesmans.map(toSalesmanFrom));
    }
}

function toSalesmanFrom(salesman: SalesmanResponse) {
    return new Salesman(
        new ID(salesman.id),
        new FirstName(salesman.firstName),
        new LastName(salesman.lastName),
        new Department(salesman.department),
        new Outcome(salesman.outCome)
    );
}