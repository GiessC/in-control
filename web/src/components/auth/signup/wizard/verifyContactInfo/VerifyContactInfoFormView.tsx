import FormViewProps from '@/components/common/FormViewProps';
import VerifyContactInfoFormValues from './formValues';

const VerifyContactInfoFormView = ({
    values,
    onSubmit,
    onBlur,
    onChange,
    ...props
}: FormViewProps<VerifyContactInfoFormValues>) => {
    return (
        <form
            {...props}
            onSubmit={onSubmit}
        ></form>
    );
};

export default VerifyContactInfoFormView;
