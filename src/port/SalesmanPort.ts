import { Salesmans } from "../domain/Salesman";
import { ContractId } from '../domain/Id';

export abstract class SalesmanPort {
    abstract getSalesmans(contractId: ContractId): Promise<Salesmans>;
}