"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast.error("Un problème d'affichage est survenu", {
      description: "Nous travaillons à résoudre ce problème.",
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 bg-red-500/5 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-red-500 mb-2">
              Oups ! Quelque chose s&apos;est mal passé.
            </h2>
            <p className="text-sm text-neutral-400 mb-4">
              Une erreur inattendue a empêché l&apos;affichage de ce composant.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
