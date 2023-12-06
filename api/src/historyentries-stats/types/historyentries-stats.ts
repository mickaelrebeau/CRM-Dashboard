import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HistoryEntriesStats {
  @Field(() => ID)
  type!: string;
}
