import { Component, ErrorInfo, ReactNode } from "react";
import InternalServerError from "@pages/InternalServerError";

// DEFAULT ERROR BOUNDARY PAGE

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <InternalServerError />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
