export declare const CHECKOUT_URLS: {
  readonly mw4: string;
  readonly cloudDma: string;
  readonly skinChanger: string;
  readonly hwidSpoofer: string;
  readonly ugc: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;

export declare function resolveCheckoutRedirect(pathname: string, search?: string): string | null;
