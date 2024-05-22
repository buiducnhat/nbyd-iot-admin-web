import { Button, Result } from 'antd';
import React from 'react';

import useApp from '@/hooks/use-app';

const ErrorPage: React.FC = () => {
  const { t } = useApp();

  return (
    <Result
      status="500"
      title="500"
      subTitle={t('Something went wrong')}
      extra={<Button type="primary">{t('Go back')}</Button>}
    />
  );
};

export default ErrorPage;
