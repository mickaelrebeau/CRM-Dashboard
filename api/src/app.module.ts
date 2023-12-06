import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { HistoryEntriesStatsModule } from './historyentries-stats/historyentries-stats.module';

@Module({
  imports: [GraphqlModule, HistoryEntriesStatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
