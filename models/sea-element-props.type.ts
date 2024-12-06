export type SeaElementProps = {
  id: number;
  title: string;
  description: string;
  sourcesLink: string[];
  question: string;
  isCorrect: boolean;
  onAnswer: (gameProps: number) => void;
};
