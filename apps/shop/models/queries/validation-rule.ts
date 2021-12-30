import PageQuery from "../abstractions/page-query";

export interface ValidationRule {
  id: string;
  start: number;
  end: number;
  confirmations: number;
  enabled: boolean;
}

export interface ValidationRuleQuery extends PageQuery  {
  enabled?: boolean;
  startValue?: number;
  endValue?: number;
}
