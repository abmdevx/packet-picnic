export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: {
              credential: string;
            }) => void | Promise<void>;
          }) => void;

          prompt: () => void;
        };
      };
    };
  }
}