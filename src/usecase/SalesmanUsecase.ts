import { Salesmans } from './../domain/Salesman';
import { bindBy, named } from "automated-omusubi";
import { SalesmanPort } from '../port/SalesmanPort';
import { ContractId } from '../domain/Id';

@named
export class SalesmanUsecase {
    @bindBy(SalesmanPort)
    salesmanPort!: SalesmanPort;

    async getSalesmans(contractId: ContractId): Promise<Salesmans> {
        return this.salesmanPort.getSalesmans(contractId);
    }
}