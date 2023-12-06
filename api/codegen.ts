import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      'https://ruqtiqwbmpkmwcliuekv.hasura.eu-central-1.nhost.run/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_PRIVATE_KEY,
        },
      },
    },
  ],
  documents: ['src/**/*.graphql', 'src/**/*.ts'],
  generates: {
    './src/graphql/sdk.generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  watch: true,
  overwrite: true,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
