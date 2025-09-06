import { useEffect, useState } from 'react';
import { dataSourceConfig } from '../config/dataSourceConfig';

export const useDataSource = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (dataSourceConfig.mode === 'mock') {
          const mod = await dataSourceConfig.mockFile();
          setData(mod.default);
        } else {
          const res = await fetch(dataSourceConfig.api.url, { method: dataSourceConfig.api.method });
          const json = await res.json();
          setData(dataSourceConfig.api.transform(json));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};