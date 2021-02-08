import { Salesman as SalesmanJson } from './../generated/graphql';
import { Salesman } from './../domain/Salesman';
import { loadConfiguration, readFileAsync } from '../configuration/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { Resolvers } from '../generated/graphql';
import { SalesmanUsecase } from '../usecase/SalesmanUsecase';
import { ContractId } from '../domain/Id';
import { Salesmans } from '../domain/Salesman';

async function setup() {
    await loadConfiguration('./salesman-bff-config.json');
}

export async function runApp() {
    setup();

    const app = express();
    app.get('/v1/systems/ping', (_, res) => {
        res.send('pong');
    });

    // ----- ここから下はApollo Serverの設定
    const salesmanUsecase = new SalesmanUsecase();
    const schema = await readFileAsync('./graphql/schema.graphql', {encoding: 'utf8'});
    const typeDefs = gql(schema);
    
    const resolvers: Resolvers =  {
        Query: {
            async salesmans(_, __, { req }): Promise<SalesmanJson[]> {
                const id = req.headers['test-header'];
                if(id == null || undefined) {
                    throw Error('Header is Null');
                }
                const salesmans = await salesmanUsecase.getSalesmans(new ContractId(id));
                return createSalesmansJsonFrom(salesmans);
            }
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers: resolvers as any,
        context: ({ req }) => {
            return {
                req
            }
        },
    });

    server.applyMiddleware({app});
    app.listen(17100, () => {
        console.log(
        `Server started on http://localhost:17100${server.graphqlPath}`
        );
    });
}

function createSalesmansJsonFrom(salesmans: Salesmans): SalesmanJson[] {
    return salesmans.list.map(createSalesmanJsonFrom);
}

function createSalesmanJsonFrom(salesman: Salesman): SalesmanJson {
    return {
        id: salesman.id.value,
        firstName: salesman.firstName.value,
        lastName: salesman.lastName.value,
        department: salesman.department.value,
        outCome: {
            detail: salesman.outcome? salesman.outcome.value : null
        }
    };
}