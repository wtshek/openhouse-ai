import { useEffect, useState } from "react";
import { Home, TransformedCommunity } from "@/utils/types";
import { fetchData } from "@/utils/fetchData";

type Data = {
  communities: TransformedCommunity[];
  homes: Home[];
};

export const useFetchData = (): {
  data: Data | undefined;
  isLoading: boolean;
  hasError: boolean;
} => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setHasError(true);
      }
    };

    getData();
  }, []);

  return {
    data,
    isLoading,
    hasError,
  };
};
