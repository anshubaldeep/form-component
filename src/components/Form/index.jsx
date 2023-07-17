import { Children, cloneElement } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import Input from "./components/Input";
import Label from "./components/Label";
import Select from "./components/SelectDropdown";
import Textarea from "./components/TextArea";
import Checkbox from "./components/Checkbox";
import RadioGroup from "./components/RadioGroup";
import ErrorBoundary from "../ErrorBoundary";
import { Switch } from "./components/Switch";

const Form = ({
  children,
  rhfProps,
  formConfig,
  handleSubmit: handleSubmitFunc,
  wrapperClass,
}) => {
  const { register, control, handleSubmit, formState } = rhfProps;

  const { errors /*, isDirty */ } = formState;

  const returnChildProps = (comp) => {
    return Array.isArray(children)
      ? children?.find(({ type }) => type === comp)?.props
      : children?.type === comp
      ? children?.props
      : {};
  };

  const renderField = (field, control, error = <></>) => {
    const {
      type,
      name,
      label,
      placeholder,
      options,
      fieldOptions,
      className,
      wrapperClassName,
      disabled = false,
      custom = {},
    } = field;
    switch (type) {
      case "text": {
        const childProps = returnChildProps(Input);
        return (
          <div className={cn("flex flex-col gap-2", wrapperClassName)}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              type="text"
              placeholder={placeholder}
              className={className}
              disabled={disabled}
              {...register(name, { ...fieldOptions })}
              {...childProps}
            />
            {error}
          </div>
        );
      }
      case "textarea": {
        const childProps = returnChildProps(Textarea);
        return (
          <div className={cn("flex flex-col gap-2", wrapperClassName)}>
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              type="text"
              placeholder={placeholder}
              className={className}
              disabled={disabled}
              {...register(name, { ...fieldOptions })}
              {...childProps}
            />
            {error}
          </div>
        );
      }
      case "select": {
        const childProps = returnChildProps(Select);
        return (
          <div className={cn("flex flex-col gap-2", wrapperClassName)}>
            <Label htmlFor={name}>{label}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value, ref, ...props } }) => (
                <Select
                  controlled
                  value={value}
                  onValueChange={onChange}
                  ref={ref}
                  options={options}
                  placeholder={placeholder}
                  className={className}
                  disabled={disabled}
                  {...props}
                  {...childProps}
                />
              )}
              {...fieldOptions}
            />
            {error}
          </div>
        );
      }
      case "button": {
        const childProps = returnChildProps(Button);
        return (
          <Button
            type={field.buttonType}
            onClick={field.onClick}
            className={className}
            disabled={disabled}
            {...fieldOptions}
            {...childProps}
          >
            {label}
          </Button>
        );
      }
      case "checkbox": {
        const childProps = returnChildProps(Checkbox);
        return (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onChange, ...props } }) => (
                <Checkbox
                  name={name}
                  label={label}
                  checked={value}
                  onCheckedChange={onChange}
                  className={className}
                  disabled={disabled}
                  {...props}
                  {...childProps}
                />
              )}
              {...fieldOptions}
            />
            {error}
          </>
        );
      }
      case "radio": {
        const childProps = returnChildProps(RadioGroup);
        return (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onChange, ...props } }) => (
                <RadioGroup
                  name={name}
                  options={options}
                  value={value}
                  onValueChange={onChange}
                  className={className}
                  disabled={disabled}
                  {...props}
                  {...childProps}
                />
              )}
              {...fieldOptions}
            />
            {error}
          </>
        );
      }
      case "switch": {
        const childProps = returnChildProps(Switch);
        return (
          <>
            <div className={cn("flex flex-col gap-2", wrapperClassName)}>
              <Label htmlFor={name}>{label}</Label>
              <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, ...props } }) => (
                  <div className="flex items-center space-x-2">
                    {custom?.label1 && (
                      <Label htmlFor={name}>{custom.label1}</Label>
                    )}
                    <Switch
                      id={name}
                      name={name}
                      checked={value}
                      onCheckedChange={onChange}
                      className={className}
                      disabled={disabled}
                      {...props}
                      {...childProps}
                    />
                    {custom?.label2 && (
                      <Label htmlFor={name}>{custom.label2}</Label>
                    )}
                  </div>
                )}
                {...fieldOptions}
              />
              {error}
            </div>
          </>
        );
      }
      case "custom": {
        const componentName = field.component;
        const customComponent = children.$$typeof
          ? children
          : children?.find(({ type }) => type?.displayName === componentName);
        return (
          <>
            {cloneElement(customComponent, {
              name,
              register,
              options,
              fieldOptions,
              disabled,
              rhfProps,
              control,
              errors,
              ...className,
              ...customComponent.props,
              ...field,
            })}
            {error}
          </>
        );
      }
      default:
        return (
          <Input
            className={className}
            disabled={disabled}
            type="text"
            {...register(name)}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFunc)}
      className={cn("flex flex-col gap-8 w-full", wrapperClass)}
    >
      {Children.toArray(
        formConfig.map((field) => (
          <ErrorBoundary>
            {renderField(
              field,
              control,
              errors?.[field.name] ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors?.[field.name]?.message}
                </p>
              ) : (
                <></>
              )
            )}
          </ErrorBoundary>
        ))
      )}
    </form>
  );
};

Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.Button = Button;
Form.Checkbox = Checkbox;
Form.Radio = RadioGroup;
Form.Label = Label;

export default Form;
