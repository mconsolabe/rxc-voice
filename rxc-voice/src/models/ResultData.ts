import { Proposal } from "./Proposal";

export interface ResultData {
  proposals: Proposal[] | undefined,
  highestProposal: number | undefined,
  lowestProposal: number | undefined,
}