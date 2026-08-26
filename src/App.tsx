import React, { useState, useEffect } from 'react';
import { AppView, AnswerValue, CalculationResult, ContrastMode, FontSizeLevel } from './types';
import { storageService } from './services/storageService';
import { calculateOverallProfile } from './services/scoreService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { Questionnaire } from './components/Questionnaire/Questionnaire';
import { ResultPage } from './components/Results/ResultPage';
import { CandidateList } from './components/Candidates/CandidateList';
import { ComparisonPage } from './components/Compare/ComparisonPage';
import { EducationalPage } from './components/Educational/EducationalPage';
import { PrivacyPage } from './components/Privacy/PrivacyPage';
import { AdminPage } from './components/Admin/AdminPage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [compareCandidateIds, setCompareCandidateIds] = useState<string[]>([]);

  // Accessibility States
  const [contrastMode, setContrastMode] = useState<ContrastMode>('normal');
  const [fontSizeLevel, setFontSizeLevel] = useState<FontSizeLevel>('normal');

  // Load initial persistent local storage state
  useEffect(() => {
    const savedAnswers = storageService.getAnswers();
    const savedIndex = storageService.getCurrentQuestionIndex();
    const savedResult = storageService.getResult();
    const savedAccessibility = storageService.getAccessibilityPreferences();

    setAnswers(savedAnswers);
    setCurrentIndex(savedIndex);
    setResult(savedResult);
    setContrastMode(savedAccessibility.contrast);
    setFontSizeLevel(savedAccessibility.fontSize);
  }, []);

  const handleToggleContrast = () => {
    const next: ContrastMode = contrastMode === 'normal' ? 'alto-contraste' : 'normal';
    setContrastMode(next);
    storageService.saveAccessibilityPreferences(next, fontSizeLevel);
  };

  const handleCycleFontSize = () => {
    let next: FontSizeLevel = 'normal';
    if (fontSizeLevel === 'normal') next = 'grande';
    else if (fontSizeLevel === 'grande') next = 'extra-grande';
    else next = 'normal';

    setFontSizeLevel(next);
    storageService.saveAccessibilityPreferences(contrastMode, next);
  };

  const handleAnswerQuestion = (questionId: number, value: AnswerValue) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    storageService.saveAnswer(questionId, value);
  };

  const handleNavigateQuestion = (index: number) => {
    setCurrentIndex(index);
    storageService.saveCurrentQuestionIndex(index);
  };

  const handleCalculateAndComplete = () => {
    const calculatedResult = calculateOverallProfile(answers);
    setResult(calculatedResult);
    storageService.saveResult(calculatedResult);
    setCurrentView('resultado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetTest = () => {
    storageService.clearAnswers();
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setCurrentView('questionario');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartComparisonWith = (candidateIds: string[]) => {
    setCompareCandidateIds(candidateIds);
    setCurrentView('comparar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Font Size Classes
  let fontScaleClass = 'text-base';
  if (fontSizeLevel === 'grande') {
    fontScaleClass = 'text-lg text-[1.125rem]';
  } else if (fontSizeLevel === 'extra-grande') {
    fontScaleClass = 'text-xl text-[1.25rem]';
  }

  // Contrast theme class
  const isHighContrast = contrastMode === 'alto-contraste';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isHighContrast
          ? 'bg-black text-yellow-300 contrast-125'
          : 'bg-[#FAF8F5] text-stone-900 font-sans'
      } ${fontScaleClass}`}
    >
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        contrastMode={contrastMode}
        onToggleContrast={handleToggleContrast}
        fontSizeLevel={fontSizeLevel}
        onCycleFontSize={handleCycleFontSize}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onStartQuestionnaire={() => {
              setCurrentView('questionario');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreCandidates={() => {
              setCurrentView('candidatos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProposals={() => {
              setCurrentView('comparar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLearnConcepts={() => {
              setCurrentView('educativo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            hasExistingAnswers={Object.keys(answers).length > 0}
            onViewResults={() => {
              if (result) {
                setCurrentView('resultado');
              } else {
                handleCalculateAndComplete();
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'como-funciona' && (
          <HowItWorksPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartQuestionnaire={() => {
              setCurrentView('questionario');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'questionario' && (
          <Questionnaire
            answers={answers}
            onAnswer={handleAnswerQuestion}
            currentIndex={currentIndex}
            onNavigate={handleNavigateQuestion}
            onComplete={handleCalculateAndComplete}
            onReset={handleResetTest}
          />
        )}

        {currentView === 'resultado' && result && (
          <ResultPage
            result={result}
            answers={answers}
            onRetakeTest={handleResetTest}
            onExploreCandidates={() => {
              setCurrentView('candidatos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProposals={() => {
              setCurrentView('comparar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'candidatos' && (
          <CandidateList onStartComparison={handleStartComparisonWith} />
        )}

        {currentView === 'comparar' && (
          <ComparisonPage initialSelectedIds={compareCandidateIds} />
        )}

        {currentView === 'educativo' && <EducationalPage />}

        {currentView === 'privacidade' && (
          <PrivacyPage
            onBack={() => setCurrentView('home')}
            onDataCleared={() => {
              setAnswers({});
              setCurrentIndex(0);
              setResult(null);
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminPage onBack={() => setCurrentView('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view: AppView) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
