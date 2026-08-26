import { AnswerValue, CalculationResult, UserProposalNote, ContrastMode, FontSizeLevel } from '../types';

const STORAGE_KEYS = {
  ANSWERS: 'mpp2026_answers',
  CURRENT_INDEX: 'mpp2026_current_index',
  CALC_RESULT: 'mpp2026_calc_result',
  PROPOSAL_NOTES: 'mpp2026_proposal_notes',
  CONTRAST_MODE: 'mpp2026_contrast_mode',
  FONT_SIZE_LEVEL: 'mpp2026_font_size_level',
};

export const storageService = {
  // Answers
  getAnswers(): Record<number, AnswerValue> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveAnswers(answers: Record<number, AnswerValue>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.error('Falha ao salvar respostas', e);
    }
  },

  saveAnswer(questionId: number, value: AnswerValue): void {
    try {
      const current = this.getAnswers();
      current[questionId] = value;
      this.saveAnswers(current);
    } catch (e) {
      console.error('Falha ao salvar resposta', e);
    }
  },

  clearAnswers(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
      localStorage.removeItem(STORAGE_KEYS.CALC_RESULT);
    } catch (e) {
      console.error('Falha ao limpar respostas', e);
    }
  },

  // Index
  getCurrentQuestionIndex(): number {
    try {
      const idx = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
      return idx ? parseInt(idx, 10) : 0;
    } catch {
      return 0;
    }
  },

  saveCurrentQuestionIndex(index: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, index.toString());
    } catch (e) {
      console.error('Falha ao salvar índice', e);
    }
  },

  // Result
  getResult(): CalculationResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CALC_RESULT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveResult(result: CalculationResult): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CALC_RESULT, JSON.stringify(result));
    } catch (e) {
      console.error('Falha ao salvar resultado', e);
    }
  },

  // Proposal personal notes
  getProposalNotes(): Record<string, UserProposalNote> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROPOSAL_NOTES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveProposalNote(proposalId: string, note: UserProposalNote): void {
    try {
      const current = this.getProposalNotes();
      current[proposalId] = note;
      localStorage.setItem(STORAGE_KEYS.PROPOSAL_NOTES, JSON.stringify(current));
    } catch (e) {
      console.error('Falha ao salvar anotação da proposta', e);
    }
  },

  removeProposalNote(proposalId: string): void {
    try {
      const current = this.getProposalNotes();
      delete current[proposalId];
      localStorage.setItem(STORAGE_KEYS.PROPOSAL_NOTES, JSON.stringify(current));
    } catch (e) {
      console.error('Falha ao remover anotação', e);
    }
  },

  // Accessibility Preferences
  getAccessibilityPreferences(): {
    contrast: ContrastMode;
    fontSize: FontSizeLevel;
  } {
    try {
      const contrast = (localStorage.getItem(STORAGE_KEYS.CONTRAST_MODE) as ContrastMode) || 'normal';
      const fontSize = (localStorage.getItem(STORAGE_KEYS.FONT_SIZE_LEVEL) as FontSizeLevel) || 'normal';
      return { contrast, fontSize };
    } catch {
      return { contrast: 'normal', fontSize: 'normal' };
    }
  },

  saveAccessibilityPreferences(contrast: ContrastMode, fontSize: FontSizeLevel): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTRAST_MODE, contrast);
      localStorage.setItem(STORAGE_KEYS.FONT_SIZE_LEVEL, fontSize);
    } catch (e) {
      console.error('Falha ao salvar acessibilidade', e);
    }
  },

  // Apagar Meus Dados
  clearAllUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
      localStorage.removeItem(STORAGE_KEYS.CALC_RESULT);
      localStorage.removeItem(STORAGE_KEYS.PROPOSAL_NOTES);
    } catch (e) {
      console.error('Falha ao limpar dados do usuário', e);
    }
  },
};
