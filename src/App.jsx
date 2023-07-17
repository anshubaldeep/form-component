import HeaderNavbar from "./components/Header";
import Form from "./components/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiTextInput from "./components/Form/CustomComponents/MultiTextInput";

// Schema for validati form validation
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email().nonempty("Email is required"),
  gender: z.string().nonempty("Please select a value"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  multiText: z.array(z.string()).refine((val) => val.length > 0, {
    message: "You must enter at least one value",
  }),
  radio: z.string().refine((val) => val !== "", {
    message: "You must select a radio option",
  }),
});

// Form Configuration
const formConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    name: "gender",
    label: "Select your gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "terms",
    label: "Terms and Conditions",
    type: "checkbox",
  },
  {
    name: "multiText",
    label: "Multi Text Custom Component",
    type: "custom",
    component: "MultiText",
  },
  {
    name: "radio",
    label: "Radio Option",
    type: "radio",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
  {
    name: "button",
    label: "Submit",
    type: "button",
    buttonType: "submit",
    className: "bg-blue-500 hover:bg-blue-700 text-white w-36",
  },
];

function App() {
  // React Hook Form Creation and props
  const rhfProps = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      terms: false,
      checkbox: false,
      multiText: [""],
      radio: "",
    },
  });

  // Submit Handler to handle form submission if you have a submit button
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <HeaderNavbar />
      <div className="flex justify-center items-center">
        {/* Form Component - 
                formConfig: Array of objects that contain the form fields
                rhfProps: React Hook Form props
                handleSubmit: Function to handle form submission
                wrapperClass: Class to wrap the form in
        */}
        <Form
          formConfig={formConfig}
          rhfProps={rhfProps}
          handleSubmit={handleSubmit}
          wrapperClass="gap-8 p-24 w-3/4"
        >
          {/* Custom Component -
                pass the custom component as a child of the Form component
                the component will be rendered in the form
            */}
          <MultiTextInput maxRows={3} />
        </Form>
      </div>
    </>
  );
}

export default App;
