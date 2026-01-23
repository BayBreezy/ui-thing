export type FallbackFont =
  | "Arial"
  | "Helvetica"
  | "Verdana"
  | "Georgia"
  | "Times New Roman"
  | "serif"
  | "sans-serif"
  | "monospace"
  | "cursive"
  | "fantasy";

export type UIThingAuthWelcomeProps = {
  /**
   * The preview text shown in email clients
   */
  previewText?: string;
  /**
   * The title of the email
   */
  title?: string;
  /**
   * The name of the brand (e.g., "UI Thing")
   */
  brandName?: string;
  /**
   * The URL of the brand logo image
   */
  logoUrl?: string;
  /**
   * The alt text for the brand logo image
   */
  logoAlt?: string;
  /**
   * The url that the user will be taken to when clicking the logo/brand name
   */
  appUrl?: string;
  /**
   * The recipient's full name
   */
  recipientName?: string;
  /**
   * The fallback fonts to use if the primary font fails to load
   */
  fontFamilyFallBack?: FallbackFont[];
  /**
   * The recipient's email address
   */
  email?: string;
};

export type AddressProps = {
  /**
   * The street address of the company
   */
  street?: string;
  /**
   * The city of the company
   */
  city?: string;
  /**
   * The state or region of the company
   */
  state?: string;
  /**
   * The zip or postal code of the company
   */
  zip?: string;
  /**
   * The country of the company
   */
  country?: string;
};

export type DisclaimerProps = {
  email: UIThingAuthWelcomeProps["email"];
  /**
   * The URL for unsubscribing from emails
   */
  unsubscribeUrl?: string;
  /**
   * The URL for managing email preferences
   */
  managePreferencesUrl?: string;
};

export type FooterProps = Pick<
  UIThingAuthWelcomeProps,
  "brandName" | "logoUrl" | "logoAlt" | "appUrl" | "email"
> & {
  /**
   * The contact us URL
   */
  contactUrl?: string;
};

export type LogoProps = Pick<
  UIThingAuthWelcomeProps,
  "brandName" | "logoUrl" | "logoAlt" | "appUrl"
>;
