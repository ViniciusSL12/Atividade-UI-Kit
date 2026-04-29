import React from 'react';

export type Chore = {
  id: string;
  title: string;
  points: number;
  done: boolean;
};

export type Reward = {
  id: string;
  title: string;
  cost: number;
  redeemed: boolean;
};

export type AppState = {
  points: number;
  chores: Chore[];
  rewards: Reward[];
  toggleChore: (id: string) => void;
  redeemReward: (id: string) => void;
};

const initialChores: Chore[] = [
  { id: 'c1', title: 'Estudar 30 minutos', points: 10, done: false },
  { id: 'c2', title: 'Regar as plantas', points: 8, done: false },
  { id: 'c3', title: 'Limpar a mesa', points: 6, done: false },
  { id: 'c4', title: 'Organizar os livros', points: 12, done: false },
  { id: 'c5', title: 'Preparar a mochila', points: 5, done: false },
];

const initialRewards: Reward[] = [
  { id: 'r1', title: 'Hora extra de jogo', cost: 20, redeemed: false },
  { id: 'r2', title: 'Noite de pizza', cost: 25, redeemed: false },
  { id: 'r3', title: 'Passeio no parque', cost: 35, redeemed: false },
  { id: 'r4', title: 'Sessão de cinema', cost: 50, redeemed: false },
];

const AppContext = React.createContext<AppState | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [chores, setChores] = React.useState<Chore[]>(initialChores);
  const [rewards, setRewards] = React.useState<Reward[]>(initialRewards);
  const [points, setPoints] = React.useState(0);

  const toggleChore = React.useCallback((id: string) => {
    setChores((prev) =>
      prev.map((chore) => {
        if (chore.id !== id) {
          return chore;
        }
        const nextDone = !chore.done;
        setPoints((current) => {
          const delta = nextDone ? chore.points : -chore.points;
          return Math.max(0, current + delta);
        });
        return { ...chore, done: nextDone };
      })
    );
  }, []);

  const redeemReward = React.useCallback(
    (id: string) => {
      setRewards((prev) =>
        prev.map((reward) => {
          if (reward.id !== id || reward.redeemed || points < reward.cost) {
            return reward;
          }
          setPoints((current) => Math.max(0, current - reward.cost));
          return { ...reward, redeemed: true };
        })
      );
    },
    [points]
  );

  const value = React.useMemo<AppState>(
    () => ({ points, chores, rewards, toggleChore, redeemReward }),
    [points, chores, rewards, toggleChore, redeemReward]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppState => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
