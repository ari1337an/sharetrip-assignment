import SearchActionEntity from "@/infrastructure/entities/SearchActionEntity"

export default interface SearchActionRepoStrategy{
  recordSearchAction(searchAction: SearchActionEntity);
}