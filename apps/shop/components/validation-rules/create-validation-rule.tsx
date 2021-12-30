import * as Yup from "yup";
import { useFormik } from "formik";
import CreateValidationRule from "../../models/mutations/create-validation-rule";
import { useValidationRuleCreateMutation } from "../../features/api/api-slice";
import { Button, InputField } from "@rocketshop-monorepo/ui";

const CreateValidationRuleSchema = Yup.object().shape({
  start: Yup.number()
    .min(0, "Input a number greater or equal to 0!")
    .max(1000000, "Input a number lower or equal to 1 000 000!")
    .required("Required!"),
  end: Yup.number()
    .min(0, "Input a number greater or equal to 0!")
    .max(1000000, "Input a number lower or equal to 1 000 000!")
    .moreThan(Yup.ref("start"), "Has to be greater than start value!")
    .required("Required!"),
  confirmations: Yup.number()
    .min(0, "Input a number greater or equal to 0!")
    .max(10, "Input a number lower or equal to 10!")
    .required("Required!"),
  enabled: Yup.boolean().required("Required!"),
});

const CreateValidationRuleForm = () => {
  const [createRule] = useValidationRuleCreateMutation();

  const formik = useFormik({
    initialValues: {
      start: 0,
      end: 1,
      confirmations: 0,
      enabled: true,
    } as CreateValidationRule,
    validationSchema: CreateValidationRuleSchema,
    onSubmit: async (values) => createRule(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-lg font-bold text-blue-800 block mb-4">
        Create validation rule
      </h2>
      <InputField formik={formik} name={"start"} label="Start value" />
      <InputField formik={formik} name={"end"} label="End value" />
      <InputField
        formik={formik}
        name={"confirmations"}
        label="Confirmations"
      />
      <Button
        className="mt-2 w-full"
        disabled={!formik.isValid && formik.isSubmitting}
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateValidationRuleForm;
