import CreateValidationRuleForm from '../components/validation-rules/create-validation-rule';
import ValidationRulesTable from '../components/validation-rules/validation-rule-table';

const Settings = () => {
  return (
    <>
      <div className="p-2">
        <span className="text-xl">Settings</span>
        <hr className="border-1 border-gray-200 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ValidationRulesTable />
          </div>
          <div>
            <CreateValidationRuleForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
