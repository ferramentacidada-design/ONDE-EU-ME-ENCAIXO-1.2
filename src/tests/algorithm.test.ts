import {
  calculateOverallProfile,
  classifyPoliticalProfile,
  calculateDimensionScore,
  calculateResultConfidence,
} from '../services/scoreService';
import { AnswerValue } from '../types';
import { QUESTIONS_DATA } from '../data/questions';

export function runAllAlgorithmTests(): {
  name: string;
  passed: boolean;
  details?: string;
}[] {
  const testResults: { name: string; passed: boolean; details?: string }[] = [];

  // Test 1: All answers positive (+2)
  try {
    const allPositive: Record<number, AnswerValue> = {};
    for (const q of QUESTIONS_DATA) {
      allPositive[q.id] = 2;
    }
    const resultPositive = calculateOverallProfile(allPositive);
    const passed =
      resultPositive.overallScore > 40 &&
      (resultPositive.classification === 'DIREITA' || resultPositive.classification === 'CENTRO-DIREITA');
    testResults.push({
      name: '1. Todas as Respostas Positivas (+2)',
      passed,
      details: `Score: ${resultPositive.overallScore}, Classificação: ${resultPositive.classification}`,
    });
  } catch (e: any) {
    testResults.push({ name: '1. Todas as Respostas Positivas (+2)', passed: false, details: e.message });
  }

  // Test 2: All answers negative (-2)
  try {
    const allNegative: Record<number, AnswerValue> = {};
    for (const q of QUESTIONS_DATA) {
      allNegative[q.id] = -2;
    }
    const resultNegative = calculateOverallProfile(allNegative);
    const passed =
      resultNegative.overallScore < -40 &&
      (resultNegative.classification === 'ESQUERDA' || resultNegative.classification === 'CENTRO-ESQUERDA');
    testResults.push({
      name: '2. Todas as Respostas Negativas (-2)',
      passed,
      details: `Score: ${resultNegative.overallScore}, Classificação: ${resultNegative.classification}`,
    });
  } catch (e: any) {
    testResults.push({ name: '2. Todas as Respostas Negativas (-2)', passed: false, details: e.message });
  }

  // Test 3: All neutral answers (0)
  try {
    const allNeutral: Record<number, AnswerValue> = {};
    for (const q of QUESTIONS_DATA) {
      allNeutral[q.id] = 0;
    }
    const resultNeutral = calculateOverallProfile(allNeutral);
    const passed = resultNeutral.overallScore === 0 && resultNeutral.classification === 'CENTRO';
    testResults.push({
      name: '3. Respostas Neutras (0)',
      passed,
      details: `Score: ${resultNeutral.overallScore}, Classificação: ${resultNeutral.classification}`,
    });
  } catch (e: any) {
    testResults.push({ name: '3. Respostas Neutras (0)', passed: false, details: e.message });
  }

  // Test 4: Unanswered / Low responses (<60%)
  try {
    const fewAnswers: Record<number, AnswerValue> = { 1: 1, 2: -1, 3: 2 };
    const conf = calculateResultConfidence(3, 50);
    const passed = conf.confidence === 'Baixa';
    testResults.push({
      name: '4. Perguntas Sem Resposta (<60% respondido)',
      passed,
      details: `Confiança: ${conf.confidence} - ${conf.text}`,
    });
  } catch (e: any) {
    testResults.push({ name: '4. Perguntas Sem Resposta (<60% respondido)', passed: false, details: e.message });
  }

  // Test 5: Borderline Classification Test
  try {
    const border1 = classifyPoliticalProfile(11);
    const border2 = classifyPoliticalProfile(42);
    const passed = border1.isBorderline && border2.isBorderline;
    testResults.push({
      name: '5. Fronteiras entre Classificações (Borderlines)',
      passed,
      details: `Score 11: ${border1.borderlineText} | Score 42: ${border2.borderlineText}`,
    });
  } catch (e: any) {
    testResults.push({ name: '5. Fronteiras entre Classificações (Borderlines)', passed: false, details: e.message });
  }

  // Test 6: Mixed Opinions (e.g. Free Market + Strong Social Protection)
  try {
    const mixed: Record<number, AnswerValue> = {};
    // Pro-market economics
    mixed[2] = 2; // cut business taxes
    mixed[3] = 2; // cut spending
    mixed[5] = 2; // private companies participate
    // Pro-social protection & health
    mixed[14] = 2; // increase poor family aid
    mixed[19] = 2; // spend more on SUS
    mixed[21] = 2; // free medicine
    const mixedProfile = calculateOverallProfile(mixed);
    const passed = mixedProfile.consistencyText.length > 0;
    testResults.push({
      name: '6. Resultados Mistos e Análise de Consistência',
      passed,
      details: `Consistência: ${mixedProfile.consistencyText}`,
    });
  } catch (e: any) {
    testResults.push({ name: '6. Resultados Mistos e Análise de Consistência', passed: false, details: e.message });
  }

  return testResults;
}
