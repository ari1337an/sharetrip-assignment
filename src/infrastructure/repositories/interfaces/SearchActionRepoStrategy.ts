import SearchActionEntity from "@/infrastructure/entities/SearchActionEntity"
import { SearchAction } from "@prisma/client";

export default interface SearchActionRepoStrategy{
  recordSearchAction(searchAction: SearchActionEntity): Promise<any>;
}