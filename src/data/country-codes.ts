export type CountryCodeOption = {
  code: string;
  country: string;
  dial: string;
};

/** Common dial codes; UAE first as Inkspilled’s home market. */
export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "AE", country: "United Arab Emirates", dial: "+971" },
  { code: "SA", country: "Saudi Arabia", dial: "+966" },
  { code: "QA", country: "Qatar", dial: "+974" },
  { code: "KW", country: "Kuwait", dial: "+965" },
  { code: "BH", country: "Bahrain", dial: "+973" },
  { code: "OM", country: "Oman", dial: "+968" },
  { code: "IN", country: "India", dial: "+91" },
  { code: "PK", country: "Pakistan", dial: "+92" },
  { code: "BD", country: "Bangladesh", dial: "+880" },
  { code: "PH", country: "Philippines", dial: "+63" },
  { code: "EG", country: "Egypt", dial: "+20" },
  { code: "JO", country: "Jordan", dial: "+962" },
  { code: "LB", country: "Lebanon", dial: "+961" },
  { code: "GB", country: "United Kingdom", dial: "+44" },
  { code: "US", country: "United States", dial: "+1" },
  { code: "CA", country: "Canada", dial: "+1" },
  { code: "AU", country: "Australia", dial: "+61" },
  { code: "DE", country: "Germany", dial: "+49" },
  { code: "FR", country: "France", dial: "+33" },
  { code: "IT", country: "Italy", dial: "+39" },
  { code: "ES", country: "Spain", dial: "+34" },
  { code: "NL", country: "Netherlands", dial: "+31" },
  { code: "SE", country: "Sweden", dial: "+46" },
  { code: "CH", country: "Switzerland", dial: "+41" },
  { code: "SG", country: "Singapore", dial: "+65" },
  { code: "MY", country: "Malaysia", dial: "+60" },
  { code: "ID", country: "Indonesia", dial: "+62" },
  { code: "TH", country: "Thailand", dial: "+66" },
  { code: "CN", country: "China", dial: "+86" },
  { code: "JP", country: "Japan", dial: "+81" },
  { code: "KR", country: "South Korea", dial: "+82" },
  { code: "ZA", country: "South Africa", dial: "+27" },
  { code: "NG", country: "Nigeria", dial: "+234" },
  { code: "KE", country: "Kenya", dial: "+254" },
  { code: "BR", country: "Brazil", dial: "+55" },
  { code: "MX", country: "Mexico", dial: "+52" },
  { code: "TR", country: "Turkey", dial: "+90" },
  { code: "RU", country: "Russia", dial: "+7" },
  { code: "NZ", country: "New Zealand", dial: "+64" },
  { code: "IE", country: "Ireland", dial: "+353" },
];

export const DEFAULT_COUNTRY_CODE = "AE";
