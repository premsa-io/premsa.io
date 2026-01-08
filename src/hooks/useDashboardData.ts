import { useState, useEffect } from "react";

interface StatsData {
  alertsCount: number;
  openedCount: number;
  reportsCount: number;
}

export const useStats = () => {
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    openedCount: 0,
    reportsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setData({
        alertsCount: 0,
        openedCount: 0,
        reportsCount: 0,
      });
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { ...data, isLoading };
};

export interface Alert {
  id: string;
  title: string;
  source: string;
  date: string;
}

export const useRecentAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAlerts([]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { alerts, isLoading };
};

export interface TrendingTopic {
  id: string;
  topic: string;
  mentions: number;
}

export const useTrendingTopics = () => {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setTopics([]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { topics, isLoading };
};
