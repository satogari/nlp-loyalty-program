import { Consumer, KafkaMessage } from 'kafkajs'; // Import KafkaJS
import CdcSyncPartnerUseCase from '../../../application/usecase/cdc/sync-partner-from-mongo.usecase';
import { PartnerMongoDBChangeStreamDocument } from '../../../application/adapter/partner/mongo-stream/tmf-632-partner.mongo.interface.dto';

export class PartnerKafkaConsumer {
    constructor(
        private readonly consumer: Consumer, // kafka.consumer({ groupId: 'partner-change-stream-consumer-group' })
        private readonly syncParterUseCase: CdcSyncPartnerUseCase,
        private readonly topic: string // Kafka topic to consume
    ) { }

    async start(): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ message }: { message: KafkaMessage }) => {
                try {
                    const changeStreamDocument: PartnerMongoDBChangeStreamDocument = JSON.parse(message.value?.toString() || '{}');
                    await this.syncParterUseCase.execute(changeStreamDocument);
                } catch (error) {
                    console.error('Error processing Kafka message:', error);
                }
            }
        });
        console.log('Partner Kafka consumer started');
    }

    // Stop the Kafka consumer
    async stop(): Promise<void> {
        await this.consumer.disconnect();
        console.log('Kafka consumer disconnected');
    }
}
