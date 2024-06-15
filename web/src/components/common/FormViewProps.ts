import { ChangeEvent, FocusEvent, HTMLProps } from 'react';

export default interface FormViewProps<TFormValues>
    extends HTMLProps<HTMLFormElement> {
    values: TFormValues;
    onSubmit: () => void;
    onChange: (e: ChangeEvent<unknown>) => void;
    onBlur: (e: FocusEvent<unknown, Element>) => void;
}
