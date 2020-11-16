import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation();
    return (
      <Wrapper variant="small">
        <Formik 
          initialValues={{ username: '', password: '' }} 
          onSubmit={async (values, {setErrors}) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors({
                username: "hi im an error"
              })
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField 
                name="username" 
                placeholder="username" 
                label="Username" 
              />
              <Box mt={4}>
                <InputField 
                  name="password" 
                  placeholder="password" 
                  label="Password" 
                  type="password"
                />
              </Box>
              <Button 
                mt={4} 
                type="submit" 
                isLoading={isSubmitting} 
                colorScheme="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}

export default Register
