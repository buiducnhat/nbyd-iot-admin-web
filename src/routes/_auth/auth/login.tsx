import { LockFilled, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Flex, Form, Input, Layout, Typography } from 'antd';
import { AxiosError } from 'axios';

import useApp from '@/hooks/use-app';
import { useAppStore } from '@/modules/app/app.zustand';
import { TLoginInput } from '@/modules/auth/auth.model';
import authService from '@/modules/auth/auth.service';
import { THttpResponse } from '@/shared/http-service';
import { transApiResDataCode } from '@/shared/utils';

export const Route = createFileRoute('/_auth/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const { t, antdApp } = useApp();

  const queryClient = useQueryClient();
  const setLoading = useAppStore((state) => state.setLoading);

  const [form] = Form.useForm<TLoginInput>();

  const loginMutation = useMutation({
    mutationFn: (input: TLoginInput) => authService.login(input),
    onSuccess: () => {
      antdApp.notification.success({
        message: t('Login successfully'),
      });
      queryClient.refetchQueries({ queryKey: ['auth/getMe'] });
      setLoading(false);
    },
    onError: (error: AxiosError<THttpResponse<null>>) => {
      antdApp.notification.error({
        message: t('Login failed'),
        description: transApiResDataCode(t, error.response?.data),
      });
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  const onFinish = async (data: TLoginInput) => {
    loginMutation.mutate(data);
  };

  const onFinishFailed = () => {
    antdApp.notification.error({
      message: t('Login failed'),
      description: t('Please contact the administrator'),
    });
  };

  return (
    <>
      <Layout.Content
        css={css`
          height: 100dvh;
        `}
      >
        <Flex
          css={css`
            height: 100dvh;
          `}
          vertical
          gap={24}
          align="center"
          justify="center"
        >
          <Typography.Title level={2}>
            {t('Login to your account')}
          </Typography.Title>

          <Form
            form={form}
            layout="vertical"
            size="large"
            css={css`
              width: 30%;
            `}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<TLoginInput>
              name="usernameOrEmail"
              rules={[
                {
                  required: true,
                  message: t('This field is required'),
                },
              ]}
            >
              <Input
                placeholder={t('Enter your username or email')}
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item<TLoginInput>
              name="password"
              rules={[
                {
                  required: true,
                  message: t('This field is required'),
                },
              ]}
            >
              <Input.Password
                placeholder={t('Enter your password')}
                prefix={<LockFilled />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                css={css`
                  width: 100%;
                `}
                type="primary"
                htmlType="submit"
              >
                {t('Submit')}
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Layout.Content>
    </>
  );
}

export default LoginPage;
