import { AddonEventType, enumValues } from 'paralo-common';
import axios from 'axios';

jest.mock('axios');
// @ts-ignore
(axios.isAxiosError as unknown as jest.Mock<typeof axios.isAxiosError>).mockResolvedValue(true);

describe('Generate test schemas', () => {
    test('Test AddressSchema', async () => {
        await consumerService.registerAddonEvents();

        for (const eventType of enumValues(AddonEventType)) {
            expect(channel.listenerCount(eventType)).toEqual(1);
        }
    });
});
