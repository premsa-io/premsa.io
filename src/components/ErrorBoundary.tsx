import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-destructive/10 border border-destructive rounded-lg p-6">
            <h1 className="text-xl font-bold text-destructive mb-4">
              ⚠️ Application Error
            </h1>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Error:</p>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-32">
                  {this.state.error?.message}
                </pre>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Stack:</p>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
                  {this.state.error?.stack}
                </pre>
              </div>
              {this.state.errorInfo && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Component Stack:</p>
                  <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Debug info: {window.location.origin} | {new Date().toISOString()}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
