import React, { useEffect } from "react";
import { Auth0Context, useAuth0 } from "@auth0/auth0-react";
import { useRegisterUser } from "@hooks/api/useRegisterUser";
import { deferred } from "@api/TokenHelper";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated } = useAuth0();

  const { mutate } = useRegisterUser();

  useEffect(() => {
    if (isAuthenticated) mutate();
  }, [isAuthenticated, mutate]);

  return (
    <Auth0Context.Consumer>
      {({ getAccessTokenSilently }) => {
        deferred.resolve(getAccessTokenSilently);
        return children;
      }}
    </Auth0Context.Consumer>
  );
};
