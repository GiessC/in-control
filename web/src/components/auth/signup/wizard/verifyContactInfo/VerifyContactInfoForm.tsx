import { Center, Paper, Text } from '@mantine/core';
import { Formik } from 'formik';
import VerifyContactInfoFormView from './VerifyContactInfoFormView';
import VerifyContactInfoFormValues, {
    defaultVerifyContactInfoValues,
} from './formValues';

const onSubmit = async (values: VerifyContactInfoFormValues) => {};

const VerifyContactInfoForm = () => {
    return (
        <Paper
            className='w-1/2 m-auto'
            shadow='xs'
            radius='md'
        >
            <Center>
                <Text
                    size='xl'
                    className='font-extrabold'
                >
                    Verify Email/Phone Number
                </Text>
            </Center>
            <Formik
                initialValues={defaultVerifyContactInfoValues}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <VerifyContactInfoFormView
                        values={values}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                )}
            </Formik>
        </Paper>
    );
};

export default VerifyContactInfoForm;
