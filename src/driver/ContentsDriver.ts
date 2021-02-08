import { configuration } from './../configuration/config';
import { named } from "automated-omusubi";

@named
export class ContentsDriver {
    async getSalesmans(contractId: string): Promise<SalesmansResponse> {
        const option = contractId
        ? { headers: {"test-header": contractId} }
        : undefined

        const response = await fetch(
            `http://${configuration?.api.contents.host}:${configuration?.api.contents.port}
            /v1/salesmans`, option);
    
        if(response.ok) {
            return response.json();
        } else {
            console.log(await response.text);
            throw Error('Salesman fetch failed');
        }
    }
}

export interface SalesmansResponse {
    salesmans: SalesmanResponse[]
}

export interface SalesmanResponse {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    outCome: string;
}