import { Module } from '@nestjs/common';
import { hasuraSdkProvider } from '../graphql/hasura-sdk.provider';
import { HistoryEntriesStatsService } from './historyentries-stats.service';
import { HistoryEntriesStatsResolver } from './historyentries-stats.resolver';

@Module({
  providers: [
    hasuraSdkProvider,
    HistoryEntriesStatsService,
    HistoryEntriesStatsResolver,
  ],
})
export class HistoryEntriesStatsModule {}
