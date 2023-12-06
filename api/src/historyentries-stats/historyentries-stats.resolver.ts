import { Query, Float, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { HistoryEntriesStats } from './types/historyentries-stats';
import { StatsFiltersInput } from './types/stats-filters.input';
import { HistoryEntriesStatsService } from './historyentries-stats.service';

@Resolver(() => HistoryEntriesStats)
export class HistoryEntriesStatsResolver {
  constructor(
    private readonly historyEntriesStatsService: HistoryEntriesStatsService,
  ) {}

  @Query(() => [HistoryEntriesStats])
  async stats(
    @Args({ name: 'filters', type: () => StatsFiltersInput, nullable: true })
    filters?: StatsFiltersInput | null,
  ) {
    if (!filters?.types || filters.types.length === 0) {
      return [];
    }

    const promises = filters.types.map(async (type) => {
      const data = await this.historyEntriesStatsService.getStatByType(
        type,
        new Date(filters.startDate),
        new Date(filters.endDate),
      );

      return {
        type,
        count: data.historyentries_aggregate.aggregate.count,
      };
    });

    const results = await Promise.all(promises);

    const responseRates = results.map((result) => {
      const sentType = result.type.replace('_RECEIVED', '_SENT');
      const sentCount =
        results.find((item) => item.type === sentType)?.count || 0;
      const responseRate = sentCount === 0 ? 0 : result.count / sentCount;

      return {
        ...result,
        rate: responseRate.toFixed(2),
      };
    });

    return responseRates;
  }

  @ResolveField(() => Float)
  responseRate(data: { type: string; count: number; rate: number }): number {
    return data.rate;
  }
}
