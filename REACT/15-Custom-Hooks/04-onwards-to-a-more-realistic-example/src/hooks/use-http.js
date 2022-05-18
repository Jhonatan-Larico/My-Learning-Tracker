import { useCallback, useState } from "react";

//this hook should be able  to send any kind of qrequest to any kind of URL
//isLoading, error, sendRequest, these things we will need in the components that uses the hook  therefore at the end of the custom hook function i'll return these ones
//moved requestConfig to sendRequest function because it will be used there
const useHtpp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig ,applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        //this function will be pass for the component that used this custom useHttp hook
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  ); // useCallback needs a dependecy array also should list everything which is being used in here, in this case  (requestConfig, applydata()), this poses another problem, both are objects so we have to ensure that these objects are not recreated all the time when this function runs again

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHtpp;
