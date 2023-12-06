import { FactoryProvider } from '@nestjs/common';
import { getSdk } from './sdk.generated';
import { GraphQLClient } from 'graphql-request';

export type HasuraSdk = ReturnType<typeof getSdk>;

export const hasuraSdkProvider: FactoryProvider<HasuraSdk> = {
  provide: 'HASURA_SDK',
  useFactory: () => {
    // Replace process.env.HASURA_URL with your Hasura URL cause onlu absolute url is supported
    const client = new GraphQLClient(process.env.HASURA_URL, {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_PRIVATE_KEY,
      },
    });
    return getSdk(client);
  },
};
