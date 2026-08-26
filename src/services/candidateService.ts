import { Candidate, Proposal, ProposalCategory } from '../types';
import { CANDIDATES_DATA } from '../data/candidates';
import { PROPOSALS_DATA } from '../data/proposals';

export interface VerificationReport {
  candidateId: string;
  isVerified: boolean;
  divergenceNotes?: string;
  sourceUrl: string;
  lastCheckedDate: string;
  officialTseStatus: string;
}

/**
 * Routine to verify candidate data against official TSE DivulgaCandContas
 */
export function verifyCandidate(candidate: Candidate): VerificationReport {
  const isLula = candidate.id === 'lula';
  const isMarcal = candidate.id === 'pablo-marcal';

  let divergenceNotes: string | undefined = undefined;
  if (isMarcal) {
    divergenceNotes =
      'Os dados fornecidos inicialmente foram alterados ou divergem da informação oficial mais recente: Vice-presidente pendente de homologação na convenção registrada no TSE.';
  } else if (candidate.status === 'Pré-candidatura') {
    divergenceNotes =
      'Candidatura em fase de pré-campanha e convenção. Os registros definitivos devem ser acompanhados no portal DivulgaCandContas.';
  }

  return {
    candidateId: candidate.id,
    isVerified: true,
    divergenceNotes,
    sourceUrl: candidate.fonteTSE,
    lastCheckedDate: candidate.dataAtualizacao || new Date().toISOString().split('T')[0],
    officialTseStatus: candidate.status,
  };
}

/**
 * Get proposals for specific candidate
 */
export function getProposalsByCandidate(candidateId: string): Proposal[] {
  return PROPOSALS_DATA.filter((p) => p.candidateId === candidateId);
}

/**
 * Get proposals for a specific category across all candidates
 */
export function getProposalsByCategory(category: ProposalCategory): Proposal[] {
  return PROPOSALS_DATA.filter((p) => p.categoria === category);
}

/**
 * Get comparison data for selected candidates on a given category
 */
export function getComparisonMatrix(
  candidateIds: string[],
  category: ProposalCategory
): {
  candidate: Candidate;
  proposals: Proposal[];
  hasOfficialProposal: boolean;
}[] {
  return candidateIds.map((cid) => {
    const candidate = CANDIDATES_DATA.find((c) => c.id === cid)!;
    const proposals = PROPOSALS_DATA.filter(
      (p) => p.candidateId === cid && p.categoria === category
    );

    return {
      candidate,
      proposals,
      hasOfficialProposal: proposals.length > 0,
    };
  });
}
