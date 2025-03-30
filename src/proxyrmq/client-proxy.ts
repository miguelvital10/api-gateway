import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";


@Injectable()

export class ClientProxySmartRanking {
    getClientProxyAdminBackendInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@172.16.11.13:5673/smartranking'],
                queue: 'admin-backend'
            }
        })
    }
}