import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StatsFiltersInput {
  @Field(() => Date, { nullable: true })
  startDate?: Date | null;

  @Field(() => Date, { nullable: true })
  endDate?: Date | null;

  @Field(() => [String], { nullable: true })
  projectIds?: string[] | null;

  @Field(() => [String], { nullable: true })
  types?: string[] | null;
}
