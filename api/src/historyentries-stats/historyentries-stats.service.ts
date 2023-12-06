import { Inject, Injectable } from '@nestjs/common';
import { HasuraSdk } from '../graphql/hasura-sdk.provider';
import { gql } from 'graphql-request';
// if you have an error with your gql import use the following import
// import { gql } from 'graphql-tag';

gql`
  query GetHistoryEntriesAggregate(
    $type: String!
    $startDate: timestamptz!
    $endDate: timestamptz!
  ) {
    historyentries_aggregate(
      where: {
        type: { _eq: $type }
        created_at: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

@Injectable()
export class HistoryEntriesStatsService {
  constructor(
    @Inject('HASURA_SDK')
    private readonly hasuraSdkProvider: HasuraSdk,
  ) {}

  getStatByType(type: string, startDate: Date, endDate: Date) {
    return this.hasuraSdkProvider.GetHistoryEntriesAggregate({
      type,
      startDate,
      endDate,
    });
  }
}
