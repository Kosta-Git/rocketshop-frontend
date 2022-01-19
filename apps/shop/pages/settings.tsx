import { PageContent } from '@rocketshop-monorepo/ui';
import CreateValidationRuleForm from '../components/validation-rules/create-validation-rule';
import ValidationRulesTable from '../components/validation-rules/validation-rule-table';

const Settings = () => {
  return (
    <PageContent title={'Settings'}>
      <ValidationRulesTable />
      <CreateValidationRuleForm />
    </PageContent>
  );
};

export default Settings;
